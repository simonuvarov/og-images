import edgeChromium from 'chrome-aws-lambda';
import puppeteer from 'puppeteer-core';
import fs from 'fs/promises';
import { SCALE_FACTOR } from './constants';

const LOCAL_CHROME_EXECUTABLE =
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

interface ScreenShotRequest {
  url: string;
  timeout?: number;
}

interface ScreenShotResponse {
  screenshot: string;
  title: string;
  domain: string;
}

async function makeScreenshot({
  url,
  timeout,
}: ScreenShotRequest): Promise<ScreenShotResponse> {
  // Edge executable will return an empty string locally.
  const executablePath =
    (await edgeChromium.executablePath) || LOCAL_CHROME_EXECUTABLE;

  const browser = await puppeteer.launch({
    executablePath,
    args: edgeChromium.args,
    headless: false,
  });

  const page = await browser.newPage();
  await page.setViewport({
    width: 1200,
    height: 900,
    deviceScaleFactor: SCALE_FACTOR,
  });
  await page.goto(url);
  await page.waitForTimeout(timeout ? timeout : 0);

  // Capture screenshot as a binary buffer
  const screenshot = (await page.screenshot({
    type: 'png',
    encoding: 'base64',
  })) as string;

  const title = await page.title();
  const domain = new URL(url).hostname;

  await browser.close();

  return { screenshot, title, domain };
}

async function readFontFile(
  filename: string,
  baseUrl = '../public/assets/fonts'
): Promise<Buffer> {
  const url = new URL(`${baseUrl}/${filename}`, import.meta.url);
  return fs.readFile(url);
}

export { makeScreenshot, readFontFile };
