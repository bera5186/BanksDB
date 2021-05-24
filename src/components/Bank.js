import React, { useContext, useEffect, useState } from 'react'
import { API_URL } from "../contants";
import { StateContext } from "../context/StateContext";

const Bank = () => {

    const { state } = useContext(StateContext)
    const [bank, setBank] = useState({})

    const fetchBank = async () => {
        let response = await fetch(`${API_URL}banks/${state.bankId}`)
        if(response.status === 200) {
            const { result } = await response.json()
            setBank(result)
        }
    }

    useEffect(() => {
        fetchBank();
    }, [])

    return (
        <div className="flex flex-col">
            
            {
                bank.name
            }
        </div>
    )
}

export default Bank
