import express from 'express';
import { createVehicleReservation, getVehicleReservationByID, getVehicleReservations } from '../controllers/vehicleReservation.js';

const Router = express.Router();

// import {createVehicleReservation, getAllVehicleReservations, getVehicleReservationByID, deleteVehicleReservation} from '../controllers/vehicleReservation.controller.js';

Router.get("/", getVehicleReservations);
Router.post("/", createVehicleReservation);
Router.get("/:id", getVehicleReservationByID);
// Router.delete("/:id", deleteVehicleReservation);

export default Router;