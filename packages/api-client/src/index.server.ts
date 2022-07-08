import { apiClientFactory, ApiClientExtension } from '@vue-storefront/core';
import { makeClient } from '@spree/storefront-api-v2-sdk';
import createAxiosFetcher from '@spree/storefront-api-v2-sdk/dist/server/createAxiosFetcher';
import getProduct from './api/getProduct';
import getProducts from './api/getProducts';
import getCategory from './api/getCategory';
import logIn from './api/logIn';
import logOut from './api/logOut';
import getCurrentUser from './api/getCurrentUser';
import updateCurrentUser from './api/updateCurrentUser';
import isGuest from './api/isGuest';
import changePassword from './api/changePassword';
import registerUser from './api/registerUser';
import addAddress from './api/addAddress';
import getAddresses from './api/getAddresses';
import getAvailableCountries from './api/getAvailableCountries';
import getCountryDetails from './api/getCountryDetails';
import updateAddress from './api/updateAddress';
import getCart from './api/getCart';
import addToCart from './api/addToCart';
import updateItemQuantity from './api/updateItemQuantity';
import removeFromCart from './api/removeFromCart';
import clearCart from './api/clearCart';
import applyCoupon from './api/applyCoupon';
import removeCoupon from './api/removeCoupon';
import saveCheckoutShippingAddress from './api/saveCheckoutShippingAddress';
import saveCheckoutBillingAddress from './api/saveCheckoutBillingAddress';
import createAuthIntegration from './api/authentication/integration';
import createInternationalizationIntegration from './api/internationalization/integration';
import getOrCreateCart from './api/getOrCreateCart';
import getOrder from './api/getOrder';
import getOrders from './api/getOrders';
import saveGuestCheckoutEmail from './api/saveGuestCheckoutEmail';
import getShipments from './api/getShipments';
import saveShippingMethod from './api/saveShippingMethod';
import getPaymentMethods from './api/getPaymentMethods';
import savePaymentMethod from './api/savePaymentMethod';
import getPaymentConfirmationData from './api/getPaymentConfirmationData';
import handlePaymentConfirmationResponse from './api/handlePaymentConfirmationResponse';
import makeOrder from './api/makeOrder';
import forgotPassword from './api/forgotPassword';
import resetPassword from './api/resetPassword';
import getWishlist from './api/getWishlist';
import addToWishlist from './api/addToWishlist';
import removeFromWishlist from './api/removeFromWishlist';
import deleteWishlist from './api/deleteWishlist';
import changeCurrency from './api/changeCurrency';
import deleteAddress from './api/deleteAddress';
import getMenus from './api/getMenus';

const defaultSettings = {
  backendUrl: 'https://demo.spreecommerce.org',
  assetsUrl: null,
  spreeFeatures: {
    associateGuestCart: true,
    fetchPrimaryVariant: true
  }
};

const onCreate = (settings) => {
  return {
    config: {
      ...defaultSettings,
      ...settings
    },
    client: makeClient({
      host: settings.backendUrl || defaultSettings.backendUrl,
      createFetcher: createAxiosFetcher
    })
  };
};

const tokenExtension: ApiClientExtension = {
  name: 'tokenExtension',
  hooks: (req, res) => {
    const auth = createAuthIntegration(req, res);
    const internationalization = createInternationalizationIntegration(req, res);

    return {
      beforeCreate: ({ configuration }) => ({
        ...configuration,
        auth,
        internationalization
      })
    };
  }
};

const { createApiClient } = apiClientFactory<any, any>({
  onCreate,
  api: {
    getProduct,
    getProducts,
    getCategory,
    getCurrentUser,
    updateCurrentUser,
    logIn,
    logOut,
    isGuest,
    changePassword,
    registerUser,
    addAddress,
    getAddresses,
    getAvailableCountries,
    getCountryDetails,
    updateAddress,
    getCart,
    addToCart,
    updateItemQuantity,
    removeFromCart,
    clearCart,
    applyCoupon,
    removeCoupon,
    saveCheckoutShippingAddress,
    saveCheckoutBillingAddress,
    getOrCreateCart,
    getOrder,
    getOrders,
    saveGuestCheckoutEmail,
    getShipments,
    saveShippingMethod,
    getPaymentMethods,
    savePaymentMethod,
    getPaymentConfirmationData,
    handlePaymentConfirmationResponse,
    makeOrder,
    forgotPassword,
    resetPassword,
    getWishlist,
    addToWishlist,
    removeFromWishlist,
    deleteWishlist,
    changeCurrency,
    deleteAddress,
    getMenus
  },
  extensions: [tokenExtension]
});

export {
  createApiClient
};
