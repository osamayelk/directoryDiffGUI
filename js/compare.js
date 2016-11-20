const {ipcRenderer} = require('electron')
var fs = require('fs');
var jsdiff = require('diff');
require('colors')
ipcRenderer.on('data', (event, arg) => {
	var content1 = fs.readFileSync(arg[1]+arg[0],'utf8');
    var content2 = fs.readFileSync(arg[2]+arg[0],'utf8');
    		var difference = jsdiff.diffWordsWithSpace(content1, content2);
    		fragment = document.createDocumentFragment();
    		difference.forEach(function(part){
    		// green for additions, red for deletions 
    		// grey for common parts 
    		// if (part.removed) {
    		// 	var temp = part.value;
    		// 	arrayofLines = temp.split(/\r|\n/);
    		// 	arrayofLines.forEach(function(value) {
    		// 		if (/\S/.test(value)) {
    		// 		$("tbody").append("<tr><td class=\"removed\">"+ value + "</td><td>")
    		// 		} else {
    		// 		$("tbody").append("<tr><td>"+ "&nbsp;" + "</td><td>")
    		// 		}
    		// 	});
    		// } else if(part.added) {
    		// 	var temp = part.value;
    		// 	arrayofLines = temp.split(/\r|\n/);
    		// 	arrayofLines.forEach(function(value) {
    		// 		if (/\S/.test(value)) {
    		// 		$("tbody").append("<tr><td class=\"added\">"+ value + "</td><td>")
    		// 	} else {
    		// 		$("tbody").append("<tr><td>"+ "&nbsp;" + "</td><td>")
    		// 	}
    		// 	});
    		// } else {
    		// 	var temp = part.value;
    		// 	arrayofLines = temp.split(/\r|\n/);
    		// 	arrayofLines.forEach(function(value) {
    		// 		if (/\S/.test(value)) {
    		// 		$("tbody").append("<tr><td class=\"normal\">"+ value + "</td><td>")
    		// 	} else {
    		// 		$("tbody").append("<tr><td>"+ "&nbsp;" + "</td><td>")
    		// 	}
    		// 	});
    		// }
    		 color = part.added ? 'green' :
    		 part.removed ? 'red' : 'grey';
    		 span = document.createElement('span');
    		 span.style.color = color;
    		 span.appendChild(document.createTextNode(part.value));
    		 fragment.appendChild(span);
    		// var color = part.added ? 'green' :
    		// part.removed ? 'red' : 'grey';
    		// process.stderr.write(part.value[color]);
});
    		 $("#display").append(fragment);	
})