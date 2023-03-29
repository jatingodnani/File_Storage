import { useEffect } from "react";
import "./Modal.css";
import { VscChromeClose } from "react-icons/vsc";
const Modal = ({ setModalOpen, contract }) => {
  const sharing = async () => {
    console.log("hii")
    const address = document.querySelector(".address").value;
    await contract.allow(address);
    setModalOpen(false);
 
  };
  useEffect(() => {
    const accessList = async () => {
      const addressList = await contract.shareAccess();
      let select = document.querySelector("#selectNumber");
      const options = addressList;

      for (let i = 0; i < options.length; i++) {
        let opt = options[i];
        let e1 = document.createElement("option");
        e1.textContent = opt;
        e1.value = opt;
        select.appendChild(e1);
      }
    };
    contract && accessList();
  }, [contract]);
  return (
    <>
      <div className="modalBackground">
       <div className="modalContainer">

         <div className="img" >
      <VscChromeClose onClick={() => {
                setModalOpen(false);
              }} style={{marginLeft:"90%",fontSize:"25px",cursor:"pointer"}} />
          <img   src="https://th.bing.com/th?id=OIP.C9Pnj8rM6NZiLaGCCYRmiwHaFi&w=289&h=216&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2" />
         </div>
          <form className="myForm">
          <div className="body">
            <input
              type="email"
              className="address"
              placeholder="Enter Email Address"

            ></input>
          </div>
        
         
         <div className="footer">
      
            <button  onClick={() => sharing()}>Share</button>
            </div>
          <select id="selectNumber">
              <option className="option">People With Access</option>
              
            </select>
           
         
            </form>
     
       </div>
      </div>
    </>
  );
};
export default Modal;