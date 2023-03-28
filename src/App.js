import { useState,useEffect } from "react";

// Components
import Navbar from "./components/Navbar";
import FileUpload from "./components/FileUpload"
import { getAccount } from "./utils/wallet";
import {tezos} from "./utils/tezos"
import Display from "./components/Display";
import Modal from "./components/Modal";

// const [account, setAccount] = useState("");

import { fetchStorage } from "./utils/tzkt";
import "./App.css";

const App = () => {

  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState("");

  const [modalOpen, setModalOpen] = useState(false);


  useEffect(() => {


    (async () => {


      // TODO 5.b - Get the active account
      const account = await getAccount();
      setAccount(account);
      const contract = await tezos.wallet.at("KT1BwoKYL4AU6h7X8i3VPndfGjqLVPvQfsed");
      setContract(contract);
      

    })();
  }, []);

  return (


    <div className="h-300">
      <Navbar />
      <div 
      style={{
        paddingTop: '75px'
      }}
      ></div>
      {!modalOpen && (
        <button className="share" onClick={() => setModalOpen(true)}>
          Share
        </button>
      )}
      {modalOpen && (
        <Modal setModalOpen={setModalOpen} contract={contract}></Modal>
      )}
      
      

      <div className="App">
        <h1 style={{ color: "white" }}>File Storage</h1>
        <div class="bg"></div>
        <div class="bg bg2"></div>
        <div class="bg bg3"></div>

        <p style={{ color: "white" }}>
          Account : {account ? account : "Not connected"}
        </p>
        <FileUpload account={account} contract={contract}
        ></FileUpload>
        <Display account={account} contract={contract} ></Display>
      </div>
    </div>
  );
};

export default App;
