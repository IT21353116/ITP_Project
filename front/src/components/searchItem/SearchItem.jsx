import "./searchItem.css";
import {Link} from "react-router-dom"

const SearchItem = ({item}) => {
  return (
    <div className="searchItem">
      {item.photos && <img
        src={item.photos[0]}
        alt=""
        className="siImg"
      />}
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siMilage">{item.milage}</span>
        <span className="siType">{item.type}</span>
        <span className="siSubtitle">
        {item.title}
        </span>
        <span className="siFeatures">
          {item.feautures}
        </span>
        <span className="siCancelOp">No refund upon cancellation.</span>
        <span className="siCancelOpSubtitle">
        For detailed information, please refer to our policy.
        </span>
      </div>
      <div className="siDetails">
        {item.ratings && <div className="siRating">
          <span>Excellent</span>
          <button>{item.ratings}</button>
        </div>}
        <div className="siDetailTexts">
          <span className="siPrice">${item.price}</span>
          <span className="siTaxOp">With driver rates</span>
          <Link to={`/vehicles/${item._id}`}>
          <button className="siCheckButton">See availability</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
