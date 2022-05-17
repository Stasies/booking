import { format } from "date-fns";
import React, { useContext, useState } from "react";
import { DateRange } from "react-date-range";
import { useLocation } from "react-router-dom";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import SearchItem from "../../components/searchItem/SearchItem";
import "./list.css";
import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../../context/SearchContext";

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(
    location.state.dates || [
      { startDate: new Date(), endDate: new Date(), key: "selection" },
    ]
  );
  const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
  const [openDate, setOpenDate] = useState(false);
  // const [newDates, setNewDates] = useState([
  //   { startDate: new Date(), endDate: new Date(), key: "selection" },
  // ]);
  const { data, loading, error, reFetch } = useFetch(
    `/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`
  );

  console.log(dates);

  const handleClick = () => {
    reFetch();
  };
  const { dispatch } = useContext(SearchContext);
  const handleSearch = () => {
    dispatch({
      type: "NEW_SEARCH",
      payload: { destination, dates, options },
    });
    // navigate("/hotels", { state: { destination, newDates, options } });
  };
  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="list-container">
        <div className="list-wrapper">
          <div className="list-search">
            <h1 className="list-title">Search</h1>
            <div className="list-item">
              <label htmlFor="">Destination</label>
              <input type="text" placeholder={destination} name="" id="" />
            </div>
            <div className="list-item">
              <label htmlFor="">Check-in date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                dates[0].startDate,
                "MM/dd/yyyy"
              )} to ${format(dates[0].endDate, "MM/dd/yyyy")} `}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates[item.selection]}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>
            <div className="list-item">
              <label htmlFor="">Options</label>
              <div className="list-options">
                <div className="list-option-item">
                  <span className="list-option-text">
                    Min price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMin(e.target.value)}
                    className="list-option-input"
                  />
                </div>
                <div className="list-option-item">
                  <span className="list-option-text">
                    Max price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMax(e.target.value)}
                    className="list-option-input"
                  />
                </div>
                <div className="list-option-item">
                  <span className="list-option-text">Adult</span>
                  <input
                    type="number"
                    min={1}
                    placeholder={options.adult}
                    className="list-option-input"
                  />
                </div>
                <div className="list-option-item">
                  <span className="list-option-text">Children</span>
                  <input
                    type="number"
                    min={0}
                    placeholder={options.children}
                    className="list-option-input"
                  />
                </div>
                <div className="list-option-item">
                  <span className="list-option-text">Room</span>
                  <input
                    min={1}
                    type="number"
                    placeholder={options.room}
                    className="list-option-input"
                  />
                </div>
              </div>
            </div>
            <button onClick={handleSearch}>Search</button>
          </div>
          <div className="list-result">
            {loading ? (
              "loading"
            ) : (
              <>
                {data?.map((item) => (
                  <SearchItem item={item} key={item._id} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
