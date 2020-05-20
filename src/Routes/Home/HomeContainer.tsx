import React, { useState, useRef, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import HomePresenter from "./HomePresenter";
import { GoogleAPI } from "google-maps-react";
import ReactDOM from "react-dom";
import { toast } from "react-toastify";
import { Location } from "src/types";
import useInput from "src/Hooks/useInput";
import { geoCode } from "src/mapHelpers";

interface IProps extends RouteComponentProps {
  google: GoogleAPI;
}

const HomeContainer: React.FC<IProps> = () => {
  const mapRef = useRef<HTMLDivElement>();
  const maps = google.maps;
  const [map, setMap] = useState<google.maps.Map>();
  const [toLatLng, setToLatLng] = useState<Location>({ lat: 0, lng: 0 });
  const address = useInput();
  const marker = new maps.Marker({
    icon: {
      path: maps.SymbolPath.CIRCLE,
      scale: 7,
    },
  });

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const onSetOpen = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const onKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      event.currentTarget.blur();
    }
  };

  const onBlur = async () => {
    const result = await geoCode(address.value);
    if (result) {
      setToLatLng(result.location);
      address.setValue(result.formatted_address);
      if (map) {
        map.panTo(result.location);
      }
    }
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

  const handleGeoWatchSuccess = (position: Position) => {
    const {
      coords: { latitude: lat, longitude: lng },
    } = position;
    if (map) {
      map.panTo({ lat, lng });
    }
    marker.setPosition({ lat, lng });
  };

  const handleGeoWatchError = () => {
    toast.error("can't watching you..");
  };

  const onClickButton = () => {};

  const loadMap = async (lat: number, lng: number) => {
    const mapNode = ReactDOM.findDOMNode(mapRef.current) as Element;
    const center = {
      lat,
      lng,
    };
    const mapConfig: google.maps.MapOptions = {
      zoom: 15,
      center,
      disableDefaultUI: true,
    };
    if (mapNode) {
      const map = new maps.Map(mapNode, mapConfig);
      marker.setMap(map);
      marker.setPosition(center);
      setMap(map);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
  }, []);

  useEffect(() => {
    const watchOptions: PositionOptions = {
      enableHighAccuracy: true,
    };
    navigator.geolocation.watchPosition(
      handleGeoWatchSuccess,
      handleGeoWatchError,
      watchOptions
    );
  }, [map]);

  return (
    <HomePresenter
      isMenuOpen={isMenuOpen}
      onSetOpen={onSetOpen}
      address={address.value}
      onChangeInput={address.onChange}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
      onClickButton={onClickButton}
      mapRef={mapRef}
    />
  );
};
export default HomeContainer;
