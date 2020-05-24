import React, { useRef, useEffect, useState } from "react";
import FindAddressPresenter from "./FindAddressPresenter";
import { GoogleAPI } from "google-maps-react";
import ReactDOM from "react-dom";
import { toast } from "react-toastify";
import useInput from "src/Hooks/useInput";
import { reverseGeoCode, geoCode } from "src/mapHelpers";
import { Location } from "src/types";
import { RouteComponentProps } from "react-router-dom";

interface IProps extends RouteComponentProps {
  google: GoogleAPI;
}

//37.289285 127.045366

const FindAddressContainer: React.FC<IProps> = ({ google, history }) => {
  const mapRef = useRef<HTMLDivElement>();

  const [map, setMap] = useState<google.maps.Map>();
  const [latLng, setlatLng] = useState<Location>({ lat: 0, lng: 0 });

  //   const [lat, setLat] = useState<number>(37.289285);
  //   const [lng, setLng] = useState<number>(127.045366);
  const address = useInput();

  const onKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      event.currentTarget.blur();
    }
  };

  const onBlur = async () => {
    const result = await geoCode(address.value);
    if (result) {
      setlatLng(result.location);
      address.setValue(result.formatted_address);
      if (map) {
        map.panTo(result.location);
      }
    }
  };

  const onClickButton = () => {
    history.push("/add-place", { latLng, address: address.value });
  };

  const handleGeoSuccess: PositionCallback = (position: Position) => {
    const {
      coords: { latitude, longitude },
    } = position;
    loadMap(latitude, longitude);
  };

  const handleGeoError: PositionErrorCallback = () => {
    toast.error("can't find you..");
  };

  const loadMap = async (lat: number, lng: number) => {
    const maps = google.maps;
    const mapNode = ReactDOM.findDOMNode(mapRef.current) as Element;
    if (!mapNode) {
      loadMap(lat, lng);
    }
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
      setMap(map);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
  }, []);

  return (
    <FindAddressPresenter
      address={address.value}
      onChangeInput={address.onChange}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
      onClickButton={onClickButton}
      mapRef={mapRef}
    />
  );
};

export default FindAddressContainer;
