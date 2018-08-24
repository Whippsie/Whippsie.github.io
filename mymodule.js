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
function executeJava() {
	  //child_process.exec(command[, options][, callback])
      exec('java -jar E:/user/Maude/Desktop/Node/JavaApp.jar '+,
		function (error, stdout, stderr){
			console.log('Output -> ' + stdout);
			if(error !== null){
			console.log("Error -> "+error);
			}
		});
}

exports.executeJava = function(){
	return executeJava();
}