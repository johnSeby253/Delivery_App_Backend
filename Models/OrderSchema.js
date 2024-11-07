const mongoose =require('mongoose');

const OrderSchema=new mongoose.Schema({
    fromAddress:{
        customerName:{
            type:String,
            required:true
        },
        address:{
            type:String,
            required:true
        },
        MobNo:{
            type:String,
            required:true
        },
        fromLocation:{
            type:String,
            required:true
        },
        pinCode:{
            type:String,
            required:true
        },
        nearestHub:{
            type:String,
            required:true 
        }
    },
    toAddress:{
        customerName:{
            type:String,
            required:true
        },
        address:{
            type:String,
            required:true
        },
        MobNo:{
            type:String,
            required:true
        },
        toLocation:{
            type:String,
            required:true
        },
        pinCode:{
            type:String,
            required:true
        },
    },
    status:{
        type: String,
        enum: ['Pending','Pickuped','Delivered','Cancelled','Completed'],
        default: 'Pending'
    },
    statusTimestamps: {
        pickedUpAt: { type: Date },
        deliveredAt: { type: Date },
        completedAt: { type: Date }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    UserId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true
    }
});
const orders=mongoose.model('orders',OrderSchema);
module.exports=orders;