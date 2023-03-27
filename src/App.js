import { useState,useEffect } from "react";

// Components
import Navbar from "./components/Navbar";
// import account from "./components/Navbar"
import FileUpload from "./components/FileUpload"
import { getAccount } from "./utils/wallet";
import {tezos} from "./utils/tezos"
import Display from "./components/Display";
import Modal from "./components/Modal";

// const [account, setAccount] = useState("");

// import { buyTicketOperation, endGameOperation } from "./utils/operation";
// import { fetchStorage } from "./utils/tzkt";
import "./App.css";

const App = () => {

  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);





  // Players holding lottery tickets
  // const [players, setPlayers] = useState([]);
  // const [tickets, setTickets] = useState(3);
  // const [loading, setLoading] = useState(false);

  // Set players and tickets remaining
  useEffect(() => {

    // TODO 9 - Fetch players and tickets remaining from storage
    (async () => {

      // TODO 5.b - Get the active account
      const account = await getAccount();
      setAccount(account);
      const contract = await tezos.wallet.at("KT1BwoKYL4AU6h7X8i3VPndfGjqLVPvQfsed");
      setContract(contract);
      // const storage = await fetchStorage()
      // setPlayers(Object.values(storage.players));
      // setTickets(storage.tickets_available);
    })();
  }, []);

  // TODO 4.a - Complete onConnectWallet function
  // const onConnectWallet = async () => {
  //   await connectWallet();
  //   const account = await getAccount();
  //   setAccount(account);
  // };

  // TODO 7.a - Complete onBuyTicket function
  // const onBuyTicket = async () => {
  //   try{
  //     setLoading(true)
  //     await buyTicketOperation()
  //     alert("Transaction successful")
  //   } catch(e){
  //     throw e;
  //   }
  //   setLoading(false)
  // };

  // TODO 11.a - Complete onEndGame function
  // const onEndGame = async () => {
  //   try {
  //     setLoading(true)
  //     await endGameOperation()
  //     alert("Transation successful")
  //   } catch (error) {
  //     throw error
  //   }
  //   setLoading(false)
  // };

  // return (
  //   <div className="h-100">
  //     <Navbar />
  //     <div className="d-flex flex-column justify-content-center align-items-center h-100">
  //       {/* Ticket remaining display */}
  //       <div className="py-1">Tickets remaining: {tickets}</div>
  //       {/* Action Buttons */}
  //       {tickets > 0 ? (
  //         <button onClick={onBuyTicket} className="btn btn-primary btn-lg">
  //           {/* TODO 7.b - Call onBuyTicket on click */}
  //           {/* TODO 7.c - Show "loading..." when buying operation is pending */}
  //           { loading ? "Loading.." : "Buy Ticket"}
           
  //         </button>
  //       ) : (
  //         <button onClick={onEndGame} className="btn btn-success btn-lg">
  //           {/* TODO 11.b - Call onEndGame on click */}
  //           {/* TODO 11.c - Show "loading..." when buying operation is pending */}
  //           { loading ? "Loading.." : "End Game"}
  //         </button>
  //       )}
  //       {/* List of Players */}
  //       <div className="mt-2">
  //         {players.map((player, index) => (
  //           <div key={index}>
  //             <b>Ticket {index + 1}:</b> {player}
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   </div>
  // );
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
