<template>
  <SfTopBar class="topbar">
    <template #left>
      <SfButton class="sf-button--text">{{ $t('components.top_bar.help_and_faqs') }}</SfButton>
    </template>
    <template #center>
      <p>{{ $t('components.top_bar.download') }}</p>
      <SfButton class="topbar__button sf-button--text">{{ $t('components.top_bar.find_out_more') }}</SfButton>
    </template>
    <template #right>
      <LocaleSelector />
    </template>
  </SfTopBar>
</template>

<script>
import { SfButton, SfTopBar } from '@storefront-ui/vue';
import LocaleSelector from './LocaleSelector';

export default {
  components: {
    SfTopBar,
    SfButton,
    LocaleSelector
  }
};

</script>
<style lang="scss" scoped>
.topbar {
  position: relative;
  z-index: 2;
  &__button {
    margin: 0 0 0 var(--spacer-xs);
  }
}
</style>
