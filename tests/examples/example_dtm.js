const template = require('../../shared/template.js');
const dtm = require('../../shared/utils/dtm_utils.js');
const utils = require('../../shared/utils/puppeteer_utils.js');

template.makeSuite('Test suite 1', async function () {
    it('_satellite object exist', async function() {
        await dtm.satelliteObjectExist(this);
    });

    it('DTM is initialized', async function() {
        await dtm.isDtmInitialized(this);
    });

    it('DTM library name exist', async function() {
        await dtm.dtmLibraryNameExist(this);
    });

    it('DTM Analytics tool is loaded', async function() {
        await dtm.isAnalyticsToolLoaded(this);
    });

    it('DTM Visitor ID services tool is loaded', async function() {
        await dtm.isVisitorIDToolLoaded(this);
    });

    it('Userzoom feedback button displayed', async function () {
        await utils.takeScreenshot(this, false, 'userzoom2')
        await utils.isElementPresent(this, 'div#uz_ft');
    });

    it('Rul Global - Tag helper fired', async function () {
        await dtm.isRuleFired(this, 'Global - Tag helper');
    });

    it('Adobe Analytics request sent', async function () {
        await utils.isAdobeAnalyticsRequestSent(this);
    });

    it('Only one Adobe Analytics request sent', async function () {
        await utils.validateAdobeAnalyticsRequestTotal(this, 1);
    });

    it('Last Adobe Analytics request contains param AQE set to 1', async function () {
        await utils.lastAdobeAnalyticsRequestContains(this, 'AQE', '1');
    });

});
