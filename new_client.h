#include <iostream>
#include <sys/types.h>
#include <sys/socket.h>
#include <netdb.h>
#include <arpa/inet.h>
#include <unistd.h>
#include <string.h>
#include <string>

#ifndef new_client_H
#define new_client_H

class Client{
public:
  int sock = socket(AF_INET, SOCK_STREAM, 0);
  sockaddr_in hint;
  int port;
  std::string ip_address;
  int connectRes;

  Client(std::string ip_address, int port);


};

#endif
