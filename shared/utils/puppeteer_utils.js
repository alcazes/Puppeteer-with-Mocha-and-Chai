const {
    expect
} = require('chai');

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

module.exports = new Utils();