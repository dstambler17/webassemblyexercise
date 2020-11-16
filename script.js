

function loadWebAssembly(fileName, imports = {}) {
  return fetch(fileName)
    .then(response => response.arrayBuffer())
    .then(buffer => WebAssembly.compile(buffer))
    .then((module) => {
		imports.env = imports.env || {}
	      Object.assign(imports.env, {
		    memoryBase: 0,
		    tableBase: 0,
		    memory: new WebAssembly.Memory({
		        initial: 0,
		    }),
		    table: new WebAssembly.Table({
		        initial: 0,
		        maximum: 0,
		        element: 'anyfunc',
		    }),
		    _log: Math.log,
			})
	      	console.log(imports)
	      	const memory = new WebAssembly.Memory({ initial: 1 });
    		return new WebAssembly.instantiate(module) });
		};
  
loadWebAssembly('fib.wasm')
  .then(instance => {
    fib = instance.exports._Z3fibi;
    console.log('Finished compiling FIB WebAssembly! Function ready to use!');
  });


loadWebAssembly('reverseTwo.wasm').then(instance => {
	console.log(instance)
	 linearMemory = instance.exports.memory;
	console.log(linearMemory)
	// create a buffer starting at the reference to the exported string
	instance_exp = instance.exports //_Z7reversePc;
})


//Allows strings to be returned from C++
function utf8ToString(h, p) {
  let s = "";
  for (i = p; h[i]; i++) {
    s += String.fromCharCode(h[i]);
  }
  return s;
}


//HELPFUL LINKS:
//https://stackoverflow.com/questions/41353389/how-can-i-return-a-javascript-string-from-a-webassembly-function
//https://stackoverflow.com/questions/47529643/how-to-return-a-string-or-similar-from-rust-in-webassembly


 //Get input string and display reverse
 //Also need to do some byte work with the string/pointer input 
 async function get_reverse_string(){
 	const input_text = document.getElementById('inp').value
 	if (input_text.length < 1) {
 		alert('no input')
 		return
 	}
 	const encoder = new TextEncoder()
	const view = encoder.encode(input_text.split(''))
	console.log(view)
	const stringBuffer = new Uint8Array(linearMemory.buffer, instance_exp._Z7reversePKc(view),
	  8);

	stringBuffer[0] = view

	console.log(stringBuffer)
	console.log(stringBuffer)

	// create a string from this buffer
	let str = '';
	for (let i=0; i<stringBuffer.length; i++) {
	  str += String.fromCharCode(stringBuffer[i]);
	}

	console.log(str);

 	//res = reverse()
 	
 }

