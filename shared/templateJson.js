const template = require('../shared/template.js');
const dtm = require('../shared/utils/dtm_utils.js');
const launch = require('../shared/utils/launch_utils.js');
const utils = require('../shared/utils/puppeteer_utils.js');
const fs = require('fs');
const {
    expect
} = require('chai');

let utilsMap = new Map([
    ['dtm', dtm],
    ['launch', launch],
    ['utils', utils]
]);

var main = function () {

    let json;

    if(typeof(process.env.npm_config_jsonFile) === 'undefined' || process.env.npm_config_jsonFile == null) {
        throw 'No Json file specified. Make sure to add --jsonFile=path/to/jsonFile while invoking npm';
    }

    let jsonFilePath = process.env.npm_config_jsonFile;

    try {
        json = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
    } catch (ex) {
        console.error(`Unable to read file for path ${jsonFilePath}:` + ex);
    }

    validateJson(json);
    createTests(json);
}

var createTests = function (json) {
    let suites = json.suites;
    suites.forEach(function (suite) {
        let description = suite.description;
        template.makeSuite(description, async function () { 
            let tests = suite.tests;
            tests.forEach(function (test) {
                it(test.name, async function () {
                    let asserts = test.asserts;
                    for(var x in asserts) {
                        let assertion = asserts[x];
                        await runMethod(this, assertion);
                    }
                });
            });
        });
    });
}

var runMethod = async function (obj, assertion) {
    let method = assertion.method;
    let paramsLength = 0;
    let utilsObj = utilsMap.get(assertion.type); 

    if (typeof(assertion.params) !== 'undefined' 
        && (assertion.params instanceof Array) 
        && assertion.params.length > 0 ) {
    
        paramsLength = assertion.params.length;
        let error = `Wrong number of arguments provided for method ${assertion.type}.${method}.`
        methodArgumentsLength = utilsObj[method].length === 0 ? 0 : utilsObj[method].length - 1;
        error +=  ` Expected <${methodArgumentsLength}>, got <${paramsLength}>.`;
        expect(assertion.params.length, error).to.be.eq(methodArgumentsLength);

        let args = new Array(obj);
        let params = assertion.params;
        await utilsObj[method].apply(null, args.concat(params));
    } else {
        await utilsObj[method](obj)
    }
}

var validateJson = function (json) {
    expect(typeof(json) !== 'undefined' && json != null, 'JSON malformed. The JSON provided is either undefined or null').is.true;
    expect(typeof(json.suites) !== 'undefined' && (json.suites instanceof Array) && json.suites.length > 0, 'JSON malformed. The suites element is not configured correctly.').is.true;
    let suites = json.suites;
    suites.forEach(function (suite) {
        expect(typeof(suite.description) !== 'undefined' && suite.description !== null, 'JSON Malformed. Description element is either missing or null.').is.true;
        expect(typeof(suite.tests) !== 'undefined' && (suite.tests instanceof Array) && suite.tests.length > 0, 'JSON malformed. The tests element is either missing or not configured correctly').is.true;
        let tests = suite.tests;
        tests.forEach(function (test) {
            expect(typeof(test.name) !== 'undefined' && test.name !== null
            && typeof(test.asserts) !== 'undefined' && (test.asserts instanceof Array) && test.asserts.length >0, 'JSON malformed. Test malconfigured').is.true;
        
            for(var x in test.asserts) {
                let assertion = test.asserts[x];
                expect(typeof(assertion.type) !== 'undefined' && assertion.type !== null && typeof(assertion.method) !== 'undefined' && assertion.method !== null, 'JSON Malformed. Assertion malconfigured, type of method missing').is.true;
                expect(utilsMap.has(assertion.type), `The assertion type ${assertion.type} is not valid. Valid values are ${Array.from(utilsMap.keys())}`).is.true;
                let utilsObj = utilsMap.get(assertion.type); 
                expect(typeof(utilsObj[assertion.method]) !== "undefined", `The method ${assertion.type}.${assertion.method} does not exist`).is.true;
            }
        });
    });
}

main();
