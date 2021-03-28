require('dotenv').config();

const express = require('express');
var nodemailer = require('nodemailer'); 

const app = express();

//user id
var user = "youremailadress@gmail.com";
var password = "yourpassword"

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.get('/', function(req, res) {
    res.status(200).send("<h1>Hello world !</h1>");

    console.log(process.env.USER);

    senEmail();
    
}); 

function senEmail (){
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: user,
      pass: password
    }
  });
  
  var mailOptions = {
    from: user,
    to: 'emailOfReceiver',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

}

module.exports = app;