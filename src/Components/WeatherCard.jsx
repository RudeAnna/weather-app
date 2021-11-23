import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCurrentCity,
  getWeather,
} from "../redux/forecast/forecastActions";
import Button from "@material-ui/core/Button";
import { blue } from '@mui/material/colors'

const WeatherCard = () => {
  const city = useSelector((state) => state?.forecast?.currentCity);
  const weather = useSelector((state) => state?.forecast?.weather);
  const selectedCities = useSelector(
    (state) => state?.forecast?.selectedCities
  );
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("city", city);
    dispatch(getWeather(city));
  }, [dispatch, city]);

  useEffect(() => {
    localStorage.setItem("allCities", JSON.stringify(selectedCities));
  }, [selectedCities]);

  const handleDeleteCity = () => {
    dispatch(deleteCurrentCity(city));
  };


  return (
    <div className="weather-card">
      <div className="weather-card-main">
        <p className="text city">{city}</p>
        <p>{weather?.weather?.[0]?.description}</p>
        <div className="weather-box">
          <img
            src={`http://openweathermap.org/img/wn/${weather?.weather?.[0]?.icon}@2x.png`}
            alt='weather-icon'
          />
          <div className="temperature">
            <p className="degrees">{Math.round(weather?.main?.temp)}&#176;</p>
            <p>feels like {Math.round(weather?.main?.feels_like)}&#176;</p>
          </div>
        </div>
      </div>

      <div className="weather-card-details">
        <p>humidity: {weather?.main?.humidity}&#37; </p>
        <p>pressure: {weather?.main?.pressure} hPa </p>
        <p>wind: {Math.round(weather?.wind?.speed)} m/s </p>
        <p>visibility: {weather?.visibility / 1000} km </p>
      </div>
      <Button
        onClick={handleDeleteCity}
        variant="contained"
        color="secondary"
        style={{ background: blue[200]}}
      >
        Delete city
      </Button>
    </div>
  );
};

export default WeatherCard;
