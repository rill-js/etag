<h1 align="center">
  <!-- Logo -->
  <img src="https://raw.githubusercontent.com/rill-js/rill/master/Rill-Icon.jpg" alt="Rill"/>
  <br/>
  @rill/etag
	<br/>

  <!-- Stability -->
  <a href="https://nodejs.org/api/documentation.html#documentation_stability_index">
    <img src="https://img.shields.io/badge/stability-stable-brightgreen.svg?style=flat-square" alt="API stability"/>
  </a>
  <!-- Standard -->
  <a href="https://github.com/feross/standard">
    <img src="https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square" alt="Standard"/>
  </a>
  <!-- NPM version -->
  <a href="https://npmjs.org/package/@rill/etag">
    <img src="https://img.shields.io/npm/v/@rill/etag.svg?style=flat-square" alt="NPM version"/>
  </a>
  <!-- Downloads -->
  <a href="https://npmjs.org/package/@rill/etag">
    <img src="https://img.shields.io/npm/dm/@rill/etag.svg?style=flat-square" alt="Downloads"/>
  </a>
  <!-- Gitter Chat -->
  <a href="https://gitter.im/rill-js/rill">
    <img src="https://img.shields.io/gitter/room/rill-js/rill.svg?style=flat-square" alt="Gitter Chat"/>
  </a>
</h1>

<div align="center">
  Automatically generate ETag http headers for responses with Rill.
</div>

## Installation

```console
npm install @rill/etag
```

## Example

```js
const rill = require('rill')
const app = rill()
const fresh = require('@rill/fresh')
const etag = require('@rill/etag')

// ETag works together with fresh
app.use(fresh())
app.use(etag())

// Response will be sent with ETag header.
app.use((ctx, next) => {
  this.body = 'Hello World'
})

app.listen(3000)
```

### Contributions

* Use `npm test` to run tests.

Please feel free to create a PR!
