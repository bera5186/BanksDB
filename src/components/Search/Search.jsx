/**
 * Contains search components
 *  - Search Bar
 *  - City Select Option
 */

import React, { useContext, useState } from "react";

import { StateContext } from "../../context/StateContext";
import { API_URL } from "../../contants";

import AwesomeDebouncePromise from "awesome-debounce-promise";

const Search = () => {
  const { state, dispatch } = useContext(StateContext);
  const { searchResults } = state;

  const [val, setVal] = useState("");

  const autocompleteUrl = `${API_URL}branches/autocomplete?format=json&limit=25&offset=1`;

  const fetchData = async () => {
    let response = await fetch(`${autocompleteUrl}&q=${val}`);

    if (response.status === 200) {
      const data = await response.json();
      dispatch({ type: "SET_RESULT", payload: { results: data.result } });
    }
  };

  const fetchDataDebounced = AwesomeDebouncePromise(fetchData, 200);

  return (
    <div className="flex justify-between items-center mt-4 z-40 mb-10">
      <div class="relative w-1/5 border-none">
        <select class="focus:outline-none appearance-none border-none inline-block py-3 pl-3 pr-8 rounded leading-tight w-full">
          <option className="pt-6">State</option>
          <option className="pt-6">Banglore</option>
          <option className="pt-6">Delhi</option>
          <option className="pt-6"></option>
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
          <i class="fas fa-chevron-down text-gray-400"></i>
        </div>
      </div>
      <form className="w-2/4">
        <input
          className="w-full h-10 p-3 focus:outline-none rounded-md  border-2"
          placeholder="Enter Search Query"
          onChange={(e) => {
            if (e.target.value === "") {
              dispatch({ type: "SET_RESULT", payload: { results: [] } });
            }

            dispatch({
              type: "SET_SEARCH",
              payload: { search: e.target.value },
            });
            setVal(e.target.value);
            if (val.length > 1) {
              fetchDataDebounced();
            }
          }}
        />
      </form>
      {/* {searchResults.length === 0 ? (
        ""
      ) : (
        <ul>
          {state.searchResults.map((result) => {
            return <li>{result.branch}</li>;
          })}
        </ul>
      )} */}
    </div>
  );
};

export default Search;
