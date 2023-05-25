#pragma once
#include <iostream>
#include <opencv2\opencv.hpp>
#include <mutex>

using namespace std;
using namespace cv;

queue<Mat> buffer1, buffer2, buffer3;

mutex mu;
bool isRunning;

Mat img, frame;
Mat frame1, frame2, frame3, src;
Mat frame_ans, frame_ans2;

Mat Step1(Mat src) {
    cv::Mat dst;

    resize(src, dst, Size(500, 500));

    return dst;
}

Mat Step2_1(Mat img) {
    cv::Mat dst;

    cvtColor(img, dst, COLOR_BGR2GRAY);

    return dst;
}

Mat Step2_2(Mat img) {
    cv::Mat dst;

    cvtColor(img, dst, COLOR_GRAY2BGR);

    return dst;
}

Mat Step2_3(Mat img) {
    cv::Mat dst;

    cvtColor(img, dst, COLOR_BGR2HSV);

    return dst;
}

Mat Step2_4(Mat img) {
    cv::Mat dst;

    cvtColor(img, dst, COLOR_HSV2BGR);

    return dst;
}

Mat Step2_5(Mat img) {
    cv::Mat dst;

    cvtColor(img, dst, COLOR_BGR2Luv);

    return dst;
}

void process() {
    while (true)
    {
        if (buffer1.empty())
        {
            if (!isRunning)
                break;

            continue;
        }

        mu.lock();

        Mat frame = buffer1.front();
        buffer1.pop();

        mu.unlock();
    }
}

void process2() {
    while (true)
    {
        if (buffer2.empty())
        {
            if (!isRunning)
                break;

            continue;
        }

        mu.lock();

        Mat frame_ans = buffer2.front();
        buffer2.pop();

        mu.unlock();

        Mat ans;
        imshow("asdf", frame_ans);

        if (waitKey(1) == 27) {
            break;
        }
    }
}

void capture()
{
    cv::VideoCapture cap;
    cap.set(cv::CAP_PROP_BUFFERSIZE, 3);
    cap.open("C:\\girl.mp4");

    if (!cap.isOpened()) {
        std::cout << "break";
        return;
    }

    while (isRunning)
    {
        cap.read(frame);

        frame1 = Step1(frame.clone());
        frame2 = Step2_1(frame1.clone());

        mu.lock();
        buffer1.push(frame1.clone());
        buffer2.push(frame2.clone());
        mu.unlock();
    }
}

int main() {
    isRunning = true;

    const int  num_threads = 4;
    thread threads[num_threads];

    for (int i = 0; i < num_threads; i++) {
        if (i == 0) {
            threads[i] = std::thread(&capture);
        }
        else if (i == 1) {
            threads[i] = std::thread(&process);
        }
        else if (i == 2) {
            threads[i] = std::thread(&process2);
        }
    }

    for (auto& thread : threads) {
        thread.join();
    }

    return 0;
}