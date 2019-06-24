#include "file_transfer.h"
#include <iostream>
#include <string>
#include <fstream>
#include <vector>

Packet::Packet(char buffer[4096], int bytes, bool end){
  buffer[4096] = buffer;
  bytes = bytes;
  end = end;
}

//need to define function so that a file_name will create the File object containing all packets
File::File(std::string file_name){
  file_name = file_name;

}

//need to push packet onto the back of the vector array so
//that the end packet is at the back
int File::pushPacket(Packet packet){
  packets.push_back(packet);
  return 1;
}

int fileToBinary(std::string file_name){

}
