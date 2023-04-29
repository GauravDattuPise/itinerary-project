const express = require("express");
const mongoose = require('mongoose')
const route = require("./routes/route")

require('dotenv').config();

const app = express();
   
app.use(express.json());

mongoose.connect(process.env.DB, {useNewUrlParser : true})
.then(()=> {console.log("mongoDb is connected")})
.catch((err) => {console.log(err)})

app.use('/', route);

app.listen(process.env.PORT, ()=>{
    console.log("server is running ...." + process.env.PORT)
})
