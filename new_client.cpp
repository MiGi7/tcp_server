#include "new_client.h"
#include <iostream>
#include <sys/types.h>
#include <sys/socket.h>
#include <netdb.h>
#include <arpa/inet.h>
#include <unistd.h>
#include <string.h>
#include <string>

Client::Client(std::string ip_address, int port){
  ip_address = ip_address;
  port = port;
  hint.sin_family = AF_INET;
  hint.sin_port = htons(port);
  inet_pton(AF_INET, ip_address.c_str(), &hint.sin_addr);
  connectRes = connect(sock, (sockaddr*)&hint, sizeof(hint));
  if (connectRes == -1){
    std::cout << "Connection Failed" << std::endl;
  } else {
    std::cout << "Connection Established" << std::endl;
  }
}

int main(int argc, char *argv[]){
  const std::string ip_address = argv[1];
  const std::string string_port = argv[2];
  int port = std::stoi(string_port);
  Client pi(ip_address, port);
}
