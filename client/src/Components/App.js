import React from "react";
import Navbar from "./Navbar/Navbar";
import Routes from "./Routes";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <div id="app">
      <Navbar />
      <div className="container" style={{ marginTop: 20 }}>
        <Routes />
      </div>
    </div>
  );
};

export default App;
