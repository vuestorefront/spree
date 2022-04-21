<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form
      id="savedAddress-details-form"
      class="form"
      @submit.prevent="handleSubmit(submitForm)"
    >
      <div class="form__horizontal">
        <ValidationProvider
          rules="required|min:2"
          v-slot="{ errors }"
          class="form__element"
        >
          <SfInput
            data-cy="savedAddress-details-input_firstName"
            v-model="form.firstName"
            name="firstName"
            :label="$t('components.my_account.saved_address_form.first_name_label')"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
        <ValidationProvider
          rules="required|min:2"
          v-slot="{ errors }"
          class="form__element"
        >
          <SfInput
            data-cy="savedAddress-details-input_lastName"
            v-model="form.lastName"
            name="lastName"
            :label="$t('components.my_account.saved_address_form.last_name_label')"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
      </div>
      <ValidationProvider
        rules="required|min:2"
        v-slot="{ errors }"
        class="form__element"
      >
        <SfInput
          data-cy="savedAddress-details-input_streetName"
          v-model="form.addressLine1"
          name="streetName"
          :label="$t('components.my_account.saved_address_form.street_label')"
          required
          :valid="!errors[0]"
          :errorMessage="errors[0]"
        />
      </ValidationProvider>
      <SfInput
        data-cy="savedAddress-details-input_apartment"
        v-model="form.addressLine2"
        name="apartment"
        :label="$t('components.my_account.saved_address_form.apartment_label')"
        class="form__element"
      />
      <div class="form__horizontal">
        <ValidationProvider
          rules="required|min:2"
          v-slot="{ errors }"
          class="form__element"
        >
          <SfInput
            data-cy="savedAddress-details-input_city"
            v-model="form.city"
            name="city"
            :label="$t('components.my_account.saved_address_form.city_label')"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
        <ValidationProvider
          :rules="`required|oneOf:${states.map(s => s.name).join(',')}`"
          v-if="states && states.length > 0"
          v-slot="{ errors }"
          class="form__element"
        >
          <SfSelect
            data-cy="savedAddress-details-input_state"
            class="form__select sf-select--underlined"
            v-model="form.state"
            name="state"
            :label="$t('components.my_account.saved_address_form.state_label')"
            :required="isStateRequired"
            :valid="!errors[0]"
            :errorMessage="errors[0]"
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
      </div>
      <div class="form__horizontal">
        <ValidationProvider
          rules="required|min:4"
          v-slot="{ errors }"
          class="form__element"
        >
          <SfInput
            data-cy="savedAddress-details-input_zipCode"
            v-model="form.postalCode"
            name="zipCode"
            :label="$t('components.my_account.saved_address_form.postal_code_label')"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
        <ValidationProvider
          v-if="countries"
          :rules="`required|oneOf:${countries.map(c => c.key).join(',')}`"
          v-slot="{ errors }"
          class="form__element"
        >
          <SfSelect
            data-cy="savedAddress-details-select_country"
            class="form__select sf-select--underlined"
            v-model="form.country"
            name="country"
            :label="$t('components.my_account.saved_address_form.country_label')"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          >
            <SfSelectOption
              v-for="{ key, label } in countries"
              :key="key"
              :value="key"
            >
              {{ label }}
            </SfSelectOption>
          </SfSelect>
        </ValidationProvider>
      </div>
      <ValidationProvider
        rules="required|min:8"
        v-slot="{ errors }"
        class="form__element"
      >
        <SfInput
          data-cy="savedAddress-details-input_phoneNumber"
          v-model="form.phone"
          name="phone"
          :label="$t('components.my_account.saved_address_form.phone_number_label')"
          required
          :valid="!errors[0]"
          :errorMessage="errors[0]"
        />
      </ValidationProvider>
      <SfCheckbox
        v-model="form.isDefault"
        name="isDefault"
        :label="$t('components.my_account.saved_address_form.set_as_default_label')"
        class="form__checkbox-isDefault"
      />
      <SfButton class="form__button">
        {{ $t(`components.my_account.saved_address_form.${isNew ? 'button_add_address_label' : 'button_update_address_label'}`) }}
      </SfButton>
    </form>
  </ValidationObserver>
</template>

<script>
import {
  SfInput,
  SfButton,
  SfSelect,
  SfCheckbox
} from '@storefront-ui/vue';
import { required, min, oneOf } from 'vee-validate/dist/rules';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { reactive, watch, computed, onMounted } from '@nuxtjs/composition-api';
import { onSSR } from '@vue-storefront/core';
import { useCountry } from '@vue-storefront/spree';

extend('required', {
  ...required,
  message: 'This field is required'
});

extend('min', {
  ...min,
  message: 'The field should have at least {length} characters'
});

extend('oneOf', {
  ...oneOf,
  message: 'Invalid country'
});

export default {
  name: 'SavedAddressForm',

  components: {
    SfInput,
    SfButton,
    SfSelect,
    SfCheckbox,
    ValidationProvider,
    ValidationObserver
  },

  props: {
    address: {
      type: Object,
      default: () => ({
        _id: undefined,
        firstName: '',
        lastName: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
        phone: '',
        isDefault: false
      })
    },
    isNew: {
      type: Boolean,
      required: true
    }
  },

  setup(props, { emit }) {
    const { countries, states, load: loadCountries, loadStates } = useCountry();
    const form = reactive({
      _id: props.address._id,
      firstName: props.address.firstName,
      lastName: props.address.lastName,
      addressLine1: props.address.addressLine1,
      addressLine2: props.address.addressLine2,
      city: props.address.city,
      state: props.address.state,
      postalCode: props.address.postalCode,
      country: props.address.country,
      phone: props.address.phone,
      isDefault: props.address.isDefault
    });
    const isStateRequired = computed(() => form.country && countries.value.find(e => e.key === form.country).stateRequired);

    const submitForm = () => {
      emit('submit', {
        form,
        onComplete: () => {},
        // TODO: Handle Error
        onError: () => {}
      });
    };

    onSSR(async () => {
      await loadCountries();

      if (form.country) {
        await loadStates(form.country);
      }
    });

    onMounted(async () => {
      await loadCountries();

      if (form.country) {
        await loadStates(form.country);
      }
    });

    watch(() => form.country, async (newValue, oldValue) => {
      if (newValue !== oldValue) {
        form.state = null;
        await loadStates(newValue);
      }
    });

    return {
      form,
      submitForm,
      countries,
      states,
      isStateRequired
    };
  }
};
</script>

<style lang='scss' scoped>
.form {
  &__element {
    display: block;
    margin-bottom: var(--spacer-base);
  }
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
  &__button {
    display: block;
    margin-top: var(--spacer-lg);
  }
  &__horizontal {
    @include for-desktop {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    .form__element {
      @include for-desktop {
        flex: 1;
        margin-right: var(--spacer-lg);
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
