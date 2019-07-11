#include <iostream>
#include <sys/types.h>
#include <sys/socket.h>
#include <netdb.h>
#include <arpa/inet.h>
#include <unistd.h>
#include <string.h>
#include <string>


int main(){
  //Create a socket
  int listening = socket(AF_INET, SOCK_STREAM, 0);
  if (listening == -1){
    std::cerr << "Did not create the socket~!";
    return -1;
  }

  //bind the socket to a ip and port
  sockaddr_in hint;
  hint.sin_family = AF_INET;
  hint.sin_port = htons(8080); //port is here
  inet_pton(AF_INET, "192.168.0.67", (sockaddr*)&hint.sin_addr); //connects a number to an array of integers.

  if (bind(listening, (sockaddr*)&hint, sizeof(hint)) == -1){
    std::cerr << "Cannot bind to IP/Port";
    return -2;
  }
  //Make the socket listen
  std::cout << "Listening for Client" << std::endl;
  if (listen(listening, SOMAXCONN) == -1){
    std::cerr << "Cannot listen";
    return -3;
  }

  //receive and send data
  sockaddr_in client;
  socklen_t clientSize;
  char host[NI_MAXHOST];
  char svc[NI_MAXSERV];

  int clientSocket = accept(listening, (sockaddr*)&client, &clientSize);

  if (clientSocket == -1){
    std::cerr << "Problem with the client connecting";
  }

  close(listening);

  memset(host, 0, NI_MAXHOST);
  memset(svc, 0, NI_MAXSERV);

  int result = getnameinfo((sockaddr*)&client, sizeof(client), host, NI_MAXHOST, svc, NI_MAXSERV, 0);

  if (result){
    std::cout << "Host Connected (can get name)" << std::endl;
  } else {
    inet_ntop(AF_INET, &client.sin_addr, host, NI_MAXHOST);
    std::cout << "Connected (cannot get name)" << std::endl;
  }

  char buf[4096];
  while (true){
    //Clear buffer
    memset(buf, 0, 4096);
    //wait for message
    int bytesRecv = recv(clientSocket, buf, 4096, 0);
    if (bytesRecv == -1) {
      std::cerr << "There was a connection issue";
      break;
    }
    if (bytesRecv == 0 ){
      std::cout << "The client disconnected";
      break;
    }
    std::cout << "Received: " << (buf, 0, bytesRecv) << std::endl;

    send(clientSocket, buf, bytesRecv + 1, 0);
  }
  close(clientSocket);

  //close the socket
  return 0;
}
