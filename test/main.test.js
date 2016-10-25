'use strict'

var fs = require('fs')
var path = require('path')
var Rill = require('rill')
var request = require('supertest')
var etag = require('..')

describe('etag()', function () {
  describe('when body is missing', function () {
    it('should not add ETag', function (done) {
      var app = new Rill()

      app.use(etag())

      app.use(function (ctx, next) {
        return next()
      })

      request(app.listen())
      .get('/')
      .end(done)
    })
  })

  describe('when ETag is exists', function () {
    it('should not add ETag', function (done) {
      var app = new Rill()

      app.use(etag())

      app.use(function (ctx, next) {
        ctx.res.body = {hi: 'etag'}
        ctx.res.set('ETag', '"etaghaha"')
        return next()
      })

      request(app.listen())
      .get('/')
      .expect('etag', '"etaghaha"')
      .expect({hi: 'etag'})
      .expect(200, done)
    })
  })

  describe('when body is a string', function () {
    it('should add ETag', function (done) {
      var app = new Rill()

      app.use(etag())

      app.use(function (ctx, next) {
        return next().then(function () {
          ctx.res.body = 'Hello World'
        })
      })

      request(app.listen())
      .get('/')
      .expect('ETag', '"b-sQqNsWTgdUEFt6mb5y4/5Q"')
      .end(done)
    })
  })

  describe('when body is a Buffer', function () {
    it('should add ETag', function (done) {
      var app = new Rill()

      app.use(etag())

      app.use(function (ctx, next) {
        return next().then(function () {
          ctx.res.body = new Buffer('Hello World')
        })
      })

      request(app.listen())
      .get('/')
      .expect('ETag', '"b-sQqNsWTgdUEFt6mb5y4/5Q"')
      .end(done)
    })
  })

  describe('when body is JSON', function () {
    it('should add ETag', function (done) {
      var app = new Rill()

      app.use(etag())

      app.use(function (ctx, next) {
        return next().then(function () {
          ctx.res.body = { foo: 'bar' }
        })
      })

      request(app.listen())
      .get('/')
      .expect('ETag', '"d-m7WPJhkuS6APAeLnsTa72A"')
      .end(done)
    })
  })

  describe('when body is a stream with a .path', function () {
    it('should add an ETag', function (done) {
      var app = new Rill()

      app.use(etag())

      app.use(function (ctx, next) {
        return next().then(function () {
          ctx.res.body = fs.createReadStream(path.join(__dirname, '../package.json'))
        })
      })

      request(app.listen())
      .get('/')
      .expect('ETag', /^W\/.+/)
      .end(done)
    })
  })

  describe('when with options', function () {
    it('should add weak ETag', function (done) {
      var app = new Rill()
      var options = {weak: true}

      app.use(etag(options))

      app.use(function (ctx, next) {
        return next().then(function () {
          ctx.res.body = 'Hello World'
        })
      })

      request(app.listen())
      .get('/')
      .expect('ETag', 'W/"b-sQqNsWTgdUEFt6mb5y4/5Q"')
      .end(done)
    })
  })
})
