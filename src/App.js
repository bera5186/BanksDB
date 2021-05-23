import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Search from "./components/Search/Search";
import { API_URL } from "./contants";
// import PageTitle from "./components/PageTitle";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [herokuResponseOk, setHerokuResponseOk] = useState("");

  useEffect(() => {
    //WakeUpHeroku();
  }, []);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const WakeUpHeroku = async () => {
    const response = await fetch(`${API_URL}banks/1?format=json`);
    console.log(`${API_URL} + banks/1?format=json`)
    console.log(response)
    
    if(response.status === 200) {
      setHerokuResponseOk(true)
      toggleModal();
    } else {
      setHerokuResponseOk(false);
      toggleModal();
    }
  }

  return (
    <div className="App">
      {/* <PageTitle>Banks Finder</PageTitle> */}
      <Navbar />
      {showModal ? <HerokuModal toggleModal={setShowModal} herokuResponseOk={herokuResponseOk} /> : ""}
      <div className="container">
        <Search />
      </div>
    </div>
  );
}

export default App;

function HerokuModal({ toggleModal, herokuResponseOk }) {
  return (
    <div className="w-full h-full absolute top-0 left-0 bg-gray-400 opacity-50 z-10 flex items-center justify-center flex-col">
      <div className="w-1/2 z-20 bg-white rounded relative top-50 shadow-md py-4 text-left px-6">
        <h1 className="text-2xl text-red-900 mb-4">Important !</h1>
        {
          herokuResponseOk ? <p>Backend APIs are Up!! Feel free to use the app</p> : <p>APIs seems to be down!! Check back later.</p>
        }
        <hr className="mt-2 mb-2 h=5"/>
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
  );
}
