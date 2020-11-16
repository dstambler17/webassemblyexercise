#include "emscripten.h"

int main(int argc, char const *argv[]) {
    emscripten_run_script("typeof window!='undefined' && window.dispatchEvent(new CustomEvent('wasmLoaded'))");
    return 0;
}

extern "C" {

    EMSCRIPTEN_KEEPALIVE
	char* reverse(char* str, int strSize) {  
	  int l, i; 
	    char *begin_ptr, *end_ptr, ch; 
	  
	  
	    // Set the begin_ptr and end_ptr 
	    // initially to start of string 
	    begin_ptr = str; 
	    end_ptr = str; 
	  
	    // Move the end_ptr to the last character 
	    for (i = 0; i < strSize - 1; i++) 
	        end_ptr++; 
	  
	    // Swap the char from start and end 
	    // index using begin_ptr and end_ptr 
	    for (i = 0; i < strSize / 2; i++) { 
	  
	        // swap character 
	        ch = *end_ptr; 
	        *end_ptr = *begin_ptr; 
	        *begin_ptr = ch; 
	  
	        // update pointers positions 
	        begin_ptr++; 
	        end_ptr--; 
	    } 
	    return str;
	}
}