require('./node_modules_bkp/dotenv').config()

const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')

app.use(express.json())

const posts = [
  {
    username: 'Aman',
    title: 'Post 1',
    password:'1223124'
  },
  {
    username: 'Rajdeep',
    title: 'Post 2',
    password:'3431441'
  },
  {
    username:'Saxena',
    title:'Post 3',
    password:'2132144'
  }
]

app.get('/posts', authenticateToken, (req, res) => {
  res.json(posts.filter(post => post.username === req.user.name))
})


//middleware function to check the user if authenticated or not
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']//Bearer TOKEN
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(err)
    if (err) return res.sendStatus(403)//not valid
    req.user = user
    next()
  })
}

app.listen(3000)
console.log('\x1b[36m%s\x1b[0m','The HTTPS server is running on port 3000')
module.exports=app