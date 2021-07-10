const jsonServer = require('json-server')
const nocache = require('nocache')
const server = jsonServer.create()

server.use(jsonServer.defaults())
server.use(nocache())

server.get('/todos/1', (req, res) => {
  setTimeout(() => {
    res.jsonp(
      {
        'id': 1,
        'title': 'Abnormally long network call!',
      },
    )
  }, 10000)
})

// eslint-disable-next-line no-console
console.log(`
┌──────────────────────────────────────────────────┐
│                                                  │
│   Serving!                                       │
│                                                  │
│   - Local:            http://localhost:8889      │
│                                                  │
└──────────────────────────────────────────────────┘
`)

server.listen(8889)
