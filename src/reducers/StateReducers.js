export const StateReducer = (draft, action) => {
  switch (action.type) {
    case "SET_SEARCH": {
      draft.search = action.payload.search;
      return;
    }
    case "SET_RESULT": {
        draft.searchResults = action.payload.results
        return;
    }
    default:
      return;
  }
};
