import React, { createContext } from "react";
import { useImmerReducer } from "use-immer";

import { StateReducer } from "../reducers/StateReducers";

export const StateContext = createContext();

const initialState = {
  search: "",
  autoCompleteResults: [],
  noResult: false,
  city: "DELHI",
  searchResults: [],
  showSuggestions: false,
  bankId: 1,
  n_results: null,
  isLoading: false,
};

export const StateProvider = (props) => {
  const [state, dispatch] = useImmerReducer(StateReducer, initialState);

  return (
    <StateContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {props.children}
    </StateContext.Provider>
  );
};
