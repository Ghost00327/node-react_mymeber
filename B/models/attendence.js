const mongoose = require('mongoose');
const schema =  mongoose.Schema
const attendenceSchema = schema({
    image:{
        type:String,
        // required:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        // required:true
    },
    class:{
        type:String,
        required:true
    },
    class_color:{
        type:String,
        default:""
    },
    userId:{
        type:schema.Types.ObjectId
    },
    scheduleId:{
        type:schema.Types.ObjectId
    },
    date:{
        type:String,
    },
    time:{
        type:String,
        required:true
    }
},
{ timestamps:true }
)

module.exports = mongoose.model('attendence', attendenceSchema)