import { some } from "../const/keyString"
import api from "../utils/api"

export const getCouponHotel=(payload:some)=>{
    return api.get('/coupon/'+payload?.idHotel );
}