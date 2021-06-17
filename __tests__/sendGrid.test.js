const request = require('supertest');
const app = require('../lib/app');



describe("#sendingmailMockedway", () => {
    it("Should return sent after an email was sent", async() => {
        // const msg = {
        //     to: `purplebike650@gmail.com`,
        // from: 'GreetingArt@outlook.com',
        // subject: `test has send you a Greeting Art`,
        // text: 'hello there, this is a test' 
        // }
        
        // const response = request(app)
        // .post('/send')
        // .send(msg)

        // expect(response._data).toEqual({
        //     to: 'purplebike650@gmail.com',
        //     from: 'GreetingArt@outlook.com',
        //     subject: 'test has send you a Greeting Art',
        //     text: 'hello there, this is a test'
        //   })
        const msg = {
            to: `test@test.com`,
        from: 'GreetingArt@outlook.com',
        subject: `test has send you a Greeting Art`,
        html: '<h1>hello there</h1>',
            mail_settings: {
              sandbox_mode: {
                enable: true
              }
            } 
        }
        
        const response = await request(app)
        .post('/send')
        .send(msg)

        expect(response.status).toEqual(200)
        
        });
    });
