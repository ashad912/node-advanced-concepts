const puppeteer = require('puppeteer')

let browser, page;

beforeEach( async () => {
    browser = await puppeteer.launch({
        headless: false
    })
    page = await browser.newPage({})
    await page.goto('localhost:3000')
})


afterEach(async () => {
    await browser.close()
})


test('the header has the correct text', async () => {
   

    //why so complicated?
    //el => el.innerHTML is converted to string, sent, converted to function,
    //and in the end Chromium execute it
    //dollar sign is normal sign, nothing special
    const text = await page.$eval('a.brand-logo', el => el.innerHTML)

    expect(text).toEqual('Blogster')
})


test('clicking login starts oauth flow', async() => {
    await page.click('.right a')

    const url = await page.url()

    expect(url).toMatch(/accounts\.google\.com/)
})

//test.only!!!! run only this test

test.only('when signed in, shows logout button', async() => {
    // simulating loggin in, by existing user!
    // we are faking cookie session, using buffer nad keygrip
    const id = "5ed8c903ded8112b1cc4ab26"

    const Buffer = require('safe-buffer').Buffer

    const sessionObject = {
        passport: {
            user: id
        }
    }

    const sessionString = Buffer
                            .from(JSON.stringify(sessionObject))
                            .toString('base64')
    const Keygrip = require('keygrip')
    const keys = require('../config/keys')

    const keygrip = new Keygrip([keys.cookieKey])
    //library chooses to add 'session='
    const sig = keygrip.sign('session=' + sessionString)

    await page.setCookie({name: 'session', value: sessionString})
    await page.setCookie({name: 'session.sig', value: sig})
    await page.goto('localhost:3000')

    // li:nth-child(2) or li:last-child 
    //or a[href="/auth/logout"] <- appropriate quotes!
    const selector = 'a[href="/auth/logout"]'

    //it is possible that page has not been loaded yet!
    //let's use waitFor
    await page.waitFor(selector)
    const text = await page.$eval(selector, el => el.innerHTML)

    expect(text).toEqual('Logout')

})