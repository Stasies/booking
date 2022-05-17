import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "./reserve.css";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const Reserve = ({ setOpen, hotelId }) => {
  const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { dates } = useContext(SearchContext);
  const navigate = useNavigate();

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());
    let dates = [];
    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };
  const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate);
  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      allDates.includes(new Date(date).getTime())
    );
    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };
  console.log(selectedRooms);

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(`/rooms/availability/${roomId}`, {
            dates: allDates,
          });
          return res.data;
        })
      );
      setOpen(false);
      Navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="reserve">
      <div className="reserve-container">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="reserve-close"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms</span>
        {data.length > 1 ? (
          data.map((item) => (
            <div className="reserve-item" key={item._id}>
              <div className="reserve-item-info">
                <div className="reserve-item-title">{item.title}</div>
                <div className="reserve-item-description">{item.desc}</div>
                <div className="reserve-item-max">
                  Max people: {item.maxPeople}
                </div>
                <div className="reserve-price">{item.price}</div>
              </div>
              <div className="reserve-select-rooms">
                {item.roomNumbers.map((roomNumber) => (
                  <div className="room">
                    <label htmlFor="">{roomNumber.number}</label>
                    <input
                      type="checkbox"
                      value={roomNumber._id}
                      onChange={handleSelect}
                      disabled={!isAvailable(roomNumber)}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p style={{ color: "grey" }}>No rooms are available yet</p>
        )}
        <button className="reserve-button" onClick={handleClick}>
          Reserve now
        </button>
      </div>
    </div>
  );
};

export default Reserve;
