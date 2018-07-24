function addRadioBool(parsedValues){
	var category = "";
	var flag = 0;
	for (var i = 0; i < parsedValues.length ; i++){
		if (flag){
			category = parsedValues[i];
			$("div_camera").after("<div id='div_" + category + " class='div_radio'> <h3> " + category + "</h3> </div>");
			flag = 0;
			break;
		}
		if (parsedValues[i] == "class"){
			flag = 1;
			break;
		}
		var id = "radio_"+parsedValues[i];
		$("#mods").after("<div class='radio' id='"+id+"'>"+parsedValues[i]+ "<br>");
		//$("#"+id).append("<br>");
		//Create 2 buttons for every option (T/F)
		for (var j = 0 ; j < 2 ; j++){
			var radioInput = document.createElement('input');
			var text = document.createElement('label');
			text.innerHTML = j%2 ? 'False' : 'True';
			radioInput.setAttribute('type', 'radio');
			radioInput.setAttribute('class', category);
			radioInput.setAttribute('name', parsedValues[i]); 
			radioInput.setAttribute('id', parsedValues[i]+j);
			radioInput.setAttribute('value', text.innerHTML);
			var temp = id;
			if (parsedValues[i].indexOf('/') !== -1){
				temp = id.replace('/','\\/');
			}
			$("#"+temp).append(text);
			$("#"+temp).append(radioInput);
		}
		$("#mods").after("</div>");
		$("#mods").after("<br>");
	}
	$("#mods").after("<br>");
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