import "./App.css";
import Navbar from "./containers/navigation";
import Home from "./containers/home";
import Footer from "./containers/footer";
import Login from "./containers/login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from "./containers/user";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="user" element={<User />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
