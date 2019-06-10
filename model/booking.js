const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    name:{
        type:String,
        required : true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
});
module.exports = mongoose.model("Booking",bookingSchema);
