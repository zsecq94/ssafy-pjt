#include <opencv2/opencv.hpp>
#include <iostream>

int main() {
  // 웹캠 연결
  cv::VideoCapture cap(0+cv::CAP_V4L2);
  cap.set(cv::CAP_PROP_BUFFERSIZE,3);
  cap.set(cv::CAP_PROP_FRAME_WIDTH, 480);
  cap.set(cv::CAP_PROP_FRAME_HEIGHT, 360);
  cap.set(cv::CAP_PROP_FPS,20);
  int w = 640, h = 480;

  while (true) { 
//        clock_t old_t = clock();
    // 프레임 읽기
    cv::Mat frame;
    bool ret = cap.read(frame,cv::CAP_V4L2);

    // 프레임이 제대로 읽혔는지   확인
    if (!ret) {
      std::cout << "Error: failed to capture frame" << std::endl;
      break;
    }

    // 프레임 출력
    cv::imshow("frame", frame);


    if (cv::waitKey(49) == 'q') {
      break;
    }

//clock_t curr_time = clock();    //Current time
//clock_t temp_time = (curr_time - old_t) / 1000.0f;    //Calculate to millisecond
    std::cout << temp_time<<"\n";
    temp_time /= 1.0f;
  }

  // 리소스 해제
  cap.release();
  cv::destroyAllWindows();

  return 0;
}
