import React, { useContext, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Search from "./components/Search/Search";
import Suggestions from "./components/Suggestions";
import { API_URL } from "./contants";
import { StateContext } from "./context/StateContext";
// import PageTitle from "./components/PageTitle";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [herokuResponseOk, setHerokuResponseOk] = useState("");
  const { state } = useContext(StateContext);

  useEffect(() => {
    //WakeUpHeroku();
  }, []);

  const toggleModal = () => {
    setShowModal(!showModal);
  };


  const WakeUpHeroku = async () => {
    const response = await fetch(`${API_URL}banks/1?format=json`);
    console.log(`${API_URL} + banks/1?format=json`);
    console.log(response);

    if (response.status === 200) {
      setHerokuResponseOk(true);
      toggleModal();
    } else {
      setHerokuResponseOk(false);
      toggleModal();
    }
  };

  let mt;
  if(state.search !== "") {
    mt= "-mt-40"
  } else {
    mt=""
  }

  return (
    <div className="App">
      {/* <PageTitle>Banks Finder</PageTitle> */}
      <Navbar />
      {showModal ? (
        <HerokuModal
          toggleModal={setShowModal}
          herokuResponseOk={herokuResponseOk}
        />
      ) : (
        ""
      )}
      <div className="container">
        <Search />
        {state.search === "" ? "" : <Suggestions />}
        <div className={`z-10 ${mt}`}>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English. Many desktop publishing packages and web
          page editors now use Lorem Ipsum as their default model text, and a
          search for 'lorem ipsum' will uncover many web sites still in their
          infancy. Various versions have evolved over the years, sometimes by
          accident, sometimes on purpose (injected humour and the like). Where
          does it come from? Contrary to popular belief, Lorem Ipsum is not
          simply random text. It has roots in a piece of classical Latin
          literature from 45 BC, making it over 2000 years old. Richard
          McClintock, a Latin professor at Hampden-Sydney College in Virginia,
          looked up one of the more obscure Latin words, consectetur, from a
          Lorem Ipsum passage, and going through the cites of the word in
          classical literature, discovered the undoubtable source. Lorem Ipsum
          comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
          Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC.
          This book is a treatise on the theory of ethics, very popular during
          the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit
          amet..", comes from a line in section 1.10.32. The standard chunk of
          Lorem Ipsum used since the 1500s is reproduced below for those
          interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et
          Malorum" by Cicero are also reproduced in their exact original form,
          accompanied by English versions from the 1914 translation by H.
          Rackham. Where can I get some? There are many variations of passages
          of Lorem Ipsum available, but the majority have suffered alteration in
          some form, by injected humour, or randomised words which don't look
          even slightly believable. If you are going to use a passage of Lorem
          Ipsum, you need to be sure there isn't anything embarrassing hidden in
          the middle of text. All the Lorem Ipsum generators on the Internet
          tend to repeat predefined chunks as necessary, making this the first
          true generator on the Internet. It uses a dictionary of over 200 Latin
          words, combined with a handful of mode
        </div>
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
        {herokuResponseOk ? (
          <p>Backend APIs are Up!! Feel free to use the app</p>
        ) : (
          <p>APIs seems to be down!! Check back later.</p>
        )}
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
  );
}
