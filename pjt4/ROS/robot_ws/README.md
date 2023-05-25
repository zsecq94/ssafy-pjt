# Git convention

# 🐢부르미🐢

### vSLAM기반 자율주행 서비스 로봇

VSLAM기반 자율주행 서비스 로봇은 실내에서 물건을 전달해주는 수요응답형 서비스 로봇입니다. 로봇은 실내 지도작성, 위치추정, 장애물 회피 기능을 수행합니다. 천장을 보는 카메라를 이용하여 VSLAM을 사용하기에 빠르게 지도작성을 수행하고 초기세팅시간이 짧은 장점이 있습니다. 구체적인 서비스는 호출, 배송, 취소, 대기열 등록이 있습니다.

### Git Convention

`RTOS` `ROS` `FE` `BE`  각각 `워크스페이스` 를 업로드합니다.

```bash
ROS / catkin_ws   <-- workspace 
```

git flow 전략을 사용합니다.

- master : 제품으로 출시될 수 있는 브랜치
- develop : 다음 출시 버전을 개발하는 브랜치
- feature : 기능을 개발하는 브랜치
- release : 이번 출시 버전을 준비하는 브랜치
- hotfix : 출시 버전에서 발생한 버그를 수정 하는 브랜치

```bash
feature/ROS_control
feature/RTOS_motor
feature/FE_test
```

커밋 메시지는 한글로 자유롭게

```bash
git commit -m "문병수 바보"
```
