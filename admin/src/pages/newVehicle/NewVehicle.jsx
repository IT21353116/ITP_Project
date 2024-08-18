import "./newVehicle.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from 'axios'
import {  useNavigate } from "react-router-dom";

const NewVehicle = ({ inputs, title }) => {
  const navigate = useNavigate();

  const [files, setfiles] = useState("");
  const [info, setInfo] = useState({ name: "",
  type: "",
  milage: "",
  feautures: "",
  price: "",
  maxPeople: "",
  vehicleNumber: "",
  title: "",
  Driver: "",
  desc: "",
  featured: false });
  const [validationErrors, setValidationErrors] = useState({});
  
  const handleChange = (e) => {
    console.log(e.target.value);
    setInfo(prev=>({...prev,[e.target.id]:e.target.value}))
  }

  const handleClick = async (e) => {
      e.preventDefault()

      setValidationErrors({});

       const errors = {};

    if (!info.name.trim()) {
      errors.name = "Name is required.";
    }

    if (!info.type.trim()) {
      errors.type = "Type is required.";
    } else if (!["Car", "Van", "SUV","Bus","Threewheel"].includes(info.type.trim())) {
      errors.type = "Type must be Car, Van, Bus, Threewheel or SUV.";
    }

    if (!info.milage.trim()) {
      errors.milage = "Milage is required.";
    } else if (!/^\d+\.?\d*\s*kmpl$/i.test(info.milage.trim())) {
      errors.milage = "Mileage must end with 'kmpl' (e.g., 10.5 kmpl).";
    }

    if (!info.feautures.trim()) {
      errors.feautures = "Features are required.";
    }

    if (!String(info.price).trim()) {
      errors.price = "Price is required.";
    }

    if (!String(info.maxPeople).trim()) {
      errors.maxPeople = "Seat Count is required.";
    }

    if (!info.title.trim()) {
      errors.title = "Title is required.";
    }

    if (!info.Driver.trim()) {
      errors.Driver = "Driver is required.";
    }

    if (!info.desc.trim()) {
      errors.desc = "desc is required.";
    }

    if (!info.vehicleNumber.trim()) {
      errors.vehicleNumber = "License plate is required.";
    }else {
      // Make an API request to check if the license plate is unique
      axios
        .get(`/vehicles/checkUniqueVehicleNumber/${info.vehicleNumber}`)
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
    setValidationErrors(errors);
    if (Object.keys(errors).length === 0) {
      try{
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
        const newVehicle = {
          ...info,
          photos:list,
        };
        console.log(newVehicle)
        await axios.post("/vehicles/", newVehicle);
      
        navigate("/vehicles");
      }catch(err){
        console.log(err)
      }
      console.log(info)}
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
                  <input onChange={handleChange} type={input.type} placeholder={input.placeholder} id={input.id}/>
                  {validationErrors[input.id] && (
                    <div className="error">{validationErrors[input.id]}</div>
                  )}
                </div>
              ))}
              <div className="formInput">
                <label>Featured</label>
                <select id="featured" onChange={handleChange}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>

    </div>
  );
};

export default NewVehicle;
