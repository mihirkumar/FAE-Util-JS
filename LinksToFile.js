var fs = require('fs');
var system = require('system');
var args = system.args;

var writeToFile = system.args[1];

var page = require('webpage').create();
var url = 'http://www.mihirkumar.com';

page.open(url, function(status) {

    var links = page.evaluate(function() {
        var anchorElements = document.getElementsByTagName('a');

        var index = 0;
        var linkArray = Array();
        
        for (i = 0; i < anchorElements.length; i++)
            linkArray.push(anchorElements[i].getAttribute('href'));
        
        return linkArray;
    });

    //Possible optimization by taking care of this in the for loop
    linkArray = links.join('\n');

    fs.write(writeToFile, linkArray, 'w');
    phantom.exit();
});