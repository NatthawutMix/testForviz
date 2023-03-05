import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DetailBooking from "../src/page/detailBooking";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<></>} />
        <Route path="/bookings/thisweek" element={<DetailBooking />} />
        <Route path="/bookings/thisweek/:roomId" element={<DetailBooking />} />
      </Routes>
    </Router>
  );
}

export default App;
