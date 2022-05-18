import { useState, useEffect } from "react";
import { propTypes } from "react-bootstrap/esm/Image";
import ProgressBar from "react-bootstrap/ProgressBar";

export default function Loading(props) {
  const [count, setCount] = useState(0);

  const progress = () => {
    let progress = 0;
    setInterval(function () {
      progress++;
      if (progress < 100 & count !== 99) {
        setCount((prev) => ++prev);
      } else {
        setTimeout(() => {
            props.setLoaded(true);
            setCount(100);
        }, 500);
      }
    }, 25);
  };

  useEffect(() => {
    progress();
  }, []);

  return (
    <div className="loadingScreen">
      <div className="text-center" style={{position: "relative", height: "100%"}}>
        <img
          className="logoWhite text-center"
          src="./whiteLogo.png"
          alt="logo"
        />
         <ProgressBar now={count} />
      </div>
      <div style={{height: "100%", position: "relative"}}>
       
      </div>
    </div>
  );
}
