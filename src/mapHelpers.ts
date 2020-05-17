import axios from "axios";
import { MAPS_KEY } from "./keys";
import { toast } from "react-toastify";

interface Position {
  lat: number;
  lng: number;
}

export const geoCode = () => {};

export const reverseGeoCode = async ({ lat, lng }: Position) => {
  const URL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${MAPS_KEY}`;
  const { data } = await axios(URL);
  if (data && data.results) {
    const { results } = data;
    const firstPlace = results[0];
    const address = firstPlace.formatted_address;
    return address;
  } else {
    toast.error(data.error_message);
  }
};
