const puppeteer = require('puppeteer');
let browser, page;
describe('Form in error state', () => {
    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false,
            launch: {},
            browserContext: 'default',
            exitOnPageError: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-background-timer-throttling', '--disable-backgrounding-occluded-windows', '--disable-renderer-backgrounding']
        });

        page = await browser.newPage();
        await page.goto('https://angular-6-registration-login-example.stackblitz.io/register');

    }, 15000);

    it('Form should show an error', async () => {
        await expect(await page.waitForSelector(".container .btn-primary"));
        await page.click(".container .btn-primary");
        await expect(await page.waitForSelector(".container h2"));
        await page.screenshot({path: 'screenshot.png'});
    }, 15000);

    it('Form should show 4 errors, invalid-feedback', async () => {
        await expect(await page.waitForSelector(".container .invalid-feedback"));
        const errors = await page.evaluate(() => document.getElementsByClassName('invalid-feedback').length);
        expect(errors).toBe(4);
    }, 15000);


    it('Form should show error of password', async () => {
        await page.type(".container input[ng-reflect-name='firstName']", "a");
        await page.type(".container input[ng-reflect-name='lastName']", "a");
        await page.type(".container input[ng-reflect-name='username']", "a");
        await page.type(".container input[ng-reflect-name='password']", "a");
        await page.click(".container .btn-primary");
        const error = await page.evaluate(() => document.querySelector('.invalid-feedback div').innerHTML);
        expect(error).toBe('Password must be at least 6 characters');
    }, 15000);

});
