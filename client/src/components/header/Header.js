import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { DateRange } from "react-date-range";
import { useContext, useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";

const Header = ({ type }) => {
  const [openDate, setOpenDate] = useState(false);
  const [destination, setDestination] = useState();
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const navigate = useNavigate();
  const [dates, setDates] = useState([
    { startDate: new Date(), endDate: new Date(), key: "selection" },
  ]);
  const { user } = useContext(AuthContext);

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const { dispatch } = useContext(SearchContext);
  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    navigate("/hotels", { state: { destination, dates, options } });
  };
  return (
    <div className="header">
      <div
        className={
          type === "list" ? "header-container list-mode" : "header-container"
        }
      >
        <div className="header-list">
          <div className="header-list-item active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          <div className="header-list-item">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
          <div className="header-list-item">
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
          </div>
          <div className="header-list-item">
            <FontAwesomeIcon icon={faBed} />
            <span>Attractions</span>
          </div>
          <div className="header-list-item">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport taxis</span>
          </div>
        </div>
        {type !== "list" && (
          <>
            <h1 className="header-title">
              {" "}
              A lifetime of discounts? It's Genius.
            </h1>
            <p className="header-desc">
              Get rewarded for your travels - unlock instant savings of 10% or
              more with a free booking account.
            </p>
            {!user && (
              <button className="header-btn">Sign in / Register</button>
            )}
            <div className="header-search">
              <div className="header-search-item">
                <FontAwesomeIcon icon={faBed} className="header-icon" />
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className="header-search-input"
                  name=""
                  id=""
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <div className="header-search-item">
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  className="header-icon"
                />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="header-search-text"
                >{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                  dates[0].endDate,
                  "MM/dd/yyyy"
                )} `}</span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    minDate={new Date()}
                    className="date"
                  />
                )}
              </div>
              <div className="header-search-item">
                <FontAwesomeIcon icon={faPerson} className="header-icon" />
                <span
                  className="header-search-text"
                  onClick={() => setOpenOptions(!openOptions)}
                >
                  {`${options.adult} adults ${options.children} children ${options.room} room`}

                  {openOptions && (
                    <div className="options">
                      <div className="option-item">
                        <span className="option-text">Adult</span>
                        <div className="option-counter">
                          <button
                            disabled={options.adult <= 1}
                            className="option-counter-button"
                            onClick={() => handleOption("adult", "d")}
                          >
                            -
                          </button>
                          <span className="option-counter-number">
                            {options.adult}
                          </span>
                          <button
                            className="option-counter-button"
                            onClick={() => handleOption("adult", "i")}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="option-item">
                        <span className="option-text">Children</span>
                        <div className="option-counter">
                          <button
                            disabled={options.children <= 0}
                            className="option-counter-button"
                            onClick={() => handleOption("children", "d")}
                          >
                            -
                          </button>
                          <span className="option-counter-number">
                            {options.children}
                          </span>
                          <button
                            className="option-counter-button"
                            onClick={() => handleOption("children", "i")}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="option-item">
                        <span className="option-text">Room</span>
                        <div className="option-counter">
                          <button
                            disabled={options.room <= 1}
                            className="option-counter-button"
                            onClick={() => handleOption("room", "d")}
                          >
                            -
                          </button>
                          <span className="option-counter-number">
                            {options.room}
                          </span>
                          <button
                            className="option-counter-button"
                            onClick={() => handleOption("room", "i")}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </span>
              </div>
              <div className="header-search-item">
                <button className="header-search-btn" onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
