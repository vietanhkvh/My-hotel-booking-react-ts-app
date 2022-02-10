import { isServer } from './helpers';
const devConfig = {
  APP_ID: 'customer-engagement',
  VERSION: '1.0',
  UPLOAD_URL: 'https://gate.dev.tripi.vn/customer-engagement',
  LOGIN_BASE_URL: 'https://dev-api.tripi.vn',
  BASE_URL: 'https://gate.dev.tripi.vn/customer-engagement',
  APP_KEY: 'AsnasjldknsajASs86876n4oadn5aod3SLA888999',
};

const productConfig = {
  APP_ID: 'customer-engagement',
  VERSION: '1.0',
  UPLOAD_URL: 'https://assets.tripi.vn',
  LOGIN_BASE_URL: 'https://hotelapi.tripi.vn/customer-engagement',
  BASE_URL: 'https://gate.tripi.vn/customer-engagement',
  APP_KEY: 'AsnasjldknsajASs86876n4oadn5aod3SLA888999',
};

export const configs = () => {
  if (!isServer()) {
    if (
      window.location.hostname.includes('-dev') ||
      process.env.NODE_ENV === 'development' ||
      window.location.hostname.includes('localhost')
    ) {
      return devConfig;
    }
    if (
      window.location.hostname.includes('storeonline') ||
      process.env.NODE_ENV === 'production'
    ) {
      return productConfig;
    }
    return devConfig;
  } else {
    return {
      ...devConfig,
      BASE_URL: process.env.NEXT_PUBLIC_DOMAIN_GATE,
    };
  }
};
