<template>
  <SfSection>
    <div class="grid grid-images"
    v-if="isLayoutReversed"
    >
      <div class="grid__row">
        <div class="grid__col">
          <SfImage src="section.imgTwoXl" alt=""></SfImage>
        </div>
      </div>
      <div class="grid__row">
        <div class="grid__col medium">
          <SfImage src="section.imgOneMd" alt=""></SfImage>
        </div>
        <div class="grid__col medium">
          <SfImage src="section.imgThreeMd" alt=""></SfImage>
        </div>
      </div>
    </div>
    <div class="grid grid-images"
    v-else
    >
      <div class="grid__row">
        <div class="grid__col medium">
          <SfImage src="section.imgOneMd" alt=""></SfImage>
        </div>
        <div class="grid__col medium">
          <SfImage src="section.imgThreeMd" alt=""></SfImage>
        </div>
      </div>
      <div class="grid__row">
        <div class="grid__col">
          <SfImage src="section.imgTwoXl" alt=""></SfImage>
        </div>
      </div>
    </div>
  </SfSection>
</template>

<script>

import {
  SfImage,
  SfSection
} from '@storefront-ui/vue';

export default {
  name: 'ImageGallery',
  props: {
    section: {
      type: Object
    }
  },
  components: {
    SfSection,
    SfImage
  },
  setup(props) {
    const isLayoutReversed = props.section.layout === 'Reversed';
    return {
      isLayoutReversed
    };
  }
};

</script>

<style lang="scss" scoped>
.grid {
  display: flex;
  max-height: 20.625rem;
  width: 100%;
  justify-content: center;
  margin: 0;
  @include for-desktop {
    max-height: 40.625rem;
    max-width: 60rem;
    margin: 0 auto;
  }
  &__row {
    display: flex;
    flex-direction: column;
    & + & {
      margin-left: var(--spacer-xs);
      @include for-desktop {
        margin-left: var(--spacer-sm);
      }
    }
  }
  &__col {
    width: 10rem;
    height: 10rem;
    @include for-desktop {
      &.small {
        height: 10rem;
      }
      &.medium {
        height: 14.1875rem;
      }
      width: 29.375rem;
      height: 29.375rem;
    }
    & + & {
      margin-top: var(--spacer-xs);
      @include for-desktop {
        margin-top: var(--spacer-sm);
      }
    }
  }
}

</style>
