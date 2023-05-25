
// #include <iostream>
// #include <fcntl.h>
// #include <unistd.h>
// #include <linux/i2c-dev.h>
// #include <sys/ioctl.h>
// #include <cstdlib>
// #include <cstring>
// #include <chrono>
// #include <thread>

// #define I2C_DEVICE "/dev/i2c-2" // Jetson Nano의 I2C 디바이스 파일
// #define STM32_I2C_ADDR 0x60 // 예시로 사용하는 STM32의 I2C 주소 (실제 주소로 변경 필요)

// using namespace std;

// int main() {
//     // I2C 디바이스 파일 열기
//     int i2c_file = open(I2C_DEVICE, O_RDWR);
//     if (i2c_file < 0) {
//         perror("Failed to open I2C device");
//         return 1;
//     }

//     // I2C 통신 대상 주소 설정
//     if (ioctl(i2c_file, I2C_SLAVE, STM32_I2C_ADDR) < 0) {
//         perror("Failed to set I2C_SLAVE address");

//         close(i2c_file);
//         return 1;
//     }

//     // 여기에서 데이터 전송 및 수신 코드를 작성하세요.
//     const char data_to_send[] = "hello this is moon!\n\r"; // 전송할 데이터
//     while(1){
//         if (write(i2c_file, data_to_send, sizeof(data_to_send)) != sizeof(data_to_send)) {
//             perror("Failed to write to the i2c device");      
//         }
//         // 데이터 수신 예시
//         char received_data[10]; // 수신한 데이터를 저장할 버퍼
//         if (read(i2c_file, received_data, sizeof(received_data)) != sizeof(received_data)) {
//             perror("Failed to read from the i2c device");
//         } else {
//             std::cout << "Received data: "; 
//             for (int i = 0; i < sizeof(received_data); ++i) {
//                 std::cout << static_cast<int>(received_data[i]) << " ";
//             }
//             std::cout << std::endl;
//         }
//         this_thread::sleep_for(chrono::seconds(1));
//     }   
//     // I2C 디바이스 파일 닫기
//     close(i2c_file);
//     return 0;
// }

#include <iostream>
#include <fcntl.h>
#include <unistd.h>
#include <linux/i2c-dev.h>
#include <sys/ioctl.h>
#include <cstdlib>
#include <cstring>
#include <thread>
#include <atomic>
#include <chrono>

using namespace std;

#define I2C_DEVICE "/dev/i2c-1"
#define STM32_I2C_ADDR 0x42

atomic<bool> running;

void i2c_receive_thread(int i2c_file) {
    char received_data[30];

    while (running) {
        int read_result = read(i2c_file, received_data, sizeof(received_data)/sizeof(char));
        if (read_result != sizeof(received_data)) {
            perror("Failed to read from the i2c device");
        } else {
            cout << "Received data: ";
            for (int i = 0; i < sizeof(received_data); ++i) {
                cout << static_cast<int>(received_data[i]) << " ";
            }
            cout << endl;
        }

        this_thread::sleep_for(chrono::milliseconds(100));
    }
}

int main() {
    int i2c_file = open(I2C_DEVICE, O_RDWR);
    if (i2c_file < 0) {
        perror("Failed to open I2C device");
        return 1;
        
    }

    if (ioctl(i2c_file, I2C_SLAVE, STM32_I2C_ADDR) < 0) {
        perror("Failed to set I2C_SLAVE address");
        close(i2c_file);
        return 1;
    }
    char buffer[30] = "hello this is moon\r\n";
    running = true;
    write(i2c_file, buffer, sizeof(buffer)/ sizeof(char));
    if (write(i2c_file, buffer, sizeof(buffer)/ sizeof(char))) {
        perror("Failed to write to the i2c device");      
    }
    thread receive_thread(i2c_receive_thread, i2c_file);

    // 메인 스레드에서 다른 작업을 수행할 수 있습니다.
    // 예시로 10초 동안 수신 대기하고 종료하는 코드를 작성해 보겠습니다.
    this_thread::sleep_for(chrono::seconds(10));

    running = false;
    receive_thread.join();

    close(i2c_file);
    return 0;
}
