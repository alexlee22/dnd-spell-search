import React, { useReducer, createContext, useContext } from "react";

export const initialState = {
  playerClass: "",
  level: 1,
  spells: []
};

export const StateContext = createContext();
export const useStateStore = () => useContext(StateContext);
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const reducer = (state, action) => {
  switch (action.type) {
    case "setClass":
      console.log('store', action.payload)
      return { ...state, playerClass: action.payload }
    case "setLevel":
      return { ...state, level: action.payload }
    case "setSpells":
      return { ...state, spells: action.payload }
  }
};