#include <iostream>
#include <opencv2/opencv.hpp>
#include <string>
#include <mutex>

using namespace std;
using namespace cv;

double boundX = 0, boundY = 0;
double area = 0.0;
Point p, p1, p2;

char buf1[100]; 
char buf2[100];
char buf3[100];  
int turn_flag = 0;
Mat gray;

queue<Mat> buffer1;
queue<Mat> buffer2;

mutex mu;

void output() {
	sprintf(buf1, "A:%.1f", area);
  sprintf(buf2, "W:%.1f H:%.1f", boundX, boundY);
	sprintf(buf3, "ANS : %d", turn_flag);
	putText(gray, buf1, p, cv::FONT_HERSHEY_SIMPLEX, 0.4, Scalar(0, 0, 0), 1, 1);
	putText(gray, buf2, p1, cv::FONT_HERSHEY_SIMPLEX, 0.4, Scalar(0, 0, 0), 1, 1);
  putText(gray, buf3, p2, cv::FONT_HERSHEY_SIMPLEX, 0.4, Scalar(0, 0, 0), 1, 1);
}
  
int main(int argc, char** argv) {

	VideoCapture Vid(0);

	if (!Vid.isOpened()) {
		cout << " break";
		return -1;
	}

	Mat img;
	while (1) {
		Vid >> img;
    resize(img, img, Size(450, 450));

		cvtColor(img, gray, COLOR_BGR2GRAY);

		threshold(gray, gray, 153, 255, cv::THRESH_BINARY_INV);
		inRange(gray, Scalar(215, 215, 215), Scalar(255, 255, 255), gray);

		vector<vector<cv::Point>> contours;
		findContours(gray, contours, cv::RETR_EXTERNAL, cv::CHAIN_APPROX_NONE);

		vector<Moments> mu(contours.size());
		vector<Point2d> mc(contours.size());
		vector<Rect> boundRect(contours.size());
		vector<vector<Point>> contours_poly(contours.size());

		for (int i = 0; i < contours.size(); i++) {
			mu[i] = moments(contours[i], false);
			mc[i] = Point2d(mu[i].m10 / mu[i].m00, mu[i].m01 / mu[i].m00);

			approxPolyDP(Mat(contours[i]), contours_poly[i], 3, true);
			boundRect[i] = boundingRect(Mat(contours_poly[i]));



			/*for (int i = 0; i < contours.size(); i++) {
				approxPolyDP(Mat(contours[i]), contours_poly[i], 3, true);
				boundRect[i] = boundingRect(Mat(contours_poly[i]));
			}*/

			area = contourArea(contours[i]);
			boundX = boundRect[i].width;
			boundY = boundRect[i].height;

			if (area > 3) {

				circle(gray, mc[i], 1.5, Scalar(255, 0, 255), -1, 8, 0);
				rectangle(gray, boundRect[i].tl(), boundRect[i].br(), Scalar(0, 0, 0), 1, 8, 0);

				p = mc[i];
				p1 = mc[i];
        p2 = mc[i];
				p.x += 3; p.y += 3;
				p1.x += 3; p1.y += 9;
        p2.x += 3; p2.y += 18;

				char buf1[100];
				char buf2[100];
        char buf3[100];
        
				if (200 < boundX && boundX < 250) {
					turn_flag = 1;
					output();
				}
				else if ((260 < boundX && boundX < 440)) {
					turn_flag = 2;
					output();
				}
				else if ((450 <= boundX)) {
					turn_flag = 3;
					output();
				}
				else {
					turn_flag = 0;
          output();
				}
			}
		}

		imshow("sadf", gray);

		if (waitKey(1) == 27) {
			break;
		}
	}

	return 0;
}