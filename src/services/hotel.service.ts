import { some } from "../const/keyString"
import api from "../utils/api"

export const getLocationHotel=()=>{
    return api.get('/hotel-location')
}
export const getSearchingResultLocation=(payload:some)=>{
    return api.post('hotel-list-searching-location?location='+payload?.location)
}
export const getSearchingResultRating=(payload:some)=>{
    return api.post('hotel-list-searching-rating?location='+payload?.location)
}