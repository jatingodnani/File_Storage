import { useState } from "react";
import "./Display.css";
import { display_operation } from "../utils/operation";
const Display = ({account,contract}) => {
  const [data, setData] = useState(""); 

  const getdata = async () => {
    let dataArray;
    const Otheraddress = document.querySelector(".address").value;
    try {
      if (Otheraddress) {
        dataArray = await display_operation(Otheraddress);
      } else {
        dataArray = await display_operation(account);
      }
    } catch (e) {
      alert("You don't have access");
    }
    const isEmpty = Object.keys(dataArray).length === 0;

    if (!isEmpty) {
      const str = dataArray.toString();
      const str_array = str.split(",");
      const images = str_array.map((item, i) => {
        return (
          <a href={item} key={i} target="_blank">
            <img
              key={i}
              src={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`}
              alt="new"
              className="image-list"
            ></img>
          </a>
        );
      });
      setData(images);
    } else {
      alert("No image to display");
    }
  };
  return (
    <>
      <button className="center button" onClick={getdata} style={{marginTop:"-27px"}}>
        Get Your Data
      </button>
      <div style={{display:"flex",marginLeft:"27%"}}>

      <hr className="divider" style={{marginRight:"5px",width:"30%", height:"4px"}} /> 
      <span style={{marginTop:"-22px",fontWeight:"bold"}}>OR</span> 
      <hr className="divider" style={{marginLeft:"5px",fontSize:"25px", height:"4px",width:"30%"}} />
      </div>
      
      <input
        type="text"
        placeholder="Enter Other Address"
        className="address"
      ></input>
      <button className="center button data" onClick={getdata} style={{marginBottom:"50px"}}>
        Get Others Data
      </button>
      <div className="image-list">{data}</div>

    </>
  );
};
export default Display;