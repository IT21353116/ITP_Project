import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState,useEffect } from "react";
import axios from 'axios'
import { useParams, useNavigate } from "react-router-dom";

const Single = ({ inputs, title }) => {

  const { vehicleId } = useParams();
  const navigate = useNavigate();

  const [validationErrors, setValidationErrors] = useState({});
  const [files, setfiles] = useState("");
  const [info, setInfo] = useState();
  const [vehicleData, setVehicleData] = useState(
    {name: "",
    type: "",
    milage: "",
    feautures: "",
    price: 0,
    maxPeople: 0,
    vehicleNumber: "",
    title: "",
    Driver: "",
    desc: "",
    featured: false,}
  );
  
  const handleChange2 = (e) => {
    // Create a copy of vehicleData and update the specific field
    console.log(e.target.value);
    setVehicleData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  }
  
  const handleChange = (e) => {
    console.log(e.target.value);
    setInfo(prev=>({...prev,[e.target.id]:e.target.value}))
  }

  useEffect(() => {
    // Fetch vehicle data based on vehicleId when the component mounts
    axios
      .get(`/vehicles/find/${vehicleId}`)
      .then((response) => {
        setVehicleData(response.data); // Update state with the fetched data
      })
      .catch((error) => {
        console.error("Error fetching vehicle data:", error);
      });
  }, [vehicleId]);
  
  const handleClick = async (e) => {
    e.preventDefault()

    setValidationErrors({});

    const errors = {};

    if (!vehicleData.name.trim()) {
      errors.name = "Name is required.";
    }

    if (!vehicleData.type.trim()) {
      errors.type = "Type is required.";
    } else if (!["Car", "Van", "SUV","Bus","Threewheel"].includes(vehicleData.type.trim())) {
      errors.type = "Type must be Car, Van, Bus, Threewheel or SUV.";
    }

    if (!vehicleData.milage.trim()) {
      errors.milage = "Milage is required.";
    } else if (!/^\d+\.?\d*\s*kmpl$/i.test(vehicleData.milage.trim())) {
      errors.milage = "Mileage must end with 'kmpl' (e.g., 10.5 kmpl).";
    }

    if (!vehicleData.feautures.trim()) {
      errors.feautures = "Features are required.";
    }

    if (!String(vehicleData.price).trim()) {
      errors.price = "Price is required.";
    }

    if (!String(vehicleData.maxPeople).trim()) {
      errors.maxPeople = "Seat Count is required.";
    }

    if (!vehicleData.title.trim()) {
      errors.title = "Title is required.";
    }

    if (!vehicleData.Driver.trim()) {
      errors.Driver = "Driver is required.";
    }

    if (!vehicleData.desc.trim()) {
      errors.desc = "desc is required.";
    }

    if (!vehicleData.vehicleNumber.trim()) {
      errors.vehicleNumber = "License plate is required.";
      setValidationErrors(errors);
    }else {
      // Make an API request to check if the license plate is unique
      axios
        .get(`/vehicles/checkUniqueVehicleNumber/${vehicleData.vehicleNumber}`)
        .then((response) => {
          const newErrors = { ...errors };
          if (!response.data.isUnique) {
            newErrors.vehicleNumber = "License plate is not unique.";
            
          }
          setValidationErrors(newErrors);
        })
        .catch((error) => {
          console.error("Error checking license plate uniqueness:", error);
        });
        
    }
   


     if (Object.keys(errors).length === 0) {
    try{
      let updatedVehicleData = {};
      if (files.length > 0) {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          
          const data  = new FormData();
          data.append("file",file);
          data.append("upload_preset","upload");
          const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dtrgqkjzl/image/upload", 
          data
          );
          const {url} = uploadRes.data;
          return url;
      })
    )
      updatedVehicleData = {
        ...info,
        ...vehicleData,
        photos:list,
      };
    }else {
      // No new photos uploaded, update only other data
      updatedVehicleData = {
        ...info,
        ...vehicleData,
      };
    }
      await axios.put(`/vehicles/${vehicleId}`, updatedVehicleData);
      console.log(updatedVehicleData)
      // Optionally, you can fetch the updated data after the update
      // to ensure the UI reflects the latest changes.
      const updatedResponse = await axios.get(`/vehicles/find/${vehicleId}`);
      setVehicleData(updatedResponse.data);
      navigate("/vehicles");
    }catch(err){
      console.log(err)
    }}
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  multiple
                  id="file"
                  onChange={(e) => setfiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input type={input.type} placeholder={input.placeholder} value={vehicleData[input.id]} id={input.id} onChange={handleChange2}/>
                  {validationErrors[input.id] && (
                    <div className="error">{validationErrors[input.id]}</div>
                  )}
                </div>
              ))}
              <div className="formInput">
                <label>Featured</label>
                <select id="featured" value={vehicleData.featured} onChange={handleChange}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
              <button onClick={handleClick}>Update</button>
            </form>
          </div>
        </div>
      </div>-

    </div>
  );
   
};

export default Single;
