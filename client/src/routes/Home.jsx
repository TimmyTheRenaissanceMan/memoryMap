import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import mapStyles from "../components/map/mapStyles";
import store from "../store";
import { Button } from "react-bootstrap";

const libraries = ["places"];
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};
const MemoryMap = () => {
  const s3URL = process.env.REACT_APP_S3_URL;

  /* Map zoom => can be turned into a const 
  if there are no zoom effects/manipulations (e.g. zoom in marker on click) */
  const [zoom, setZoom] = useState(12);

  // New marker is set on map click. New marker is removed when clicked on
  const [newMarker, setNewMarker] = useState();

  // Array of all markers
  const [markers, setMarkers] = useState([]);

  //Google maps state
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries,
  });

  /* Selected marker. When marker is clicked, "selected" holds marker data and
  renders a tooltip */
  const [selected, setSelected] = useState(null);

  // Default map center coordinates
  const [mapCenter, setMapCenter] = useState({
    lat: 43.6532,
    lng: -79.3832,
  });

  const resetCoordinates = () => {
    setMapCenter({
      lat: 43.6532,
      lng:-79.3832
    })
  }

  /* Map ref is used to check if the map is ready/loaded. Can also be used for 
  map view manipulations */
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  // Listen to the store => if changes add marker data from store to all markers
  store.subscribe(() => {
    if (
      store.getState().markerData._id &&
      !markers.includes(store.getState().markerData)
    ) {
      setMarkers([...markers, store.getState().markerData]);
      setNewMarker();
    }
  });

  // Store new marker on map click && open side nav bar
  const handleMapClick = (event) => {
    store.dispatch({
      type: "saveMarker",
      payload: {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      },
    });
    store.dispatch({
      type: "openSideNav"
    });
    setNewMarker({ lat: event.latLng.lat(), lng: event.latLng.lng() });
  };

  // Get markers data
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
      {/* Add/Remove new marker */}
      {newMarker ? (
        <Marker
          key={`${newMarker.lat}-${newMarker.lng}`}
          position={{ lat: newMarker.lat, lng: newMarker.lng }}
          onClick={() => {
            setNewMarker();
            store.dispatch({
              type: "saveMarker",
              payload: {
                lat: 0,
                lng: 0,
              },
            });
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
      {/* Add all markers to the map */}
      {markers.map((marker) => (
        <Marker
          key={`${marker.lat}-${marker.lng}`}
          position={{ lat: marker.lat, lng: marker.lng }}
          onClick={() => {
            setSelected(marker);
            // setMapCenter({ lat: marker.lat, lng: marker.lng });
          }}
          icon={{
            url: `marker.svg`,
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(20, 40),
            scaledSize: new window.google.maps.Size(40, 40),
          }}
        />
      ))}

      {/* Open a selected marker tooltip */}
      {selected ? (
        <InfoWindow
          position={{ lat: selected.lat, lng: selected.lng }}
          onCloseClick={() => {
            setSelected(null);
          }}
        >
          <div>
            <p className="bold900 text-start tooltipTitle">
              {selected.name}
            </p>
            <hr />
            <p className="text-start">{selected.message}</p>
            {/* Add image if marker.image === true */}
            {selected.image ? (
              <img src={s3URL + "image/" + selected._id} alt="img" />
            ) : (
              ""
            )}
            {/* Add audio if marker.audio === true */}
            {selected.audio ? (
              <div>
                <audio controls>
                  <source src={s3URL + "audio/" + selected._id} />
                </audio>
              </div>
            ) : (
              ""
            )}
          </div>
        </InfoWindow>
      ) : null}
      <Button onClick={resetCoordinates} className="returnHomeBtn menuButton">Return Home</Button>
    </GoogleMap>
  );
};

export default MemoryMap;
