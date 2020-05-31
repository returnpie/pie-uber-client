export interface User {
  id: number;
  profilePhoto: string;
  firstName: string;
  lastName: string;
  email: string;
  isDriving: boolean;
}

export interface Place {
  id: number;
  name: string;
  address: string;
  isFav: boolean;
}

export interface Location {
  lat: number;
  lng: number;
}

export interface AddPlaceState {
  latLng: {
    lat: number;
    lng: number;
  };
  address: string;
}

export interface RideData {
  pickUpAddress: string;
  dropOffAddress: string;
  price: number;
  distance: string;
  passenger: {
    fullName: string;
    profilePhoto: string;
  }
  id: number;
}
