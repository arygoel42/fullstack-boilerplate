import React from "react";
import { useState } from "react";
import axios from "axios";
const App = () => {
  let resource = ["This", "is", "sent", "to", "the", "backend"];
  const [recieved, setRecieved] = useState<string>("");

  const submitResources = async (resource: string[]) => {
    try {
      let response = await axios.post("http://localhost:3011/api/users/", {
        resource: resource,
      });

      if (response.status === 200) {
        setRecieved(response.data);
      } else if (response.status === 400 || response.status === 500) {
        setRecieved("error in returning data ");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button
        onClick={() => {
          submitResources(resource);
        }}
      ></button>

      {recieved != "" ? <div>{recieved}</div> : ""}
    </div>
  );
};

export default App;
