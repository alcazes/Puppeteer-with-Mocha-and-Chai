# Test Utils

Several modules can be imported to take advantage of assertion utils that have been created for Adobe DTM, Adobe Launch and Puppeteer.

| Test type | Required | Advised | Reason |
| --------- | -------- | ------- | ------ |
| Test using the shared template | No | Yes | When you use the shared template you define each test `it` that needs to be ran. While it is not required for you to use the utils, it is strongly advised to use them is one exist for what you want to do. Using the shared template option allows you to create your own test definition using custom as well |
| Test using the JSON file template| Yes| Yes | Using the JSON file template you are required to use the utils as it is not possible to specify any custom code |

## Utils

### DTM

You can use DTM utils that contain assertion about the Adobe DTM implementation on the web page. 

You can use this util by referencing the specific module:

Using the shared-template:
```javascript
//Make sure to load the shared template
const template = require('../shared/template.js');
//Load utils
const dtm = require('../shared/utils/dtm_utils.js');

template.makeSuite('Test suite 1', async function () {
    it('Name of test', async function() {
        await dtm.satelliteObjectExist(this);
    });
});
```
Using the JSON template:
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
                            "type":"dtm",
                            "method":"satelliteObjectExist"
                        }
                    ]
                }
            ]
        }
    ]
}
```

DTM utils contain the following methods that you can use:
| Utils | Description |Parameters|
| ----- | ----------- | -------- |
|`satelliteObjectExist(obj)`| Validate that DTM _satellite object exist| Make sure to pass **this** when using `makeSuite`, no parameters needs to be specified when using JSON template |
|`isDtmInitialized(obj)`| Validate that DTM _satellite object is initialized| Make sure to pass **this** when using `makeSuite`,  no parameters needs to be specified when using JSON template|
|`dtmLibraryNameExist(obj)`| Validate that DTM _satellite object has a valid library name| Make sure to pass **this** when using `makeSuite`, no parameters needs to be specified when using JSON template |
|`isAnalyticsToolLoaded(obj)`| Validate that DTM loaded Adobe Analytics tool successfully| Make sure to pass **this** when using `makeSuite`, no parameters needs to be specified when using JSON template |
|`isVisitorIDToolLoaded(obj)`| Validate that DTM loaded Visitor ID services tool successfully | Make sure to pass **this** when using `makeSuite`, no parameters needs to be specified when using JSON template |
|`isRuleFired(obj, ruleName)`| Validate that DTM fire the specified rule | Make sure to pass **this** when using `makeSuite` for obj, no parameters needs to be specified when using JSON template. ruleName should be the name of the rule that you can find in DTM |

---

### Launch

You can use Launch utils that contain assertion about the Adobe Launch implementation on the web page. 

You can use this util by referencing the specific module:

Using the shared-template:
```javascript
//Make sure to load the shared template
const template = require('../shared/template.js');
//Load utils
const launch = require('../shared/utils/launch_utils.js');

template.makeSuite('Test suite 1', async function () {
    it('Name of test', async function() {
        await launch.satelliteObjectExist(this);
    });
});
```
Using the JSON template:
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
                            "type":"launch",
                            "method":"satelliteObjectExist"
                        }
                    ]
                }
            ]
        }
    ]
}
```

Launch utils contain the following methods that you can use:
| Utils | Description |Parameters|
| ----- | ----------- | -------- |
|`satelliteObjectExist(obj)`| Validate that Launch _satellite object exist| Make sure to pass **this** when using `makeSuite`, no parameters needs to be specified when using JSON template |

---

### Puppeteer utils

You can use Puppeteer utils that contain assertion and utils methods about the Puppeteer.

You can use this util by referencing the specific module:

Using the shared-template:
```javascript
//Make sure to load the shared template
const template = require('../shared/template.js');
//Load utils
const utils = require('../shared/utils/puppeteer_utils.js');

template.makeSuite('Test suite 1', async function () {
    it('Name of test', async function() {
        await utils.isAdobeAnalyticsRequestSent(this);
    });
});
```
Using the JSON template:
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
                            "type":"utils",
                            "method":"isAdobeAnalyticsRequestSent"
                        }
                    ]
                }
            ]
        }
    ]
}
```

Puppeteer utils contain the following methods that you can use:
| Utils | Description |Parameters|
| ----- | ----------- | -------- |
|`isElementPresent(obj,element)`| Validate that specific html element exist|use **this** for **obj**, , no parameters needs to be specified when using JSON template. For element specific the html elemen i.e: 'div#uz_ft'|
|`takeScreenshot(obj,isFullPage,fileName)`| Take a screenshot of the page| use **this** for **obj**, , no parameters needs to be specified when using JSON template. isFullPage indicates if you want to take screenshot of full page. fileName will be the name appended to the final fileName|
|`isAdobeAnalyticsRequestSent(obj)`|Validate that at least one Adobe Analytics request was sent| use **this** for **obj**, , no parameters needs to be specified when using JSON template. |
|`validateAdobeAnalyticsRequestTotal(obj, total)`| Validate that the number of Adobe Analytics request sent in equal to the total|use **this** for **obj**, , no parameters needs to be specified when using JSON template. Total should be the total number of requests that you expect|
|`lastAdobeAnalyticsRequestContains(obj, param, value)`| Validatet that last Adobe Analytics request contains the specified param value pair|use **this** for **obj**, , no parameters needs to be specified when using JSON template. param should be the name of the param. value should be the value for the param|
