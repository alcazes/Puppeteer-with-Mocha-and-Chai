# Puppeteer With Mocha

## Summary

This project uses [Puppeteer](https://developers.google.com/web/tools/puppeteer/) to automate the testing of Adobe DTM implementation.

[Mocha](https://mochajs.org/) testing framework is used to run the tests.

[Chai](http://www.chaijs.com/) assertion lirary is used. We are using expect in a BDD format.

The following are tested:

    √ _satellite object exist
    √ DTM is initialized
    √ DTM library name exist
    √ DTM Analytics tool is loaded
    √ DTM Visitor ID services tool is loaded
    √ Userzoom feedback button displayed (also takes a screenshot if UserZoom is present under test/screenshots)

## Requirements

You will need node.js and npm install on your machine.

## Intall 

```
npm install
```
If during the install you get an errorlike `ERROR: Failed to download Chromium`  while downloading chromium then before running `npm install` use the following:

```
npm config set puppeteer_download_host=https://npm.taobao.org/mirrors
npm install
```

## Run test

You can use the following arguments when running a test

| Arguments | Description |
| --------- | ----------- |
| --url | Specifies the URL for which to run the test|
| --filePath | Path to the file that contains a list of URLs to run the test for|
| --stage | Enable DTM stage library |

| npm commands | Description |
| ------------ | ----------- |
| npm test | run all tests under **tests** folder|
| npm run test-template| run specific test suite **example_dtm.js** |
| npm run test-without-template| run specific test suite **DTM.js** |
| npm run test-single .\tests\file.js | run specific test suite|
Examples:

- Specify a unique URL

```
npm test --url=valid_url
```
or
```
npm run test-template --url=valid_url
```
or
```
npm run test-without-template --url=valid_url
```
or
```
npm run test-single .\tests\example_dtm.js --url=valid_url
```

- Specify path of file that contains list of URLs
```
npm run test --filePath=path/to/file.txt
```
or
```
npm run test-template --filePath=path/to/file.txt
```
or
```
npm run test-without-template --filePath=path/to/file.txt
```
or
```
npm run test-single .\tests\example_dtm.js --filePath=path/to/file.txt
```

- Specify to load DTM staging library
```
npm test --filePath=path/to/file.txt --stage=true
```
or
```
npm run test-template --filePath=path/to/file.txt --stage=true
```
or
```
npm run test-without-template --filePath=path/to/file.txt --stage=true
```
or
```
npm run test-single .\tests\example_dtm.js --filePath=path/to/file.txt --stage=true
```

## Test ouputs

### All Success

```
Validate the DTM implementation for URL https://www.example.com
    √ _satellite object exist
    √ DTM is initialized
    √ DTM library name exist
    √ DTM Analytics tool is loaded
    √ DTM Visitor ID services tool is loaded
    √ Userzoom feedback button displayed (315ms)
```

  6 passing (4s)


### With failures

```
Validate the DTM implementation for URL https://www.example.com
    √ _satellite object exist
    √ DTM is initialized
    √ DTM library name exist
    √ DTM Analytics tool is loaded
    √ DTM Visitor ID services tool is loaded
    1) Userzoom feedback button displayed


  5 passing (3s)
  1 failing

  1) Validate the DTM implementation for URL https://www.examle.com
       Userzoom feedback button displayed:
     AssertionError: expected [] not to be empty
      at Context.<anonymous> (test\puppeteer1.js:72:26)
      at <anonymous>
      at process._tickCallback (internal/process/next_tick.js:188:7)



npm ERR! Test failed.  See above for more details.
```

## Screenshots

The test `√ Userzoom feedback button displayed` will take a screentshot and it will be placed inside `test/screenshots`

## Reporting

On top of the logs in the console, am html and json report will be generated under report `mochaawesoome-report`.

## Create tests using template

You can create a suite of tests using a shared template that will initialize puppeteer for you.

You can then create the tests that you want to run.

### Use template

```javascript
//Make sure to load the shared template
const template = require('../shared/template.js');

template.makeSuite('Test suite 1', async function () {
    it('Name of test', async function() {
        //Place your assertion here
    });
});
```

**You can use the puppeteer object by using this. this contains all objects initialized in template.js**

### DTM utils

Several DTM utils have been created to do general DTM assertions

```javascript
//Make sure to load the shared template
const template = require('../shared/template.js');
//Import DTM utils
const dtm = require('../shared/utils/dtm_utils.js');

template.makeSuite('Test suite 1', async function () {
    it('Name of test', async function() {
        await dtm.satelliteObjectExist(this);
    });
});
```

| Utils | Description |Parameters|
| ----- | ----------- | -------- |
|satelliteObjectExist(obj)| Validate that DTM _satellite object exist| Make sure to pass **this** when using `makeSuite` |
|isDtmInitialized(obj)| Validate that DTM _satellite object is initialized| Make sure to pass **this** when using `makeSuite` |
|dtmLibraryNameExist(obj)| Validate that DTM _satellite object has a valid library name| Make sure to pass **this** when using `makeSuite` |
|isAnalyticsToolLoaded(obj)| Validate that DTM loaded Adobe Analytics tool successfully| Make sure to pass **this** when using `makeSuite` |
|isVisitorIDToolLoaded(obj)| Validate that DTM loaded Visitor ID services tool successfully | Make sure to pass **this** when using `makeSuite` |

### Puppeteer Utils

Several Puppeteer utils have been created.

```javascript
//Make sure to load the shared template
const template = require('../shared/template.js');
//Import Puppeteer utils
const utils = require('../shared/utils/puppeteer_utils.js');

template.makeSuite('Test suite 1', async function () {
    it('Name of test', async function() {
        await utils.takeScreenshot(this, false, 'userzoom2')
    });
});
```

| Utils | Description |Parameters|
| ----- | ----------- | -------- |
|isElementPresent(obj,element)| Validate that specific html element exist|use **this** for **obj**. For element specific the html elemen i.e: 'div#uz_ft'|
|takeScreenshot(obj,isFullPage,fileName)| Take a screenshot of the page| use **this** for **obj**. isFullPage indicates if you want to take screenshot of full page. fileName will be the name appended to the final fileName|