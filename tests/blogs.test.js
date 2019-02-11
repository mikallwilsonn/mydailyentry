// ----
// Dependencies
const Page = require( './helpers/page' );


// ----
// Configuration
let page;

beforeEach( async () => {
    page = await Page.build();
    await page.goto( 'http://localhost:3000' );
});


afterEach( async () => {
    await page.close();
});


// ----
// Tests
describe( 'User is logged in.', async () => {
    beforeEach( async () => {
        await page.login();
        await page.click( '#createNewBlog a');
    });


    test( 'Can access the from to create a new Blog Post.', async () => {
        const text = await page.getContentsOf( '#createNewBlogForm div.title label' );
        expect( text ).toEqual( 'Blog Title' );
    });


    describe( 'Using VALID inputs.', async () => {
        beforeEach( async () => {
            await page.type( '#createNewBlogForm .title input', 'Test Blog Title' );
            await page.type( '#createNewBlogForm .content input', 'Test Blog Content' );
            await page.click( `#createNewBlogForm button[type='submit']` );
        });

        test( 'Submitting takes user to review screen.', async () => {
            const text = await page.getContentsOf( 'h5' );
            expect( text ).toEqual( 'Please confirm your entries' );
        });

        test( 'User is redirected to index after submission is successful.', async () => {
            await page.click( 'button.green' );
            await page.waitFor( '.card' );
            const title = await page.getContentsOf( '.card-content .card-title' );
            const content = await page.getContentsOf( '.card-content p' );
            expect( title ).toEqual( 'Test Blog Title' );
            expect( content ).toEqual( 'Test Blog Content' );
        });
    });


    describe( 'Using INVALID inputs.', async () => {
        beforeEach( async () => {
            await page.click( `#createNewBlogForm button[type='submit']` );
        });

        test( 'Form shows error messages.', async () => {
            const titleError = await page
                .getContentsOf( '#createNewBlogForm .title .errorMessage' );
            const contentError = await page
                .getContentsOf( '#createNewBlogForm .content .errorMessage' );
            expect( titleError ).toEqual( 'You must provide a value' );
            expect( contentError ).toEqual( 'You must provide a value' );
        });
    });
});


describe( 'User is NOT logged in.', async () => {

    test( 'User CANNOT create blog posts', async () => {
        const result = await page.evaluate(
            () => {
                return fetch( '/api/blogs', {
                    method: 'POST',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        title: 'Failed Test Blog Title',
                        content: 'Test Blog Content'
                    })
                }).then( res => res.json() );
            }
        );

        expect( result ).toEqual({ error: 'You must log in!' });
    });


    test( 'User CANNOT get a list of posts', async () => {
        const result = await page.evaluate(
            () => {
                return fetch( '/api/blogs', {
                    method: 'GET',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then( res => res.json() );
            }
        );

        expect( result ).toEqual({ error: 'You must log in!' });
    });

});