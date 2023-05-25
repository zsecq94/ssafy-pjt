
import cv2

# 웹캠 연결
// cv2.CAP_V4L2 사용으로 지연율 감소
cap = cv2.VideoCapture(0,cv2.CAP_V4L2)

# 웹캠 해상도 변경
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

while True:
    # 프레임 읽기
    ret, frame = cap.read()

    # 프레임이 제대로 읽혔는지 확인
    if not ret:
        print("Error: failed to capture frame")
        break

    # 프레임 출력
    cv2.imshow('frame', frame)

    # q 키를 누르면 종료
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# 리소스 해제
cap.release()
cv2.destroyAllWindows()
