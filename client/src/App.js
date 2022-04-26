import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css"

import Header from './components/partials/header';
import Footer from './components/partials/footer';
import Home from './routes/Home';

function App() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const resizeFunction = () => {
    setWindowWidth(()=> {return window.innerWidth});
  };

  window.addEventListener('resize', function(event) {
    resizeFunction();
}, true)


  return (
    <div className="App">
    <Header windowWidth={windowWidth} />
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
