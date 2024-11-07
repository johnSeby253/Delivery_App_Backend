require('dotenv').config();
const express=require('express');
const cors=require('cors');
const router=require('./Router/Router');
require ('./DB/Connection');

const Server=express();
Server.use(cors());
Server.use(express.json());
Server.use(router);
Server.use('/Uploads',express.static('./Uploads'))


const PORT=3000;

Server.listen(PORT,()=>{
    console.log(`PORT is Running in ${PORT}`);
});

// Checking the Server and display a msg on there
Server.get('/',(req,res)=>{
    res.status(200).send('Server Health is good,Waiting for Request... ')
});