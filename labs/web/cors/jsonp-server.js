const express = require('express')

const app = express()

app.get('/api/jsonp/user', (req, resp, next) => {
  const user = {
    name: '张三',
    age: 18
  }
  const callback = req.query.callback
  resp.send(`
    ${callback}(${JSON.stringify(user)})
  `)
})

app.listen(3000, () => {
  console.log('server running at http://localhost:3000')
})
