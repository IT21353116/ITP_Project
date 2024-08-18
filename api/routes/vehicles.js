import express from "express";
import Vehicle from "../models/Vehicle.js";
import { createVehicle, deleteVehicle, getVehicle, getVehicles, updateVehicle,countByType,countByVehicles, checkUniqueLicensePlate } from "../controllers/vehicle.js";
import { verifyAdmin } from "../util/verifyToken.js";
//need to import the model
const router = express.Router();

//CREATE
router.post("/",verifyAdmin, createVehicle)
/*router.post("/", async(req,res) => {
    //Added it to the controllers for more security
    const newVehicle = new Vehicle(req.body)
    //ask chatgpt to learn this part
    try{
        const savedVehicle = await newVehicle.save()
        res.status(200).json(savedVehicle)
    }
    catch(err){
        res.status(500).json(err);
    }
})*/


//UPDATE
router.put("/:id",verifyAdmin,updateVehicle)
/*router.put("/:id", async(req,res) => {
    //ask chatgpt
    try{
        const updatedVehicle = await Vehicle.findByIdAndUpdate(req.params.id, {$set: req.body},{new:true})
        res.status(200).json(updatedVehicle)
    }
    catch(err){
        res.status(500).json(err);
    }
})*/

//DELETE
router.delete("/:id",verifyAdmin,deleteVehicle)
/*router.delete("/:id", async(req,res) => {
    //ask chatgpt
    try{
         await Vehicle.findByIdAndDelete(req.params.id)
        res.status(200).json("Vehicle has been deleted")
    }
    catch(err){
        res.status(500).json(err);
    }
})*/

//GET
router.get("/find/:id",getVehicle)
/*router.get("/:id", async(req,res) => {
    //ask chatgpt
    try{
        const Vehicle =  await Vehicle.findById(req.params.id)
        res.status(200).json(Vehicle)
    }
    catch(err){
        res.status(500).json(err);
    }
})*/

//GET ALL
router.get("/",getVehicles)
/*router.get("/", async(req,res) => {

   /* const failed = true
   
    if(failed) return next(createError(401, "You are not authenticated"))
    //check the util for the newly created error function
    //ask chatgpt about this code piece
    try{
        const Vehicles =  await Vehicle.find()
        res.status(200).json(Vehicles)
    }
    catch(err){
        res.status(500).json(err);
    }
})*/
router.get("/countByVehicles", countByVehicles);
router.get("/countByType", countByType);
router.get("/checkUniqueVehicleNumber/:vehicleNumber", checkUniqueLicensePlate);
export default router;

/* first error
code: 'EADDRINUSE',
  errno: -4091,
  syscall: 'listen',
  address: '::',
  port: 8000
}*/
//second error[nodemon] app crashed - waiting for file changes before starting...

