import { some } from "../const/keyString"
import api from "../utils/api"

//type room
export const getTypesRoom=()=>{
    return api.get('types-room');
}
//images
export const getImgHotel=(payload:some)=>{
    return api.get('images/'+payload?.idHotel)
}
export const getImgRoom=(payload:some)=>{
    return api.get('images-hotel-room/'+payload?.idRoom)
}
export const updateImg=(payload:some)=>{
    return api.put('images/'+payload?.idImg+'?imgUrl='+payload?.imgUrl)
}
export const saveImg=(payload:some)=>{
    return api.post('images?idHotel='+payload?.idHotel+'&idRoom='+payload?.idRoom+'&Image='+payload?.imgUrl)
}