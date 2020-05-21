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
  const [latLng, setLatLng] = useState<Location>({ lat: 0, lng: 0 });
  const [toLatLng, setToLatLng] = useState<Location>({ lat: 0, lng: 0 });
  const address = useInput();
  const [marker, setMarKer] = useState<google.maps.Marker | undefined>(
    undefined
  );
  const [toMarker, setToMarKer] = useState<google.maps.Marker | undefined>(
    undefined
  );

  const [directions, setDirections] = useState<
    google.maps.DirectionsRenderer | undefined
  >(undefined);

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
    }
  };

  const handleGeoSuccess: PositionCallback = (position: Position) => {
    const {
      coords: { latitude: lat, longitude: lng },
    } = position;
    setLatLng({ lat, lng });
    loadMap(lat, lng);
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
      setLatLng({ lat, lng });
      if (marker) {
        marker.setPosition({ lat, lng });
      }
    }
  };

  const handleGeoWatchError = () => {
    toast.error("can't watching you..");
  };

  const onClickButton = () => {
    if (map) {
      if (toMarker) {
        toMarker.setMap(null);
      }
      const newMarker = new maps.Marker({ position: toLatLng, map });
      setToMarKer(newMarker);
      const bounds = new maps.LatLngBounds();
      bounds.extend(latLng);
      bounds.extend(toLatLng);
      map.fitBounds(bounds);
      if (directions) {
        directions.setMap(null);
      }
      const rendererOptions: google.maps.DirectionsRendererOptions = {
        suppressMarkers: true,
        polylineOptions: {
          strokeColor: "#000",
        },
      };
      const newDirections = new google.maps.DirectionsRenderer(rendererOptions);
      setDirections(newDirections);
      const directionService: google.maps.DirectionsService = new google.maps.DirectionsService();
      const destination = new google.maps.LatLng(toLatLng);
      const origin = new google.maps.LatLng(latLng);
      const directionsOptions: google.maps.DirectionsRequest = {
        destination,
        origin,
        travelMode: google.maps.TravelMode.TRANSIT,
      };
      directionService.route(directionsOptions, (result, status) => {
        console.log(result, status);
        if (status === google.maps.DirectionsStatus.OK) {
          const { routes } = result;
          console.log(routes);
          // const {
          //   distance: { text: distance },
          //   duration: { text: duration },
          // } = routes[0];
        } else {
          toast.error("There is no route there..");
        }
      });
    }
  };

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
      const newMarker = new google.maps.Marker({
        icon: {
          path: maps.SymbolPath.CIRCLE,
          scale: 7,
        },
        position: center,
        map,
      });
      setMarKer(newMarker);
      setMap(map);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
  }, []);

  useEffect(() => {
    console.log("watch");
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
