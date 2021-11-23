import {
  GET_CITIES_FAILURE,
  GET_CITIES_REQUEST,
  GET_CITIES_SUCCESS,
  GET_COUTRIES_FAILURE,
  GET_COUTRIES_REQUEST,
  GET_COUTRIES_SUCCESS,
  GET_WEATHER_FAILURE,
  GET_WEATHER_REQUEST,
  GET_WEATHER_SUCCESS,
  ADD_CITY,
  DELETE_CURRENT_CITY,
  CHANGE_CURRENT_CITY,
  ADD_SELECTED_CITIES,
} from "./forecastTypes";

const initialState = {
  isFetching: false,
  countries: [],
  cities: [],
  selectedCities: [],
  weather: {},
  error: "",
  currentCity: "",
};

const forecastReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COUTRIES_REQUEST:
      return {
        ...state,
        countries: action.payload,
        isFetching: true,
      };
    case GET_COUTRIES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        countries: action.payload.data,
      };
    case GET_COUTRIES_FAILURE:
      return {
        ...state,
        error: action.payload,
        isFetching: false,
      };

    case GET_CITIES_REQUEST:
      return {
        ...state,
        cities: action.payload,
        isFetching: true,
      };
    case GET_CITIES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        cities: action.payload.data,
      };
    case GET_CITIES_FAILURE:
      return {
        ...state,
        error: action.payload,
        isFetching: false,
      };

    case GET_WEATHER_REQUEST:
      return {
        ...state,
        weather: action.payload,
        isFetching: true,
      };
    case GET_WEATHER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        weather: action.payload,
      };
    case GET_WEATHER_FAILURE:
      return {
        ...state,
        error: action.payload,
        isFetching: false,
      };

    case ADD_CITY:
      return {
        ...state,
        currentCity: action.payload,
        selectedCities: Array.from(
          new Set([...state.selectedCities, action.payload])
        ),
      };

    case CHANGE_CURRENT_CITY:
      return {
        ...state,
        currentCity: action.payload,
      };

    case ADD_SELECTED_CITIES:
      return {
        ...state,
        selectedCities: action.payload,
      };

    case DELETE_CURRENT_CITY:
      localStorage.setItem(
        "allCities",
        JSON.stringify(
          state.selectedCities.filter((city) => city !== action.payload)
        )
      );
      localStorage.setItem(
        "city",
        state.selectedCities.filter((city) => city !== action.payload)
      );
      return {
        ...state,
        selectedCities: state.selectedCities.filter(
          (city) => city !== action.payload
        ),
        currentCity: state.selectedCities.find((el) => el !== action.payload),
      };

    default:
      return state;
  }
};

export default forecastReducer;
