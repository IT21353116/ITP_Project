import mongoose from 'mongoose';
//this is how we create the model..check mongoose official site for the code..learn how to copy paste
const VehicleSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true,
    },
    type:{
        type: String,
        required: true,
    },
    milage:{
        type: String,
        required: true,
    },
    feautures:{
        type: String,
        required: true,
    },
    photos:{
        type: [String],
    },
    price:{
        type: Number,
        required: true,
    },
    ratings:{
        type: Number,
        min: 0,
        max: 5,
    },
    maxPeople:{
        type: Number,
        required: true,
    },
    unavailableDates:{
        type:[Date],
    },
    title:{
        type: String,
        required: true,
    },
    Driver:{
        type: String,
        required: true,
    },
    desc:{
        type: String,
        required: true,
    },
    featured:{
        type:Boolean,
        
    },
    vehicleNumber:{
        type: String,
        required: true,
        unique: true,
    },
},
{timestamps:true});
//check timestamps
export default mongoose.model("Vehicle", VehicleSchema);



//ctrl+shift+L to replace the same word in multiple places