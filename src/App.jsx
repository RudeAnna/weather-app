import React from "react";
import "./App.css";
import Home from "./Components/Home";
import { Routes, Route } from "react-router-dom";
import UserPage from "./Components/UserPage";
import AddLocation from "./Components/AddLocation";

const App = () => {  

  return (
    <Routes>
      <Route path="/" element={<Home />} /> 
      <Route path="/user-page" element={<UserPage />} />
      <Route path='/add' element={<AddLocation />} />
    </Routes>
  );
};

export default App;
