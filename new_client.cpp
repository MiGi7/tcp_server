#include "new_client.h"
#include <iostream>
#include <sys/types.h>
#include <sys/socket.h>
#include <netdb.h>
#include <arpa/inet.h>
#include <unistd.h>
#include <string.h>
#include <string>
#include "file_packet.h"
#include "file_packet.cpp"

Client::Client(std::string ip_address, int port){
  ip_address = ip_address;
  port = port;
  hint.sin_family = AF_INET;
  hint.sin_port = htons(port);
  inet_pton(AF_INET, ip_address.c_str(), &hint.sin_addr);
}

//connect the client to the host. Returns one for success and
//0 for failure
int Client::clientConnect(){
  int connectRes = connect (sock, (sockaddr*)&hint, sizeof(hint));
  if (connectRes == -1){
    std::cout << "Connection Failed" << std::endl;
    exit(1);
    return 0;
  } else {
    std::cout << "Connection Established" << std::endl;
    return 1;
  }
}

int Client::sendFile(File file){
  char data_buf[25];
  char buf[4096];
  //char bytes[15] = itoa(file.total_bytes);
  //char total_packets[10] = itoa(file.total_packets);
  int counter = 0;
  int buf_counter = 0;
  int packets = file.total_packets;
  while(true){
    if (packets >= counter){
      std::cout << "All file packets have been sent" << std::endl;
      break;
    }
    for (char element : file.returnPacket(counter).buffer){
      buf[buf_counter] = element;
      ++buf_counter;
    }
    buf_counter = 0;
    int sendRes = send(sock, buf, 4096+1, 0);
    memset(buf, 0, 4096);
  }
  return 0;
}

int main(int argc, char *argv[]){
  const std::string ip_address = argv[1];
  const std::string string_port = argv[2];
  File file("README.md");
  int port = std::stoi(string_port);
  Client pi(ip_address, port);
  std::cout << pi.clientConnect() << std::endl;
  pi.sendFile(file);
  return 0;
}
