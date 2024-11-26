const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After, setDefaultTimeout } = require("cucumber");
const { putText, getText, clickElement } = require("../../lib/commands.js");
setDefaultTimeout(70000);

Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("user is on {string} page", async function (string) {
  return await this.page.goto(`https://qamid.tmweb.ru${string}`, {
    setTimeout: 60000,
  });
});

When("user selects two tickets", async function () {
  //"user selects the Witcher movie for today at 20.00 places 8/5,8/6"
  await clickElement(this.page, ".page-nav__day.page-nav__day_today.page-nav__day_chosen");  
  await clickElement(this.page, ".movie-seances__time[href='#'][data-seance-id='223']");
  await this.page.waitForSelector("h2");
  await clickElement(this.page, "div:nth-child(8) span:nth-child(6)");
  await clickElement(this.page, "div:nth-child(8) span:nth-child(5)");
  return await clickElement(this.page, ".acceptin-button");
});

Then("user sees the booked two tickets {string}", async function (string) {
  const actual = await getText(this.page, "body main p:nth-child(2)");  
  const expected = await string;
  expect(actual).contains(expected);  
});




When("user selects five tickets", async function () {
  //"user selects the Mickey Mouse movie for the day after tomorrow at 11.00, places 1/6,1/7,1/8,1/9,1/10"
  await clickElement(this.page, "a:nth-child(3)");  
  await clickElement(this.page, ".movie-seances__time[href='#'][data-seance-id='198']");
  await this.page.waitForSelector("h2");
  await clickElement(this.page, "div[class='buying-scheme__wrapper'] div:nth-child(1) span:nth-child(6)");
  await clickElement(this.page, "div[class='buying-scheme__wrapper'] div:nth-child(1) span:nth-child(10)");
  await clickElement(this.page, "div[class='buying-scheme__wrapper'] div:nth-child(1) span:nth-child(7)");
  await clickElement(this.page, "div[class='buying-scheme__wrapper'] div:nth-child(1) span:nth-child(8)");
  await clickElement(this.page, "div[class='buying-scheme__wrapper'] div:nth-child(1) span:nth-child(9)");
  return await clickElement(this.page, ".acceptin-button");
});

Then("user sees the booked five tickets {string}", async function (string) {
  const actual = await getText(this.page, "body main p:nth-child(2)");  
  const expected = await string;
  expect(actual).contains(expected);  
});



When("user selects an already occupied place", async function () {
  //"user selects the Stalker movie for the end of the week at 13.00, places 1/8"
  await clickElement(this.page, "a:nth-child(7)");  
  await clickElement(this.page, ".movie-seances__time[href='#'][data-seance-id='217']");
  await this.page.waitForSelector("h2");
  return await clickElement(this.page, ".buying-scheme__chair.buying-scheme__chair_standart.buying-scheme__chair_taken");
});

Then("user sees that the booking button is not active {string}", async function (string) {
  const actual = await this.page.$eval('button.acceptin-button[disabled]', button => button !== null); 
  const expected = await string;
  return 'actual';
  expect(actual).contains(expected);  
});
