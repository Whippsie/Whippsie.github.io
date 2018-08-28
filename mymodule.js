/*
var exec = require('child_process').exec;
var child = exec('java -jar E:/user/Maude/Desktop/Node/JavaApp.jar',
  function (error, stdout, stderr){
    console.log('Output -> ' + stdout);
    if(error !== null){
      console.log("Error -> "+error);
    }
});
 
module.exports = child;
*/
var exec = require('child_process').exec;
function executeJava(location,file) {
	  //child_process.exec(command[, options][, callback])
      //exec('java -jar E:/NeonWorks/canard.jar '+ "input/demo.launch",
	  exec('java -jar '+ location + ' ' + file + '.launch ' + file + '_GMF.canard',
		function (error, stdout, stderr){
			console.log('Output -> ' + stdout);
			if(error !== null){
			console.log("Error -> "+error);
			}
		});
}

exports.executeJava = function(location,file){
	return executeJava(location,file);
}