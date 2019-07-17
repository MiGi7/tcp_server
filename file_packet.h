#include <iostream>
#include <string>
#include <fstream>
#include <vector>

#ifndef file_packet_H
#define file_packet_H

//class designed for single packages of data sent via tcp
//4095 bytes are sent to reduce data loss
class Packet {
public:
  char buffer[4096];
  int bytes;
  bool end;

  Packet(char buf[4096], int bytes, bool end=false);

  void printBytes();
};

class File {
public:
  std::vector<Packet> packets;
  int total_bytes;
  int total_packets;
  const std::string file_name;
  File(std::string file_name, int bytes);
  File(std::string filename);

  void pushPacket(Packet packet);

  int fileToPackets(std::string file_name);

  void packetsToFile(std::string file_name);
  //bool check();
  void printPackets();

  Packet returnPacket(int num);
};

#endif
