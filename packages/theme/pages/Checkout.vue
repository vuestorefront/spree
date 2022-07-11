<template>
  <div id="checkout">
    <div class="checkout">
      <div class="checkout__main">
        <SfSteps
          v-if="!isThankYou"
          :active="currentStepIndex"
          class="checkout__steps"
          ref="stepsRef"
          @change="handleStepClick"
        >
          <template #steps={step}>
            <SfButton
              :key="steps[step.index].key"
              class="sf-button--pure sf-steps__step"
              :class="{
                'is-done': steps[step.index].done,
                'current': steps[step.index].current,
                'is-disabled': steps[step.index].disabled,
              }"
              data-testid="steps-button"
              @click="handleStepClick(step.index)"
            >
              <span class="sf-steps__title">{{ steps[step.index].name }}</span>
            </SfButton>
          </template>
          <SfStep
            v-for="({key, name}) in steps"
            :key="key"
            :name="name"
          >
            <nuxt-child />
          </SfStep>
        </SfSteps>
        <nuxt-child v-else />
      </div>
      <div
        v-if="!isThankYou"
        class="checkout__aside desktop-only"
      >
        <transition name="fade">
          <CartPreview key="order-summary" />
        </transition>
      </div>
    </div>
  </div>
</template>
<script>

import { SfSteps, SfButton } from '@storefront-ui/vue';
import CartPreview from '~/components/Checkout/CartPreview';
import { ref, computed, useRoute, useRouter } from '@nuxtjs/composition-api';

const STEP_KEYS = ['shipping', 'billing', 'payment'];

export default {
  name: 'Checkout',
  components: {
    SfButton,
    SfSteps,
    CartPreview
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const currentStepKey = computed(() => route.value.path.split('/').pop());
    const currentStepIndex = computed(() => STEP_KEYS.findIndex(key => key === currentStepKey.value));
    const isThankYou = computed(() => currentStepKey.value === 'thank-you');
    const stepsRef = ref(null);
    const steps = computed(() => STEP_KEYS.map((key, index) => ({
      key,
      name: key.toUpperCase(),
      disabled:
          (stepsRef.value?.$options?.propsData?.canGoBack && index < currentStepIndex.value) ||
          index > currentStepIndex.value,
      done: index < currentStepIndex.value,
      current: index === currentStepIndex.value
    })));

    const handleStepClick = (stepIndex) => {
      const { key, disabled } = steps.value[stepIndex];
      if (disabled) return;
      router.push(`/checkout/${key}`);
    };

    return {
      handleStepClick,
      steps,
      currentStepIndex,
      isThankYou,
      stepsRef
    };
  }
};
</script>

<style lang="scss" scoped>
#checkout {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1240px;
    margin: 0 auto;
  }
}
.checkout {
  @include for-desktop {
    display: flex;
  }
  &__main {
    @include for-desktop {
      flex: 1;
      padding: var(--spacer-xl) 0 0 0;
    }
  }
  &__aside {
    @include for-desktop {
      flex: 0 0 25.5rem;
      margin: 0 0 0 4.25rem;
    }
  }
  &__steps {
    --steps-content-padding: 0 var(--spacer-base);
    @include for-desktop {
      --steps-content-padding: 0;
    }

    &-auth::v-deep .sf-steps__step:first-child {
      --steps-step-color: #e8e4e4;
    }
  }
  .sf-steps__step {
    &.is-done {
      cursor: pointer;
    }
    &.is-disabled {
      --steps-step-color: var(--c-text-disabled);
      cursor: default;
    }
  }
}

</style>
