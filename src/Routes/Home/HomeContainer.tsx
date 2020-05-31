import React, { useState, useRef, useEffect, useContext } from "react";
import { RouteComponentProps } from "react-router-dom";
import HomePresenter from "./HomePresenter";
import { GoogleAPI } from "google-maps-react";
import ReactDOM from "react-dom";
import { toast } from "react-toastify";
import { Location } from "src/types";
import useInput from "src/Hooks/useInput";
import { geoCode, reverseGeoCode } from "src/mapHelpers";
import { useMutation, useQuery, useSubscription } from "@apollo/react-hooks";
import {
  REPORT_LOCATION,
  GET_NEARBY_DRIVERS,
  REQUEST_RIDE,
  GET_NEARBY_RIDE,
  SUBSCRIBE_NEARBY_RIDES,
} from "./HomeQueries";
import { UserContext } from "src/Context/UserContext";

interface IProps extends RouteComponentProps {
  google: GoogleAPI;
}

const HomeContainer: React.FC<IProps> = ({ history }) => {
  const { user } = useContext(UserContext);
  const mapRef = useRef<HTMLDivElement>();
  const maps = google.maps;
  const [isMapNodeLoading, setIsMapNodeLoading] = useState<boolean>(false);
  const [map, setMap] = useState<google.maps.Map>();
  const [latLng, setLatLng] = useState<Location>({ lat: 0, lng: 0 });
  const [toLatLng, setToLatLng] = useState<Location>({ lat: 0, lng: 0 });
  const [distance, setDistance] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const address = useInput();
  const [fromAddress, setFromAddress] = useState<string>("");
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
  const { data: driversData } = useQuery(GET_NEARBY_DRIVERS, {
    skip: user.isDriving,
    // pollInterval: user.isDriving ? 0 : 1000,
  });
  const { subscribeToMore, data: rideData } = useQuery(GET_NEARBY_RIDE, {
    skip: !user.isDriving,
  });
  useEffect(() => {
    if (user.isDriving) {
      subscribeToMore({
        document: SUBSCRIBE_NEARBY_RIDES,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) {
            return prev;
          } else {
            const newObject = Object.assign({}, prev, {
              GetNearbyRide: {
                ...prev.GetNearbyRide,
                ride: subscriptionData.data.NearbyRideSubscription,
              },
            });
            console.log(newObject);
            return newObject;
          }
        },
      });
    }
  }, [user.isDriving]);
  // const { data: rideData } = useSubscription(SUBSCRIBE_NEARBY_RIDES, {
  //   skip: !user.isDriving,
  // });

  // console.log(rideData);

  // useEffect(() => {
  //   console.log(rideData);
  // }, [rideData]);

  console.log(map, isMapNodeLoading);

  const [reportLocationMutation] = useMutation(REPORT_LOCATION);
  const [requestRideMutation] = useMutation(REQUEST_RIDE);

  const isMapNodeLoaded = () => {
    setIsMapNodeLoading(true);
  };

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

  const getFromAddress = async (lat: number, lng: number) => {
    const address = await reverseGeoCode({ lat, lng });
    if (address) {
      setFromAddress(address);
    }
  };

  const handleGeoSuccess: PositionCallback = (position: Position) => {
    console.log("go succ");
    const {
      coords: { latitude: lat, longitude: lng },
    } = position;
    loadMap(lat, lng);
  };

  const handleGeoError: PositionErrorCallback = () => {
    toast.error("can't find you..");
    getUserPosition();
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
          setPrice(price);
        } else {
          toast.error("There is no route there..");
        }
      });
    }
  };

  const handleNearbyDrivers = (driversData) => {
    if (map) {
      if (driversData && "GetNearbyDrivers" in driversData) {
        const {
          GetNearbyDrivers: { drivers, ok },
        } = driversData;
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

  const setRideRouterPath = (rideId: number) => {
    history.push(`/ride/${rideId}`, { rideId });
  };

  const onClickRequestButton = async () => {
    const { data } = await requestRideMutation({
      variables: {
        pickUpAddress: fromAddress,
        pickUpLat: latLng.lat,
        pickUpLng: latLng.lng,
        dropOffAddress: address.value,
        dropOffLat: toLatLng.lat,
        dropOffLng: toLatLng.lng,
        price,
        distance,
        duration,
      },
    });
    if (data && data.RequestRide && data.RequestRide.ok) {
      toast.success("Drive requested, finding a driver");
      setRideRouterPath(data.RequestRide.ride.id);
    } else {
      toast.error(data.RequestRide.error);
    }
  };

  const loadMap = (lat: number, lng: number) => {
    console.log("start load");
    const mapNode = ReactDOM.findDOMNode(mapRef.current) as Element;
    console.log("find");
    if (!mapNode) {
      console.log("reload");
      loadMap(lat, lng);
    } else {
      const center = {
        lat,
        lng,
      };
      const mapConfig: google.maps.MapOptions = {
        zoom: 15,
        center,
        disableDefaultUI: true,
      };
      const map = new maps.Map(mapNode, mapConfig);
      console.log(map);
      const newMarker = new google.maps.Marker({
        icon: {
          path: maps.SymbolPath.CIRCLE,
          scale: 7,
        },
        position: center,
        map,
      });
      setMarKer(newMarker);
      setLatLng(center);
      getFromAddress(lat, lng);
      setMap(map);
    }
  };

  const getUserPosition = () => {
    navigator.geolocation.getCurrentPosition(
      handleGeoSuccess,
      handleGeoError,
      { timeout: 2000 }
    );
  }

  useEffect(() => {
    if (isMapNodeLoading) {
      console.log("go");
      getUserPosition();
    }
  }, [isMapNodeLoading]);

  useEffect(() => {
    if (map) {
      const watchOptions: PositionOptions = {
        enableHighAccuracy: true,
      };
      navigator.geolocation.watchPosition(
        handleGeoWatchSuccess,
        handleGeoWatchError,
        watchOptions
      );
    }
  }, [map]);

  useEffect(() => {
    if (driversData) {
      handleNearbyDrivers(driversData);
    }
  }, [driversData]);

  useEffect(() => {
    if (user.isDriving) {
      const newDriverMarkers = driverMarkers;
      newDriverMarkers.map((driverMarker) => {
        driverMarker.setMap(null);
      });
      setDriverMarkers(newDriverMarkers);
    }
  }, [user.isDriving]);

  return (
    <HomePresenter
      isMapNodeLoaded={isMapNodeLoaded}
      user={user}
      isMenuOpen={isMenuOpen}
      onSetOpen={onSetOpen}
      address={address.value}
      onChangeInput={address.onChange}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
      onClickButton={onClickButton}
      price={price ? price.toLocaleString() : ""}
      onClickRequestButton={onClickRequestButton}
      rideData={rideData}
      mapRef={mapRef}
      setRideRouterPath={setRideRouterPath}
    />
  );
};
export default HomeContainer;
