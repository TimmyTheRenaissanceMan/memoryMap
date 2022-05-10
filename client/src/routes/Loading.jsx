import { useState, useEffect } from "react";
import { propTypes } from "react-bootstrap/esm/Image";
import ProgressBar from 'react-bootstrap/ProgressBar'

export default function Loading(props) {
  const [count, setCount] = useState(0);

  const progress = () => {
    let progress = 0;
    setInterval(function() {
        progress ++;
         if(progress < 100) {
            setCount(prev => ++prev);
         } else {
             setCount(100);
             props.setLoaded(true);
         }
 }, 50);
  }

  useEffect(() => {
    progress();
  }, [])

  return (
    <div className="loadingScreen">
      <div className="text-center">
        <img className="logoWhite text-center" src="./whiteLogo.png" alt="logo" />
      </div>
      <div>
      <ProgressBar now={count} />
      </div>
    </div>
  );
}
