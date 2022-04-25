import { userState } from '@src/store/reducer/userReducer';
import {
  openNotificationWithIcon,
  ValidateEmail,
} from '../../../utils/helpers';
import { Typography } from 'antd';
import { Dispatch, FunctionComponent, useCallback } from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Paypal.module.scss';
import { constState } from '@src/store/reducer/constReducer';
import { DATE_FORMAT, some, SUCCESS_CODE } from '../../constants';
import moment from 'moment';
import { sendEmailBooking } from '../../../services/common.service';
import {
  saveMultiplePD,
  savePayments,
} from '../../../services/payments.service';
import { setCarts } from '../../../store/actions/constAction';
import { createSearchParams, useNavigate } from 'react-router-dom';
const { Title } = Typography;
interface PaypalProps {
  /**
   * amount
   */
  amount?: string;

  /**
   * value
   */
  value?: any;
}

const Paypal: FunctionComponent<PaypalProps> = (props) => {
  const { amount, value } = props;
  const navigate = useNavigate();
  const userInfor = useSelector(
    (state: { user: userState }) => state?.user?.userInfor
  );
  const carts = useSelector(
    (state: { const: constState }) => state?.const?.carts
  );
  const hotelSearchingCondition = useSelector(
    (state: { const: constState }) => state?.const?.hotelSeachingCondition
  );
  const dispatch: Dispatch<any> = useDispatch();
  ///////////////////////state

  ///////////////////////event
  const getName = (paymentInfor: any) => {
    let detail: string = '';
    if (paymentInfor?.length !== 1) {
      paymentInfor?.forEach(
        (p: any) =>
          (detail +=
            p?.Hotel_Name +
            ' - ' +
            p?.Room_Name +
            '( ' +
            moment(p?.Date_In).format(DATE_FORMAT) +
            ' -> ' +
            moment(p?.Date_Out).format(DATE_FORMAT) +
            ' ) | ')
      );
    } else
      detail =
        paymentInfor?.[0]?.Hotel_Name +
        '-' +
        paymentInfor?.[0].Room_Name +
        '(' +
        moment(paymentInfor?.[0]?.Date_In).format(DATE_FORMAT) +
        ' -> ' +
        moment(paymentInfor?.[0]?.Date_Out).format(DATE_FORMAT) +
        ')';
    return detail;
  };
  //////////////////////api
  const callSendEmailBooking = useCallback(
    async (email: string, idPayment: string) => {
      const payload = {
        email: email,
        idPayment: idPayment,
        detail: getName(carts),
      };
      const respond = await sendEmailBooking(payload);
      try {
        const res = await respond;
        if (res?.data?.code === SUCCESS_CODE) {
          openNotificationWithIcon(
            'success',
            '',
            'Booking information was sent to your mail!'
          );
        }
      } catch (error) {}
    },
    [carts]
  );
  const finishPaymentDe = useCallback(
    async (idPayment: string, email: string) => {
      const payload = {
        paymentD: JSON.stringify(carts),
        idPayment: idPayment,
      };
      const respond = await saveMultiplePD(payload);
      try {
        const res = await respond;
        if (res?.data?.code === SUCCESS_CODE) {
          callSendEmailBooking(email, idPayment);
          dispatch(setCarts([]));
          const param: some = {
            idPayment: idPayment,
          };
          navigate({
            pathname: '/book-success',
            search: `?${createSearchParams(param)}`,
          });
        }
      } catch (error) {}
    },
    [callSendEmailBooking, carts, dispatch, navigate]
  );
  const finishPayment = useCallback(
    async (values: any, finalPrice: any, idAccount: number) => {
      const guestNum =
        (hotelSearchingCondition?.adults ?? 0) +
        (hotelSearchingCondition?.children ?? 0);

      const payloadP = {
        idAccount: idAccount,
        guestNum: guestNum,
        finalTotal: finalPrice,
        paymentMethod: 2,
      };

      if (carts?.length) {
        const respondP = await savePayments(payloadP);
        try {
          const resP = await respondP;
          if (resP?.data?.code === SUCCESS_CODE) {
            const idPayment = resP?.data?.data?.ID_Payment;
            finishPaymentDe(idPayment, values?.email);
          }
        } catch (error) {}
      } else {
        openNotificationWithIcon('error', '', "Failed! Cart's empty!");
      }
    },
    [
      carts?.length,
      finishPaymentDe,
      hotelSearchingCondition?.adults,
      hotelSearchingCondition?.children,
    ]
  );
  const isNotNull = (value: any) => {
    if (value?.fullName === '' || value?.email === '' || value?.phone === '')
      return false;
    else if (
      value?.fullName !== '' &&
      value?.email !== '' &&
      value?.phone !== ''
    ) {
      if (ValidateEmail(value?.email)) return true;
    }
  };
  return (
    <div
      className={styles['paypal']}
      style={
        userInfor && isNotNull(value)
          ? {}
          : { pointerEvents: 'none', cursor: 'no-drop', opacity: '0.5' }
      }
    >
      {userInfor ? (
        ''
      ) : (
        <Title level={5} className={styles['text']}>
          Please login first!
        </Title>
      )}
      <PayPalButton
        options={{
          clientId:
            'AYmLewk9igWLxOmpv3ZEpGO_BIVPkmGKoswth2dn9OpSCaZyn8zsRNlLaV2wYR6bYLySbp-B_pfIfDAG',
          currency: 'USD',
        }}
        amount={amount}
        shippingPreference='NO_SHIPPING' // default is "GET_FROM_FILE"
        onSuccess={(details: any, data: any) => {
          console.log('data paypal', data);
          console.log('detail paypal', details);
          // OPTIONAL: Call your server to save the transaction
          finishPayment(value, amount, userInfor?.ID_Account!);
        }}
        onApprove={(data, actions) => {
          console.log('paypal approve');
        }}
        onError={(err: any) => openNotificationWithIcon('error', err, '')}
      />
    </div>
  );
};

export default Paypal;
