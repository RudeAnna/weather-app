import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../redux/auth/authActions";
import { addSelectedCities, changeCurrentCity, getCountries } from "../redux/forecast/forecastActions";
import { blue } from '@mui/material/colors'

const Home = () => {
  const [user, setUser] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const city = localStorage.getItem("city");
  const selectedCities = JSON.parse(localStorage.getItem("allCities"));
  
  const handleLoginChange = (e) => { 
    setUser(e.target.value);
  };
  
  useEffect(() => {
    dispatch(changeCurrentCity(city))
  }, [dispatch, city])

  useEffect(() => {
    if (selectedCities){
    dispatch(addSelectedCities(selectedCities))}
  })

  const handleUserLogin = (e) => {
    e.preventDefault() 
    dispatch(loginUser(user));
    dispatch(getCountries());
    !city ? navigate('add') : navigate('user-page')
  };

  return (
    <div className="login">
      <p className="text">The Only Weather Tracker You Need</p>
      <form onSubmit={(e) => handleUserLogin(e)} className="register-box">
        <TextField
          id="outlined-basic"
          label="username"
          variant="outlined"
          onChange={(e) => handleLoginChange(e)}
          value={user}
        />
        <Button
          onClick={(e) => handleUserLogin(e)}
          variant="contained"
          style={{
            background: blue[600],
          }}
          color="secondary"
          disabled={!user}
        >
          Next
        </Button>
      </form>
      
    </div>
    
  );
};

export default Home;
