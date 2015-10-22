var app = require('../server.js');
var Promise = require('bluebird');

var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
var expect = require('chai').expect;

// var test = require('selenium-webdriver/testing');
var webdriver = require('selenium-webdriver'),
  By = webdriver.By,
  until = webdriver.until;

var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

after(function() {
  return driver.quit();
});

describe('app', function() {
  this.timeout(10000);
  var server;
  beforeEach(function() {
    server = app.listen(3002);
    driver.get('http://localhost:3002/');
  });

  afterEach(function() {
    server.close();
  });

  it('has a nice title', function() {
    return driver.getTitle().then(function(title) {
      return expect(title).to.equal('nice title');
    });
  });
  it('has a main div', function() {
    return driver.findElement(By.id('main')).then(function(maindiv) {
      return expect(maindiv.getInnerHtml()).to.eventually.equal('some text');
    });
  });
});
