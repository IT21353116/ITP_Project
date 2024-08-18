import { Schema } from "mongoose";
import Reservation from "./Reservation.js";
import mongoose from "mongoose";

const VehicleReservationSchema =new Schema(
    
        {
            vehicle: {
                type: Schema.Types.ObjectId,
                required: true,
            },

            endDate: {
                type: Date,
                required: true,
            }
        }
);

const VehicleReservation = Reservation.discriminator('VehicleReservation', VehicleReservationSchema);
//const VehicleReservation = model("VehicleReservationSchema", VehicleReservationSchema)

export default VehicleReservation