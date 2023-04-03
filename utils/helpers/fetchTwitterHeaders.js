const puppeteer = require("puppeteer");
const { RANDOM_USER_AGENTS } = require("../constants/constants");

const URL = "https://www.twitter.com/";

const getRandomUserAgent = () => {
  const randomIndex = Math.floor(Math.random() * RANDOM_USER_AGENTS.length);
  return RANDOM_USER_AGENTS[randomIndex];
};

const fetchTwitterHeader = async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      `--user-agent=${getRandomUserAgent()}}`,
      // `--proxy-server=${proxy}`,
    ],
  });
  let headers = {};
  try {
    const page = await browser.newPage();
    page.on("request", (req) => {
      if (req.method() !== "GET") return;
      if (req.url().includes("/guide.json")) {
        headers = req.headers();
      }
    });

    // navigate to a page
    await page.goto(URL, { waitUntil: "domcontentloaded" });
    await page.waitForSelector(
      'div[aria-label="Timeline: Explore"]  div[data-testid="cellInnerDiv"]',
      { timeout: 240000 } // 2 minutes
    );
    headers["user-agent"] = getRandomUserAgent();
    return headers;
  } finally {
    console.log("Closing the browser...");
    await browser.close();
  }
};

module.exports = { fetchTwitterHeader };