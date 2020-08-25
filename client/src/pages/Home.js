import React, { useContext } from "react";
import { AuthContext } from "../context/auth";

const Home = () => {
  const { user } = useContext(AuthContext);
  return <>
  {user && <h1>Home Page</h1>}
  
  </>;
};

export default Home;
