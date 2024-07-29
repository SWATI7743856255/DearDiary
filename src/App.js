import "./App.css";
import About from "./components/About";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from "./context/NoteState";
import Alert from "./components/Alert";
import Signup from "./components/Signup";
import Login from "./components/Login";
import AlertState from "./context/alert/AlertState";

function App() {
  return (
    <>
    <AlertState>
      <NoteState>
        <Router>
          <Navbar />
          <Alert/>
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Signup" element={<Signup />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
      </AlertState>
    </>
  );
}

export default App;
