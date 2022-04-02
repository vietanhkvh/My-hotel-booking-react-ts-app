import { styleNotiError, styleNotiSuccess } from '../components/constants';
import { some } from '@const/keyString';
import { notification } from 'antd';
import DeviceDetector from 'ua-parser-js';
import moment from 'moment';
import { cartItem } from '@const/interface';

const has = Object.prototype.hasOwnProperty;

export const getStoreCodeClient = () => {
  let storeCode = '';
  const IS_SERVER = typeof window === 'undefined';
  if (!IS_SERVER) {
    storeCode =
      window.location.hostname?.includes('localhost') ||
      window.location.hostname?.includes('172.20.180.155') ||
      window.location.hostname?.includes('istore-dev')
        ? 'soibien'
        : window.location.hostname?.split('.')[0];
  }
  return storeCode;
};

export const getStoreCode = (req: any) => {
  let storeCode = '';
  if (req) {
    storeCode =
      req.headers?.host?.includes('localhost') ||
      req.headers?.host?.includes('172.20.180.155') ||
      req.headers?.host?.includes('istore-dev')
        ? 'soibien'
        : req.headers?.host?.split('.')[0];
  }
  return storeCode;
};

export const checkIsMobile = (userAgent: string = '') => {
  const device = DeviceDetector(userAgent);
  if (
    device.device.type &&
    (device.device.type === 'mobile' || device.device.type === 'tablet')
  ) {
    return true;
  }
  return false;
};

export const stringInsertRgb = (rgbColor: string, fadePercent: string) => {
  const index = rgbColor?.indexOf(')');
  return rgbColor?.substring(0, index) + `, ${fadePercent})`;
};

export const isEmpty = (prop: string | null | undefined | some) => {
  return (
    prop === null ||
    prop === undefined ||
    (has.call(prop, 'length') && prop.length === 0) ||
    (prop.constructor === Object && Object.keys(prop).length === 0)
  );
};
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const makeTimeout = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const getSendMessage = (
  contentMessage: string,
  typeMessage: string,
  chatGroupId: string,
  ticketId: string
) => {
  return JSON.stringify({
    headers: {
      command: 'sendCSGroupMessage',
    },
    body: {
      transactionId: `${new Date().getTime()}`,
      envelop: {
        content: contentMessage,
        contentType: typeMessage,
        receiver: chatGroupId,
        receiverType: 'GROUP',
        extraInfos: { ticketId },
      },
    },
  });
};
export const formatBytes = (a: number, b = 2) => {
  if (0 === a) return '0 Bytes';
  const c = 0 > b ? 0 : b,
    d = Math.floor(Math.log(a) / Math.log(1024));
  return (
    parseFloat((a / Math.pow(1024, d)).toFixed(c)) +
    ' ' +
    ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'][d]
  );
};
export const showNotification = (item: some) => {
  navigator.serviceWorker.ready.then((registration) => {
    let bodyMessage = '';
    if (item?.contentType === 'TEXT') bodyMessage = item?.content;
    if (item?.contentType === 'FILE') bodyMessage = 'File đính kèm';
    if (item?.contentType === 'EVENT') {
      const contentEvent = JSON.parse(item?.content);
      if (contentEvent?.type === 'REQUEST_VOTE')
        bodyMessage = 'Đã yêu cầu khách hàng vote';
      if (contentEvent?.type === 'VOTED') bodyMessage = 'Khách hàng đã vote';
      if (
        contentEvent?.type === 'ADD_MEMBER' ||
        contentEvent?.type === 'REMOVE_MEMBER'
      ) {
        const temp = contentEvent?.controlled;
        bodyMessage =
          contentEvent?.type === 'ADD_MEMBER'
            ? `${temp.join(',')} đã được thêm vào cuộc trò chuyện`
            : `${temp.join(',')} đã rời khỏi cuộc trò chuyện`;
      }
      if (contentEvent?.type === 'NEW_TICKET') bodyMessage = 'Có yêu cầu mới';
    }
    if (registration) {
      registration.showNotification('Có tin nhắn mới', {
        body: bodyMessage,
        // icon: logo,
        icon: '/src/assets/icons/logo192.png',
      });
    }
  });
};

export const isServer = () => typeof window === 'undefined';
export const productIconUrl =
  'https://storage.googleapis.com/public-tripi/tripi-feed/img/2704Tc/group-12196.png';

export const scrollToItem = (idElement: string) => {
  const element = document.getElementById(idElement);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      inline: 'nearest',
    });
  }
};

export const isMobileAndTabletCheck = () => {
  let check = false;
  if (typeof navigator === 'undefined') {
    return undefined;
  }
  const a = navigator.userAgent || navigator.vendor;
  if (
    /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
      a
    ) ||
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(
      a.substr(0, 4)
    )
  )
    check = true;
  return check;
};

export function isVietnamesePhoneNumber(number) {
  return /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(number);
}
export function isEmail(text) {
  return /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
    text
  );
}

export const setLastRegisterValue = (key, value) => {
  const localValue = localStorage.getItem('last-registerValue');
  let v = {};
  try {
    v = JSON.parse(localValue || '{}');
  } catch (error) {}
  v[key] = value;
  localStorage.setItem('last-registerValue', JSON.stringify(v));
};

export const getLastRegisterValue = (key?: string) => {
  const localValue = localStorage.getItem('last-registerValue');
  let v = {};
  try {
    v = JSON.parse(localValue || '{}');
  } catch (error) {}
  return key ? v[key] : v;
};

export const getPlatform = (userAgent = '') => {
  if (!(typeof window === 'undefined')) {
    const device = DeviceDetector(navigator.userAgent);
    if (device.device.type && device.device.type === 'mobile') {
      return 'mobile_web';
    } else {
      return 'website';
    }
  } else {
    return 'website';
  }
};

export const detectClick =
  (onClick?: any) => (ele?: HTMLDivElement | null | HTMLSpanElement) => {
    if (!ele) return;
    const execute = function (onClick?: any) {
      // let isMouseDown = false;
      let isTouchMove = false;
      let startX = 0;
      let startY = 0;
      const onMouseDown = (e) => {
        // isMouseDown = true;
        startX = e.pageX;
        startY = e.pageY;
      };
      const onMouseUp = (e) => {
        if (
          Math.abs(e.pageX - startX) < 20 &&
          Math.abs(e.pageY - startY) < 20
        ) {
          isTouchMove = false;
        } else {
          isTouchMove = true;
        }
        // isMouseDown = false;
        startX = 0;
        startY = 0;
      };
      ele.onmousedown = onMouseDown;
      ele.onmouseup = onMouseUp;
      ele.onclick = () => {
        if (!isTouchMove && onClick) {
          onClick();
        }
      };
    };
    execute(onClick);
  };

export const checkIsSvgLink = (path) => {
  const t = path.split('.');
  if (t[t.length - 1] === 'svg') return true;
  return false;
};

export const isMany = (num: number) => {
  return num >= 2 ? 's' : '';
};

export const openNotificationWithIcon = (
  type: string,
  message: string,
  description: string,
  style?: any
) => {
  notification[type]({
    message: message,
    description: description,
    style: type==='error'? styleNotiError : styleNotiSuccess,
  });
};
notification.config({
  placement: 'topRight',
  duration: 6,
  maxCount: 1,
});
export const isDisableBtnAdd=(val1:any, editingKey:any )=>{
  if(val1 !== ''){    
    if( editingKey === undefined || editingKey === '') return false
    else return true
  }
  return true
}
export const calcGuest = (guestNum?: number) => {
  if (guestNum && guestNum < 2) {
    return guestNum;
  } else return Math.floor(guestNum! / 2);
};

export const calcTotalPrice = (carts: cartItem[]) => {
  let total = 0;
  carts.forEach((c) => {
    const dateGap = moment(c?.Date_Out).diff(moment(c?.Date_In),'days');
    total += c.Final_Price! * dateGap;
  });
  return total;
};