const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../app')
const should = chai.should()
const data = require('./test-config')

chai.use(chaiHttp)

describe('/POST login', function () {
  it('Successful authentication', function (done) {
    chai.request(server)
    .post('/api/login')
    .send({
      username: data.username,
      password: data.password
    })
    .end(function (error, res) {
      res.should.have.status(200)
      res.body.should.be.a('object')
      res.body.should.have.property('message').eql('Sucessful login')
      done()
    })
  })

  it('Authentication error', function (done) {
    chai.request(server)
    .post('/api/login')
    .send({
      username: 'test',
      password: 'test'
    })
    .end(function (error, res) {
      res.should.have.status(401)
      res.body.should.be.a('object')
      res.body.should.have.property('message').eql('All configured authentication methods failed')
      done()
    })
  })

  it('Invalid JSON - username: undefined', function (done) {
    chai.request(server)
    .post('/api/login')
    .send({
      password: 'test'
    })
    .end(function (error, res) {
      res.should.have.status(422)
      res.body.should.be.a('object')
      res.body.should.have.property('message').eql('Invalid JSON')
      done()
    })
  })

  it('Invalid JSON - password: undefined', function (done) {
    chai.request(server)
    .post('/api/login')
    .send({
      username: 'test'
    })
    .end(function (error, res) {
      res.should.have.status(422)
      res.body.should.be.a('object')
      res.body.should.have.property('message').eql('Invalid JSON')
      done()
    })
  })
  
  it('Invalid JSON - username: empty', function (done) {
    chai.request(server)
    .post('/api/login')
    .send({
      username: '',
      password: 'test'
    })
    .end(function (error, res) {
      res.should.have.status(422)
      res.body.should.be.a('object')
      res.body.should.have.property('message').eql('Invalid JSON')
      done()
    })
  })

  it('Invalid JSON - password: empty', function (done) {
    chai.request(server)
    .post('/api/login')
    .send({
      username: 'test',
      password: ''
    })
    .end(function (error, res) {
      res.should.have.status(422)
      res.body.should.be.a('object')
      res.body.should.have.property('message').eql('Invalid JSON')
      done()
    })
  })
})
