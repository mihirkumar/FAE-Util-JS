var page = require('webpage').create();
var url = 'http://mihirkumar.com';

page.open(url, function(status) {
    page.includeJs("https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js", function() {
        console.log(page.evaluate(function() {
            return $('a')
                .map(function() {
                    return this.href;})
                .get();
                .join();
        }));
        phantom.exit()
    });
});