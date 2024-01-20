import "./App.css";
import Navbar from "./containers/navigation";
import Home from "./containers/home";
import Footer from "./containers/footer";
import Login from "./containers/login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from "./containers/user";
import GuardLogin from "./guards/login";
import GuardUser from "./guards/user";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route exact path="/login" element={<GuardLogin />}>
            <Route exact path="/login" element={<Login />} />
          </Route>
          <Route exact path="/user" element={<GuardUser />}>
            <Route exact path="/user" element={<User />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
