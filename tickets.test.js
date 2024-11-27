const { clickElement, putText, getText } = require("./lib/commands.js");
//const { generateName } = require("./lib/util.js");

const { expect } = require("chai");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://qamid.tmweb.ru/client/index.php");
  await page.setDefaultNavigationTimeout(0);
});

afterEach(() => {
  page.close();
});

describe("booking tickets tests", () => {

  test("Booking a ticket for today, happy path", async () => {
    const expected = "Ряд/Место: 8/5, 8/6";
    await clickElement(page, ".page-nav__day.page-nav__day_today.page-nav__day_chosen");
    await clickElement(page, ".movie-seances__time[href='#'][data-seance-id='223']");
    await page.waitForSelector("h2");
    await clickElement(page, "div:nth-child(8) span:nth-child(6)");
    await clickElement(page, "div:nth-child(8) span:nth-child(5)");
    await clickElement(page, ".acceptin-button");
    const actual = await getText(page, "body main p:nth-child(2)");    
    expect(actual).contains(expected);
  });  

  test("Booking a ticket for Monday, happy path", async () => {
    const expected = "Ряд/Место: 1/6, 1/7, 1/8, 1/9, 1/10";
    await clickElement(page, "a:nth-child(3)");
    await clickElement(page, ".movie-seances__time[href='#'][data-seance-id='198']");
    await page.waitForSelector("h2");
    await clickElement(page, "div[class='buying-scheme__wrapper'] div:nth-child(1) span:nth-child(6)");
    await clickElement(page, "div[class='buying-scheme__wrapper'] div:nth-child(1) span:nth-child(10)");
    await clickElement(page, "div[class='buying-scheme__wrapper'] div:nth-child(1) span:nth-child(7)");
    await clickElement(page, "div[class='buying-scheme__wrapper'] div:nth-child(1) span:nth-child(8)");
    await clickElement(page, "div[class='buying-scheme__wrapper'] div:nth-child(1) span:nth-child(9)");
    await clickElement(page, ".acceptin-button");
    const actual = await getText(page, "body main p:nth-child(2)");    
    expect(actual).contains(expected);
  });  

  test("Choosing an occupied place, sad path", async () => {
    const expected = true;
    await clickElement(page, "a:nth-child(7)");
    await clickElement(page, ".movie-seances__time[href='#'][data-seance-id='217']");
    await page.waitForSelector("h2");
    await clickElement(page, "div[class='buying-scheme__wrapper'] div:nth-child(1) span:nth-child(1)");
    await clickElement(page, ".acceptin-button");
    await clickElement(page, ".acceptin-button");

    await page.goto("https://qamid.tmweb.ru/client/index.php");
    await clickElement(page, "a:nth-child(7)");
    await clickElement(page, ".movie-seances__time[href='#'][data-seance-id='217']");
    await page.waitForSelector("h2");
    await clickElement(page, "div[class='buying-scheme__wrapper'] div:nth-child(1) span:nth-child(1)");
    const actual = await page.$eval('button.acceptin-button[disabled]', button => button !== null);   
    expect(actual).equal(expected);
  });
});
