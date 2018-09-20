# Create test suites

## Using shared template

A shared template has been created to create test suites.
The shared template will run the test that you define and will provide several objects to be reused out of the box. This is possible using the [Mocha Shared Behaviours](https://github.com/mochajs/mocha/wiki/Shared-Behaviours).

The objects will be create in the `Before` of each test suite. To be able to use the shared objects you will need to use `this.object`. You will notice that all the util methods that are available need the object this to be passed to be able to use them.


| Object | Description |
| ------ | ----------- |
|`this.logs`| The `logs` object contains all logs that are outputed in the devlepoer console using `console.`|
|`this.analyticsRequests`| Contains all Adobe Analytics requests sent|
|`this.browser`| Puppeteer [Browser](https://pptr.dev/#?product=Puppeteer&version=v1.8.0&show=api-class-browser) object|
|`this.page`| Puppeteer [Page](https://pptr.dev/#?product=Puppeteer&version=v1.8.0&show=api-class-page) object|
|`this.satelliteHandle`| Adobe Analytics Tag Manager System object `_satellite`. Both Adobe DTM and Adobe Launch use it|

### Code

To create a test suite you will need to use the following code

```javascript
//Make sure to load the shared template
const template = require('../shared/template.js');

template.makeSuite('Test suite 1', async function () {
    it('Name of test', async function() {
        //Place your assertion here
    });
});
```

### Using utils for assertion

There are 3 types of utils that can be used for assertion:

|Type | Description | How |
| --- | ----------- | --- |
| dtm | Utils to assert Adobe DTM implementation | `const dtm = require('../shared/utils/dtm_utils.js');`  |
| launch | Utils to assert Adobe Launch implmentation | `const launch = require('../shared/utils/launch_utils.js');` |
| puppeteer| Utils to use Puppeteer features (i.e: take a screenshot)|`const utils = require('../shared/utils/puppeteer_utils.js');`|

Example:

```javascript
//Make sure to load the shared template
const template = require('../shared/template.js');
//Load utils
const dtm = require('../shared/utils/dtm_utils.js');
const launch = require('../shared/utils/launch_utils.js');
const utils = require('../shared/utils/puppeteer_utils.js');

template.makeSuite('Test suite 1', async function () {
    it('Name of test', async function() {
        await dtm.satelliteObjectExist(this);
        await launch.satelliteObjectExist(this);
        await utils.isAdobeAnalyticsRequestSent(this);
    });
});
```

### Run test

```
npm run test-single .\tests\file.js --url=https://mywebste.com/page.html
```

## Using JSON file

You can create test suite using a JSON file. Using the JSON file you can create one or more suite, with one or more test. Each test will use an assertion from one of the util. If the JSON file is not configured correctly then the JSON validation will fail before creating the test suites. 

### JSON file structure

```json
{
    "suites": [
        {
            "description": "Description",
            "tests": [
                {
                    "name": "Test name",
                    "asserts": [
                        {
                            "type":"dtm or launch or utils",
                            "method":"method from util",
                            "params":[
                                "Any params other than first one 'this'"
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}
```

| JSON property | Description | Required |
| ------------- | ----------- | -------- |
| `suites` | Array of test suites | Yes |
| `suites[x].description`| Description of the test suite | Yes |
| `suites[x].tests`| Array of tests to be run in a suite | Yes |
| `suites[x].tests[y].name`| Name of the test | Yes |
| `suites[x].tests[y].asserts`| Array of assertion to run for the specific test| Yes |
| `suites[x].tests[y].asserts[i].type` | Type of utils , `dtm` or `launch` or `utils`| Yes |
| `suites[x].tests[y].asserts[i].method` | Name of method to use from util | Yes |
| `suites[x].tests[y].asserts[i].params`| Array of parameters that the method needs. All util methods first param will always be this, so only list params apart from first one| No |

### Run test

```
npm run test-json --jsonFile=tests/jsonFile.json --url=https://mywebsite.com/index.html
```

### Example

Create json file:

```json
{
    "suites": [
        {
            "description": "Validate rule is fired",
            "tests": [
                {
                    "name": "DTM fired rule",
                    "asserts": [
                        {
                            "type":"dtm",
                            "method":"isRuleFired",
                            "params":[
                                "Global"
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}
```
Run test:

```
npm run test-json --jsonFile=tests/jsonFile.json --url=https://mywebsite.com/index.html
```

Test output:
```
Validate rule is fired
    Validate the implementation for URL https://mywebsite.com/index.html
      √ DTM fired rule


  1 passing (6s)
```
