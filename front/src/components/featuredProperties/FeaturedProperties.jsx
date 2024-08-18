import "./featuredProperties.css";
import useFetch from "../../hooks/useFetch";

const FeaturedProperties = () => {
  //fix limit error
  const {data, loading, error} = useFetch("/vehicles?featured=true")

  return (
    <div className="fp">
      {loading ? ("Loading") : ( <>
      {data.map((item) => (
      <div className="fpItem" key={item._id}>
        
        {item.photos &&<img
          src={item.photos[0]}
          alt=""
          className="fpImg"
        />}
        <span className="fpName">{item.name}</span>
        <span className="fpType">{item.type}</span>
        <span className="fpPrice">Starting from ${item.price}</span>
        {item.ratings && <div className="fpRating">
          <button>{item.ratings}</button>
          <span>Excellent</span>
        </div>}
      </div>
      ))}
      </>)}
    </div>
  );
};

export default FeaturedProperties;
