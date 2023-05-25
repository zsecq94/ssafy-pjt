#include <iostream>
#include <stdio.h>

#include <opencv2/core.hpp>
#include <opencv2/core/utility.hpp>
#include <opencv2/core/ocl.hpp>
#include <opencv2/imgcodecs.hpp>
#include <opencv2/highgui.hpp>
#include <opencv2/features2d.hpp>
#include <opencv2/calib3d.hpp>
#include <opencv2/imgproc.hpp>
#include <opencv2/xfeatures2d.hpp>


using namespace cv;
using namespace std;
using namespace cv::xfeatures2d;

#define DEBUG 1

Mat makePanorama(Mat matLeftImage, Mat matRightImage) {
	imshow("L", matLeftImage);
	imshow("R", matRightImage);
	waitKey(1);

	Mat matGrayLImage;
	Mat matGrayRImage;

	//Gray �̹����� ��ȯ
	cvtColor(matLeftImage, matGrayLImage, CV_RGB2GRAY);
	cvtColor(matRightImage, matGrayRImage, CV_RGB2GRAY);

	//step 1 SURF�̿��ؼ� Ư¡�� ����
	int nMinHessian = 300; // threshold (�Ѱ���)
	Ptr<SurfFeatureDetector> Detector = SURF::create(nMinHessian);

	vector <KeyPoint> vtKeypointsObject, vtKeypointsScene;

	Detector->detect(matGrayLImage, vtKeypointsObject);
	Detector->detect(matGrayRImage, vtKeypointsScene);

	Mat matLImageKeypoints;
	Mat matRImageKeypoints;
	drawKeypoints(matGrayLImage, vtKeypointsObject, matLImageKeypoints, Scalar::all(-1), DrawMatchesFlags::DEFAULT);
	drawKeypoints(matGrayRImage, vtKeypointsScene, matRImageKeypoints, Scalar::all(-1), DrawMatchesFlags::DEFAULT);

	imshow("LK", matLImageKeypoints);
	imshow("RK", matRImageKeypoints);
	waitKey(1);

	//step 2 �����
	Ptr<SurfDescriptorExtractor> Extractor = SURF::create();
	//Ptr<SurfDescriptorExtractor> Extractor = SURF::create(100, 4, 3, false,true);

	Mat matDescriptorsObject, matDescriptorsScene;

	Extractor->compute(matGrayLImage, vtKeypointsObject, matDescriptorsObject);
	Extractor->compute(matGrayRImage, vtKeypointsScene, matDescriptorsScene);
	//descriptor(�����)�� ������ ��Ī ����� matches�� �����Ѵ�.
	FlannBasedMatcher Matcher; //kdƮ���� ����Ͽ� ��Ī�� ������ ����
	vector <DMatch> matches;
	Matcher.match(matDescriptorsObject, matDescriptorsScene, matches);

	Mat matAllMatches;
	drawMatches(matGrayLImage, vtKeypointsObject, matGrayRImage, vtKeypointsScene, matches, matAllMatches, Scalar::all(-1), Scalar::all(-1), vector<char>(), DrawMatchesFlags::NOT_DRAW_SINGLE_POINTS);
	imshow("allmatches", matAllMatches);
	waitKey(1);
	double dMaxDist = matches[0].distance;
	double dMinDist = matches[0].distance;
	double dDistance;

	// �� ���� keypoint ���̿��� min-max�� ����Ѵ� (min���� ���)
	for (int i = 0; i < matDescriptorsObject.rows; i++) {
		dDistance = matches[i].distance;

		if (dDistance < dMinDist) dMinDist = dDistance;
		if (dDistance > dMaxDist) dMaxDist = dDistance;
	}
	printf("max_dist : %f \n", dMaxDist);
	printf("min_dist : %f \n", dMinDist);

	//match�� distance ���� �������� matching�� �� �� ��
	//min�� ���� 3�� �Ǵ� good_matches.size() > 60 ������ goodmatch�� �������ش�.
	vector<DMatch>good_matches;
	int distance = 10;
	do {
		vector<DMatch>good_matches2;
		for (int i = 0; i < matDescriptorsObject.rows; i++) {
			if (matches[i].distance < distance * dMinDist)
				good_matches2.push_back(matches[i]);
		}
		good_matches = good_matches2;
		distance -= 1;
	} while (distance != 2 && good_matches.size() > 60);

	//keypoint��� matching ��� ("good" matched point)�� ������ �����Ͽ� �̹����� �׷� ǥ��
	Mat matGoodMatches;
	drawMatches(matGrayLImage, vtKeypointsObject, matGrayRImage, vtKeypointsScene, good_matches, matGoodMatches, Scalar::all(-1), Scalar::all(-1), vector<char>(), DrawMatchesFlags::NOT_DRAW_SINGLE_POINTS);
	imshow("good-matches", matGoodMatches);
	waitKey(3000);

	//Point2f������ ��ȯ
	vector <Point2f> obj;
	vector <Point2f> scene;

	// goodmatch������ keypoint�� ����
	for (int i = 0; i < good_matches.size(); i++) {
		obj.push_back(vtKeypointsObject[good_matches[i].queryIdx].pt);
		scene.push_back(vtKeypointsScene[good_matches[i].trainIdx].pt);
	}
	Mat HomoMatrix = findHomography(scene, obj, CV_RANSAC);
	//RANSAC����� �̿��Ͽ� ù ��° �Ű������� �ι�° �Ű����� ������ 3*3 ũ���� ������ĺ�ȯ H�� ���Ѵ�
	cout << HomoMatrix << endl;

	//Homograpy matrix�� ����Ͽ� �̹����� �߶԰�
	Mat matResult;
	warpPerspective(matRightImage, matResult, HomoMatrix, Size(matLeftImage.cols * 2, matLeftImage.rows * 1.2), INTER_CUBIC);

	Mat matPanorama;
	matPanorama = matResult.clone(); //���纻 ����

	imshow("wrap", matResult);
	waitKey(3000);

	Mat matROI(matPanorama, Rect(0, 0, matLeftImage.cols, matLeftImage.rows));
	matLeftImage.copyTo(matROI);

	imshow("Panorama", matPanorama);
	//���� ���� �߶󳻱�

	int colorx = 0, colory = 0;
	for (int y = 0; y < matPanorama.rows; y++) {
		for (int x = 0; x < matPanorama.cols; x++) {
			if (matPanorama.at<Vec3b>(y, x)[0] == 0 && matPanorama.at<Vec3b>(y, x)[1] == 0 && matPanorama.at<Vec3b>(y, x)[2] == 0) {
				continue;
			}
			if (colorx < x) {
				colorx = x;
			}
			if (colory < y) {
				colory = y;
			}
		}
	}

	Mat blackCutPanorama;
	blackCutPanorama = matPanorama(Range(0, colory), Range(0, colorx));
	imshow("cutblack", blackCutPanorama);
	return blackCutPanorama;
}

int main()
{
	Mat matImage1;
	Mat matImage2;
	Mat matImage3;

	Mat result1;
	Mat result2;
	Mat result3;

	Mat result;

	//��� image�� �߽��̹Ƿ� ��� image�� �������� ��/�쿡 image stitching
	matImage1 = imread("C:/opencv-3.4.3/imagetest2.jpg", IMREAD_COLOR);
	matImage2 = imread("C:/opencv-3.4.3/imagetest1.jpg", IMREAD_COLOR);
	matImage3 = imread("C:/opencv-3.4.3/imagetest3.jpg", IMREAD_COLOR);

	if (matImage1.empty() || matImage2.empty() || matImage3.empty()) return -1;

	flip(matImage1, result2, 1);
	flip(matImage2, result3, 1);
	result1 = makePanorama(result2, result3);
	flip(result1, result, 1);
	result1 = makePanorama(result, matImage3);

	imshow("Result", result1);
	waitKey();
	return 0;
}