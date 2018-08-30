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

You can use the following when running a test

| Arguments | Description |
| --------- | ----------- |
| --url | Specifies the URL for which to run the test|
| --filePath | Path to the file that contains a list of URLs to run the test for|
| --stage | Enable DTM stage library |

Examples:

- Specify a unique URL

```
npm test --url=valid_url
```

- Specify path of file that contains list of URLs
```
npm test --filePath=path/to/file.txt
```

- Specify to load DTM staging library
```
npm test --filePath=path/to/file.txt --stage=true
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