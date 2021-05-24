import React, { useEffect, useState, useContext } from "react";
import { API_URL } from "../../contants";
import { StateContext } from "../../context/StateContext";

export const COLUMNS = [
  {
    Header: "IFSC Code",
    accessor: "ifsc",
  },
  {
    Header: "Branch Name",
    accessor: "branch",
  },
  {
    Header: "City",
    accessor: "city",
  },
  {
    Header: "State",
    accessor: "state",
  },
  {
    Header: "Address",
    Cell: (props) => {
      const { address } = props.data[props.cell.row.index];
      return <span className="text-sm">{address}</span>;
    },
  },
  {
    Header: "Bank Id",
    Cell: (props) => {
      const [showModal, setShowModal] = useState(false)

      const { dispatch } = useContext(StateContext)

      const toggleModal = () => {
        setShowModal(!showModal)
      }


      const { bank_id } = props.data[props.cell.row.index];
      return (
        <>
        {
          showModal ? <BankModal toggleModal={toggleModal} bank_id={bank_id} /> : ""
        }
        <a onClick={(e) =>  setShowModal(true)}>{bank_id}</a>
        </>
      )
    }
  }
];

const BankModal = ({ bank_id, toggleModal }) => {

  const [name, setName] = useState("")
  const [branches, setBranches] = useState(0)

  const fetchBank = async () => {
    let resp = await fetch(`${API_URL}banks/${bank_id}?format=json`)

    if(resp.status === 200) {
      let data = await resp.json()
      setName(data.result.name)
      setBranches(data.n_branch)
    }
  }

  useEffect(() => {
    fetchBank();
  }, [])
  return (
    <div className="w-full h-screen absolute top-0 left-0 bg-gray-400  z-50 flex items-center justify-center flex-col">
      <div className="w-1/2 z-60 bg-white rounded relative top-50 shadow-md py-4 text-left px-6">
        <h1 className="text-2xl text-red-900 mb-4">Important !</h1>
          Bank Id: { bank_id } <br />
          Name: { name } <br/>
          Number of Branches: { branches}
        <hr className="mt-2 mb-2 h=5" />
        <button
          onClick={() => {
            toggleModal();
          }}
          className="px-4 py-2 rounded text-white bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  )
}
