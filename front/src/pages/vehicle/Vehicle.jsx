import "./vehicle.css";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../../context/SearchContext";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";


const Vehicle = () => {
  const location = useLocation()
  const id = location.pathname.split("/")[2]
  console.log(location)
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);

  const {data, loading, error} = useFetch(`/vehicles/find/${id}`)
  const {user} = useContext(AuthContext);

  const navigate = useNavigate()

  const {dates} = useContext(SearchContext)

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2){
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays + 1;
  }

  const days = dayDifference(dates[0].endDate,dates[0].startDate)

  const getDatesInRange = (startDate,endDate) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const date = new Date(start.getTime());

    let list = []

    while(date <= end){
        list.push(new Date(date).getTime());
        date.setDate(date.getDate() + 1)
    }
    return list
  };
  console.log(getDatesInRange(dates[0].startDate,dates[0].endDate))
  const allDates = (getDatesInRange(dates[0].startDate,dates[0].endDate))

  /*const isAvailable = (id) => {
    const isFound = id.unavailableDates.some(date => 
      allDates.includes(new Date(date).getTime()));
  
      return isFound
      //Thithira 
    };*/

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber)
  };

  const handleClick = () => {
    if(user){
      //Thithira's part
    }else{
      navigate("/login")
    }
  }

  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? ("loading") :( <div className="vehicleContainer">
        {open && (
          <div className="slider">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="close"
              onClick={() => setOpen(false)}
            />
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="arrow"
              onClick={() => handleMove("l")}
            />
            <div className="sliderWrapper">
              <img src={data.photos[slideNumber]} alt="" className="sliderImg" />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow"
              onClick={() => handleMove("r")}
            />
          </div>
        )}
        <div className="vehicleWrapper">
          <button className="bookNow" onClick={handleClick}>Reserve or Book Now!</button>
          <h1 className="vehicleTitle">{data.name}</h1>
          <div className="vehicleMilage">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>Milage-{data.milage}</span>
          </div>
          <span className="vehicleCapacity">
           Ideal for {data.maxPeople} people
          </span>
          <span className="vehicleHighlight">
            {data.feautures}
          </span>
          <div className="vehicleImages">
            {data.photos?.map((photo, i) => (
              <div className="vehicleImgWrapper" key={i}>
                <img
                  onClick={() => handleOpen(i)}
                  src={photo}
                  alt=""
                  className="vehicleImg"
                />
              </div>
            ))}
          </div>
          <div className="vehicleDetails">
            <div className="vehicleDetailsTexts">
              <h1 className="vehicleTitle">{data.title}</h1>
              <p className="vehicleDesc2">
                 {data.desc}
              </p>
            </div>
            <div className="vehicleDetailsPrice">
              <h1>Driver-{data.Driver}</h1>
              <span>
               {data.rating}
              </span>
              <h2>
                <b>${days * data.price}</b> ({days} day)
              </h2>
              <button onClick={handleClick}>Reserve or Book Now!</button>
            </div>
          </div>
        </div>
        <MailList />
        <div className="footer">
        <Footer />
        </div>
      </div>)}
    </div>
  );
};

export default Vehicle;
