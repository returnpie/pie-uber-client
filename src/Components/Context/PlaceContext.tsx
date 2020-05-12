import React, { useState, createContext } from "react";
import { Place } from "src/types";

interface PlaceContext {
  places: Place[];
  setPlaces: (newPlaces: Place[]) => void;
}

interface IProps {
  children: JSX.Element;
}

const initPlaces: Place[] = [{
  id: 0,
  name: 'default name',
  address: 'default address',
  isFav: false
}];

const context: PlaceContext = {
  places: initPlaces,
  setPlaces: (newPlaces: Place[]) => {},
};

export const PlaceContext = createContext<PlaceContext>(context);

export const PlaceContextProvider: React.FC<IProps> = ({ children }) => {

  const [places, setPlaces] = useState<Place[]>(initPlaces);

  return (
    <PlaceContext.Provider value={{ places, setPlaces }}>
      {children}
    </PlaceContext.Provider>
  );
};
