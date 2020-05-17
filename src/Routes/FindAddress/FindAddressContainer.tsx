import React, { useRef, useEffect, useState } from "react";
import FindAddressPresenter from "./FindAddressPresenter";
import { GoogleAPI } from "google-maps-react";
import ReactDOM from "react-dom";
import { toast } from "react-toastify";
import useInput from "src/Hooks/useInput";
import { reverseGeoCode } from "src/mapHelpers";


interface IProps {
  google: GoogleAPI;
}

//37.289285 127.045366

const FindAddressContainer: React.FC<IProps> = ({ google }) => {
  const mapRef = useRef<HTMLDivElement>();

  //   const [lat, setLat] = useState<number>(37.289285);
  //   const [lng, setLng] = useState<number>(127.045366);
  const address = useInput();

  const handleGeoSuccess = (position: Position) => {
    const {
      coords: { latitude, longitude },
    } = position;
    loadMap(latitude, longitude);
  };

  const handleGeoError = () => {
    toast.error("can't find you..");
  };

  const loadMap = async (lat: number, lng: number) => {
    const maps = google.maps;
    const mapNode = ReactDOM.findDOMNode(mapRef.current) as Element;
    const center = {
      lat,
      lng,
    };
    const reversedAddress = await reverseGeoCode(center);
    if (reversedAddress) {
      address.setValue(reversedAddress);
    }
    const mapConfig: google.maps.MapOptions = {
      zoom: 15,
      center,
      disableDefaultUI: true,
    };
    if (mapNode) {
      const map = new maps.Map(mapNode, mapConfig);
      const marker = new maps.Marker({ position: center, map });
      const handleDrag = () => {
        const newCenter = map.getCenter();
        marker.setPosition(newCenter);
      };
      const getAddress = async () => {
        const newCenter = map.getCenter();
        const position = {
          lat: newCenter.lat(),
          lng: newCenter.lng(),
        };
        const reversedAddress = await reverseGeoCode(position);
        if (reversedAddress) {
          address.setValue(reversedAddress);
        }
      };
      map.addListener("drag", handleDrag);
      map.addListener("dragend", getAddress);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
  }, []);

  return (
    <FindAddressPresenter
      address={address.value}
      onChangeInput={address.onChange}
      mapRef={mapRef}
    />
  );
};

export default FindAddressContainer;
