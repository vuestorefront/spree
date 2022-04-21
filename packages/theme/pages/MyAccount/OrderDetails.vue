<template>
  <SfTabs :open-tab="1" v-if="order">
    <SfTab :title="$t('pages.my_account.order_details.tab_title', { orderId: orderGetters.getId(order) || '...' })">
      <SfButton class="sf-button--text all-orders" @click="displayOrderHistory()">{{ $t('pages.my_account.order_details.button_show_all_orders_label') }}</SfButton>
      <div class="highlighted highlighted--total">
        <SfProperty
          :name="$t('pages.my_account.order_details.table_header_order_id')"
          :value="orderGetters.getId(order)"
          class="sf-property--full-width property"
        />
        <SfProperty
          :name="$t('pages.my_account.order_details.table_header_payment_date')"
          :value="orderGetters.getDate(order)"
          class="sf-property--full-width property"
        />
        <SfProperty
          :name="$t('pages.my_account.order_details.table_header_status')"
          :value="orderGetters.getStatus(order)"
          class="sf-property--full-width property"
        />
        <SfProperty
          :name="$t('pages.my_account.order_details.table_header_total')"
          :value="$n(orderGetters.getPrice(order), 'currency')"
          class="sf-property--full-width property"
        />
      </div>
      <SfTable class="products">
        <SfTableHeading>
          <SfTableHeader
            v-for="{ key, value } in $t('pages.my_account.order_details.products_table_headers')"
            :key="key"
            :class="{ products__name: key === 'products_name' }"
          >
            {{ value }}
          </SfTableHeader>
        </SfTableHeading>
        <SfTableRow v-for="(item, i) in orderGetters.getItems(order)" :key="i">
          <SfTableData class="products__name">
            <nuxt-link :to="`/p/${orderGetters.getItemSku(item)}/${orderGetters.getItemSku(item)}`">
              {{orderGetters.getItemName(item)}}
            </nuxt-link>
          </SfTableData>
          <SfTableData>{{orderGetters.getItemQty(item)}}</SfTableData>
          <SfTableData>{{$n(orderGetters.getItemPrice(item), 'currency')}}</SfTableData>
        </SfTableRow>
      </SfTable>
    </SfTab>
  </SfTabs>
</template>

<script>
import {
  SfTabs,
  SfTable,
  SfButton,
  SfProperty
} from '@storefront-ui/vue';
import { computed, useRoute, useRouter } from '@nuxtjs/composition-api';
import { useUserOrder, orderGetters } from '@vue-storefront/spree';
import { onSSR } from '@vue-storefront/core';

export default {
  name: 'OrderDetails',
  components: {
    SfTabs,
    SfTable,
    SfButton,
    SfProperty
  },
  setup(_, context) {
    const route = useRoute();
    const router = useRouter();
    const { orders, search } = useUserOrder();
    const orderId = route?.value?.params?.id;

    const order = computed(() => orderId ? (orders.value || null) : null);

    const displayOrderHistory = () => {
      const localeTransformedPath = context.root.localePath('/my-account/order-history');
      router.push(localeTransformedPath);
    };

    onSSR(async () => {
      if (orderId) await search({ orderId });
    });

    return {
      orderGetters,
      displayOrderHistory,
      order
    };
  }
};
</script>

<style lang='scss' scoped>
.all-orders {
  --button-padding: var(--spacer-base) 0;
}
.products {
  --table-column-flex: 1;
  &__name {
    margin-right: var(--spacer-sm);
    @include for-desktop {
      --table-column-flex: 2;
    }
  }
}
.highlighted {
  box-sizing: border-box;
  width: 100%;
  background-color: var(--c-light);
  padding: var(--spacer-sm);
  --property-value-font-size: var(--font-size--base);
  --property-name-font-size: var(--font-size--base);
  &:last-child {
    margin-bottom: 0;
  }
  ::v-deep .sf-property__name {
    white-space: nowrap;
  }
  ::v-deep .sf-property__value {
    text-align: right;
  }
  &--total {
    margin-bottom: var(--spacer-sm);
  }
  @include for-desktop {
    padding: var(--spacer-xl);
    --property-name-font-size: var(--font-size--lg);
    --property-name-font-weight: var(--font-weight--medium);
    --property-value-font-size: var(--font-size--lg);
    --property-value-font-weight: var(--font-weight--semibold);
  }
}
</style>

