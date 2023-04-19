const jsonServer = require('json-server')
const cors = require('cors')
const path = require('path')
const https = require("https");
const fs = require("fs");
const auth_1 = require("./security/auth");
const authz_1 = require("./security/authz");
let user = require("./model/users")
// { User, users } from './model/users';
//var email  = require('emailjs/email');
// import { User } from './model/users';
const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()

server.use(cors())
server.use(jsonServer.bodyParser)
server.post('/login', auth_1.handleAuthentication);
server.use('/signUp',(req,res)=>{
    console.log(req.body,"req&res")
    let mail = res.email
    new user.User(req.body.email,req.body.name,req.body.password) 
})
//server.post('/login', (req,res)=>{console.log("Entered")});
server.use(middlewares)
server.use(router)

server.use('/orders', authz_1.handleAuthorization);
server.use('/reservation', authz_1.handleAuthorization);


var options = {
    cert: fs.readFileSync('./keys/cert.pem'),
    key: fs.readFileSync('./keys/key.pem'),
};

const PORT = 3001

https.createServer(options,server).listen(PORT, () => {
    console.log(`JSON Server is running on http://localhost:${PORT}`)
  })

