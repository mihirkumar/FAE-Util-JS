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
        var linkArray = Object();
        
        for (i = 0; i < anchorElements.length; i++)
            linkArray[i] = anchorElements[i].getAttribute('href');
        
        return linkArray;
    });

    //Possible optimization by taking care of this in the for loop, old implementation
    // linkArray = links.join('\n');
    //    page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js", function(){
    //  console.log(links.serializeArray());
    // });

    fs.write(writeToFile, JSON.stringify(links), 'w');
    phantom.exit();
});