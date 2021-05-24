import React, { useContext, useMemo } from 'react'
import { API_URL } from '../../contants'

import { StateContext } from '../../context/StateContext'
import { Table } from '../Shared/Table'
import { COLUMNS_AUTO_COMPLETE } from './AutocompleteResultColumns'
import { COLUMNS } from "./SearchResultColumns"



const SearchResult = () => {

    const { state, dispatch } = useContext(StateContext)

    const autoCompleteResults = useMemo(() => state.autoCompleteResults, [state.autoCompleteResults])
    const searchResults = useMemo(() => state.searchResults, [state.searchResults])
    const columns = useMemo(() => COLUMNS, [])
    const auto_columns = useMemo(() => COLUMNS_AUTO_COMPLETE, [])

    const autocomplete = async ( pagination ) => {
        let offset = pagination.pageIndex + 1 || 1;
        let limit = pagination.pageSize || 10;

        dispatch({ type: "SET_LOADING", payload: { isLoading: true }})
    
        let response = await fetch(`${API_URL}branches/autocomplete/?format=json&q=${state.search}&limit=${limit}&offset=${offset}`)
        
        if(response.ok) {
            dispatch({ type: "SET_LOADING", payload: { isLoading: false }})
        }
        if(response.status === 200) {
            let data = (await response.json()).result
            dispatch({ type: "SET_RESULT", payload: { results: data } });
            
        }
    }

    const search = async ( pagination ) => {
        let offset = pagination.pageIndex + 1 || 1;
        let limit = pagination.pageSize || 10;

        dispatch({ type: "SET_LOADING", payload: { isLoading: true }})

        let response = await fetch(`${API_URL}branches/search/?format=json&city=${state.city}&q=${state.search}&limit=${limit}&offset=${offset}`)
    
        if(response.status === 200) {
            let data = await response.json()
            dispatch({ type: "SET_SEARCH_RESULT", payload: { results: data.result, n_results: data.n_pages } });
            dispatch({ type: "SET_LOADING", payload: { isLoading: false }})
        }
    }

    return (
        <>
            {
                state.autoCompleteResults.length > 0  ? (
                    <Table columns={auto_columns} data={autoCompleteResults} fetchData={autocomplete} paginated={false}   />
                ) : "No auto complete result to show"
            }   
            {
                state.searchResults.length > 0 ? (
                    <Table columns={columns} data={searchResults} fetchData={search} pageCount={state.n_results} search={true} />
                ) : ""
            }
        </>
    )
}

export default SearchResult
