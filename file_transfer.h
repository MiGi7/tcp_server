#include <iostream>
#include <string>
#include <fstream>
#include <vector>

#ifndef file_transfer_H
#define file_transfer_H

//class designed for single packages of data sent via tcp
//4095 bytes are sent to reduce data loss
class Packet {
public:
  char buffer[4096];
  int bytes;
  bool end;

  Packet(char buffer[4096], int bytes  bool end=false);
};

class File {
public:
  std::vector<Packet> packets;
  int total_bytes;
  int total_packets;
  const std::string file_name;

  File(std::string filename);

  int pushPacket(Packet packet);

  int fileToBinary();

  int binaryToFile(std::string file_name);
  //bool check();

}

#endif
