let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;


chai.use(chaiHttp);
const url = 'http://localhost:3000';

describe('obtiene todas las cuentas de un usuario: ', () => {
    it('puede obtener todas las cuentas', (done) => {
        chai.request(url)
            .get('/api/account/1')
            .end(function (err, res) {
                console.log(res.body)
                expect(res).to.have.status(200);
                done();
            });
    });
});

describe('obtiene dinero de credito: ', () => {
    it('puede hacer la modificacion', (done) => {
        chai.request(url)
            .put('/api/account/cashcredit')
            .send({id_acount:"2", mount: 100})
            .end(function (err, res) {
                console.log(res.body)
                expect(res).to.have.status(201);
                done();
            });
    });
});

describe('paga dinero de credito: ', () => {
    it('puede hacer la modificacion', (done) => {
        chai.request(url)
            .put('/api/account/paycredit')
            .send({id_acount:"2", mount: 100})
            .end(function (err, res) {
                console.log(res.body)
                expect(res).to.have.status(201);
                done();
            });
    });
});

describe('paga dinero de debito: ', () => {
    it('puede hacer la modificacion', (done) => {
        chai.request(url)
            .put('/api/account/cashdebit')
            .send({id_acount:"1", mount: 200})
            .end(function (err, res) {
                console.log(res.body)
                expect(res).to.have.status(201);
                done();
            });
    });
});

describe('deposita dinero en cuenta de debito: ', () => {
    it('puede hacer la modificacion', (done) => {
        chai.request(url)
            .put('/api/account/depositdebit')
            .send({id_acount:"1", mount: 200})
            .end(function (err, res) {
                console.log(res.body)
                expect(res).to.have.status(201);
                done();
            });
    });
});