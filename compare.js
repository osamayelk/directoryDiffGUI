var dircompare = require('dir-compare');
var options = {compareSize: true,excludeFilter:"node_modules,logs,mqttStore,.git,.gitignore"};
var path1 = '/home/osama/Work/Smart Locker/LockController';
var path2 = '/home/osama/Desktop/lockController';
dircompare.compare(path1, path2, options).then(function(res){;
console.log('equal: ' + res.equal);
console.log('distinct: ' + res.distinct);
console.log('left: ' + res.left);
console.log('right: ' + res.right);
console.log('differences: ' + res.differences);
console.log('same: ' + res.same);
console.log('distinct directories ' + res.distinctDirs);
var format = require('util').format;
res.diffSet.forEach(function (entry) {
	if(entry.type1 == "directory"){
		console.log(entry.name1);
	}
    // if (entry.state == "left" || entry.state == "right" || entry.state == "distinct") {
    // 	console.log(entry.name1 + " " + entry.state);
    // }
});
});