import axios from "axios";
import {
  GET_COUTRIES_REQUEST,
  GET_COUTRIES_SUCCESS,
  GET_COUTRIES_FAILURE,
  GET_CITIES_REQUEST,
  GET_CITIES_SUCCESS,
  GET_CITIES_FAILURE,
  GET_WEATHER_REQUEST,
  GET_WEATHER_SUCCESS,
  GET_WEATHER_FAILURE,
  ADD_CITY,
  DELETE_CITIES,
  CHANGE_CURRENT_CITY,
  ADD_SELECTED_CITIES,
} from "./forecastTypes";

export const getCountriesRequest = () => {
  return {
    type: GET_COUTRIES_REQUEST,
  };
};
export const getCountriesSuccess = (countries) => {
  return {
    type: GET_COUTRIES_SUCCESS,
    payload: countries,
  };
};
export const getCountriesFailure = (error) => {
  return {
    type: GET_COUTRIES_FAILURE,
    payload: error,
  };
};

export const getCountries = () => {
  return (dispatch) => {
    const requestOptions = {
      method: "GET",
      url: "https://countriesnow.space/api/v0.1/countries/flag/images",
    };
    dispatch(getCountriesRequest());
    return axios(requestOptions)
      .then((response) => {
        dispatch(getCountriesSuccess(response.data));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(getCountriesFailure(errorMsg));
      });
  };
};

export const getCitiesRequest = () => {
  return {
    type: GET_CITIES_REQUEST,
  };
};
export const getCitiesSuccess = (cities) => {
  return {
    type: GET_CITIES_SUCCESS,
    payload: cities,
  };
};
export const getCitiesFailure = (error) => {
  return {
    type: GET_CITIES_FAILURE,
    payload: error,
  };
};

export const getCities = (country) => {
  return (dispatch) => {
    const requestOptions = {
      method: "POST",
      url: "https://countriesnow.space/api/v0.1/countries/cities",
      data: {
        country: country,
      },
    };
    dispatch(getCitiesRequest());
    return axios(requestOptions)
      .then((response) => {
        dispatch(getCitiesSuccess(response.data));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(getCitiesFailure(errorMsg));
      });
  };
};

export const getWeatherRequest = () => {
  return {
    type: GET_WEATHER_REQUEST,
  };
};
export const getWeatherSuccess = (weather) => {
  return {
    type: GET_WEATHER_SUCCESS,
    payload: weather,
  };
};
export const getWeatherFailure = (error) => {
  return {
    type: GET_WEATHER_FAILURE,
    payload: error,
  };
};

export const getWeather = (city) => {
  return (dispatch) => {
    const requestOptions = {
      method: "GET",
      url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=4372baafef43462c217f8abc3a668e22`,
    };
    dispatch(getWeatherRequest());
    return axios(requestOptions)
      .then((response) => {
        dispatch(getWeatherSuccess(response.data));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(getCitiesFailure(errorMsg));
      });
  };
};

export const addCity = (city) => {
  return {
    type: ADD_CITY,
    payload: city,
  };
};

export const changeCurrentCity = (city) => {
  return {
    type: CHANGE_CURRENT_CITY,
    payload: city,
  };
};
export const addSelectedCities = (cities) => {
  return { type: ADD_SELECTED_CITIES, payload: cities };
};

export const deleteCities = () => {
  return { type: DELETE_CITIES };
};
