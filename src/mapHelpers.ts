import axios from "axios";
import { MAPS_KEY } from "./keys";
import { toast } from "react-toastify";
import { Location } from "./types";

export const geoCode = async (address: string) => {
  const URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${MAPS_KEY}`;
  const { data } = await axios(URL);
  console.log(data);
  if (data && data.results) {
    const { results } = data;
    const firstPlace = results[0];
    const {
      formatted_address,
      geometry: { location },
    } = firstPlace;
    return { formatted_address, location };
  } else {
    toast.error(data.error_message);
    return false;
  }
};

export const reverseGeoCode = async ({ lat, lng }: Location) => {
  console.log(data)''
  const URL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${MAPS_KEY}`;
  const { data } = await axios(URL);
  if (data && data.results) {
    const { results } = data;
    const firstPlace = results[0];
    const address = firstPlace.formatted_address;
    return address;
  } else {
    toast.error(data.error_message);
    return false;
  }
};
