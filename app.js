require('./node_modules_bkp/dotenv').config()

const express = require('express')
const app = express()
const Jimp = require('./node_modules_bkp/jimp');
const uniqid = require('uniqid');
const jwt = require('jsonwebtoken')

app.use(express.json())

let refreshTokens = []//store locally your tokens


//get your token 
app.post('/token', (req, res) => {
  const refreshToken = req.body.token
  if (refreshToken == null) return res.sendStatus(401)
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    const accessToken = generateAccessToken({ name: user.name })
    res.json({ accessToken: accessToken })
  })
})

app.delete('/logout', (req, res) => {
  refreshTokens = refreshTokens.filter(token => token !== req.body.token)
  res.sendStatus(204)
  console.log('User logged out')
})

app.post('/login', (req, res) => {
  // Authenticate User

  const username = req.body.username
  const password=req.body.password
  const user = { name: username,password:password}

  const accessToken = generateAccessToken(user)
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
  refreshTokens.push(refreshToken)
  res.json({ accessToken: accessToken, refreshToken: refreshToken })
})

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
}



//create a thumbnail
// process.env.ACCESS_TOKEN_SECRET, 
app.post("/image", (req, res) => {
  if( req.body.url.length === 0){
      res.status(200).json({
          message:"no url passed"
      });
  }else{
      Jimp.read(req.body.url, (err, file) => {
          if (err){
              res.status(err.status || 500);
              res.json({
                  error:{
                      message:err.message
                  }
              });
              //next()
          }
          const uniqueFileName ='./images/thumbs/'+uniqid()+'50x50.jpg';
          const doneCropping = file.resize(50, 50).write(uniqueFileName);
          if( doneCropping ){
              res.status(200).json({
                  message:"image resized",
                  img_url:uniqueFileName
              });
          }
          
      });
  }

});

app.listen(4000)
console.log('\x1b[35m%s\x1b[0m','The HTTPS server is running on port 4000')

module.exports=app;