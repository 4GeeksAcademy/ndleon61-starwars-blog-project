import { useContext, createContext, useReducer } from "react";

const Context = createContext(null);

export const initialStore = () => ({
  people: [],
  vehicles: [],
  planets: [],
  favorites: [],
  message: null
});

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_people":
      return { ...store, people: action.payload };

    case "set_vehicles":
      return { ...store, vehicles: action.payload };

    case "set_planets":
      return { ...store, planets: action.payload };

    case "toggle_favorite":
  const exists = store.favorites.some(
    fav => fav.uid === action.payload.uid && fav.type === action.payload.type
  );

  return {
    ...store,
    favorites: exists
      ? store.favorites.filter(
          fav => !(fav.uid === action.payload.uid && fav.type === action.payload.type)
        )
      : [...store.favorites, action.payload]
  };

    case "remove_favorite":
      return {
        ...store,
        favorites: store.favorites.filter(fav => fav !== action.payload)
      };

    default:
      throw new Error("Unknown action: " + action.type);
  }
}