import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import mapStyles from "../components/map/mapStyles";
import store from "../store"

const libraries = ["places"];
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};
const MemoryMap = () => {
  const s3URL = "https://timur-dev-test.s3.ca-central-1.amazonaws.com/";
  const [zoom, setZoom] = useState(12);
  const [newMarker, setNewMarker] = useState();
  const [markers, setMarkers] = useState([]);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBKVoeXaPLrEj3eDRpHEoJkIcDm_5XhnwU",
    libraries,
  });
  const [selected, setSelected] = useState(null);
  const [mapCenter, setMapCenter] = useState({
    lat: 43.6532,
    lng: -79.3832,
  });

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const handleMapClick = (event) => {
    console.log(event);
    console.log(event.latLng.lat());
    console.log(event.latLng.lng());
    store.dispatch({
      type: "saveMarker",
      payload: {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      }
    })

    setNewMarker({ lat: event.latLng.lat(), lng: event.latLng.lng() });
  };

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
      onClick={handleMapClick}
      onZoomChanged={() => {
        mapRef.current
          ? setZoom(mapRef.current.zoom)
          : console.log("map is loading");
      }}
    >
      {newMarker ? (
        <Marker
          key={`${newMarker.lat}-${newMarker.lng}`}
          position={{ lat: newMarker.lat, lng: newMarker.lng }}
          onClick={() => {
            setNewMarker();
          }}
          icon={{
            url: `newMarker.svg`,
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(20, 40),
            scaledSize: new window.google.maps.Size(40, 40),
          }}
        />
      ) : (
        ""
      )}

      {markers.map((marker) => (
        <Marker
          key={`${marker.lat}-${marker.lng}`}
          position={{ lat: marker.lat, lng: marker.lng }}
          onClick={() => {
            setSelected(marker);
            setMapCenter({ lat: marker.lat, lng: marker.lng });
          }}
          icon={{
            url: `marker.svg`,
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(20, 40),
            scaledSize: new window.google.maps.Size(40, 40),
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
            <p className="bold900 text-start tooltipTitle">
              {selected.location}
            </p>
            <hr />
            <p className="text-start">{selected.message}</p>
            {selected.image ? (
              <img src={s3URL + "images/" + selected._id} alt="img" />
            ) : (
              ""
            )}
            {selected.audio ? (
              <audio controls>
                <source src={s3URL + "audio/" + selected._id} />
              </audio>
            ) : (
              ""
            )}
          </div>
        </InfoWindow>
      ) : null}
    </GoogleMap>
  );
};

export default MemoryMap;
