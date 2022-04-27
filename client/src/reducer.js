export default function reducer(
  state = {
    marker: {
      lat: 0,
      lng: 0,
    },
    markerData:{
    }
  },
  action
) {
  switch (action.type) {
    case "saveMarker":
      return {
        ...state,
        marker: {
          lat: action.payload.lat,
          lng: action.payload.lng,
        },
      };
    case "addMarkerToAll":
      return {
        ...state,
        markerData: action.payload,
      };
    default:
      return state;
  }
}
