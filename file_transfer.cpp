#include "file_transfer.h"
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
File::File(std::string file_name){
  file_name = file_name;
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
    if(counter == 4095){
      this->pushPacket(Packet(buffer, counter, false));
      counter = 0;
      buffer[4096];
    }
  }
  this->pushPacket(Packet(buffer, counter - 1, true));
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

int main(int argc, char *argv[]){
  const std::string file_name = argv[1];
  File a_file(file_name);
  //a_file.printPackets();
  const std::string new_name = argv[2];
  a_file.packetsToFile(new_name);
  //char array[4096] = {'a', 'b', 'c'};
  //Packet p(array, 3, false);
  //p.printBytes();
  //std::cout << a_file.total_bytes << std::endl;
  return 1;
}
