import React, {useState, useEffect} from "react";

const Public = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/public").then((response) => {
      if (response.ok) return response.json();
      throw new Error("Network response was not ok.");
    })
    .then(response => setMessage(response.message))
    .catch(error => setMessage(error.message))
  }, [])
  return (
    <>
      <h1>Public</h1>
      {message}
    </>
  );
}

export default Public;