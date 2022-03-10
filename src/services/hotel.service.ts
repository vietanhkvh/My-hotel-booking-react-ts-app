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
export const getHotelInforByID=(payload:some)=>{
    return api.post('hotel-by-id?idHotel='+payload?.idHotel)
}
//room
export const getHotelRoom=(payload:some)=>{
    return api.get('hotel-room/'+payload?.idHotel)
}
export const getRoom=(payload:some)=>{
    return api.get('room-by-id/'+payload?.idHotel+'/'+payload?.idRoom)
}
export const editStatusRoom=(payload:some)=>{
    return api.put('hotel-room/'+payload?.idRoom+'?idStatus='+payload?.idStatus)
}