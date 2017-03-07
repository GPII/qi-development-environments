"use strict";

var assert = require("assert"),
    AxeBuilder = require("axe-webdriverjs"),
    webdriver = require("selenium-webdriver"),
    until = webdriver.until,
    chrome = require('selenium-webdriver/chrome'),
    path = require('chromedriver').path;

// Required to avoid chromedriver PATH issues.
var service = new chrome.ServiceBuilder(path).build();
chrome.setDefaultService(service);

describe("Accessibility audit", function () {
    // Mocha's default timeout of 2000 ms tends not to accommodate the fetching of remote
    // content, increasing it to a comfortable limit.
    this.timeout(15000);

    var driver;

    beforeEach("Launch a new browser window before each test", function (done) {
        driver = new webdriver.Builder()
            .forBrowser('chrome')
            .build();

        done();
    });

    afterEach("Close previously launched browser window after each test", function (done) {
        driver.quit().then(function () {
            done();
        });
    });

    it('returns violations for a bad example', function (done) {
        driver.get("https://www.w3.org/WAI/demos/bad/before/home.html");
        driver.wait(until.titleIs("Welcome to CityLights! [Inaccessible Home Page]"), 10000)
            .then(function () {
                AxeBuilder(driver)
                    .analyze(function (results) {
                        assert.notEqual(results.violations.length, 0);
                        done();
                    })
            });
    });

    it('returns no violations for a good example', function (done) {
        driver.get("https://www.w3.org/WAI/demos/bad/after/home.html");
        driver.wait(until.titleIs("Welcome to CityLights! [Accessible Home Page]"), 10000)
            .then(function () {
                AxeBuilder(driver)
                    .analyze(function (results) {
                        assert.equal(results.violations.length, 0);
                        done();
                    })
            });
    });
});
