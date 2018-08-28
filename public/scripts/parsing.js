
function parsetoROS(filename){
	var ros = '<launch> \n \t <arg name="veh" default="$(env VEHICLE_NAME)"/> \n ';
	//For demos, using a master file
	ros += '\t <include file="$(find duckietown_demos)/launch/master.launch"> \n ';
	$('input:radio:checked').each(function() {
		ros += '\t \t <arg name="'+jQuery(this).attr('name') + '" value="' + jQuery(this).attr('value')+'" /> \n';
	});
	ros += '\t </include>';
	ros += '\n </launch>';
	//alert(ros);
	console.log(ros);
	writeTextFile(filename+".launch", ros, 'ros');
}


function dictToJava(args){
	//var javatext="";
	resetAll();
	for (var key in args){
		var currCategory = findCategory(key);
		//if (javatext.indexOf("public class " + currCategory) == -1){
			//javatext += "public class " + currCategory + " { \n";
		//}
		if (args.hasOwnProperty(key)) {
			//var flag_name = key.slice(getParamPos + dict[launchfile].length);
			var flag_name = key;
			//Remove this for now, we want to keep the /
			//if (flag_name.charAt(0) == "/"){
				//flag_name = flag_name.substr(1);
			//}
			var value = args[key];
			//javatext += " \t private boolean " + flag_name + " = " + value + " ;\n";
			updateUISingle(currCategory, flag_name, value);
		}
	}
	//javatext += "}";
	//writeTextFile(launchfile+"FromROS.java", javatext, 'java');
	//console.log(javatext);
	//return javatext;
}

function findCategory(arg){
	for (var key in dict){
		if (arg.includes(dict[key]) || dict[key].includes(arg)){
			return key;
		}
	}
	return null;
}

var launchfile
function rosToDict(data){
	data = data.replace(new RegExp("\"/>", 'g'), "\" />");
	//var temp = loadFile(filepath);
	var res = data.split("\n");
	
	//Get the demo name of the launch file
	launchfile = res[0];
	var launchtab = launchfile.split(" ");
	launchfile = launchtab[1];
	
	//Dictionnaire avec key = nom de l'argument et value = true ou false selon la vrai valeur
	var args = {};
	for (var i = 0; i<res.length;i++){
		if (res[i].indexOf('<arg')!== -1){
			var split = res[i].split(" ");
			var arg_name = "";
			for (var j = 0; j<split.length;j++){
				if (split[j].indexOf('name=')!== -1){
					arg_name = split[j].slice(6,split[j].length-1);
				}
				if (arg_name == "veh"){
					continue;
				}
				if (split[j].indexOf('value=')!== -1){
					var arg_val = split[j].slice(7,split[j].length-1);
					args[arg_name]= arg_val;
					arg_name = "";
				}

			}
		}
	}
	return args;
}

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
		
		//TODO : Verifier si boolean, en ce moment suppose que ca l'est
		/*
		if (res[i] == "public"){
			if (res[i+1] == "class"){
				name[j] = "class";
				j++;
				name[j] = res[i+2];
				j++; 
			}
		} else if (res[i] == "private" && res[i+1] == "boolean"){
			//For now only checks variables
			//For now only supports boolean type
			name[j] = res[i+2];
			j++;
		}
		*/
	}
	return args;
}

function preparedataDict (data){
	var name = {};
	var j = 0;
	data = data.replace(/\n/g,'');
	data = data.replace(/\t/g, ' ');
	var res = data.split(" ");
	for (var i = 0; i<res.length;i++){
		//For now only checks variables
		if (res[i] == "public"){
			if (res[i+1] == "class"){
				name[i] = res[i+2];
			}
		}
		if (res[i] == "private"){
			//For now only supports boolean type
			if (res[i+1] == "boolean"){
				if (res[i+3] != '='){
					name[j] = res[i+2];
				}else{
					name[res[i+2]]=res[i+4];
				}
				j++;

			}
		}
	}
	return name;
}