import React, { useState, useEffect } from "react";
import Navbar from "./Navbar/Navbar";
import Routes from "./Routes";
import { ToastContainer } from "react-toastify";
import { auth } from "../Services/authService";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

const getAuth = async () => {
  await auth();
};

const App = () => {
  useEffect(() => {
    getAuth();
  });

  return (
    <div id="app">
      <Navbar />
      <div className="container" style={{ marginTop: 20 }}>
        <ToastContainer />
        <Routes />
      </div>
    </div>
  );
};

export default App;
