import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import useFetch from "../../hooks/useFetch";
import "./featured.css";

const Featured = () => {
  const { dispatch } = useContext(SearchContext);
  const [destination, setDestination] = useState();
  const [dates, setDates] = useState([
    { startDate: new Date(), endDate: new Date() },
  ]);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const { data, loading, error } = useFetch(
    "/hotels/countByCity?cities=Berlin,Madrid,London"
  );

  const navigate = useNavigate();
  const handleSearch = (city) => {
    dispatch({
      type: "NEW_SEARCH",
      payload: { destination: city, dates, options },
    });
    navigate("/hotels", { state: { destination: city, dates, options } });
  };
  console.log(data);
  return (
    <div className="featured">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          <div className="featured-item" onClick={() => handleSearch("Berlin")}>
            <img
              className="featured-img"
              src="https://t-cf.bstatic.com/xdata/images/city/max500/349720.webp?k=b7eca2cb90afd858f294732b0d5c194af47e70386b5be99373e3ff03be95c515&o="
              alt=""
            />
            <div className="featured-titles">
              <h3>Berlin</h3>
              <h4>{data[0]} properties</h4>
            </div>
          </div>
          <div className="featured-item" onClick={() => handleSearch("Madrid")}>
            <img
              className="featured-img"
              src="https://t-cf.bstatic.com/xdata/images/city/max500/856691.webp?k=9cf21942b6aa8706b8721525de6a06b55e8980139ee21f53593982a8e988a55a&o="
              alt=""
            />
            <div className="featured-titles">
              <h3>Madrid</h3>
              <h4>{data[1]} properties</h4>
            </div>
          </div>
          <div className="featured-item" onClick={() => handleSearch("London")}>
            <img
              className="featured-img"
              src="https://t-cf.bstatic.com/xdata/images/city/max500/613095.webp?k=8caf960d96a59e284ac1518ac8777e89d17fda6572acd84dbec151f627c7bf07&o="
              alt=""
            />
            <div className="featured-titles">
              <h3>London</h3>
              <h4>{data[2]} properties</h4>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
