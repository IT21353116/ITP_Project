import mongoose from "mongoose"

const paymentSchema = new mongoose.Schema(
    {
        userID: {
            type: String,
           // required: true
        },

        name: {
            type: String,
            required: true
        },

        address: {
            type: String,
            required: true
        },

        telephone: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true
        },

        paymentDate: {
            type: Date,
           // requierd: true
        },

        status: {
            type: String,
            requierd: true,
            default: "pending"
        },

        receipt: {
            type: String,
            //required: true
        },

        reservations: {
            type: Array,
           // required: true,
        },
        
    }, { timestamps : true })

    export default mongoose.model("Payment", paymentSchema);