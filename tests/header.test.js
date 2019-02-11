// ----
// Dependencies
const Page = require( './helpers/page' );


// ----
// Configuration
let page;

beforeEach( async () => {
    page = await Page.build();
    await page.goto( 'localhost:3000' );
});


afterEach( async () => {
    await page.close();
});


// ----
// Tests

// Check for Logo of site
test( 'Header displays correct Site Name / Logo.', async () => {
    const text = await page.getContentsOf( 'a.brand-logo' );
    expect( text ).toEqual( 'Blogster' );
});


// Test OAuth Flow
test( 'Clicking login begins the Google OAuth flow', async () => {
    await page.click( '#loginWithGoogle' );
    const url = await page.url();
    expect( url ).toMatch( /accounts\.google\.com/ );
});


// Check for Logout button
test( 'Shows logout button when signed in', async () => {
    await page.login();
    const text = await page.getContentsOf( '#logoutButton' );
    expect( text ).toEqual( 'Logout' );
});
