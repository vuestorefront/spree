const getPathChecks = async (vsf) =>
  await Promise.all([
    vsf.$spree.api.getCart(),
    vsf.$spree.api.getShipments().catch(() => null)
  ]).then(([cart, shipments]) => ({
    isAnyItemInCart: cart?.itemCount,
    isShippingCartFilled: cart?.address?.shipping && cart?.lineItems?.length,
    isAnyShipmentSelected: shipments?.every((method) => method.availableShippingRates.some((rate) => rate.selected)),
    isBillingAddressFilled: cart?.address?.billing
  }));

export default async ({ app, $vsf }) => {
  const currentPath = app.context.route.fullPath.split('/checkout/')[1];
  if (!currentPath) return;

  const checks = await getPathChecks($vsf);
  const canEnterShipping = checks.isAnyItemInCart;
  const canEnterBilling = canEnterShipping && checks.isShippingCartFilled && checks.isAnyShipmentSelected;
  const canEnterPayment = canEnterBilling && checks.isBillingAddressFilled;

  switch (currentPath) {
    case 'shipping':
      if (canEnterShipping) return;
      app.context.redirect('/');
      break;
    case 'billing':
      if (canEnterBilling) return;
      app.context.redirect('/checkout/shipping');
      break;
    case 'payment':
      if (canEnterPayment) return;
      if (canEnterBilling) return app.context.redirect('/checkout/billing');
      app.context.redirect('/checkout/shipping');
      break;
  }
};
