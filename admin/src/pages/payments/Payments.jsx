import "./payments.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import PDatatable from "../../components/pdatatable/PDatatable"

const Payments = () => {
    return (
        <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <PDatatable/>
      </div>
    </div>
    );
};

export default Payments;