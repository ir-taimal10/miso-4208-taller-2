## Cypress and Puppeteer  + Jest


Para ejecutar este proyecto de pruebas primero debe intalar las dependencias con

````
npm install
````

una vez instaladas las dependencias es posible ejecutar las pruebas para cada framework:

## Cypress
````
npm run test:cypress
````

La configuración de Cypress para usar ``Headed`` es usando el parámetro `--headed`


## Puppeteer
````
npm run test:puppeteer
````
Por su parte la configuración de Puppeteer para usar ``Headed`` es incluyendo una configuración al instanciar el browser

Ejemplo:
````$xslt

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
````

### Resultados

![Results](results/CPU_MEMORY_TIME.PNG)

*¿Qué tantos recursos se pueden ahorrar ejecutando las pruebas de manera headless?*

El recurso que mas se ve reducido es el consumo de memoria,  por su parte el consumo de CPU y el tiempo se mantienen iguales 
en el contexto de este proyecto.

*¿En qué casos cree que valdría la pena ejecutar sus pruebas de esta forma?*
Sería muy importante este ahorro de recursos cuando se debe ejecutar periodicamente las pruebas y cuando el bloque de ejecución es lo suficientemente grande