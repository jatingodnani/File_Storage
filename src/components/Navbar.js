import { useEffect, useState } from "react";
import { connectWallet, getAccount } from "../utils/wallet";
import LogoutIcon from '@mui/icons-material/Logout';
const Navbar = () => {
  const [account, setAccount] = useState("");

  useEffect(() => {
    (async () => {
      // TODO 5.b - Get the active account
      const account = await getAccount();
      setAccount(account);
    })();
  }, []);

  // TODO 4.a - Complete onConnectWallet function
  const onConnectWallet = async () => {
    await connectWallet();
    const account = await getAccount();
    setAccount(account);
  };

  return (
    <div className="navbar navbar-dark bg-dark fixed-top">
      <div className="container py-2">
        <a href="/" className="navbar-brand" style={{fontWeight:"bold",fontSize:"30px"}}>
          Built on Tezos
        </a>
        <div className="d-flex">
          {/* TODO 4.b - Call connectWallet function onClick  */}
         
          <button onClick={onConnectWallet} className="btn btn-outline-info">
            {/* TODO 5.a - Show account address if wallet is connected */}
            { account ? "Connected" : "Connect Wallet"}
          </button>
      
        </div>
       
      </div>
      {account &&
      <LogoutIcon style={{color:"white",marginRight:"65px",fontSize:"30px"}}/>
}
    </div>
  );
};

export default Navbar;
