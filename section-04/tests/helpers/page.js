const puppeteer = require('puppeteer')
const sessionFactory = require('../factories/sessionFactory')
const userFactory = require('../factories/userFactory')

module.exports = class Page {
    static async build(){
        const browser = await puppeteer.launch({
            headless: false
        })
        // pPage like 'puppeteer page'
        const pPage = await browser.newPage()
        const page = new Page(pPage)

        return new Proxy(page, {
            get(target, key){
                // Additional access to 'browser'. Access order is prioritized.
                return target[key] || browser[key] || pPage[key] 
            }
        })
    }

    constructor(page) {
        this.page = page
    }

    async login(){
        // Simulating loggin in, by existing user!
        // We are faking cookie session, using buffer nad keygrip
        const user = await userFactory()
        const { session, sig } = sessionFactory(user)

        await this.setCookie({ name: 'session', value: session })
        await this.setCookie({ name: 'session.sig', value: sig })
        // Show blogs
        await this.goto('localhost:3000/blogs')

        // li:nth-child(2) or li:last-child 
        // or a[href="/auth/logout"] <- appropriate quotes!
        const selector = 'a[href="/auth/logout"]'

        // It is possible that page has not been loaded yet!
        // Let's use waitFor
        await this.waitFor(selector)
    }

    async getContentsOf(selector) {
        return this.$eval(selector, el => el.innerHTML)
    }
}

//module.exports = Page