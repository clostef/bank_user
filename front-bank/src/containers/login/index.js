import "./style.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const emailChange = (e) => {
    setData((d) => ({
      ...d,
      email: e.target.value,
    }));
  };

  const passwordChange = (e) => {
    setData((d) => ({
      ...d,
      password: e.target.value,
    }));
  };

  const connected = async (e) => {
    e.preventDefault();
    console.log("email", data);
    try {
      const response = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      console.log(response);
      if (!response.ok) {
        alert("l'utilisateur n'a pas été trouvé");
        return;
      }

      const loginResponse = await response.json();
      const token = loginResponse.body.token;
      // save token store
      dispatch(setToken(token));

      // get user info
      try {
        const response2 = await fetch(
          "http://localhost:3001/api/v1/user/profile",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          alert("l'utilisateur n'a pas été trouvé");
          return;
        }

        const userResponse = await response2.json();

        dispatch(setUser(userResponse.body));
      } catch (e) {
        alert("erreur serveur");
      }

      navigate("/user");
    } catch (e) {
      alert("erreur serveur");
    }
  };

  return (
    <main className="main bg-dark content-login">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form>
          <div className="input-wrapper">
            <label>Username</label>
            <input
              type="text"
              id="email"
              value={data.email}
              onChange={emailChange}
            />
          </div>
          <div className="input-wrapper">
            <label>Password</label>
            <input
              type="password"
              id="password"
              value={data.password}
              onChange={passwordChange}
            />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label>Remember me</label>
          </div>
          <button className="sign-in-button" onClick={connected}>
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
};

export default Login;
