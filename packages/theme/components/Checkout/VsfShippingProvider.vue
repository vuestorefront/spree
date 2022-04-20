<template>
  <div>
    <ShippingRatePicker
      v-for="(shipment, index) in shipments"
      :key="shipment.id"
      :name="`Shipment #${index}`"
      :shipment="shipment"
      class="vsf-shipping-provider__rate-picker"
      @change="shippingRateId => selectShippingRate(shipment.id, shippingRateId)"
    />
      <div class="form__action">
        <SfButton
          v-e2e="'get-back-to-shipping'"
          class="sf-button color-secondary checkout__button"
          type="button"
          @click="getBackToShippingDetails()"
        >
          {{ $t('Change shipping details') }}
        </SfButton>

        <SfButton
          v-e2e="'continue-to-billing'"
          class="checkout__button"
          type="button"
          @click="save"
        >
          {{ $t('components.checkout.vsf_shipping_provider.continue_to_billing') }}
        </SfButton>
      </div>
  </div>
</template>

<script>

import { SfButton } from '@storefront-ui/vue';
import { computed, ref, onMounted } from '@nuxtjs/composition-api';
import { Logger, useVSFContext } from '@vue-storefront/core';
import { useCart, useShippingProvider } from '@vue-storefront/spree';
import ShippingRatePicker from '~/components/Checkout/ShippingRatePicker.vue';

export default {
  name: 'VsfShippingProvider',

  components: {
    SfButton,
    ShippingRatePicker
  },

  setup(_props, { emit }) {
    const { $spree } = useVSFContext();
    const { setCart } = useCart();
    const { state: shipments, save: saveShipments, load: loadShipments } = useShippingProvider();
    const getBackToShippingDetails = () => emit('back');

    const selectedShippingRates = ref({});

    const allShipmentsSelected = computed(() => {
      const shippingCodes = Object.values(selectedShippingRates.value);
      return shippingCodes.length && shippingCodes.every(e => e !== null);
    });

    onMounted(async () => {
      await loadShipments();
      selectedShippingRates.value = shipments.value.reduce((prev, curr) => ({...prev, [curr.id]: null }), {});
    });

    const selectShippingRate = (shipmentId, shippingRateId) => {
      selectedShippingRates.value = { ...selectedShippingRates.value, [shipmentId]: shippingRateId };
    };

    const save = async () => {
      try {
        await saveShipments({ shippingMethod: selectedShippingRates.value });
        const updatedCart = await $spree.api.getCart();
        setCart(updatedCart);

        emit('submit');
      } catch (e) {
        Logger.error('VsfShippingProvider', e);
      }
    };

    return {
      shipments,
      allShipmentsSelected,
      selectShippingRate,
      save,
      getBackToShippingDetails
    };
  }
};
</script>

<style lang="scss" scoped>
.vsf-shipping-provider__rate-picker {
  margin-bottom: var(--spacer-base);
}
.form {
  &__action {
    @include for-desktop {
      flex: 0 0 100%;
      display: flex;
    }
  }
}

.checkout__button{
  margin: var(--spacer-xl) 0 var(--spacer-sm);
  &:hover {
    color:  white;
  }
  @include for-desktop {
    margin: 0 var(--spacer-xl) 0 0;
  }
}
</style>
