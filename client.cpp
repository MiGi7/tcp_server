#include <iostream>
#include <sys/types.h>
#include <sys/socket.h>
#include <netdb.h>
#include <arpa/inet.h>
#include <unistd.h>
#include <string.h>
#include <string>



int main() {

  //Create a socket

  int sock = socket(AF_INET, SOCK_STREAM, 0);
  if (sock == -1){
    return -1;
  }

  int port = 8080;
  std::string ipAddress = "192.168.0.67";

  sockaddr_in hint;
  hint.sin_family = AF_INET;
  hint.sin_port = htons(port);
  inet_pton(AF_INET, ipAddress.c_str(), &hint.sin_addr);

  int connectRes = connect (sock, (sockaddr*)&hint, sizeof(hint));


  if (connectRes == -1){
    std::cout << "Could not send data" << std::endl;
    return -1;
  }

  char buf[4096];
  std::string userInput;

  do {
    std::cout << "> ";
    getline(std::cin, userInput);

    int sendRes = send (sock, userInput.c_str(), userInput.size() + 1, 0);
    memset(buf, 0, 4096);
    int bytesRecv = recv(sock, buf, 4096, 0);
    std::cout << "Server" << std::string(buf, bytesRecv) << std::endl;

  } while (true);

    close(sock);

  return 0;

}
