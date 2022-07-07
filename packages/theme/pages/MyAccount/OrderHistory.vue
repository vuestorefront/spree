<template>
  <SfTabs :open-tab="1">
    <SfTab title="My orders">
      <div>
        <p class="message">
          {{ $t('pages.my_account.order_history.details_and_status_orders') }}
        </p>
        <div v-if="orders.length === 0" class="no-orders">
          <p class="no-orders__title">{{ $t('pages.my_account.order_history.you_currently_have_no_orders') }}</p>
          <SfButton class="no-orders__button">{{ $t('pages.my_account.order_history.start_shopping') }}</SfButton>
        </div>
        <SfTable v-else class="orders">
          <SfTableHeading>
            <SfTableHeader
              v-for="{ key, value } in $t('pages.my_account.order_history.table_headers')"
              :key="key"
            >
              {{ value }}
            </SfTableHeader>
            <SfTableHeader class="orders__element--right" />
          </SfTableHeading>
          <SfTableRow v-for="order in orders" :key="orderGetters.getId(order)">
            <SfTableData v-e2e="'order-number'">{{ orderGetters.getId(order) }}</SfTableData>
            <SfTableData>{{ orderGetters.getDate(order) }}</SfTableData>
            <SfTableData>{{ $n(orderGetters.getPrice(order), 'currency') }}</SfTableData>
            <SfTableData>
              <span :class="getStatusTextClass(order)">{{ orderGetters.getStatus(order) }}</span>
            </SfTableData>
            <SfTableData class="orders__view orders__element--right">
              <SfButton class="sf-button--text desktop-only" @click="displayOrderDetails(order)">
                {{ $t('pages.my_account.order_history.view_details') }}
              </SfButton>
            </SfTableData>
          </SfTableRow>
        </SfTable>
        <p>{{ $t('pages.my_account.order_history.total_orders_label', { totalOrders }) }}</p>
      </div>
    </SfTab>
  </SfTabs>
</template>

<script>
import {
  SfTabs,
  SfTable,
  SfButton
} from '@storefront-ui/vue';
import { computed, useRouter } from '@nuxtjs/composition-api';
import { useUserOrder, orderGetters } from '@vue-storefront/spree';
import { AgnosticOrderStatus } from '@vue-storefront/core';
import { onSSR } from '@vue-storefront/core';

export default {
  name: 'OrderHistory',
  components: {
    SfTabs,
    SfTable,
    SfButton
  },
  setup(_, context) {
    const router = useRouter();
    const { orders, search } = useUserOrder();

    const displayOrderDetails = (order) => {
      const path = `/my-account/order-details/${orderGetters.getId(order)}`;
      const localeTransformedPath = context.root.localePath(path);
      router.push(localeTransformedPath);
    };

    onSSR(async () => {
      await search();
    });

    const getStatusTextClass = (order) => {
      const status = orderGetters.getStatus(order);
      switch (status) {
        case AgnosticOrderStatus.Open:
          return 'text-warning';
        case AgnosticOrderStatus.Complete:
          return 'text-success';
        default:
          return '';
      }
    };

    return {
      orders,
      totalOrders: computed(() => orderGetters.getOrdersTotal(orders.value)),
      getStatusTextClass,
      orderGetters,
      displayOrderDetails
    };
  }
};
</script>

<style lang='scss' scoped>
.no-orders {
  &__title {
    margin: 0 0 var(--spacer-lg) 0;
    font: var(--font-weight--normal) var(--font-size--base) / 1.6 var(--font-family--primary);
  }
  &__button {
    --button-width: 100%;
    @include for-desktop {
      --button-width: 17,5rem;
    }
  }
}
.orders {
  @include for-desktop {
    &__element {
      &--right {
        --table-column-flex: 1;
        text-align: right;
      }
    }
  }
}
.message {
  margin: 0 0 var(--spacer-xl) 0;
  font: var(--font-weight--light) var(--font-size--base) / 1.6 var(--font-family--primary);
  &__link {
    color: var(--c-primary);
    font-weight: var(--font-weight--medium);
    font-family: var(--font-family--primary);
    font-size: var(--font-size--base);
    text-decoration: none;
    &:hover {
      color: var(--c-text);
    }
  }
}
</style>
