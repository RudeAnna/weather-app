import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCities, getWeather } from "../redux/forecast/forecastActions";
import Button from "@material-ui/core/Button";
import { blue } from "@mui/material/colors";

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
		dispatch(deleteCities());
	};

	return (
		<div className="weather-card">
			<div className="country-city">
				<p className="text city">{city}</p>
				<div className="temperature">
					<p className="degrees">{Math.round(weather?.main?.temp)}&#176;</p>
					<p>feels like {Math.round(weather?.main?.feels_like)}&#176;</p>
				</div>
			</div>

			<div className="weather-card-details">
				<div className="weather-card-main">
					<div className="weather-box">
						<p className="indicator-name">{weather?.weather?.[0]?.description}</p>
						<img
							src={`http://openweathermap.org/img/wn/${weather?.weather?.[0]?.icon}@2x.png`}
							alt="weather-icon"
						/>
					</div>
				</div>
				<div className="indicator-box">
					<p className="indicator-name">humidity</p>
					<p className="indicator-data"> {weather?.main?.humidity}&#37; </p>
				</div>
				<div className="indicator-box">
					<p className="indicator-name">pressure</p>
					<p className="indicator-data">
						{" "}
						{weather?.main?.pressure}
						<br /> hPa{" "}
					</p>
				</div>
				<div className="indicator-box">
					<p className="indicator-name">wind</p>
					<p className="indicator-data">
						{Math.round(weather?.wind?.speed)}
						<br /> m/s{" "}
					</p>
				</div>
			</div>
			<Button
				onClick={handleDeleteCity}
				variant="contained"
				color="secondary"
				style={{ background: blue[200] }}
			>
				Delete city
			</Button>
		</div>
	);
};

export default WeatherCard;
