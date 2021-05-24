/**
 * Contains search components
 *  - Search Bar
 *  - City Select Option
 */

import React, { useContext, useState } from "react";

import { StateContext } from "../../context/StateContext";
import { API_URL } from "../../contants";

import AwesomeDebouncePromise from "awesome-debounce-promise";
import { search } from "../../utils/search";

const Search = () => {
  const { state, dispatch } = useContext(StateContext);
  const { searchResults } = state;

  const autocompleteUrl = `${API_URL}branches/autocomplete?format=json&limit=25&offset=1`;

  const fetchData = async () => {
    let response = await fetch(`${autocompleteUrl}&q=${state.search}`);

    if (response.status === 200) {
      const data = await response.json();
      dispatch({ type: "SET_RESULT", payload: { results: data.result, n_results: data.n_pages } });
    }
  };

  const fetchDataDebounced = AwesomeDebouncePromise(fetchData, 200);

  const Search_ = async (e, pagination) => {
    e.preventDefault();

    let offset = pagination.pageIndex + 1 || 1;
    let limit = pagination.pageSize || 10;


    let response = await fetch(
      `${API_URL}branches/search/?format=json&city=${state.city}&q=${state.search}&limit=${limit}&offset=${offset}`
    );

    if (response.status === 200) {
      let data = (await response.json());
      dispatch({ type: "SET_SEARCH_RESULT", payload: { results: data.result, n_results: data.n_pages } });
    }
  };

  return (
    <div className="flex justify-between items-center mt-4 z-40 mb-10">
      <div className="relative w-1/5 border-none">
        <select
          className="focus:outline-none appearance-none border-none inline-block py-3 pl-3 pr-8 rounded leading-tight w-full"
          onClick={(e) => {
            dispatch({ type: "SET_CITY", payload: { city: e.target.value } });
          }}
        >
          <option className="pt-6" value="DELHI">
            Delhi
          </option>
          <option className="pt-6" value="MUMBAI">
            Mumbai
          </option>
          <option className="pt-6" value="KOLKATA">
            Kolkata
          </option>
          <option className="pt-6" value="BANGALORE">
            Bangalore
          </option>
          <option className="pt-6" value="PUNE">
            Pune
          </option>
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
          <i class="fas fa-chevron-down text-gray-400"></i>
        </div>
      </div>
      <form
        className="w-2/4"
        onSubmit={(e) => {
          Search_(e, {});
        }}
      >
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
            if (state.search.length > 1) {
              fetchDataDebounced();
            }
          }}
        />
      </form>
    </div>
  );
};

export default Search;
