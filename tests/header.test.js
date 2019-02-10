// ----
// Dependencies
const puppeteer = require( 'puppeteer' );
const sessionFactory = require( './factories/sessionFactory' );
const userFactory = require( './factories/userFactory' );


// ----
// Configuration
let browser;
let page;

beforeEach( async () => {
    browser = await puppeteer.launch({
        headless: false
    });

    page = await browser.newPage();

    await page.goto( 'localhost:3000' );
});


afterEach( async () => {
    await browser.close();
});


// ----
// Tests

// Check for Logo of site
test( 'Header displays correct Site Name / Logo.', async () => {
    const text = await page.$eval( 'a.brand-logo', el => el.innerHTML );
    expect( text ).toEqual( 'Blogster' );
});


// Test OAuth Flow
test( 'Clicking login begins the Google OAuth flow', async () => {
    await page.click( '#loginWithGoogle' );

    const url = await page.url();

    expect( url ).toMatch( /accounts\.google\.com/ );
});


// 
test( 'Shows logout button when signed in', async () => {

    const user = await userFactory();
    const { session, sig } = sessionFactory( user );

    await page.setCookie({ name: 'session', value: session });
    await page.setCookie({ name: 'session.sig', value: sig });
    await page.goto( 'localhost:3000' );
    await page.waitFor( '#logoutButton' );

    const text = await page.$eval( '#logoutButton', el => el.innerHTML );
    expect( text ).toEqual( 'Logout' );

});
