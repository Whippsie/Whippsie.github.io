function addRadioBool(parsedValues){
	var category = "";
	var flag = 0;
	var first = 1;
	var htmlAdd = "";
	for (var i = 0; i < parsedValues.length ; i++){
		if (flag){
			category = parsedValues[i];
			if (!first){
				htmlAdd += "</div>";
			}
			first = 0;
			htmlAdd += "<div id='div_" + category + "' class='div_radio'> <h3> " + category + " </h3>";
			flag = 0;
			continue;
		}
		if (parsedValues[i] == "class"){
			flag = 1;
			continue;
		}
		var id = "radio_"+parsedValues[i];
		htmlAdd += "<div class='radio' id='"+id+"'>"+parsedValues[i]+ "<br>";
		//$("#"+id).append("<br>");
		//Create 2 buttons for every option (T/F)
		for (var j = 0 ; j < 2 ; j++){
			var text = document.createElement('label');
			text.innerHTML = j%2 ? 'False' : 'True';
			htmlAdd += "<input type='radio' name='" + parsedValues[i]+"' value='"+text.innerHTML+"' id='"+(parsedValues[i]+j)+"' class='"+category+"' >"+ text.innerHTML + "<br>";
  
			//var radioInput = document.createElement('input');
			
			//radioInput.setAttribute('type', 'radio');
			//radioInput.setAttribute('class', category);
			//radioInput.setAttribute('name', parsedValues[i]); 
			//radioInput.setAttribute('id', parsedValues[i]+j);
			//radioInput.setAttribute('value', text.innerHTML);
			var temp = id;
			if (parsedValues[i].indexOf('/') !== -1){
				temp = id.replace('/','\\/');
			}
			//TODO : Need to change this for static text, because the div doesn't exist yet
			//$("#"+temp).append(text);
			//$("#"+temp).append(radioInput);
		}
		htmlAdd += "<br></div>";
		//$("#mods").after("</div>");
		//$("#mods").after("<br>");
	}
	htmlAdd += "<br>";
	$("#title").after(htmlAdd);
	$("#confirm").before("<br>");
}
var dict = {"Camera":"/camera/"}

function updateUI(javaDict){
	//Remove hardcode
	$('input:radio.Camera').each(function() {
		jQuery(this).prop("checked", false);
		//Si le radio appartient au dictionnaire et qu'on a la bonne valeur T/F présente dans le java, on le check
		if (jQuery(this).attr('name') in javaDict && jQuery(this).attr('value') == javaDict[jQuery(this).attr('name')]){
			jQuery(this).prop("checked", true).trigger("click");
		}
	});
}