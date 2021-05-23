import React, { useContext } from "react";
import { StateContext } from "../context/StateContext";

const Suggestions = () => {
  const { state } = useContext(StateContext);

  return (
    <div className="flex items-center justify-end z-30 rounded -mt-10">
      <div className="overflow-y-scroll h-40 w-1/2 bg-gray-200 text-black">
        <ul className="divide-solid p-3 rounded">
          {state.noResult ? (
            <li>No Result Found</li>
          ) : (
            state.searchResults.map((result) => {
              return (
                <>
                  <li className="mb-2 mt-2 flex justify-between flex-col">
                    <span className="flex items-center justify-between">
                      <p>{result.branch}</p>
                      <p>
                        {result.city}, {result.state}
                      </p>
                    </span>
                    <p className="text-sm">{result.address}</p>
                  </li>
                  <hr />
                </>
              );
            })
          )}
        </ul>
      </div>
    </div>
  );
};

export default Suggestions;
