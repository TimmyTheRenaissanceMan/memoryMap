import React, { useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { Row, Col } from "react-bootstrap/";
import storeData from "../components/map/StoreData";
import mapStyles from "../components/map/mapStyles";
import StoreCard from "../components/map/StoreCard";

const libraries = ["places"];
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};
const StoreLocations = () => {
  const [zoom, setZoom] = useState(12);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBKVoeXaPLrEj3eDRpHEoJkIcDm_5XhnwU",
    libraries,
  });
  const [selected, setSelected] = useState(null);
  const [mapCenter, setMapCenter] = useState({
    lat: 43.6532,
    lng: -79.3832,
  });
  console.log(mapCenter);
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
  <GoogleMap
            id="map"
            mapContainerStyle={{
              width: "100%",
              minHeight: "100vh",
              height: "auto",
            }}
            zoom={zoom}
            center={mapCenter}
            options={options}
            onLoad={onMapLoad}
            onZoomChanged={() => {
              mapRef.current
                ? setZoom(mapRef.current.zoom)
                : console.log("map is loading");
            }}
          >
            {storeData.map((marker) => (
              <Marker
                key={`${marker.lat}-${marker.lng}`}
                position={{ lat: marker.lat, lng: marker.lng }}
                onClick={() => {
                  setSelected(marker);
                  setZoom(15);
                  setMapCenter({ lat: marker.lat, lng: marker.lng });
                }}
                icon={{
                  url: `https://numee-kazakhstan.s3.eu-central-1.amazonaws.com/demo/logo numee.png`,
                  origin: new window.google.maps.Point(0, 0),
                  anchor: new window.google.maps.Point(30, 30),
                  scaledSize: new window.google.maps.Size(100, 20),
                }}
              />
            ))}

            {selected ? (
              <InfoWindow
                position={{ lat: selected.lat, lng: selected.lng }}
                onCloseClick={() => {
                  setSelected(null);
                }}
              >
                <div>
                  <h4>{selected.name}</h4>
                  <p>{selected.address}</p>
                  {selected.tel.map((tel) => {
                    return (
                      <a className="d-block mb-2" href={"tel:" + tel}>
                        {tel}
                      </a>
                    );
                  })}
                </div>
              </InfoWindow>
            ) : null}
          </GoogleMap>
  );
};

export default StoreLocations;