<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <SfHeading
      v-e2e="'shipping-heading'"
      :level="3"
      :title="$t('pages.checkout.shipping.shipping_heading')"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <AddressPicker
      v-if="isAuthenticated && savedAddresses"
      v-model="selectedSavedAddressId"
      :key="isFormSubmitted"
      :addresses="savedAddresses.addresses"
      :saved-address="checkoutShippingAddress"
      :isFormSubmitted="isFormSubmitted"
      @input="getBackToShippingDetails()"

    />
    <form @submit.prevent="handleSubmit(handleFormSubmit)">
      <div v-if="!selectedSavedAddressId" class="form">
        <ValidationProvider
          v-if="!isAuthenticated"
          name="email"
          rules="required|email"
          v-slot="{ errors }"
          slim
        >
          <SfInput
            v-on:click="getBackToShippingDetails()"
            :class="{'disable-input': isFormSubmitted}"
            v-model="form.email"
            :label="$t('pages.checkout.shipping.email_label')"
            name="email"
            class="form__element"
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
        <ValidationProvider
          name="firstName"
          rules="required|min:2"
          v-slot="{ errors }"
          slim
        >
          <SfInput
            v-on:click="getBackToShippingDetails()"
            :class="{'disable-input': isFormSubmitted}"
            v-e2e="'shipping-firstName'"
            v-model="form.firstName"
            :label="$t('pages.checkout.shipping.first_name_label')"
            name="firstName"
            class="form__element form__element--half"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
        <ValidationProvider
          name="lastName"
          rules="required|min:2"
          v-slot="{ errors }"
          slim
        >
          <SfInput
            v-on:click="getBackToShippingDetails()"
            :class="{'disable-input': isFormSubmitted}"
            v-e2e="'shipping-lastName'"
            v-model="form.lastName"
            :label="$t('pages.checkout.shipping.last_name_label')"
            name="lastName"
            class="form__element form__element--half form__element--half-even"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
        <ValidationProvider
          name="streetName"
          rules="required|min:2"
          v-slot="{ errors }"
          slim
        >
          <SfInput
            v-on:click="getBackToShippingDetails()"
            :class="{'disable-input': isFormSubmitted}"
            v-e2e="'shipping-streetName'"
            v-model="form.addressLine1"
            :label="$t('pages.checkout.shipping.street_label')"
            name="streetName"
            class="form__element"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
        <SfInput
          v-on:click="getBackToShippingDetails()"
          :class="{'disable-input': isFormSubmitted}"
          v-e2e="'shipping-apartment'"
          v-model="form.addressLine2"
          :label="$t('pages.checkout.shipping.apartment_label')"
          name="apartment"
          class="form__element"
        />
        <ValidationProvider
          name="city"
          rules="required|min:2"
          v-slot="{ errors }"
          slim
        >
          <SfInput
            v-on:click="getBackToShippingDetails()"
            :class="{'disable-input': isFormSubmitted}"
            v-e2e="'shipping-city'"
            v-model="form.city"
            :label="$t('pages.checkout.shipping.city_label')"
            name="city"
            class="form__element"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
        <ValidationProvider
          v-if="states && states.length > 0"
          v-slot="{ errors }"
          name="state"
          rules="required"
          slim
        >
          <SfSelect
            :class="{'disable-dropdown': isFormSubmitted}"
            data-cy="shipping-details-input_state"
            class="form__element form form__select sf-select--underlined"
            v-model="form.state"
            name="state"
            :label="$t('pages.checkout.shipping.state_label')"
            :required="isStateRequired"
            :valid="!errors[0]"
            :errorMessage="errors[0]"
            @input="getBackToShippingDetails()"
          >
            <SfSelectOption
              v-for="{ code, name } in states"
              :key="code"
              :value="name"
            >
              {{ name }}
            </SfSelectOption>
          </SfSelect>
        </ValidationProvider>
        <ValidationProvider
          name="country"
          rules="required|min:2"
          v-slot="{ errors }"
          slim
        >
          <SfSelect
            :class="{'disable-dropdown': isFormSubmitted}"
            v-e2e="'shipping-country'"
            v-model="form.country"
            :label="$t('pages.checkout.shipping.country_label')"
            name="country"
            class="form__element form__element--half form__select sf-select--underlined"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
            @input="getBackToShippingDetails()"
          >
            <SfSelectOption
              v-for="countryOption in countries"
              :key="countryOption.key"
              :value="countryOption.key"
            >
              {{ countryOption.label }}
            </SfSelectOption>
          </SfSelect>
        </ValidationProvider>
        <ValidationProvider
          name="zipCode"
          rules="required|min:2"
          v-slot="{ errors }"
          slim
        >
          <SfInput
            v-on:click="getBackToShippingDetails()"
            :class="{'disable-input': isFormSubmitted}"
            v-e2e="'shipping-zipcode'"
            v-model="form.postalCode"
            :label="$t('pages.checkout.shipping.postal_code_label')"
            name="zipCode"
            class="form__element form__element--half form__element--half-even"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
        <ValidationProvider
          name="phone"
          rules="required|digits:9"
          v-slot="{ errors }"
          slim
        >
          <SfInput
            v-on:click="getBackToShippingDetails()"
            :class="{'disable-input': isFormSubmitted}"
            v-e2e="'shipping-phone'"
            v-model="form.phone"
            :label="$t('pages.checkout.shipping.phone_number_label')"
            name="phone"
            class="form__element"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
        <SfCheckbox
          class="form__save-address"
          v-if="isAuthenticated && !isFormSubmitted"
          v-model="isSaveAddressSelected"
          :label="$t('pages.checkout.shipping.save_address_label')"
        />
      </div>
      <div class="form">
        <div class="form__action">
          <SfCheckbox
            name="shippingToBilling"
            :label="$t('pages.checkout.shipping.shipping_to_billing_label')"
            hintMessage=""
            :required="false"
            infoMessage=""
            errorMessage=""
            valid
            :disabled="false"
            v-model="isCopyToBillingSelected"
          />
        </div>
        <div class="form__action">
          <SfButton
            v-if="!isFormSubmitted"
            :disabled="loading"
            class="form__action-button"
            type="submit"
          >
            {{ $t('pages.checkout.shipping.select_shipping_method') }}
          </SfButton>
        </div>
      </div>
      <VsfShippingProvider
        v-if="isFormSubmitted"
        @submit="router.push(localePath({ name: 'billing' }))"
        @back="() => isFormSubmitted = !isFormSubmitted"
      />
    </form>
  </ValidationObserver>
</template>

<script>
import {
  SfHeading,
  SfInput,
  SfButton,
  SfSelect,
  SfCheckbox
} from '@storefront-ui/vue';
import { ref, watch, computed, onMounted, useRouter } from '@nuxtjs/composition-api';
import { onSSR, useVSFContext } from '@vue-storefront/core';
import { useBilling, useShipping, useCountry, useUser, useUserShipping } from '@vue-storefront/spree';
import { required, min, digits } from 'vee-validate/dist/rules';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import AddressPicker from '~/components/Checkout/AddressPicker';
import _ from 'lodash';

extend('required', {
  ...required,
  message: 'This field is required'
});
extend('min', {
  ...min,
  message: 'The field should have at least {length} characters'
});
extend('digits', {
  ...digits,
  message: 'Please provide a valid phone number'
});

export default {
  name: 'Shipping',
  components: {
    SfHeading,
    SfInput,
    SfButton,
    SfSelect,
    SfCheckbox,
    AddressPicker,
    ValidationProvider,
    ValidationObserver,
    VsfShippingProvider: () => import('~/components/Checkout/VsfShippingProvider')
  },
  setup () {
    const router = useRouter();
    const isFormSubmitted = ref(false);
    const isSaveAddressSelected = ref(false);
    const isCopyToBillingSelected = ref(true);
    const { countries, states, load: loadCountries, loadStates } = useCountry();
    const { shipping: checkoutShippingAddress, load, save, loading } = useShipping();
    const { shipping: savedAddresses, load: loadSavedAddresses, addAddress } = useUserShipping();
    const { isAuthenticated } = useUser();
    const { $spree } = useVSFContext();
    const billing = useBilling();

    const selectedSavedAddressId = ref(undefined);
    const form = ref({
      email: '',
      firstName: '',
      lastName: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      country: '',
      postalCode: '',
      phone: null
    });

    const selectedSavedAddress = computed(() => {
      if (!selectedSavedAddressId.value) {
        return undefined;
      }

      return savedAddresses.value.addresses.find(e => e._id === selectedSavedAddressId.value);
    });

    const getBackToShippingDetails = () => {
      if (isFormSubmitted.value) {
        isFormSubmitted.value = !isFormSubmitted;
      }
    };

    const isStateRequired = computed(() => form.value.country && countries.value.find(e => e.key === form.value.country).stateRequired);

    const handleFormSubmit = async () => {
      if (!isAuthenticated.value) {
        await $spree.api.saveGuestCheckoutEmail(form.value.email);
      }

      const shippingAddress = isAuthenticated.value && selectedSavedAddress.value
        ? selectedSavedAddress.value
        : form.value;

      await save({ shippingDetails: shippingAddress });
      if (isCopyToBillingSelected.value) {
        await billing.save({ billingDetails: shippingAddress });
      }

      if (isSaveAddressSelected.value) {
        await addAddress({ address: shippingAddress });
      }

      isFormSubmitted.value = true;
    };

    const isEqualAddress = (a, b) => {
      const aWithoutId = _.omit(a, ['_id']);
      const bWithoutId = _.omit(b, ['_id']);
      return _.isEqual(aWithoutId, bWithoutId);
    };

    const populateSelectedAddressId = () => {
      if (checkoutShippingAddress.value && savedAddresses.value?.addresses) {
        selectedSavedAddressId.value = savedAddresses.value.addresses.find(e => isEqualAddress(e, checkoutShippingAddress.value))?._id;
      }
    };

    onMounted(async () => {
      await load();
      await loadSavedAddresses();
      await loadCountries();

      if (form.value.country) {
        await loadStates(form.value.country);
      }

      if (checkoutShippingAddress.value) {
        form.value = _.omit(checkoutShippingAddress.value, ['_id']);
      }

      populateSelectedAddressId();
    });

    onSSR(async () => {
      await load();
      await loadSavedAddresses();
      await loadCountries();

      if (form.value.country) {
        await loadStates(form.value.country);
      }

      if (checkoutShippingAddress.value) {
        form.value = _.omit(checkoutShippingAddress.value, ['_id']);
      }

      populateSelectedAddressId();
    });

    watch(() => form.value.country, async (newValue, oldValue) => {
      if (newValue !== oldValue) {
        form.value.state = null;
        await loadStates(newValue);
      }
    });

    return {
      router,
      loading,
      isFormSubmitted,
      isSaveAddressSelected,
      isAuthenticated,
      isStateRequired,
      form,
      countries,
      states,
      savedAddresses,
      selectedSavedAddressId,
      checkoutShippingAddress,
      handleFormSubmit,
      isCopyToBillingSelected,
      getBackToShippingDetails
    };
  }
};
</script>

<style lang="scss" scoped>
.form {
  --button-width: 100%;
  &__select {
    display: flex;
    align-items: center;
    --select-option-font-size: var(--font-size--lg);
    ::v-deep .sf-select__dropdown {
      font-size: var(--font-size--lg);
      margin: 0;
      font-family: var(--font-family--secondary);
      font-weight: var(--font-weight--normal);
    }
  }
  @include for-desktop {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    --button-width: auto;
  }
  &__element {
    margin: 0 0 var(--spacer-xl) 0;
    @include for-desktop {
      flex: 0 0 100%;
    }
    &--half {
      @include for-desktop {
        flex: 1 1 50%;
      }
      &-even {
        @include for-desktop {
          padding: 0 0 0 var(--spacer-xl);
        }
      }
    }
  }
  &__action {
    @include for-desktop {
      flex: 0 0 100%;
      display: flex;
    }
  }
  &__action-button {
    &--secondary {
      @include for-desktop {
        order: -1;
        text-align: left;
      }
    }
    &--add-address {
      width: 100%;
      margin: 0;
      @include for-desktop {
        margin: 0 0 var(--spacer-lg) 0;
        width: auto;
      }
    }
  }
  &__back-button {
    margin: var(--spacer-xl) 0 var(--spacer-sm);
    &:hover {
      color:  var(--c-white);
    }
    @include for-desktop {
      margin: 0 var(--spacer-xl) 0 0;
    }
  }
  &__save-address {
    margin: 0 0 var(--spacer-xs) 0;
    --checkbox-font-family: var(--font-family--secondary);
  }
}

.shipping {
  &__label {
    display: flex;
    justify-content: space-between;
  }
  &__description {
    --radio-description-margin: 0;
    --radio-description-font-size: var(--font-xs);
  }
}

.title {
  margin: var(--spacer-xl) 0 var(--spacer-base) 0;
}
.disable-input{
    --input-border-color: var(--c-text-disabled);
    --input-color: var(--c-text-disabled);
    -webkit-text-fill-color: var(--c-text-disabled);

}
.disable-dropdown{
  color: var(--c-text-disabled);
  --select-dropdown-border-color: var(--c-text-disabled);
  --select-label-color: var(--c-text-disabled);
  --select-dropdown-color: var(--c-text-disabled);
}

</style>
