import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch("/hotels?featured=true&limit=4");
  const { dispatch } = useContext(SearchContext);
  const [destination, setDestination] = useState();
  const [hotelId, setHotelId] = useState();
  const [dates, setDates] = useState([
    { startDate: new Date(), endDate: new Date() },
  ]);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const navigate = useNavigate();
  const handleSearch = () => {
    dispatch({
      type: "NEW_SEARCH",
      payload: { destination, dates, options },
    });
    navigate(`/hotels/`, { state: { destination, dates, options } });
  };
  const selectHotel = (city, id) => {
    // setDestination(city);
    // setHotelId(id);
    dispatch({
      type: "NEW_SEARCH",
      payload: { destination: city, dates, options },
    });
    navigate(`/hotels/${id}`, { state: { destination: city, dates, options } });
  };
  return (
    <div className="fp">
      {loading ? (
        "loading"
      ) : (
        <>
          {data.map((place, index) => (
            <div
              className="fp-item"
              key={index}
              onClick={() => selectHotel(place.city, place._id)}
            >
              <img src={place.photos[0]} alt="" className="fp-img" />
              <span className="fp-name">{place.name}</span>
              <span className="fp-city">{place.city}</span>
              <span className="fp-price">
                Starting from ${place.cheapestPrice}
              </span>
              {place.rating && (
                <div className="fp-rating">
                  <button>{place.rating}</button>
                  <span>Excellent</span>
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
