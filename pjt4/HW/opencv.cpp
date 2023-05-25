
#include <opencv2/opencv.hpp>

using namespace cv;

int main() {
    // 카메라 초기화
    VideoCapture cap(0, CAP_V4L2);

    // 카메라에서 프레임 읽어오기
    while (true) {
        Mat frame;
        cap >> frame;

        // 프레임이 정상적으로 읽어졌는지 확인
        if (frame.empty()) {
            std::cerr << "카메라에서 프레임을 읽을 수 없습니다." << std::endl;
            break;
        }

        // 읽어온 프레임 출력
        imshow("Camera Testtt", frame);

        // 'q'를 누르면 종료
        if (waitKey(1) == 'q') {
            break;
        }
    }

    // 카메라 리소스 해제
    cap.release();

    // 윈도우 창 종료
    destroyAllWindows();

    return 0;
}
