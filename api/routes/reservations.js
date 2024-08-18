import express from "express";
import { getReservations, deleteReservation, updateReservation } from "../controllers/reservation.js";

const router = express.Router()

router.get("/", getReservations);
router.get("/:id", deleteReservation);
router.delete("/:id", deleteReservation);
router.put("/:id", updateReservation);

export default router;