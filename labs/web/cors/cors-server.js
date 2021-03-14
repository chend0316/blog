const express = require('express')

const app = express()

app.get('/api/user', (req, resp, next) => {
  const user = {
    name: '张三',
    age: 18
  }
  resp.setHeader('Access-Control-Allow-Origin', '*')
  resp.send(JSON.stringify(user))
})

app.listen(3000, () => {
  console.log('server running at http://localhost:3000')
})
