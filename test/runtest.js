let chai = require('chai');
let chaiHttp = require('../node_modules_bkp/chai-http');
let should = chai.should();
const chaiJWT = require('../node_modules_bkp/chai-jwt');

const app = require("../app");



chai.use(chaiHttp);
chai.use(chaiJWT);

describe("Test all endpoints" , () => {

    it("Should not return authenticated token if registered users not passed", (done) => {
        chai.request(app).get('/login').end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a('object');
            done();
        });
    });

    it("Should not return authenticated users if token invalid", (done) => {
        chai.request(app).get('/posts').end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a('object');
            done();
        });
    });


    it("Should not return resized image if not authorized ", (done) => {
        let image = {
            url: "http://fecundlabs.com/wp-content/uploads/2018/05/icon.png",
        }
        chai.request(app).post('/image').send(image).end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.a('object');
            done();
        });
    });

    
   
})