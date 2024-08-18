import "./propertyList.css";
import useFetch from "../../hooks/useFetch";

const PropertyList = () => {

  const {data, loading, error} = useFetch("/vehicles/countByType?types=Car,Van,Bus,SUV,Threewheel")

  return (
    <div className="pList">
      {loading ? (
        "Loading please wait"
        ) : (
        <>
        <div className="pListItem">
        <img
          src="https://images.pexels.com/photos/376361/pexels-photo-376361.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
          className="pListImg"
        />
        <div className="pListTitles">
          <h1>Cars</h1>
          <h2>{data[0]} cars</h2>
        </div>
      </div>
      <div className="pListItem">
        <img
          src="https://images.pexels.com/photos/3796556/pexels-photo-3796556.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
          className="pListImg"
        />
        <div className="pListTitles">
          <h1>Vans</h1>
          <h2>{data[1]} vans</h2>
        </div>
      </div>
      <div className="pListItem">
        <img
          src="https://images.pexels.com/photos/2942172/pexels-photo-2942172.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
          className="pListImg"
        />
        <div className="pListTitles">
          <h1>Buses</h1>
          <h2>{data[2]} buses</h2>
        </div>
      </div>
      <div className="pListItem">
        <img
          src="https://images.pexels.com/photos/2676096/pexels-photo-2676096.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
          className="pListImg"
        />
        <div className="pListTitles">
          <h1>SUV</h1>
          <h2>{data[3]} SUV</h2>
        </div>
      </div>
      <div className="pListItem">
        <img
          src="https://images.pexels.com/photos/1682748/pexels-photo-1682748.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
          className="pListImg"
        />
        <div className="pListTitles">
          <h1>Threewheels</h1>
          <h2>{data[4]} threewheels</h2>
        </div>
      </div> 
      </>
        )}
    </div>
  );
};

export default PropertyList;
