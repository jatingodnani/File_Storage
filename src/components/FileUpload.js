import { useState } from "react";
import axios from "axios";
import "./FileUpload.css";
import { addOperation } from "../utils/operation";

const FileUpload = ({account,contract}) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No image selected");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `a9c60da020ca93360f7b`,
            pinata_secret_api_key: `cdacb7ae20117048e0610cea7ca0d7c5d9a86a1f242176b15c3742c9c68f1488`,
            "Content-Type": "multipart/form-data",
          },
        });
        const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
        await contract.method.add(ImgHash);
    //     //const signer = contract.connect(provider.getSigner());
        // tezos.contract.add(account, ImgHash);
      } catch (e) {
        alert("Unable to upload image to Pinata");
      }
    }
    alert("Successfully Image Uploaded");
    setFileName("No image selected");
    setFile(null);
  };
  const retrieveFile = (e) => {
    const data = e.target.files[0]; //files array of files object
    console.log(data);
    const reader = new FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    setFileName(e.target.files[0].name);
    e.preventDefault();
  };
  return (
    <div className="top">
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="file-upload" className="choose">
          Choose Image
        </label>
        <input
          disabled={!account}
          type="file"
          id="file-upload"
          name="data"
          onChange={retrieveFile}
        />
        <span className="textArea">Image:{fileName}</span>
        <button type="submit" className="upload" disabled = {!file}>
          Upload File
        </button>
      </form>
    </div>
  );
};
export default FileUpload;