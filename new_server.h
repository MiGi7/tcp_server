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

#ifndef new_server_H
#define new_server_H

class Server{
public:
  int listening = socket(AF_INET, SOCK_STREAM, 0);
  sockaddr_in hint;
  int port;
  std::string ip_address;

};

#endif
