// import './oaa_a11y_evaluation';
// import './oaa_a11y_rulesets';
// import './oaa_a11y_rules';

"use strict";
var fs = require('fs');
var system = require('system');
var args = system.args;

var writeToFile = system.args[1];

var page = require('webpage').create();
var url = 'http://www.mihirkumar.com';

page.open(url, function(status) {

    page.injectJs('oaa_a11y_evaluation.js');
    page.injectJs('oaa_a11y_rules.js');
    page.injectJs('oaa_a11y_rulesets.js');
    console.log('injected');

    //Required script starts
    var ruleset = OpenAjax.a11y.RulesetManager.getRuleset("ARIA_STRICT");
    var evaluator_factory = OpenAjax.a11y.EvaluatorFactory.newInstance();
    evaluator_factory.setParameter('ruleset', ruleset);
    evaluator_factory.setFeature('eventProcessing', 'fae-util');
    evaluator_factory.setFeature('groups', 7);
    var evaluator = evaluator_factory.newEvaluator();

    //Need to know doc.location.href equivalent of phantomJS
    var evaluation = evaluator.evaluate(doc, page.title, doc.location.href);
    var out = evaluation.toJSON(true);
    //Required script ends

    console.log('line 30');

    var links = page.evaluate(function() {
        var anchorElements = document.getElementsByTagName('a');

        var index = 0;
        var linkArray = Object();
        
        for (i = 0; i < anchorElements.length; i++)
            linkArray[i] = anchorElements[i].getAttribute('href');
        
        return linkArray;
    });

    //Possible optimization by taking care of this in the for loop
    linkArray = links.join('\n');
    console.log('line 38');
    fs.write(writeToFile, linkArray, 'w');
    phantom.exit();
});