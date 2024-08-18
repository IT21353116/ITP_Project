import "./reservation.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import RDatatable from "../../components/rdatatable/RDatatable"

const Reservations = () => {
    return (
        <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <RDatatable/>
      </div>
    </div>
    );
};

export default Reservations;