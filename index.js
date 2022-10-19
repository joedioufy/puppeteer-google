const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

const [email = 'joejoe@gmail.com', password = 'xxxxx'] = process.argv.slice(2);
const urlPage = 'https://accounts.google.com/';

(async () => {
    puppeteer.use(StealthPlugin());
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.setExtraHTTPHeaders({
        'accept-language': 'en-US,en;q=0.9,hy;q=0.8'
    });
    await page.goto(urlPage);
    await page.waitForSelector('input[type="email"]')
    await page.type('input[type="email"]', email);
    await Promise.all([
        page.waitForNavigation(),
        await page.keyboard.press('Enter')
    ]);

    await page.waitForSelector('input[type="password"]', {visible: true});
    await page.type('input[type="password"]', password);
    await Promise.all([
        page.waitForFunction(() => location.href === 'https://google.com/'),
        await page.keyboard.press('Enter')
    ]);

    await page.waitForNavigation()
    await page.screenshot({path: screenshot})
    await browser.close()
    console.log('Voir mon screenshot: ' + screenshot)
})()