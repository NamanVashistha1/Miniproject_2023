import React, { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [code, setCode] = useState("");
  const [output,setOutput] = useState('pending');

  const handleSubmit = async () => {
    const payLoad = {
      language: "cpp",
      code
    };
    // const {data} = await axios.post("http://localhost:5000/run", payLoad);

    
    try{
      const {data} = await axios.post("http://localhost:5000/run", payLoad);
      setOutput(data.output);
    }catch(err){
      console.log(err.response);
    }
  };



  
  


  return (
    <div className="App">
      <h1>ONLINE COMPILER</h1>
      {/* <input type="text" ></input> */}
      <textarea
        rows="20"
        cols="75"
        value={code}
        onChange={(e) => {
          setCode(e.target.value);
        }}
      ></textarea>
      <br></br>
      
      <button type="submit" onClick={handleSubmit}>Submit</button>
        <p>{output}</p>
      
    </div>
  );
}

export default App;
