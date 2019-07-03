#include <fstream>
#include <string>
#include <iostream>
#include <iterator>
#include <vector>
#include <string>

int main(int argc, char *argv[]){
  const std::string file_name = argv[1];


      std::ifstream input(file_name, std::ios::binary);
      char buffer [4096];
      int i = 0;
      while(input){
        char c;
        input.get(c);
        buffer[i] = c;
        ++i;
        if (i == 4096){
          break;
        }
      }
      int k = 0;
     for (char x : buffer){
          std::cout << x;
          ++k;
          if (k == i){
            break;
          }
      }
}
