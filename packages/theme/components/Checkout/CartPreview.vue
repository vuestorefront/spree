<template>
  <div>
    <div class="highlighted">
      <SfHeading
        :level="3"
        :title="$t('components.checkout.cart_preview.order_summary')"
        class="sf-heading--left sf-heading--no-underline title"
      />
    </div>
    <div class="highlighted">
      <SfProperty
        :name="$t('components.checkout.cart_preview.products')"
        :value="totalItems"
        class="sf-property--full-width sf-property--large property"
      />
      <SfProperty
        :name="$t('components.checkout.cart_preview.subtotal')"
        :value="$n(totals.subtotal, 'currency')"
        :class="['sf-property--full-width', 'sf-property--large property', { discounted: hasSpecialPrice }]"
      />
      <SfProperty
        v-for="discount in discounts"
        :key="discount.id"
        :name="discount.name + (discount.code && ` (${discount.code})`)"
        :value="'-' + $n(discount.value, 'currency')"
        class="sf-property--full-width sf-property--small"
      />
     <SfProperty
        v-if="hasSpecialPrice"
        :value="$n(totals.special, 'currency')"
        class="sf-property--full-width sf-property--small property special-price"
      />
      <SfProperty
        :name="$t('components.checkout.cart_preview.shipping')"
        v-if="shippingPrice"
        :value="$n(shippingPrice, 'currency')"
        class="sf-property--full-width sf-property--large property"
      />
      <SfProperty
        :name="$t('components.checkout.cart_preview.total')"
        :value="$n(totals.total, 'currency')"
        class="sf-property--full-width sf-property--large property-total"
      />
    </div>
    <div class="highlighted promo-code">
      <SfInput
        data-cy="cart-preview-input_promoCode"
        v-model="promoCode"
        name="promoCode"
        :label="$t('components.checkout.cart_preview.enter_promo_code')"
        class="sf-input--filled promo-code__input"
      />
      <SfButton class="promo-code__button" @click="() => applyCoupon({ couponCode: promoCode })">{{ $t('components.checkout.cart_preview.apply') }}</SfButton>
    </div>
    <span class="highlighted coupon-error" v-if="cartError.applyCoupon">{{ cartError.applyCoupon.message }}</span>
    <div class="highlighted">
      <SfCharacteristic
        v-for="characteristic in characteristics"
        :key="characteristic.title"
        :title="characteristic.title"
        :description="characteristic.description"
        :icon="characteristic.icon"
        class="characteristic"
      />
    </div>
  </div>
</template>
<script>

import {
  SfHeading,
  SfButton,
  SfCollectedProduct,
  SfProperty,
  SfCharacteristic,
  SfInput,
  SfCircleIcon
} from '@storefront-ui/vue';
import { computed, ref } from '@nuxtjs/composition-api';
import { useCart, cartGetters } from '@vue-storefront/spree';

export default {
  name: 'CartPreview',
  components: {
    SfHeading,
    SfButton,
    SfCollectedProduct,
    SfProperty,
    SfCharacteristic,
    SfInput,
    SfCircleIcon
  },
  setup () {
    const { cart, removeItem, updateItemQty, applyCoupon, error: cartError } = useCart();

    const listIsHidden = ref(false);
    const promoCode = ref('');
    const showPromoCode = ref(false);

    const products = computed(() => cartGetters.getItems(cart.value));
    const totalItems = computed(() => cartGetters.getTotalItems(cart.value));
    const totals = computed(() => cartGetters.getTotals(cart.value));
    const discounts = computed(() => cartGetters.getDiscounts(cart.value));
    const shippingPrice = computed(() => cartGetters.getShippingPrice(cart.value));

    return {
      discounts,
      totalItems,
      listIsHidden,
      products,
      totals,
      shippingPrice,
      promoCode,
      showPromoCode,
      removeItem,
      updateItemQty,
      cartGetters,
      applyCoupon,
      characteristics: [
        {
          title: 'Safety',
          description: 'It carefully packaged with a personal touch',
          icon: 'safety'
        },
        {
          title: 'Easy shipping',
          description:
            'You’ll receive dispatch confirmation and an arrival date',
          icon: 'shipping'
        },
        {
          title: 'Changed your mind?',
          description: 'Rest assured, we offer free returns within 30 days',
          icon: 'return'
        }
      ],

      hasSpecialPrice: computed(() => totals.value.special > 0 && totals.value.special < totals.value.subtotal),
      cartError
    };
  }
};
</script>

<style lang="scss" scoped>
.highlighted {
  box-sizing: border-box;
  width: 100%;
  background-color: var(--c-light);
  padding: var(--spacer-xl) var(--spacer-xl) 0;
  &:last-child {
    padding-bottom: var(--spacer-xl);
  }
}
.total-items {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacer-xl);
}
.property {
  margin-bottom: var(--spacer-base);
}
.property-total {
  margin-top: var(--spacer-xl);
  padding-top: var(--spacer-lg);
  font-size: var(--font-size-xl);
  border-top: var(--c-white) 1px solid;
  --property-name-font-weight: var(--font-weight--semibold);
  --property-name-color: var(--c-text);
}

.characteristic {
  &:not(:last-child) {
    margin-bottom: var(--spacer-base);
  }
}
.promo-code {
  display: flex;
  align-items: flex-start;
  &__button {
    --button-width: 6.3125rem;
    --button-height: var(--spacer-lg);
  }
  &__input {
    --input-background: var(--c-white);
    flex: 1;
  }
}

.coupon-error {
  display: block;
  color: var(--c-danger);
  padding-top: 0;
}

.discounted {
  &::v-deep .sf-property__value {
    color: var(--c-danger);
    text-decoration: line-through;
  }
}

.special-price {
  justify-content: flex-end;

  &::v-deep .sf-property__name {
    display: none;
  }
}

</style>
