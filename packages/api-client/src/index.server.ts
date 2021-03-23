import { apiClientFactory } from '@vue-storefront/core';
import { makeClient } from '@spree/storefront-api-v2-sdk';
import getProduct from './api/getProduct';
import getCategory from './api/getCategory';
import logIn from './api/logIn';
import logOut from './api/logOut';
import getCurrentUser from './api/getCurrentUser';
import isGuest from './api/isGuest';
import changePassword from './api/changePassword';
import registerUser from './api/registerUser';
import addAddress from './api/addAddress';
import getAddresses from './api/getAddresses';
import getAvailableCountries from './api/getAvailableCountries';
import getCountryDetails from './api/getCountryDetails';
import updateAddress from './api/updateAddress';

const defaultSettings = {};

const onCreate = (settings) => ({
  config: {
    ...defaultSettings,
    ...settings
  },
  client: makeClient({ host: 'https://demo.spreecommerce.org' })
});

const { createApiClient } = apiClientFactory<any, any>({
  onCreate,
  api: {
    getProduct,
    getCategory,
    getCurrentUser,
    logIn,
    logOut,
    isGuest,
    changePassword,
    registerUser,
    addAddress,
    getAddresses,
    getAvailableCountries,
    getCountryDetails,
    updateAddress
  }
});

export {
  createApiClient
};