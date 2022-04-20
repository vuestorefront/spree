<template>
  <div id="filters">
    <SfSidebar
      :visible="isFilterSidebarOpen"
      title="Filters"
      class="sidebar-filters"
      @close="toggleFilterSidebar"
    >
      <div class="filters desktop-only">
        <div v-for="(facet, i) in facets" :key="i">
          <SfHeading
            :level="4"
            :title="facet.label"
            class="filters__title sf-heading--left"
            :key="`filter-title-${facet.id}`"
          />
          <div
            v-if="isFacetColor(facet)"
            class="filters__colors"
            :key="`${facet.id}-colors`"
          >
            <SfColor
              v-for="option in facet.options"
              :key="`${facet.id}-${option.value}`"
              :color="option.value"
              :selected="isFilterSelected(facet, option)"
              class="filters__color"
              @click="() => selectFilter(facet, option)"
            />
          </div>
          <div v-else>
            <div
              v-if="isFacetPrice(facet)"
            >
              <SfRange
                :disabled="false"
                :config="priceRangeConfig"
                class="filters__item"
                @change="(value) => onPriceChanged(facet,value)"
              />
            </div>
            <div v-else>
              <SfFilter
                v-for="option in facet.options"
                :key="`${facet.id}-${option.value}`"
                :label="option.value + `${option.count ? ` (${option.count})` : ''}`"
                :selected="isFilterSelected(facet, option)"
                class="filters__item"
                @change="() => selectFilter(facet, option)"
              />
            </div>
          </div>
        </div>
      </div>
      <SfAccordion v-if="facets.length > 0" class="filters smartphone-only">
        <div v-for="(facet, i) in facets" :key="i">
          <SfAccordionItem
            :key="`filter-title-${facet.id}`"
            :header="facet.label"
            class="filters__accordion-item"
          >
            <div
              v-if="isFacetPrice(facet)"
            >
              <SfRange
                :disabled="false"
                :config="priceRangeConfig"
                class="filters__smartphone-slider"
                @change="(value) => onPriceChanged(facet,value)"
              />
            </div>
            <div v-else>
              <SfFilter
                v-for="option in facet.options"
                :key="`${facet.id}-${option.value}`"
                :label="option.value + `${option.count ? ` (${option.count})` : ''}`"
                :selected="isFilterSelected(facet, option)"
                class="filters__item"
                @change="() => selectFilter(facet, option)"
              />
            </div>
          </SfAccordionItem>
        </div>
      </SfAccordion>
      <template #content-bottom>
        <div class="filters__buttons">
          <SfButton
            class="sf-button--full-width"
            @click="applyFilters"
          >
            {{ $t('components.filters_sidebar.done') }}
          </SfButton
          >
          <SfButton
            class="sf-button--full-width filters__button-clear"
            @click="clearFilters"
          >
            {{ $t('components.filters_sidebar.clear_all') }}
          </SfButton
          >
        </div>
      </template>
    </SfSidebar>
  </div>
</template>

<script>
import {
  SfSidebar,
  SfButton,
  SfHeading,
  SfFilter,
  SfAccordion,
  SfColor,
  SfRange
} from '@storefront-ui/vue';
import { VSF_SPREE_CURRENCY_COOKIE } from '@vue-storefront/spree-api';
import { ref, computed, watch, onMounted } from '@nuxtjs/composition-api';
import { useFacet, facetGetters } from '@vue-storefront/spree';
import { useUiHelpers, useUiState } from '~/composables';
import Vue from 'vue';

export default {
  name: 'FiltersSidebar',
  components: {
    SfButton,
    SfSidebar,
    SfFilter,
    SfAccordion,
    SfColor,
    SfHeading,
    SfRange
  },
  setup(props, context) {
    const { changeFilters, isFacetColor, isFacetPrice, getSearchPriceFromUrl} = useUiHelpers();
    const { toggleFilterSidebar, isFilterSidebarOpen } = useUiState();
    const { result } = useFacet();
    const selectedPrice = ref({});
    const localCurrency = ref(context.root.$cookies.get(VSF_SPREE_CURRENCY_COOKIE));
    let range = [0, 300];
    let isPriceDefaultValue = true;
    const urlPriceRange = getSearchPriceFromUrl();
    if (typeof urlPriceRange !== 'undefined') {
      range = urlPriceRange;
      isPriceDefaultValue = false;
    }
    selectedPrice.value = ([range[0], range[1]].map(String)).join(',');

    const facets = computed(() => facetGetters.getGrouped(result.value, ['color', 'size']));
    const selectedFilters = ref({});
    const setSelectedFilters = () => {
      if (!facets.value.length || Object.keys(selectedFilters.value).length) return;
      selectedFilters.value = facets.value.reduce((prev, curr) => ({
        ...prev,
        [curr.id]: curr.options
          .filter(o => o.selected)
          .map(o => o.id)
      }), {});
    };

    const priceRangeConfig = ref({
      start: range,
      range: {min: 0, max: 300},
      step: 1,
      connect: true,
      direction: 'ltr',
      orientation: 'horizontal',
      behaviour: 'tap-drag',
      tooltips: true,
      keyboardSupport: true,
      format: {
        to: (value) => {
          const { locale } = context.root.$i18n;
          return new Intl.NumberFormat(`${locale}-${locale.toUpperCase()}`, {style: 'currency', currency: localCurrency.value, maximumFractionDigits: 0}).format(value);
        },
        from: (value) => {
          return value;
        }}
    });

    const onPriceChanged = (facet, value) => {
      const minChosenPrice = value[0].replace(/[^\d.-]/g, '');
      const maxChosenPrice = value[1].replace(/[^\d.-]/g, '');
      selectedPrice.value = ([minChosenPrice, maxChosenPrice].map(String)).join(',');
      isPriceDefaultValue = false;
    };

    const isFilterSelected = (facet, option) => (selectedFilters.value[facet.id] || []).includes(option.id);

    const selectFilter = (facet, option) => {
      if (!selectedFilters.value[facet.id]) {
        Vue.set(selectedFilters.value, facet.id, []);
      }

      if (selectedFilters.value[facet.id].find(f => f === option.id)) {
        selectedFilters.value[facet.id] = selectedFilters.value[facet.id].filter(f => f !== option.id);
        return;
      }

      selectedFilters.value[facet.id].push(option.id);
    };

    const clearFilters = () => {
      toggleFilterSidebar();
      selectedFilters.value = {};
      changeFilters(selectedFilters.value);
    };

    const applyFilters = () => {
      if (!isPriceDefaultValue) {
        Vue.set(selectedFilters.value, 'price', []);
        selectedFilters.value.price.push(selectedPrice.value);
      }
      toggleFilterSidebar();
      changeFilters(selectedFilters.value);
    };

    onMounted(() => {
      context.root.$scrollTo(context.root.$el, 2000);
      setSelectedFilters();
    });

    watch(() => facets.value, () => {
      if (!facets.value.length) return;
      selectedFilters.value = facets.value.reduce((prev, curr) => ({
        ...prev,
        [curr.id]: curr.options
          .filter(o => o.selected)
          .map(o => o.id)
      }), {});
    });

    return {
      facets,
      isFacetColor,
      isFacetPrice,
      selectFilter,
      isFilterSelected,
      isFilterSidebarOpen,
      toggleFilterSidebar,
      clearFilters,
      applyFilters,
      onPriceChanged,
      priceRangeConfig
    };
  }
};
</script>

<style lang="scss" scoped>
.sidebar-filters {
  --overlay-z-index: 3;
  --sidebar-title-display: none;
  --sidebar-top-padding: 0;
  @include for-desktop {
    --sidebar-content-padding: 0 var(--spacer-xl);
    --sidebar-bottom-padding: 0 var(--spacer-xl);
  }
}
::v-deep .sf-sidebar__aside {
  --sidebar-z-index: 3;
}
.filters {
  &__title {
    --heading-title-font-size: var(--font-size--xl);
    margin: var(--spacer-xl) 0 var(--spacer-base) 0;
    &:first-child {
      margin: calc(var(--spacer-xl) + var(--spacer-base)) 0 var(--spacer-xs) 0;
    }
  }
  &__colors {
    display: flex;
  }
  &__color {
    margin: var(--spacer-xs) var(--spacer-xs) var(--spacer-xs) 0;
  }
  &__chosen {
    color: var(--c-text-muted);
    font-weight: var(--font-weight--normal);
    font-family: var(--font-family--secondary);
    position: absolute;
    right: var(--spacer-xl);
  }
  &__item {
    --radio-container-padding: 0 var(--spacer-sm) 0 var(--spacer-xl);
    --radio-background: transparent;
    --filter-label-color: var(--c-secondary-variant);
    --filter-count-color: var(--c-secondary-variant);
    --checkbox-padding: 0 var(--spacer-sm) 0 var(--spacer-xl);
    padding: var(--spacer-sm) 0;
    border-bottom: 1px solid var(--c-light);

    &:last-child {
      border-bottom: 0;
    }
    @include for-desktop {
      --checkbox-padding: 0;
      margin: var(--spacer-sm) 0;
      border: 0;
      padding: 0;
    }
  }
  &__smartphone-slider{
    --radio-container-padding: 0 var(--spacer-sm)  var(--spacer-xl);
    --radio-background: transparent;
    --filter-label-color: var(--c-secondary-variant);
    --filter-count-color: var(--c-secondary-variant);
    border-bottom: 1px solid var(--c-light);
    border-right: 70px solid var(--c-white);

  }
  &__accordion-item {
    --accordion-item-content-padding: 0;
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
    width: 100vw;
  }
  &__buttons {
    margin: var(--spacer-sm) 0;
  }
  &__button-clear {
    --button-background: var(--c-light);
    --button-color: var(--c-dark-variant);
    margin: var(--spacer-xs) 0 0 0;
  }
}
</style>
