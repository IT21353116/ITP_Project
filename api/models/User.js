import mongoose from 'mongoose';
//this is how we create the model..check mongoose official site for the code..learn how to copy paste
const UserSchema = new mongoose.Schema({

    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },
},{timestamps:true});
//check timestamps
export default mongoose.model("User", UserSchema);



//ctrl+shift+L to replace the same word in multiple places