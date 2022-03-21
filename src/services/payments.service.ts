import { some } from '@const/keyString';
import api from '../utils/api';

export const savePayments=(payload:some)=>{
    return api.post('payments?Guest_Number='+payload?.guestNum+
    '&First_Total='+payload?.firsTotal+'&ID_Coupon='+payload?.idCoupon+'&Final_Total='+payload?.finalTotal+'&Date_In='+payload?.dateIn+
    '&Date_out='+payload?.dateOut+'&ID_Account='+payload?.idAccount+'&Status='+payload?.paymentMethod)
}
export const savePayments_D=(payload:some)=>{
    return api.post('payments-detail?ID_Payment='+payload?.idPayment+'&ID_Room='+payload?.idRoom)
}
export const getPaymentInfor=(payload:some)=>{
    return api.get('payment-detail/'+payload?.idPayment+'/'+payload?.idPaymentD)
}
export const getPaymentAccount=(payload:some)=>{
    return api.get('payments-account/'+payload?.idAccount+'/'+payload?.idStatus)
}
export const getPaymentAccountAll=(payload:some)=>{
    return api.get('payments/'+payload?.idAccount)
}
export const getPaymentHostByHotel=(payload:some)=>{
    return api.get('payments-host/'+payload?.idHotel)
}
export const updatePaymentSts=(payload:some)=>{
        return api.put("payments/"+payload?.idPayment+"?idStatus="+payload?.idStatus+'&finalTotal='+payload?.finalTotal)
}