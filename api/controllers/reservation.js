import Reservation from "../models/Reservation.js";

// Get any reservation
export const getReservations = async (req, res, next) => {

    try {
        const reservations = await Reservation.find(req.query);
        res.json(reservations);
    } catch (error) {
        next(error)
    }
}

// Delete a reservation
export const deleteReservation = async (req, res, next) => {
    try {
        await Reservation.findByIdAndDelete(req.params.id);
        res.status(200).json("Reservation has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
}

// Update a reservation
export const updateReservation = async(req,res,next) => {

    try{
        const updatedReservation = await Reservation.findByIdAndUpdate(req.params.id, {$set: req.body},{new:true})
        res.status(200).json(updatedReservation)
    }
    catch(err){
        next(err);
    }

}