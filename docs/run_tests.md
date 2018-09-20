## Run test

Please find the arguments that can be used when running the tests.

| Arguments | Description | Required |
| --------- | ----------- | -------- |
| --url | Specifies the URL for which to run the test| Yes | 
| --filePath | Path to the file that contains a list of URLs to run the test for| Yes |
| --stage | Enable DTM stage library | No |
| --jsonFile | Path to the Json file that contains the test configuration. Should only be used when using `npm run test-json` | Yes if using `npm run test-json` |

---

Use one of the following commands to run tests:

| npm commands | Description | Required Arguments | Example |
| ------------ | ----------- | ------------------ | ------- |
| `npm test` | run all tests under **tests** folder| `--url` or/and `--filePath` | `npm test --url=valid_url` |
| `npm run test-template` | Run test suite file **example_dtm.js** | `--url` or/and `--filePath` | `npm run test-template --url=valid_url`|
| `npm run test-without-template` | Run test suite file **DTM.js** | `--url` or/and `--filePath`  | `npm run test-without-template --url=valid_url `|
| `npm run test-single .\tests\file.js` | Run specific test suite file| `--url` or/and `--filePath` and `--jsonFile`  | `npm run test-json --jsonFile=tests/jsonFile.json --url=valid_url`|

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
