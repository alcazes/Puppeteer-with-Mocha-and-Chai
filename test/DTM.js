const puppeteer = require('puppeteer');
const {expect} = require('chai');
const fs = require('fs');

let urls = [];
let stage = process.env.npm_config_stage;

if ((typeof process.env.npm_config_url === 'undefined' || process.env.npm_config_url == null) && (typeof process.env.npm_config_filePath == 'undefined' || process.env.npm_config_filePath == null)) {
	throw 'No url specified. Make sure to add --url=value or/and --filePath=file/to/path.txt while invoking npm' 
}

if(typeof process.env.npm_config_filePath !== 'undefined' && process.env.npm_config_filePath !== null) {
	var path = process.env.npm_config_filePath;
	try {
		urls = fs.readFileSync(path).toString().split("\n");
	} catch (ex) {
		console.error(`Unable to read file for path ${path}:` + ex );
	}
}

if (typeof process.env.npm_config_url !== 'undefined' && process.env.npm_config_url !== null ) {
	urls.push(process.env.npm_config_url);
}

urls.forEach(function(url) {
	url = url.trim();
	describe(`Validate the DTM implementation for URL ${url}`, async function () {
		// Defone Global Variables
		let browser;
		let page;
		let logs = [];
		let satelliteHandle, initialized, settings;

		before(async function () {
			browser = await puppeteer.launch();
			page = await browser.newPage();
			// Enable debug logging of DTM
			// Enable stage library
			page.evaluateOnNewDocument(function() {
				window.localStorage.setItem("sdsat_debug", true);
				if (typeof process.env.npm_config_stage !== 'undefined' && process.env.npm_config_stage !== null && process.env.npm_config_stage === 'true' ) {
					window.localStorage.setItem("sdsat_stagingLibrary", true);
				}
				
			});
			// Capture all logs in console
			page.on('console', msg => {
				logs.push(msg.text());
			})
			// Navidate to page
			await page.goto(url, {waitUntil: 'networkidle2'});
			// Get _satellite object details
			satelliteHandle = await page.evaluateHandle( () => window._satellite);
			initialized = await page.evaluate(obj => obj.initialized, satelliteHandle);
			settings = await page.evaluate( obj => obj.settings, satelliteHandle);
		});

		it('_satellite object exist', async function() {
			expect(satelliteHandle).to.exist;
		});

		it('DTM is initialized', async function() {
			expect(initialized).is.true;
		});

		it('DTM library name exist', async function() {
			expect(settings).to.exist;
			expect(settings.libraryName).to.not.be.null;
		});

		it('DTM Analytics tool is loaded', async function() {
			expect(logs.includes('SATELLITE: Adobe Analytics: set variables.'), 'DTM did not set Adobe Analytics variables').to.be.true;
			expect(logs.includes('SATELLITE: Adobe Analytics: loaded.'), 'DTM failed to load Adobe Analytics tool').to.be.true;
		});

		it('DTM Visitor ID services tool is loaded', async function() {
			const regexCreate = /^SATELLITE: Visitor ID: Create instance using mcOrgId:.+$/;
			const regexVariables = /^SATELLITE: Visitor ID: Set variables:.+$/;
			var instanceLog = logs.filter(log => log.match(regexCreate));
			var variablesLog = logs.filter(log => log.match(regexVariables));
			
			expect(logs.includes('SATELLITE: Visitor ID: Initializing tool')).to.be.true;
			expect(instanceLog).to.have.length.greaterThan(0);
			expect(variablesLog).to.have.length.greaterThan(0);
		});

		it('Userzoom feedback button displayed', async function () {
			var userZoom = await page.$$('div#uz_ft');
			var regex = /^.+\/([^\/].+)\/([^\/].+)\.html$/;
			var group = url.match(regex);
			var imagePath = 'test/screenshots/' + group[1] + '_--_' + group[2] + '_userZoom.png';
			await page.screenshot({path: imagePath });

			expect(userZoom).is.not.empty;
		});

		after(async function() {
			await satelliteHandle.dispose();
			await page.close();	
			await browser.close();
		})
	});
});