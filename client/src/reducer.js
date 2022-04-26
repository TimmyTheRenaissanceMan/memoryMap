export default function reducer(
  state = {
   marker:{
     lat: 0,
     lng: 0
   }
  },
  action
) {
  switch (action.type) {
    case "saveMarker":
      return {
        ...state,
        marker:{
          lat: action.payload.lat,
          lng: action.payload.lng
        }
      };
    default:
      return state
  }
}