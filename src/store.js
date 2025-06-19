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

    case "add_favorite":
      if (store.favorites.includes(action.payload)) return store;
      return { ...store, favorites: [...store.favorites, action.payload] };

    case "remove_favorite":
      return {
        ...store,
        favorites: store.favorites.filter(fav => fav !== action.payload)
      };

    default:
      throw new Error("Unknown action: " + action.type);
  }
}