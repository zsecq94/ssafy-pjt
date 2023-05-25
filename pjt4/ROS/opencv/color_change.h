#pragma once
#include <iostream>
#include <opencv2\opencv.hpp>

using namespace std;
using namespace cv;

Mat img, rtg, gtr;

int main() {
	VideoCapture Vid("C:\\test_girl.mp4");

	if (!Vid.isOpened()) {
		cout << "break";
		return -1;
	}

	int framecnt = 1;

	while (1) {
		Vid >> img;

		resize(img, img, Size(480, 480));

		if (framecnt <= 100) {
			cvtColor(img, img, COLOR_RGB2GRAY);
		}
		else if (framecnt > 100 && framecnt <= 300) {

			cvtColor(img, img, COLOR_GRAY2RGB);
		}
		if (framecnt >= 300 && framecnt <= 600) {
			cvtColor(img, img, COLOR_RGB2HSV);
		}
		if (framecnt > 600 && framecnt <= 900) {
			cvtColor(img, img, COLOR_HSV2RGB);
		}
		if (framecnt == 1000) {
			framecnt = 1;
		}

		imshow("asdf", img);

		framecnt++;

		if (waitKey(1) == 27) {
			break;
		}
	}

	return 0;
}