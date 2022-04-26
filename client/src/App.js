import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css"

import Header from './components/partials/header2';
import Footer from './components/partials/footer';
import Home from './routes/Home';

function App() {
  return (
    <div className="App">
    <Header />
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
