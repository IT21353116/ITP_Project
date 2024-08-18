import mongoose from "mongoose";

const Schema = mongoose.Schema;

const type = { discriminatorKey : 'type'}

const ReservationSchema = new Schema(
    {
        customerID: {
            type: Schema.Types.ObjectId,
            required: true,
        },

        cost: {
            type: Number,
            required: true,
        },

        state: {
            type: String,
            default: 'pending',
            required: true,
        },

        startDate: {
            type: Date,
            required: true,
        },

        isCart: {
            type: Boolean,
            default: true,
            required: true,
        },

    }, 

    type,

    { timestamps : true}
);

export default mongoose.model("Reservation", ReservationSchema);