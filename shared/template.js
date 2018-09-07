const puppeteer = require('puppeteer');
const {
    expect
} = require('chai');
const fs = require('fs');

var Template = function () {};

Template.prototype.makeSuite = function (name, tests) {
    let urls = [];
    let stage = process.env.npm_config_stage;

    if ((typeof process.env.npm_config_url === 'undefined' || process.env.npm_config_url == null) && (typeof process.env.npm_config_filePath == 'undefined' || process.env.npm_config_filePath == null)) {
        throw 'No url specified. Make sure to add --url=value or/and --filePath=file/to/path.txt while invoking npm'
    }

    if (typeof process.env.npm_config_filePath !== 'undefined' && process.env.npm_config_filePath !== null) {
        var path = process.env.npm_config_filePath;
        try {
            urls = fs.readFileSync(path).toString().split("\n");
        } catch (ex) {
            console.error(`Unable to read file for path ${path}:` + ex);
        }
    }

    if (typeof process.env.npm_config_url !== 'undefined' && process.env.npm_config_url !== null) {
        urls.push(process.env.npm_config_url);
    }

    urls.forEach(function (url) {
        url = url.trim();

        describe(name, async function () {
            describe(`Validate the implementation for URL ${url}`, async function () {
                before(async function () {
                    this.logs = [];
                    this.analyticsRequests = [];
                    this.browser = await puppeteer.launch();
                    this.page = await this.browser.newPage();
                    await this.page.setRequestInterception(true);
                    this.page.on('request', interceptedRequest => {
                        //Adobe Analytics request
                        if(interceptedRequest.url().includes('b/ss')) {
                            this.analyticsRequests.push(interceptedRequest.url());
                        }
                        interceptedRequest.continue();
                    });
                    // Enable debug logging of DTM
                    // Enable stage library
                    this.page.evaluateOnNewDocument(function () {
                        window.localStorage.setItem("sdsat_debug", true);
                        if (typeof process.env.npm_config_stage !== 'undefined' && process.env.npm_config_stage !== null && process.env.npm_config_stage === 'true') {
                            window.localStorage.setItem("sdsat_stagingLibrary", true);
                        }
                    });
                    // Capture all logs in console
                    this.page.on('console', msg => {
                        this.logs.push(msg.text());
                    });
                    // Navidate to page
                    await this.page.goto(url, {
                        waitUntil: 'networkidle2'
                    });
                    // Get _satellite object details
                    this.satelliteHandle = await this.page.evaluateHandle(() => window._satellite);
                    this.url = url;
                });

                tests();

                after(async function () {
                    await this.satelliteHandle.dispose();
                    await this.page.close();
                    await this.browser.close();
                });
            });
        });
    });
}

module.exports = new Template();