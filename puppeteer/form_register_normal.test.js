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
        await page.goto('https://angular-6-registration-login-example.stackblitz.io/register');
        await page.screenshot({path: 'screenshot.png'});
    }, 15000);

    it('Form should load without error', async () => {
        await expect(await page.waitForSelector(".container h2"));
        const text = await page.evaluate(() => document.body.textContent);
        expect(text).toContain('Register');
        expect(text).toContain('Angular 6 User Registration and Login Example & Tutorial');
    }, 15000);

    it('Form should have a title', async () => {
        await expect(page.title()).resolves.toMatch('');
        await expect(await page.waitForSelector(".container h2"));
    }, 15000);

    it('Form should have a firstName field', async () => {
        await expect(await page.waitForSelector(".container input[ng-reflect-name='firstName']"));
    }, 15000);

    it('Form should have a lastName field', async () => {
        await expect(await page.waitForSelector(".container input[ng-reflect-name='lastName']"));
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

    it('Form should show Registration successful', async () => {
        await page.type(".container input[ng-reflect-name='firstName']", "rafael");
        await page.type(".container input[ng-reflect-name='lastName']", "eduardo");
        await page.type(".container input[ng-reflect-name='username']", "admin");
        await page.type(".container input[ng-reflect-name='password']", "admin123");
        await page.click(".container .btn-primary");
        await expect(await page.waitForSelector(".container .alert-success"));
        const result = await page.evaluate(() => document.querySelector('.container .alert-success').innerHTML);
        expect(result).toBe('Registration successful');
    }, 15000);


    it('Form should show Login successful', async () => {
        await page.type(".container input[ng-reflect-name='username']", "admin");
        await page.type(".container input[ng-reflect-name='password']", "admin123");
        await page.click(".container .btn-primary");
        await expect(await page.waitForSelector(".container h1"));
        await expect(await page.waitForSelector(".container h3"));
        await expect(await page.waitForSelector(".container p"));
        const result = await page.evaluate(() => document.querySelector('.container h1').innerHTML);
        expect(result).toBe('Hi rafael!');
        await page.goto('https://angular-6-registration-login-example.stackblitz.io/register');
    }, 15000);

});
