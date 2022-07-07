<template>
  <div class="locale-selector locale-selector--mobile" v-if="isMobile">
    <SfButton
      data-cy="locale-select_change-locale"
      class="sf-button sf-button--pure locale-selector__opener locale-selector__opener--locale locale-selector__opener--selected"
      @click="openLocaleSelector()"
    >
      <img
        :src="
          `https://cdn.shopify.com/s/files/1/0407/1902/4288/files/${locale}_20x20.jpg`
        "
        width="20"
        height="20"
      />
    </SfButton>
    <SfBottomModal
      :is-open="isLocaleModalOpen"
      :title="$t('components.locale_selector.change_locale')"
      @click:close="closeLocaleSelector()"
      class="locale-selector__container container container--locale"
    >
      <SfList>
        <SfListItem v-for="locale in allLocales" :key="locale.code">
          <nuxt-link
            :to="switchLocalePath(locale.code)"
            class="container__action"
            :class="{ 'container__action--selected': isLocaleSelected(locale) }"
          >
            <SfCharacteristic class="container__characteristic">
              <template #title>
                <span class="container__label">{{ locale.label }}</span>
              </template>
              <template #icon>
                <img
                  :src="
                    `https://cdn.shopify.com/s/files/1/0407/1902/4288/files/${locale.code}_20x20.jpg`
                  "
                  class="container__icon"
                  width="20"
                  height="20"
                />
              </template>
            </SfCharacteristic>
          </nuxt-link>
        </SfListItem>
      </SfList>
    </SfBottomModal>
    <SfButton
      data-cy="locale-select_change-currency"
      class="sf-button sf-button--pure locale-selector__opener locale-selector__opener--currency locale-selector__opener--selected"
      @click="openCurrencySelector()"
    >
      {{ currency }}
    </SfButton>
    <SfBottomModal
      :is-open="isCurrencyModalOpen"
      :title="$t('components.locale_selector.change_currency')"
      @click:close="closeCurrencySelector()"
      class="locale-selector__container container container--currency"
    >
      <SfList>
        <SfListItem v-for="currency in allCurrencies" :key="currency.code">
          <SfButton
            class="sf-button sf-button--pure container__action"
            @click="handleChangeCurrencyClick(currency.code, currency.locale)"
            :class="{
              'container__action--selected': isCurrencySelected(currency)
            }"
          >
            <SfCharacteristic class="container__characteristic">
              <template #title>
                <span class="container__label">{{ currency.code }}</span>
              </template>
              <template #icon>
                <span />
              </template>
            </SfCharacteristic>
          </SfButton>
        </SfListItem>
      </SfList>
    </SfBottomModal>
  </div>
  <div class="locale-selector locale-selector--desktop" v-else>
    <SfDropdown
      :isOpen="isLocaleModalOpen"
      :persistent="false"
      class="locale-selector__container container container--locale"
      @click:close="closeLocaleSelector()"
    >
      <template #cancel>
        <span />
      </template>
      <template #title>
        <p class="sf-dropdown__title container__label container__label--hint">
          {{ $t('components.locale_selector.change_locale') }}
        </p>
      </template>
      <template #opener>
        <SfButton
          @click="openLocaleSelector()"
          class="sf-button sf-button--pure container__opener"
        >
          <SfCharacteristic class="container__characteristic">
            <template #title>
              <span />
            </template>
            <template #icon>
              <img
                :src="
                  `https://cdn.shopify.com/s/files/1/0407/1902/4288/files/${locale}_20x20.jpg`
                "
                class="container__icon"
                width="20"
                height="20"
              />
            </template>
          </SfCharacteristic>
        </SfButton>
      </template>
      <SfList>
        <SfListItem v-for="locale in allLocales" :key="locale.code">
          <nuxt-link
            :to="switchLocalePath(locale.code)"
            class="container__action"
            :class="{ 'container__action--selected': isLocaleSelected(locale) }"
          >
            <SfCharacteristic class="container__characteristic">
              <template #title>
                <span class="container__label">{{ locale.label }}</span>
              </template>
              <template #icon>
                <img
                  :src="
                    `https://cdn.shopify.com/s/files/1/0407/1902/4288/files/${locale.code}_20x20.jpg`
                  "
                  class="container__icon"
                  width="20"
                  height="20"
                />
              </template>
            </SfCharacteristic>
          </nuxt-link>
        </SfListItem>
      </SfList>
    </SfDropdown>
    <SfDropdown
      :isOpen="isCurrencyModalOpen"
      :persistent="false"
      class="locale-selector__container container container--currency"
      @click:close="closeCurrencySelector()"
    >
      <template #cancel>
        <span />
      </template>
      <template #title>
        <p class="sf-dropdown__title container__label container__label--hint">
          {{ $t('components.locale_selector.change_currency') }}
        </p>
      </template>
      <template #opener>
        <SfButton
          @click="openCurrencySelector()"
          class="sf-button sf-button--pure container__opener"
        >
          <SfCharacteristic class="container__characteristic">
            <template #title>
              <span class="container__label">{{ currency }}</span>
            </template>
            <template #icon>
              <span />
            </template>
          </SfCharacteristic>
        </SfButton>
      </template>
      <SfList>
        <SfListItem v-for="currency in allCurrencies" :key="currency.code">
          <SfButton
            class="sf-button sf-button--pure container__action"
            @click="handleChangeCurrencyClick(currency.code, currency.locale)"
            :class="{
              'container__action--selected': isCurrencySelected(currency)
            }"
          >
            <SfCharacteristic class="container__characteristic">
              <template #title>
                <span class="container__label">{{ currency.code }}</span>
              </template>
              <template #icon>
                <span />
              </template>
            </SfCharacteristic>
          </SfButton>
        </SfListItem>
      </SfList>
    </SfDropdown>
  </div>
</template>

<script type="module">
import {
  SfImage,
  SfSelect,
  SfButton,
  SfList,
  SfBottomModal,
  SfCharacteristic,
  SfDropdown
} from '@storefront-ui/vue';
import { ref, computed, onBeforeUnmount } from '@nuxtjs/composition-api';
import { useVSFContext } from '@vue-storefront/core';
import { VSF_SPREE_CURRENCY_COOKIE } from '@vue-storefront/spree-api';
import {
  mapMobileObserver,
  unMapMobileObserver
} from '@storefront-ui/vue/src/utilities/mobile-observer.js';
export default {
  components: {
    SfImage,
    SfSelect,
    SfButton,
    SfList,
    SfBottomModal,
    SfCharacteristic,
    SfDropdown
  },
  setup(_props, { root }) {
    const { $spree } = useVSFContext();
    const currency = root.$cookies.get(VSF_SPREE_CURRENCY_COOKIE);

    const isLocaleModalOpen = ref(false);
    const isCurrencyModalOpen = ref(false);
    const isMobile = computed(mapMobileObserver().isMobile);

    const { locales: allLocales, locale, numberFormats } = root.$i18n;
    const allCurrencies = computed(() =>
      Object.keys(numberFormats).map((locale) => ({
        locale,
        code: numberFormats[locale].currency.currencyDefault
      }))
    );

    const openLocaleSelector = () => {
      isLocaleModalOpen.value = true;
    };

    const closeLocaleSelector = () => {
      isLocaleModalOpen.value = false;
    };

    const openCurrencySelector = () => {
      isCurrencyModalOpen.value = true;
    };

    const closeCurrencySelector = () => {
      isCurrencyModalOpen.value = false;
    };

    const isCurrencySelected = ({ code }) => currency === code;

    const isLocaleSelected = ({ code }) => locale === code;

    const setCurrencyCookie = (currencyValue) => {
      root.$cookies.set(VSF_SPREE_CURRENCY_COOKIE, currencyValue);
    };

    const handleChangeCurrencyClick = async (newCurrency) => {
      const token = root.$cookies.get('spree-cart-token');
      if (token) {
        const response = await $spree.api.changeCurrency({
          currency,
          newCurrency
        });
        if (response) setCurrencyCookie(newCurrency);
      } else {
        setCurrencyCookie(newCurrency);
      }
      window.location.reload();
    };

    onBeforeUnmount(() => {
      unMapMobileObserver();
    });

    return {
      allLocales,
      allCurrencies,
      locale,
      currency,
      isLocaleModalOpen,
      isCurrencyModalOpen,
      handleChangeCurrencyClick,
      isMobile,
      openLocaleSelector,
      closeLocaleSelector,
      openCurrencySelector,
      closeCurrencySelector,
      isCurrencySelected,
      isLocaleSelected
    };
  }
};
</script>

<style lang="scss" scoped>
.locale-selector {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  &--desktop {
    column-gap: 0.5em;
  }
  &__opener {
    padding: 0.5em 0.75rem;
    font-weight: normal;
  }
  .container {
    &.sf-dropdown {
      --dropdown-position: relative;
      --dropdown-container-position: absolute;
      --dropdown-container-width: auto;
      --dropdown-container-top: 100%;
      &::v-deep .sf-dropdown__container {
        right: 0;
      }
      &::v-deep .sf-dropdown__overlay {
        display: block;
      }
      &::v-deep .sf-dropdown__title {
        margin: 1em 0 0 0;
        padding: 0 0.5rem;
        white-space: nowrap;
        display: block;
      }
    }
    &__characteristic {
      display: flex;
      flex-flow: row;
      column-gap: 0.5em;
    }
    &__label {
      font-weight: normal;
      &--hint {
        color: var(--c-text-muted);
      }
    }
    &__action {
      margin: 0;
      width: 100%;
      text-align: left;
      display: flex;
      justify-content: flex-start;
      font-weight: normal;
      pointer-events: auto;
      padding: 1em 1rem;
      &--selected {
        pointer-events: none;
        cursor: default;
        .container__label {
          font-weight: 600;
        }
      }
    }
  }
  .sf-bottom-modal {
    z-index: 2;
    left: 0;
  }
  .sf-list {
    &__item {
      pointer-events: none;
      &:hover {
        background-color: var(--c-light);
      }
    }
    .container {
      padding: var(--spacer-sm) 0;
    }
    .sf-image {
      --image-width: 20px;
      margin-right: 1rem;
      border: 1px solid var(--c-light);
      border-radius: 50%;
    }
  }
}
</style>
