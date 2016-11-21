const {dialog} = require('electron').remote;
var dircompare = require('dir-compare');
var options = {compareSize: true};
const {ipcRenderer} = require('electron');
var path = require('path');
var fs = require('fs');
var file1,file2;
var excludeList = "";
var compareTwoDirectories = function(file1,file2,options) {
	var res = dircompare.compareSync(file1, file2, options);
	$("tbody").empty()
	res.diffSet.forEach(function (entry) {
    if (entry.state == "left" || entry.state == "right" || entry.state == "distinct") {
    	if (entry.state == "left") {
    		$("#left").append("<tr><td class=\"missing\">" + entry.relativePath + "/" + entry.name1 + "</td></tr>")
    		$("#right").append("<tr><td>" + "&nbsp;" + "</td></tr>")
    	} else if (entry.state == "right") {
    		$("#left").append("<tr><td>" + "&nbsp;" + "</td></tr>")
    		$("#right").append("<tr><td class=\"missing\">" +  entry.relativePath + "/" + entry.name2 + "</td></tr>")
    	} else {
    		$("#left").append("<tr><td class=\"distinct\">" +  entry.relativePath + "/" + entry.name1 + "</td></tr>")
    		$("#right").append("<tr ><td class=\"distinct\">" +  entry.relativePath + "/" + entry.name2 + "</td></tr>")
    	}
    }
});
}
var excludeItems = function(isDirectory) {
	var Fproperties;
	if (isDirectory) {
		Fproperties = ['openDirectory','multiSelections','showHiddenFiles'];
	} else {
		Fproperties = ['openFile','multiSelections','showHiddenFiles']
	}
	fileList = dialog.showOpenDialog({properties:Fproperties,defaultPath:file1})
	fileList.forEach(function(pathf, index,array){
		array[index] = path.basename(pathf);
	})
	if(excludeList == "") {
	excludeList = excludeList + fileList.join(',');
} else {
	excludeList = excludeList + "," + fileList.join(',');
}
	options = {compareSize: true, excludeFilter:excludeList}
	compareTwoDirectories(file1,file2,options)
}
$(function(){
$("#openDirectory").click(function(){
	file1 = dialog.showOpenDialog({properties: ['openDirectory']})[0]
	file2 = dialog.showOpenDialog({properties: ['openDirectory']})[0]
// 	if (excludeList == "") {
// 	excludeList = excludeList + "node_modules,logs,mqttStore,.git,.gitignore"
// } else {
// 	excludeList = excludeList + ",node_modules,logs,mqttStore,.git,.gitignore"
// }
	var options = {compareSize: true,excludeFilter:excludeList};
	compareTwoDirectories(file1,file2,options)
});
$("#excludeF").click(function(){
	excludeItems(false)
});
$("#excludeD").click(function(){
	excludeItems(true)
});
$("#gitignore").click(function(){
	var gitIgnoreContent = fs.readFileSync(file1 + "/.gitignore",'utf8');
	gitIgnoreContent = gitIgnoreContent.replace(/#.+|^\r|^\n|^\s*$/g,'');
	gitIgnoreContent = gitIgnoreContent.replace(/\s+/g,',');
	if (gitIgnoreContent.indexOf(',') == 0) {
		excludeList = excludeList + gitIgnoreContent;
} else {
	excludeList = excludeList + ',' + gitIgnoreContent;
}
var options = {compareSize:true, excludeFilter:excludeList};
compareTwoDirectories(file1,file2,options)
})
$("tbody").on('dblclick', '.distinct', function(){ 
          ipcRenderer.send('asynchronous-message',['show-comparison',$(this).html(),file1,file2]);
}); 
});
