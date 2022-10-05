import { GoogleMap, withScriptjs, withGoogleMap, Marker } from "react-google-maps";

function Map(props) {
  console.log(props.marker.position);
  // { lat: -12.1877684, lng: -76.9374339 }
  // defaultCenter={{ ...props.marker.position }}
  return (
    <GoogleMap defaultZoom={15} center={{ ...props.marker.position }}>
      <Marker {...props.marker} onRightClick={() => props.onMarkerRightClick(props.marker)} />
    </GoogleMap>
  );
}
export default withScriptjs(withGoogleMap(Map));
