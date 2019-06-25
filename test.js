const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();


    await page.goto('https://coengadvisors.net');

    await page.type('#email', 'rea-test-1@coengadvisors.com');
    await page.type('#password', 'rea-test');

    await page.click('#submit');

    await page.waitForNavigation();

    console.log('New Page URL:', page.url());

     console.log("end");

  })();
