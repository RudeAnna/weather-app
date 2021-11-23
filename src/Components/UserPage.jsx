import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logoutUser } from "../redux/auth/authActions";
import {
  changeCurrentCity,
  deleteCurrentCity,
} from "../redux/forecast/forecastActions";
import WeatherCard from "./WeatherCard";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import { Button } from "@mui/material";
import { blue } from "@mui/material/colors";

const UserPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentCity, setCurrentCity] = useState("");

  const handleUserLogout = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
    dispatch(deleteCurrentCity(city));
    navigate("/");
  };

  const city = useSelector((state) => state?.forecast?.currentCity);
  const selectedCities = useSelector(
    (state) => state?.forecast?.selectedCities
  );
  const { currentUser } = useSelector((state) => state?.auth);

  const handleCityChange = (e) => {
    setCurrentCity(e.target.value);
    dispatch(changeCurrentCity(e.target.value));
  };

  useEffect(() => {
    setCurrentCity(city);
  }, [dispatch, city]);

  return (
    <div>
      <div className="top-bar">
        <div className="top-bar-container">
          <Fab
            color="primary"
            aria-label="add"
            size="small"
            style={{
              background: blue[600],
            }}
          >
            <AddIcon onClick={() => navigate("/add")} />
          </Fab>
          <FormControl sx={{ m: 1, minWidth: 200 }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              city
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              defaultValue=''
              value={currentCity}
              onChange={handleCityChange}
              autoWidth
              label="City"
            >
              {selectedCities?.map((city) => (
                <MenuItem key={Math.random()} value={city}>
                  {city}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <p>Hello, {currentUser}!</p>
          <button
            onClick={(e) => handleUserLogout(e)}
            variant="contained"
            color="secondary"
            className="logout-btn"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="profile-wrapper">
        {!city ? (
          <div className="profile-wrapper weather-card">
            <p>No tracked cities found</p>
            <Button
              onClick={() => navigate("/add")}
              variant="contained"
              color="secondary"
              style={{
                background: blue[600],
              }}
            >
              Add city
            </Button>
          </div>
        ) : (
          <WeatherCard />
        )}
      </div>
    </div>
  );
};

export default UserPage;
