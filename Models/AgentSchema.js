const mongoose=require('mongoose');

const agentSchema=new mongoose.Schema({
    agentname:{
        type:String,
        required:true,
    },
    agentEmail:{
        type:String,
        required:true,
        unique:true
    },
    accessCode:{
        type:String,
        required:true
    },
    agentLocation:{
        type:String,
        required:true,
    },
    agentProfile:{
        type:String,
    },
    order_id:[{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'order'
    }]
});
const agent=mongoose.model('agent',agentSchema);
module.exports=agent;