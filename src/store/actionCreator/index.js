import { SET_CITYNAME_ACTION } from "../actionTypes"
export const setCityNameAction = (cityName)=>{
    return {
        type:SET_CITYNAME_ACTION,
        value:cityName
    }
}