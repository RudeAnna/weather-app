import { combineReducers } from "redux";
import authReducer from './auth/authReducer'
import forecastReducer  from "./forecast/forecastReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    forecast: forecastReducer,
})

export default rootReducer