const mongoose=require('mongoose');

const paymentSchema=new mongoose.Schema({
    paymentAmount:{
        type:String,
        required:true
    },
    paymentStatus:{
        type:String,
        enum:['NotRecieved','Recieved'],
        default:'NotRecieved'
    },
    order_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'order'
    }
});
const payments=mongoose.model('payments',paymentSchema);
module.exports=payments;