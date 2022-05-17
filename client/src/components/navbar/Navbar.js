import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, dispatch, error } = useContext(AuthContext);
  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };
  return (
    <div className="navbar">
      <div className="nav-container">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">booking</span>
        </Link>
        {!user ? (
          <div className="nav-items">
            <button className="nav-button">Register</button>
            <button className="nav-button">Login</button>
          </div>
        ) : (
          <div className="nav-items">
            <p>{user.username}</p>
            <button onClick={handleClick} className="nav-button">
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
