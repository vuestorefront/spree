<template>
  <SfTabs :open-tab="1">
    <!-- Personal data update -->
    <SfTab title="Personal data">
      <p class="message">
        {{ $t('pages.my_account.my_profile.feel_free_to_edit') }}
      </p>

      <ProfileUpdateForm @submit="updatePersonalData" />

      <p class="notice">
        {{ $t('pages.my_account.my_profile.use_your_personal_data') }}
        <a href="">{{ $t('pages.my_account.my_profile.privacy_policy') }}</a>
      </p>
    </SfTab>
    <!-- Password reset -->
    <SfTab title="Password change">

      <p class="message">
        {{ $t('pages.my_account.my_profile.change_password_your_account') }}:<br />
      </p>
      <PasswordResetForm/>
    </SfTab>
  </SfTabs>
</template>

<script>
import ProfileUpdateForm from '~/components/MyAccount/ProfileUpdateForm';
import PasswordResetForm from '~/components/MyAccount/PasswordResetForm';
import { SfTabs, SfInput, SfButton } from '@storefront-ui/vue';
import { useUser } from '@vue-storefront/spree';

export default {
  name: 'PersonalDetails',

  components: {
    SfTabs,
    SfInput,
    SfButton,
    ProfileUpdateForm,
    PasswordResetForm
  },

  setup() {
    const { updateUser} = useUser();

    const formHandler = async (fn, onComplete, onError) => {
      try {
        const data = await fn();
        await onComplete(data);
      } catch (error) {
        onError(error);
      }
    };

    const updatePersonalData = ({ form, onComplete, onError }) => formHandler(() => updateUser({ user: form.value }), onComplete, onError);

    return {
      updatePersonalData
    };
  }
};
</script>

<style lang='scss' scoped>
.message,
.notice {
  font-family: var(--font-family--primary);
  line-height: 1.6;
}
.message {
  margin: 0 0 var(--spacer-xl) 0;
  font-size: var(--font-size--base);
  &__label {
    font-weight: 400;
  }
}
.notice {
  margin: var(--spacer-lg) 0 0 0;
  font-size: var(--font-size--sm);
}

</style>
