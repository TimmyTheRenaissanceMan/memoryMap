import { useEffect, useState } from "react";

const Home = () => {
  const [connected, setConnected] = useState("");

  const checkConnection = async () => {
    console.log("here");
    const response = await fetch("/api/home", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setConnected(data?.data ? data.data : "");
  };

  useEffect(() => {
    checkConnection();
  }, []);

  return (
    <div className="text-center" style={{ position: "relative" }}>
      <img src="./img/bg.jpg" width="100%" alt="alienImg" />
      <h1
        style={{
          color: "white",
          position: "absolute",
          top: "30%",
          left: 0,
          right: 0,
        }}
      >
        {connected}
      </h1>
    </div>
  );
};

export default Home;