import useFetch from "../../hooks/useFetch";
import "./featured.css";

const Featured = () => {

  const {data, loading, error} = useFetch("/vehicles/countByVehicles")

  return (
    <div className="featured">
      {loading ? (
        "Loading please wait"
      ): (
      <><div className="featuredItem">
        <img
          src="https://images.pexels.com/photos/1280560/pexels-photo-1280560.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Fleet</h1>
          <h2>{data.count} properties</h2>
        </div>
      </div>
      
      <div className="featuredItem">
        <img
          src="https://images.pexels.com/photos/1854873/pexels-photo-1854873.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Photographers</h1>
          <h2>533 people</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img
          src="https://images.pexels.com/photos/10394786/pexels-photo-10394786.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Luxury</h1>
          <h2>532 properties</h2>
        </div>
      </div></>)}
    </div>
  );
};

export default Featured;
