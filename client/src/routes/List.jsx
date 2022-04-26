import React, { useState, useEffect } from "react";
import { Container, Card } from "react-bootstrap/";

const List = () => {
  const [markers, setMarkers] = useState([]);
  const s3URL = "https://timur-dev-test.s3.ca-central-1.amazonaws.com/";

  const getMarkers = async () => {
    const response = await fetch("/api/marker", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    });
    const data = await response.json();
    if (data) {
      console.log(data);
      setMarkers(data);
    }
  };

  useEffect(() => {
    getMarkers();
  }, []);

  return (
    <Container className="pe-5 ps-5" style={{ paddingTop: "200px", paddingBottom: "100px" }}>
      {markers.map((marker, index) => {
        return (
          <Card className="mt-3" style={{borderRadius: "15px"}}>
            <Card.Body>
              <p className="text-start bold900 fs14">
  
                <span className="darkBlueText">{marker.location}</span> <span className="greyText">by {marker.name}</span>
                
              </p>
              <p className="text-start bold900 greyText fs12">
                <span>{marker.lat.toFixed(5)}</span>
                <span className="ms-3">{marker.lng.toFixed(5)}</span>
              </p>
              <p className="text-start fs14 fontForum">{marker.message}</p>
              {marker.image ? (
                <img
                  className="float-start"
                  src={s3URL + "images/" + marker._id}
                />
              ) : (
                ""
              )}
              {marker.audio ? (
                <audio controls style={{width:"100%"}}>
                  <source src={s3URL + "audio/" + marker._id} />
                </audio>
              ) : (
                ""
              )}
            </Card.Body>
          </Card>
        );
      })}
    </Container>
  );
};

export default List;
