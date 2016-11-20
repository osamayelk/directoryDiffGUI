const {dialog} = require('electron').remote
var dircompare = require('dir-compare');
var options = {compareSize: true};
var utils = require('util')
$(function(){
$(".btn").click(function(){
	file1 = dialog.showOpenDialog({properties: ['openDirectory']})
	file2 = dialog.showOpenDialog({properties: ['openDirectory']})
	var options = {compareSize: true,excludeFilter:"node_modules,logs,mqttStore,.git,.gitignore"};
	var res = dircompare.compareSync(file1[0], file2[0], options);
	$("tbody").empty()
	res.diffSet.forEach(function (entry) {
    if (entry.state == "left" || entry.state == "right" || entry.state == "distinct") {
    	if (entry.state == "left") {
    		$("#left").append("<tr><td class=\"missing\">" + entry.name1 + "</td></tr>")
    		$("#right").append("<tr><td>" + "&nbsp;" + "</td></tr>")
    	} else if (entry.state == "right") {
    		$("#left").append("<tr><td>" + "&nbsp;" + "</td></tr>")
    		$("#right").append("<tr><td class=\"missing\">" + entry.name2 + "</td></tr>")
    	} else {
    		$("#left").append("<tr><td class=\"distinct\">" + entry.name1 + "</td></tr>")
    		$("#right").append("<tr ><td class=\"distinct\">" + entry.name2 + "</td></tr>")
    	}
    }
});
})
$(document).on('click', '.distinct', function(){ 

}); 
});
