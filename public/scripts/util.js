
function preparedata (data){
	var args = {};
	var k = 0;
	//data = data.replace(/\n/g,'');
	//Replace tabulation by no space
	data = data.replace(/\t/g, '');
	//data = data.replace(/\s+/g, ' ').trim();
	//Split each line
	var res = data.split("\n");
	for (var i = 0; i<res.length;i++){
		//resplit to get name and value
		var argParts = res[i].split(" ");
		for (var j = 0; j<argParts.length;j++){
			//removes the non T/F arguments
			if (argParts[j].includes("name=") && (argParts[j+1].includes("true")||argParts[j+1].includes("false"))){
				//Format to get the argument name
				var argName = argParts[j].replace(/"/g,'');
				argName = argName.replace('name=','');
				
				var argCategory = findCategory(argName)
				if (argCategory === null){
					argCategory = "Undefined";
				}
				if (args[argCategory] == null){
					args[argCategory] = [];
				}
				args[argCategory].push (argName);
				
				
			}

			
		}
	}
	return args;
}


function findCategory(arg){
	for (var key in dict){
		if (arg.includes(dict[key]) || dict[key].includes(arg)){
			return key;
		}
	}
	return null;
}