import { NavLink } from "react-router-dom";
//import Logo from "../../assets/Logo/Main_logo.png";
import "./css/navAuth.css";
import Logo from "../../assets/Logo/4B1G.png";

function Navlogin({ Title = "" }) {
  return (
    <div className="navAuth">
      <div>
        <NavLink to="/" className="navAuth--toHome">
          <img src={Logo} alt="Logo" height="200px" />
          <div className="navAuth--info"> {Title}</div>
        </NavLink>
      </div>
      <div>
        <NavLink to="/about" className="navAuth--info">
          Bạn cần giúp đỡ?
        </NavLink>
      </div>
    </div>
  );
}

export default Navlogin;
