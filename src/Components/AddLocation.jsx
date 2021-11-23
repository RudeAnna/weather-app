import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@material-ui/core/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  getCities,
  getCountries,
  addCity
} from "../redux/forecast/forecastActions";
import { useNavigate } from "react-router";
import { blue } from "@mui/material/colors";

const AddLocation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const cities = useSelector((state) => state?.forecast?.cities);
  const countries = useSelector((state) =>
    state?.forecast?.countries?.map((country) => ({
      label: country.name,
      flag: country.flag,
    }))
  );

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCities(selectedCountry.toLowerCase()));
  }, [dispatch, selectedCountry]);

  const handleCountryChange = (e, newValue) => {
    e.preventDefault();
    setSelectedCountry(newValue.label);
  };
  const handleCityChange = (e, newValue) => {
    e.preventDefault();
    setSelectedCity(newValue);
  };

  const handleSaveCity = (e) => {
    e.preventDefault();
    dispatch(addCity(selectedCity));
    localStorage.setItem("city", selectedCity);
    navigate('/user-page')
  };

  return (
    <div className="location-box">
      <p className="text">Add a location</p>
      <Autocomplete
        isOptionEqualToValue={(option, value) => option.label === value.label}
        onChange={(e, newValue) => handleCountryChange(e, newValue)}
        id="country-select-demo"
        sx={{ width: 300 }}
        options={countries}
        autoHighlight
        getOptionLabel={(option) => option.label}
        renderOption={(props, option) => (
          <Box
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...props}
          >
            <img
              loading="lazy"
              width="20"
              src={option.flag}
              srcSet={option.flag}
              alt=""
            />
            {option.label}
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Choose a country"
            inputProps={{
              ...params.inputProps,
              autoComplete: "new-password", // disable autocomplete and autofill
            }}
          />
        )}
      />
      <Autocomplete
        onChange={(e, newValue) => handleCityChange(e, newValue)}
        disabled={!selectedCountry}
        id="country-select-demo"
        sx={{ width: 300 }}
        options={cities}
        autoHighlight
        getOptionLabel={(option) => option}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Choose a city"
            inputProps={{
              ...params.inputProps,
              autoComplete: "new-password", // disable autocomplete and autofill
            }}
          />
        )}
      />
      <Button
        disabled={!selectedCity}
        onClick={(e) => handleSaveCity(e)}
        variant="contained"
        color="secondary"
        style={{
          background: blue[600],
        }}
      >
        Save
      </Button>
    </div>
  );
};

export default AddLocation;
