const mongoose=require('mongoose');

const adminSchema=new mongoose.Schema({
    adminname:{
        type:String,
        required:true,
    },
    adminEmail:{
        type:String,
        required:true,
        unique:true
    },
    adminPassword:{
        type:String,
        required:true
    },
    adminProfile:{
        type:String,
    }
});
const admin=mongoose.model('admin',adminSchema);
module.exports=admin