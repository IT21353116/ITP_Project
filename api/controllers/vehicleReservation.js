import VehicleReservation from "../models/VehicleReservation.js";

// CREATE VEHICLE RESERVATION
export const createVehicleReservation = async (req, res, next) => {
    const newVehicleReservation = new VehicleReservation(req.body)

    try{
        const savedReservation = await newVehicleReservation.save();
        res.status(201).json(savedReservation);
    } catch(err) {
        res.status(500).json(err);
    }
}

// GET ALL VEHICLE RESERVATIONS
export const getVehicleReservations = async (req, res, next) => {
    try{
        const reservationList = await VehicleReservation.find();
        res.status(200).json(reservationList);
    } catch(err) {
        res.status(404).json(err)
    }
}

// GET A VEHICLE RESERVATION
export const getVehicleReservationByID = async (req, res, next) => {
    try{
        const reservation = await VehicleReservation.findById(req.params.id);
        res.status(200).json(reservation);
    } catch(err){
        res.json(404).json(err);
    }

}
// UPDATE A VEHICLE RESERVATION
// DELETE A VEHICLE RESERVATION