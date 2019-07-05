#include <iostream>
#include <sys/types.h>
#include <sys/socket.h>
#include <netdb.h>
#include <arpa/inet.h>
#include <unistd.h>
#include <string.h>
#include <string>


class Client{
  int sock = socket(AF_INET, SOCK_STREAM, 0);
  int port;
  std::string ip_address;

};
