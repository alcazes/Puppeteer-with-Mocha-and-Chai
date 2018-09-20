const {
    expect
} = require('chai');

var Launch = function () {};

Launch.prototype.satelliteObjectExist = async function (obj) {
    expect(obj.satelliteHandle).to.exist;
}

module.exports = new Launch();
