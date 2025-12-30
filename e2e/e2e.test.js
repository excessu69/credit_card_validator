import puppeteer from "puppeteer";
import { fork } from "child_process";

jest.setTimeout(30000);

describe("CardWidget E2E", () => {
  let browser;
  let page;
  let server;
  const baseUrl = "http://localhost:8087";

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox"],
    });

    page = await browser.newPage();
  });

  afterAll(async () => {
    if (browser) await browser.close();
    if (server) server.kill("SIGTERM");
  });

  test("highlight VISA card logo on input", async () => {
    await page.goto(baseUrl);

    await page.type(".card-input", "4111111111111111");

    const active = await page.$$eval(".card-img", (imgs) =>
      imgs
        .filter((img) => img.classList.contains("active"))
        .map((img) => img.dataset.type),
    );

    expect(active).toEqual(["visa"]);
  });

  test("valid number makes input green", async () => {
    await page.goto(baseUrl);

    await page.type(".card-input", "4111111111111111");
    await page.click("#validate");

    const hasValid = await page.$eval(".card-input", (el) =>
      el.classList.contains("valid"),
    );

    expect(hasValid).toBe(true);
  });

  test("invalid number makes input red", async () => {
    await page.goto(baseUrl);

    await page.type(".card-input", "4111111111111112");
    await page.click("#validate");

    const hasInvalid = await page.$eval(".card-input", (el) =>
      el.classList.contains("invalid"),
    );

    expect(hasInvalid).toBe(true);
  });
});
