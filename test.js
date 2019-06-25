const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();


        page = await browser.newPage();
        await page.goto('https://coengadvisors.net', {waitUntil: 'load'});
        await page.type('input[id=email]', 'rea-test-1@coengadvisors.com', {delay: 20});
        await page.type('input[id=password]', 'rea-test', {delay: 20});
        await page.$eval( '', form => form.click() );

    const newPage = await page.evaluate(() => {

        return  document.body.innerHTML;

        });

     console.log(page);
     console.log("end");

  })();
