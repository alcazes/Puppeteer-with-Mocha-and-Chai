const {
    expect
} = require('chai');
const urlUtil = require('url');

var Utils = function () {};

Utils.prototype.isElementPresent = async function (obj, element) {
    let foundElement = await obj.page.$$(element);
    expect(foundElement).is.not.empty;
}

Utils.prototype.takeScreenshot = async function (obj, isFullPage, fileName) {
    var regex = /^.+\/([^\/].+)\/([^\/].+)\.html$/;
    var group = obj.url.match(regex);
    var imagePath = 'tests/screenshots/' + group[1] + '_--_' + group[2] + '_' + fileName +'.png';
    await obj.page.screenshot({
        path: imagePath,
        fullPage: isFullPage
    });
}

Utils.prototype.isAdobeAnalyticsRequestSent = async function (obj) {
    expect(obj.analyticsRequests).to.have.length.greaterThan(0);
}

Utils.prototype.validateAdobeAnalyticsRequestTotal = async function (obj, total) {
    expect(obj.analyticsRequests.length).to.equal(total);
}

Utils.prototype.lastAdobeAnalyticsRequestContains = async function (obj, param, value) {
    let lastRequest = obj.analyticsRequests[obj.analyticsRequests.length - 1];
    let queries = urlUtil.parse(lastRequest,true).query;
    
    expect(queries).have.property(param);
    expect(queries[param]).to.be.equal(value);
}

module.exports = new Utils();