import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/partials/header";
import Home from "./routes/Home";
import List from "./routes/List";

function App() {
  /* Listen to the window size => pass width to the header => 
  => adjust nav bar design accordingly                      */
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const resizeFunction = () => {
    setWindowWidth(() => {
      return window.innerWidth;
    });
  };

  window.addEventListener(
    "resize",
    function (event) {
      resizeFunction();
    },
    true
  );

  return (
    <div className="App">
      <Header windowWidth={windowWidth} />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<List />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
