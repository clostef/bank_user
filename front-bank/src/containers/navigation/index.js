import { Link } from "react-router-dom";
import iconUser from "../../assets/img/argentBankLogo.avif";
import { useSelector, useDispatch } from "react-redux";
import { setToken, setUser } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
import "./style.css";

const Navbar = () => {
  const user = useSelector((state) => state.user.infos);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signOut = () => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    navigate("/");
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={iconUser}
          alt="Argent Bank Logo"
        />
      </Link>
      <div>
        {user ? (
          <>
            <Link className="main-nav-item" to="/user">
              <i
                className="fa fa-user-circle"
                style={{ paddingRight: "5px", marginLeft: "5px" }}
              ></i>
              {user.userName}
            </Link>
            <span
              className="main-nav-item"
              style={{ cursor: "pointer" }}
              onClick={signOut}
            >
              <i
                className="fa fa-sign-out"
                style={{ paddingRight: "5px", marginLeft: "5px" }}
              ></i>
              Sign Out
            </span>
          </>
        ) : (
          <Link className="main-nav-item" to="/login">
            <i
              className="fa fa-user-circle"
              style={{ paddingRight: "5px" }}
            ></i>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
