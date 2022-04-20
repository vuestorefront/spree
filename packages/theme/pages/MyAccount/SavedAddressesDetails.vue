<template>
  <transition name="fade">
    <SfTabs
      v-if="edittingAddress"
      key="edit-address"
      :open-tab="1"
      class="tab-orphan"
    >
      <SfTab
        :title="isNewAddress ? 'Add the address' : 'Update the address'">
        <p class="message">
          {{ $t('pages.my_account.saved_addresses_details.contact_details_updated') }}
        </p>

        <SavedAddressForm
          :address="activeAddress"
          :isNew="isNewAddress"
          @submit="saveAddress" />
      </SfTab>
    </SfTabs>
    <SfTabs
      v-else
      :open-tab="1"
      key="address-list"
      class="tab-orphan">
      <SfTab title="Saved addresses" class="saved-addresses">
        <p class="saved-addresses__message">
          {{ $t('pages.my_account.saved_addresses_details.manage_saved_addresses') }}
        </p>
        <transition-group tag="div" name="fade" class="saved-addresses__list">
          <div
            v-for="address in addresses"
            :key="userShippingGetters.getId(address)"
            class="saved-addresses__address address">
            <div class="address__content">
              <UserSavedAddress :address="address" />
            </div>
            <div class="address__actions">
              <SfIcon
                icon="cross"
                color="gray"
                size="14px"
                role="button"
                class="smartphone-only"
                @click="removeAddress(address)"
              />
              <SfButton
                class="address__button address__button--change"
                @click="changeAddress(address)">
                {{ $t('pages.my_account.saved_addresses_details.change') }}
              </SfButton>
              <SfButton
                class="color-light address__button address__button--delete desktop-only"
                @click="removeAddress(address)">
                {{ $t('pages.my_account.saved_addresses_details.delete') }}
              </SfButton>
            </div>
          </div>
        </transition-group>
        <SfButton
          class="saved-addresses__button saved-addresses__button--action"
          @click="changeAddress()">
          {{ $t('pages.my_account.saved_addresses_details.add_new_address') }}
        </SfButton>
      </SfTab>
    </SfTabs>
  </transition>
</template>
<script>
import {
  SfTabs,
  SfButton,
  SfIcon
} from '@storefront-ui/vue';
import UserSavedAddress from '~/components/UserSavedAddress';
import SavedAddressForm from '~/components/MyAccount/SavedAddressForm';
import { useUserShipping, userShippingGetters } from '@vue-storefront/spree';
import { ref, computed } from '@nuxtjs/composition-api';
import { onSSR } from '@vue-storefront/core';

export default {
  name: 'SavedAddressesDetails',
  components: {
    SfTabs,
    SfButton,
    SfIcon,
    UserSavedAddress,
    SavedAddressForm
  },
  setup() {
    const { shipping, load: loadUserSavedAddresses, addAddress, deleteAddress, updateAddress } = useUserShipping();
    const addresses = computed(() => userShippingGetters.getAddresses(shipping.value));
    const edittingAddress = ref(false);
    const activeAddress = ref(undefined);
    const isNewAddress = computed(() => !activeAddress.value);

    const changeAddress = (address = undefined) => {
      activeAddress.value = address;
      edittingAddress.value = true;
    };

    const removeAddress = address => deleteAddress({ address });

    const saveAddress = async ({ form, onComplete, onError }) => {
      try {
        const actionMethod = isNewAddress.value ? addAddress : updateAddress;
        const data = await actionMethod({ address: form });
        edittingAddress.value = false;
        activeAddress.value = undefined;
        await onComplete(data);
      } catch (error) {
        onError(error);
      }
    };

    onSSR(async () => {
      await loadUserSavedAddresses();
    });

    return {
      changeAddress,
      updateAddress,
      removeAddress,
      saveAddress,
      userShippingGetters,
      addresses,
      edittingAddress,
      activeAddress,
      isNewAddress
    };
  }
};
</script>

<style lang='scss' scoped>

.saved-addresses {
  &__message {
    font-family: var(--font-family--primary);
    line-height: 1.6;
    font-size: var(--font-size--base);
    margin: 0 0 var(--spacer-base);
  }
  &__list {
    margin-bottom: var(--spacer-base);
  }
  .address {
    display: flex;
    padding: var(--spacer-xl) 0;
    border-top: 1px solid var(--c-light);
    &:last-child {
      border-bottom: 1px solid var(--c-light);
    }
    &__content {
      flex: 1;
      color: var(--c-text);
      font-size: var(--font-size--base);
      font-weight: 300;
      line-height: 1.6;
      margin: 0;
      p {
        margin: 0;
      }
    }
    &__actions {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-end;
      @include for-desktop {
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
      }
    }
    &__button {
      &--delete {
        color: var(--c-link);
        @include for-desktop {
          margin-left: var(--spacer-base);
        }
      }
      &--action {
        width: 100%;
        @include for-desktop {
          width: auto;
        }
      }
    }
  }
}
.tab-orphan {
  @include for-mobile {
    ::v-deep .sf-tabs {
      &__title {
        display: none;
      }

      &__content {
        border: 0;
        padding: 0;
      }
    }
  }
}
</style>
