import React, { useState, useRef, useEffect, useContext } from "react";
import { RouteComponentProps } from "react-router-dom";
import HomePresenter from "./HomePresenter";
import { GoogleAPI } from "google-maps-react";
import ReactDOM from "react-dom";
import { toast } from "react-toastify";
import { Location } from "src/types";
import useInput from "src/Hooks/useInput";
import { geoCode } from "src/mapHelpers";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { REPORT_LOCATION, GET_NEARBY_DRIVERS } from "./HomeQueries";
import { UserContext } from "src/Context/UserContext";

interface IProps extends RouteComponentProps {
  google: GoogleAPI;
}

const HomeContainer: React.FC<IProps> = () => {
  const { user } = useContext(UserContext);
  const mapRef = useRef<HTMLDivElement>();
  const maps = google.maps;
  const [map, setMap] = useState<google.maps.Map>();
  const [latLng, setLatLng] = useState<Location>({ lat: 0, lng: 0 });
  const [toLatLng, setToLatLng] = useState<Location>({ lat: 0, lng: 0 });
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const address = useInput();
  const [marker, setMarKer] = useState<google.maps.Marker | undefined>(
    undefined
  );
  const [toMarker, setToMarKer] = useState<google.maps.Marker | undefined>(
    undefined
  );
  const [driverMarkers, setDriverMarkers] = useState<google.maps.Marker[]>([]);
  const [directions, setDirections] = useState<
    google.maps.DirectionsRenderer | undefined
  >(undefined);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [reportLocationMutation] = useMutation(REPORT_LOCATION);
  const { data } = useQuery(GET_NEARBY_DRIVERS, {
    skip: user.isDriving,
    pollInterval: 1000,
  });

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

  const handleGeoWatchSuccess = async (position: Position) => {
    const {
      coords: { latitude: lat, longitude: lng },
    } = position;
    if (map) {
      await reportLocationMutation({
        variables: {
          lat,
          lng,
        },
      });
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
      const directionService: google.maps.DirectionsService = new google.maps.DirectionsService();
      const destination = new google.maps.LatLng(toLatLng);
      const origin = new google.maps.LatLng(latLng);
      const directionsOptions: google.maps.DirectionsRequest = {
        destination,
        origin,
        travelMode: google.maps.TravelMode.TRANSIT,
      };
      directionService.route(directionsOptions, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          const { routes } = result;
          const { legs } = routes[0];
          const {
            distance: { text: distance, value: price },
            duration: { text: duration },
          } = legs[0];
          if (directions) {
            directions.setMap(null);
          }
          newDirections.setDirections(result);
          newDirections.setMap(map);
          setDirections(newDirections);
          setDistance(distance);
          setDuration(duration);
          setPrice(price.toLocaleString());
        } else {
          toast.error("There is no route there..");
        }
      });
    }
  };

  const handleNearbyDrivers = (data) => {
    if (map) {
      if ("GetNearbyDrivers" in data) {
        const {
          GetNearbyDrivers: { drivers, ok },
        } = data;
        if (ok && drivers) {
          drivers.map((driver) => {
            if (driverMarkers) {
              const existingDriver:
                | google.maps.Marker
                | undefined = driverMarkers.find(
                (driverMarker: google.maps.Marker) => {
                  const markerId = driverMarker.get("ID");
                  return markerId === driver.id;
                }
              );

              if (existingDriver) {
                existingDriver.setPosition({
                  lat: driver.lastLat,
                  lng: driver.lastLng,
                });
                existingDriver.setMap(map);
              } else {
                handleDriverMarkers(driver);
              }
            } else {
              handleDriverMarkers(driver);
            }
          });
        }
      }
    }
  };

  const handleDriverMarkers = (driver) => {
    if (map) {
      const markerOptions: google.maps.MarkerOptions = {
        position: {
          // @ts-ignore
          lat: Number(driver.lastLat),
          // @ts-ignore
          lng: Number(driver.lastLng),
        },
        icon: {
          path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
          scale: 5,
        },
      };
      const newMarker: google.maps.Marker = new google.maps.Marker(
        markerOptions
      );
      // @ts-ignore
      newMarker.set("ID", driver.id);
      newMarker.setMap(map);
      const newMarkers = driverMarkers;
      driverMarkers.push(newMarker);
      setDriverMarkers(newMarkers);
    }
  };

  const loadMap = (lat: number, lng: number) => {
    const mapNode = ReactDOM.findDOMNode(mapRef.current) as Element;
    if (!mapNode) {
      loadMap(lat, lng);
    }
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
    const watchOptions: PositionOptions = {
      enableHighAccuracy: true,
    };
    navigator.geolocation.watchPosition(
      handleGeoWatchSuccess,
      handleGeoWatchError,
      watchOptions
    );
  }, [map]);

  useEffect(() => {
    handleNearbyDrivers(data);
  }, [data]);

  return (
    <HomePresenter
      user={user}
      isMenuOpen={isMenuOpen}
      onSetOpen={onSetOpen}
      address={address.value}
      onChangeInput={address.onChange}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
      onClickButton={onClickButton}
      price={price}
      mapRef={mapRef}
    />
  );
};
export default HomeContainer;
