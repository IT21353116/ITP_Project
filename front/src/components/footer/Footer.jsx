import {  faPaperPlane, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="fLists">
        <ul className="fList">
          <li className="fListItem">Home </li>
          <li className="fListItem">Photographerss </li>
          <li className="fListItem">Fleet </li>
          <li className="fListItem">Contact us</li>
          <li className="fListItem">About us</li>
        </ul>
        <ul className="fList">
          <li className="fListItem">CONTACT US</li>
          <li className="fListItem">Rent & Run (PVT.) LTD.</li>
          <li className="fListItem">Lorem, ipsum dolor. </li>
          <li className="fListItem">Lorem, ipsum. </li>
          <li className="fListItem">Lorem. </li>
        </ul>
        <ul className="fList">
          <li className="fListItem"><FontAwesomeIcon icon={faPhone}/><span className="dt">+943567788</span> </li>
          <li className="fListItem"><FontAwesomeIcon icon={faPaperPlane}/><span className="dt">randr@gmail.com</span></li>
         
        </ul>
        <ul className="fList">
          <li className="fListItem">Follow us on</li>
          <li className="fListItem"><FontAwesomeIcon icon={faPhone}/></li>
          <li className="fListItem"><FontAwesomeIcon icon={faPhone}/></li>
          <li className="fListItem"><FontAwesomeIcon icon={faPhone}/></li>
          <li className="fListItem"><FontAwesomeIcon icon={faPhone}/></li>
        </ul>
      </div>
      <div className="fText">Copyright © 2023 R&S</div>
    </div>
  );
};

export default Footer;
