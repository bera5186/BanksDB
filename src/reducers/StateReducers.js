export const StateReducer = (draft, action) => {
  switch (action.type) {
    case "SET_SEARCH": {
      draft.search = action.payload.search;
      return;
    }
    case "SET_RESULT": {
        if(action.payload.results.length === 0) {
          draft.searchResults = []
          draft.noResult = true
          return;
        }
        draft.searchResults = action.payload.results
        draft.noResult = false
        return;
    }
    default:
      return;
  }
};
