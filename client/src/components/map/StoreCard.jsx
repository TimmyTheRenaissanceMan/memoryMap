import React from "react";
import { Card } from "react-bootstrap/";

function StoreCard(props) {
  return (
    <div
      className="storeCard"
      onClick={() => {
        props.setSelected(props.data);
        props.setZoom(15);
        props.setMapCenter({ lat: props.data.lat, lng: props.data.lng });
      }}
    >
      <Card.Body
        style={{ width: "100%", color: "#BA5B5B" }}
        variant="outline-secondary"
      >
        <h5 style={{ color: "#6E5757" }}>{props.data.name}</h5>
        <p className="mt-0 mb-1">{props.data.address}</p>
        <p className="mt-0 mb-1">{props.data.details}</p>
        {props.data.tel.map((tel) => {
          return (
            <p className="mt-0 mb-1">
              {tel}
              </p>
          );
        })}
        <p className="mt-0 mb-1">{props.data.city}</p>
      </Card.Body>
    </div>
  );
} 
export default StoreCard;