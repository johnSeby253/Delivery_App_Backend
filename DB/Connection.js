const mongoose=require('mongoose');
const connectString=process.env.CONNECTION_STRING;

mongoose.connect(connectString)
.then(()=>{
    console.log("Mongodb Connection is SuccessFull");
})
.catch((err)=>{
    console.log('Connection Failed',err);
})