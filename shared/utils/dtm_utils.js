const {
    expect
} = require('chai');

var DTM = function () {};

DTM.prototype.satelliteObjectExist = async function (obj) {
    expect(obj.satelliteHandle).to.exist;
}

DTM.prototype.isDtmInitialized = async function (obj) {
    let initialized = await obj.page.evaluate(x => x.initialized, obj.satelliteHandle);
    expect(initialized).is.true;
}

DTM.prototype.dtmLibraryNameExist = async function (obj) {
    let settings = await obj.page.evaluate(x => x.settings, obj.satelliteHandle);

    expect(settings).to.exist;
    expect(settings.libraryName).to.not.be.null;
}

DTM.prototype.isAnalyticsToolLoaded = async function (obj) {
    expect(obj.logs.includes('SATELLITE: Adobe Analytics: set variables.'), 'DTM did not set Adobe Analytics variables').to.be.true;
    expect(obj.logs.includes('SATELLITE: Adobe Analytics: loaded.'), 'DTM failed to load Adobe Analytics tool').to.be.true;
}

DTM.prototype.isVisitorIDToolLoaded = async function (obj) {
    let regexCreate = /^SATELLITE: Visitor ID: Create instance using mcOrgId:.+$/;
    let  regexVariables = /^SATELLITE: Visitor ID: Set variables:.+$/;
    let instanceLog = obj.logs.filter(log => log.match(regexCreate));
    var variablesLog = obj.logs.filter(log => log.match(regexVariables));

    expect(obj.logs.includes('SATELLITE: Visitor ID: Initializing tool')).to.be.true;
    expect(instanceLog).to.have.length.greaterThan(0);
    expect(variablesLog).to.have.length.greaterThan(0);
}

module.exports = new DTM();
