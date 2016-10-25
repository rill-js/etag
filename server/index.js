'use strict'

var calculate = require('etag')
var Stream = require('stream')
var fs = require('mz/fs')
function noop () {}

/**
 * Expose `etag`.
 */
module.exports = etagSetup

/**
 * Add ETag header field.
 * @param {object} [options] see https://github.com/jshttp/etag#options
 * @param {boolean} [options.weak]
 * @return {Function}
 * @api public
 */
function etagSetup (options) {
  return function etagMiddleware (ctx, next) {
    return next()
      .then(function () { return getResponseEntity(ctx) })
      .then(function (entity) { setEtag(ctx, entity, options) })
  }
}

/**
 * Pulls out the response body if suitable for etag.
 */
function getResponseEntity (ctx, options) {
  // no body
  var body = ctx.res.body
  if (!body || ctx.res.get('ETag')) return

  // 2xx or 404 status
  var status = ctx.res.status
  if (status !== 404 && status / 100 | 0 !== 2) return

  // Check content type.
  if (body instanceof Stream) {
    if (!body.path) return
    return fs.stat(body.path).catch(noop)
  } else if ((typeof body === 'string') || Buffer.isBuffer(body)) {
    return body
  } else {
    // Cast body to json and set content type to avoid stringify twice.
    ctx.res.body = JSON.stringify(body)
    ctx.res.set('Content-Type', 'application/json; charset=UTF-8')
    return ctx.res.body
  }
}

/**
 * Sets the etag header if an entity was found.
 */
function setEtag (ctx, entity, options) {
  if (!entity) return
  ctx.res.set('ETag', calculate(entity, options))
}
