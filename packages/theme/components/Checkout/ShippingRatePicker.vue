<template>
  <div class="shipping-rate-picker">
    <SfHeading
      :level="4"
      :title="name"
      class="shipping-rate-picker__name sf-heading--left sf-heading--no-underline title"
    />
    <SfRadio
      v-e2e="'shipping-method'"
      v-for="rate in shippingRates"
      :key="checkoutGetters.getShippingMethodId(rate)"
      :label="checkoutGetters.getShippingMethodName(rate)"
      :value="checkoutGetters.getShippingMethodId(rate)"
      :description="$n(checkoutGetters.getShippingMethodPrice(rate), 'currency')"
      :selected="selectedRateId"
      name="shippingMethod"
      class="form__radio"
      @input="selectRate(rate.id)"
    />
    <SfAlert
      v-if="!areShippingRatesAvailable"
      message="There is no shipping method available for this shipment"
      type="warning"
    />
  </div>
</template>

<script>
import { SfHeading, SfRadio, SfAlert } from '@storefront-ui/vue';
import { checkoutGetters } from '@vue-storefront/spree';

export default {
  name: 'ShippingRatePicker',

  components: {
    SfHeading,
    SfRadio,
    SfAlert
  },

  props: {
    name: {
      type: String,
      required: true
    },
    shipment: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      selectedRateId: null,
      checkoutGetters
    };
  },

  mounted() {
    const preselectedRateId = (this.shippingRates?.find((rate) => rate?.selected)?.id) ?? null;
    this.selectRate(preselectedRateId);
  },

  computed: {
    shippingRates() {
      return this.shipment.availableShippingRates;
    },
    areShippingRatesAvailable() {
      return this.shippingRates.length > 0;
    }
  },

  methods: {
    selectRate(value) {
      this.selectedRateId = value;
      this.$emit('change', value);
    }
  }
};
</script>

<style lang="scss" scoped>
.shipping-rate-picker__name {
  margin-bottom: var(--spacer-sm);
}
</style>
