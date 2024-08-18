import Vehicle from "../models/Vehicle.js";


export const createVehicle = async(req,res,next) => {

    const newVehicle = new Vehicle(req.body)
    //ask chatgpt to learn this part
    try{
        const savedVehicle = await newVehicle.save()
        res.status(200).json(savedVehicle)
    }
    catch(err){
        next(err);
    }

}

export const updateVehicle = async(req,res,next) => {

    try{
        const updatedVehicle = await Vehicle.findByIdAndUpdate(req.params.id, {$set: req.body},{new:true})
        res.status(200).json(updatedVehicle)
    }
    catch(err){
        next(err);
    }

}

export const deleteVehicle = async(req,res,next) => {

    try{
        await Vehicle.findByIdAndDelete(req.params.id)
        res.status(200).json("Vehicle has been deleted")
   }
   catch(err){
        next(err);
    }

}

export const getVehicle = async(req,res,next) => {

    try{
        const vehicle =  await Vehicle.findById(req.params.id)
        res.status(200).json(vehicle)
    }
    catch(err){
        next(err);
    }

}

export const getVehicles = async(req,res,next) => {
  
    //check for limit error
    const {min, max, ...others} = req.query
    //const limit = e\r

    try{
        const vehicles =  await Vehicle.find({...others,price:{$gt: min | 1,$lt: max || 999}});
        res.status(200).json(vehicles)
    }
    catch(err){
        next(err);
    }

}


export const countByVehicles = async(req,res,next) => {

    try{
        const count =  await Vehicle.countDocuments()
        res.status(200).json({count})
    }
    catch(err){
        next(err);
    }

}


export const countByType= async(req,res,next) => {
    const types = req.query.types.split(",") 
    try{
      const list = await Promise.all(types.map(type=>{
        return Vehicle.countDocuments({type:type})
      })) 
        res.status(200).json(list)
    }
    catch(err){
        next(err);
    }

}

export const checkUniqueLicensePlate = async (req, res, next) => {
    const licensePlate = req.params.vehicleNumber;
  
    try {
      // Check if the license plate exists in the database
      const existingVehicle = await Vehicle.findOne({ vehicleNumber: licensePlate });
  
      if (existingVehicle) {
        // License plate is not unique
        res.json({ isUnique: false });
      } else {
        // License plate is unique
        res.json({ isUnique: true });
      }
    } catch (err) {
       next(err);
    }
}

/*router.get('/check-license-plate/:licensePlate', async (req, res) => {
    const licensePlate = req.params.licensePlate;
  
    try {
      // Check if the license plate exists in the database
      const existingVehicle = await Vehicle.findOne({ vehicleNumber: licensePlate });
  
      if (existingVehicle) {
        // License plate is not unique
        res.json({ isUnique: false });
      } else {
        // License plate is unique
        res.json({ isUnique: true });
      }
    } catch (error) {
      console.error('Error checking license plate uniqueness:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });*we can do it like this too*/