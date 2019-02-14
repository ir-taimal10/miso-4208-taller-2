const puppeteer = require('puppeteer');
let browser, page;
describe('Form in normal state', () => {
    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false,
            launch: {},
            browserContext: 'default',
            exitOnPageError: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-background-timer-throttling', '--disable-backgrounding-occluded-windows', '--disable-renderer-backgrounding']
        });

        page = await browser.newPage();

        await page.goto('https://angular-6-registration-login-example.stackblitz.io/login');
        await page.screenshot({path: 'screenshot.png'});
    }, 15000);

    it('Form should load without error', async () => {
        await expect(await page.waitForSelector(".container h2"));
        const text = await page.evaluate(() => document.body.textContent);
        expect(text).toContain('Login');
        expect(text).toContain('Angular 6 User Registration and Login Example & Tutorial');
    }, 15000);

    it('Form should have a username field', async () => {
        await expect(await page.waitForSelector(".container input[ng-reflect-name='username']"));
    }, 15000);
    it('Form should have a password field', async () => {
        await expect(await page.waitForSelector(".container input[ng-reflect-name='password']"));
    }, 15000);

    it('Form should have a ok button field', async () => {
        await expect(await page.waitForSelector(".container .btn-primary"));
    }, 15000);

    it('Form should have a Cancel button field', async () => {
        await expect(await page.waitForSelector(".container .btn-link"));
    }, 15000);

    it('Form should show Login error', async () => {
        await page.type(".container input[ng-reflect-name='username']", "admin");
        await page.type(".container input[ng-reflect-name='password']", "admin123");
        await page.click(".container .btn-primary");
        await expect(await page.waitForSelector(".container .alert-danger"));
        const result = await page.evaluate(() => document.querySelector('.container .alert-danger').innerHTML);
        expect(result).toContain('Username or password is incorrect');
    }, 15000);

});
