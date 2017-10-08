const test = require("../app");
const request = require('supertest');
const app = require('../app');
const agent = require('useragent');


describe("Request Microservice", () => {
    describe("GET /", () => {
        it("returns status code 200", (done) =>  {
            request(app)
                .get('/')
                .end((err, res) => {
                    expect(res.body.message).toBe('Welcome to Request Header Parser Microservice');
                    done();
                });
        }, 250);
    });

    describe("*", () => {
        it('returns a 404 for a non-existent route', (done) => {
            request(app)
                .get('/sdafsdg')
                .end((err,res) => {
                    expect(res.status).toBe(404);
                    done();
                })
        }, 250)
    })

    describe('/api/whoami', () => {
        it('returns the correct response when you hit the whoami route', (done) => {
            request(app)
                .get('/api/whoami')
                .expect(200)   
                .set('accept-language', 'en-US,en;q=0.5')   
                .set('user-agent', 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0')     
                .set('x-forwarded-for', '127.0.0.1')
                .end((err, res) => {
                    expect(res.status).toBe(200);
                    done();
                })
        }, 250)
    })
});