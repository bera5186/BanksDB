export const StateReducer = (draft, action) => {
  switch (action.type) {
    case "SET_SEARCH": {
      draft.search = action.payload.search;
      return;
    }
    case "SET_RESULT": {
      draft.autoCompleteResults = action.payload.results;
      draft.searchResults = [];
      return;
    }
    case "SET_CITY": {
      draft.city = action.payload.city;
      return;
    }
    case "SET_SEARCH_RESULT": {
      draft.searchResults = action.payload.results;
      draft.autoCompleteResults = []
      draft.n_results= action.payload.n_results;
      return;
    }
    case "SHOW_SUGGESTIONS": {
      draft.showSuggestions = action.payload.showSuggestions;
      return;
    }
    case "SET_BANK": {
      draft.bankId = action.payload.bank_id
      return;
    }
    case "SET_LOADING": {
      draft.isLoading = action.payload.isLoading
      return;
    }
    default:
      return;
  }
};
