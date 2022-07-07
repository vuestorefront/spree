<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form
      id="password-reset-form"
      class="form"
      @submit.prevent="handleSubmit(submitForm)"
    >
      <div class="form__horizontal">
        <ValidationProvider
          rules="required|password"
          v-slot="{ errors }"
          class="form__element"
          vid="confirmation"
        >
          <SfInput
            type="password"
            data-cy="password-reset-input_newPassword"
            v-model="form.newPassword"
            name="newPassword"
            :label="$t('components.my_account.password_reset_form.new_password_label')"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
      </div>
      <div class="form__horizontal">
        <ValidationProvider
          rules="required|password|confirmed:confirmation"
          v-slot="{ errors }"
          class="form__element"
        >
          <SfInput
            type="password"
            data-cy="password-reset-input_newPasswordConfirmation"
            v-model="form.newPasswordConfirmation"
            name="newPasswordConfirmation"
            :label="$t('components.my_account.password_reset_form.confirm_password_label')"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
      </div>
      <SfButton class="form__button">
        {{ "Change password" }}
      </SfButton>
    </form>
  </ValidationObserver>
</template>

<script>
import {
  SfInput,
  SfButton,
  SfSelect
} from '@storefront-ui/vue';
import {required, confirmed} from 'vee-validate/dist/rules';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { reactive} from '@nuxtjs/composition-api';
import { useUser } from '@vue-storefront/spree';

extend('required', {
  ...required,
  message: 'This field is required'
});

extend('password', {
  validate: value => String(value).length >= 8 && String(value).match(/[A-Za-z]/gi) && String(value).match(/[0-9]/gi),
  message: 'Password must have at least 8 characters including one letter and a number'
});

extend('confirmed', {
  ...confirmed,
  message: 'Passwords don\'t match'
});

export default {
  name: 'PasswordResetForm',

  components: {
    SfInput,
    SfButton,
    SfSelect,
    ValidationProvider,
    ValidationObserver
  },

  password: {
    type: Object,
    default: () => ({
      newPassword: '',
      newPasswordConfirmation: ''
    })
  },

  setup(password) {
    const { changePassword} = useUser();
    const form = reactive({
      newPassword: password.newPassword,
      newPasswordConfirmation: password.newPasswordConfirmation
    });

    const submitForm = () => {
      changePassword({current: '', new: form.newPassword });
    };

    return {
      form,
      submitForm
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
