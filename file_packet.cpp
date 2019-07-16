#include "file_packet.h"
#include <iostream>
#include <string>
#include <fstream>
#include <vector>
#include <string.h>

Packet::Packet(char buf[4096], int size, bool end){
  for (int counter = 0; counter < size; ++counter){
    buffer[counter] = buf[counter];
  }
  bytes = size;
  end = end;
}

void Packet::printBytes(){
  int counter = 0;
  for (char element : buffer){
    if (this->bytes == counter){
      break;
    }
    ++counter;
    std::cout << element;
  }
}

//need to define function so that a file_name will create the File object containing all packets

/*File::File(std::string file_name, int bytes){
  file_name = file_name;
  total_bytes = bytes;
}*/

File::File(std::string file_name){
  file_name = file_name;
  total_packets = 0;
  total_bytes = this->fileToPackets(file_name);
}

//need to push packet onto the back of the vector array so
//that the end packet is at the back
int File::pushPacket(Packet packet){
  packets.push_back(packet);
  return 1;
}

int File::fileToPackets(const std::string file_name){
  std::ifstream input(file_name, std::ios::binary);
  int byte_num = 0;
  int counter = 0;
  char buffer [4096];
  char byte;
  while(input){
    input.get(byte);
    buffer[counter] = byte;
    ++counter;
    ++byte_num;
    if(counter == 4096){
      this->pushPacket(Packet(buffer, counter, false));
      counter = 0;
      buffer[4096];
      ++this->total_packets;
    }
  }
  this->pushPacket(Packet(buffer, counter - 1, true));
  ++this->total_packets;
  return byte_num - 1;
}

void File::printPackets(){
  for (Packet element : packets){
    element.printBytes();
  }
}
void File::packetsToFile(const std::string file_name){
  std::ofstream file;
  file.open(file_name, std::ios::binary);
  int counter = 0;
  for (Packet element : packets){
    for (char character : element.buffer){
      if (counter == element.bytes){
        counter = 0;
        break;
      }
      file << character;
      ++counter;
    }
  }
  file.close();
}

Packet File::returnPacket(int num){
  if (num >= total_packets){
    std::cout << "The num variable is outside the total packet size" << std::endl;
  }
  return packets[num];
}
