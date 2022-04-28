<template>
  <SfSection>
    <div class="grid grid-images"
    v-if="isLayoutReversed"
    >
      <div class="grid__row">
        <div class="grid__col">
          <a :href="(section.links[2] !== null ? localePath(`${section.links[2]}`) : 'javascript:void(0)')">
            <SfImage
              class="image"
              :src="isMobile ? section.imgTwoMd : section.imgTwoXl"
              alt=""
            />
          </a>
        </div>
      </div>
      <div class="grid__row">
        <div class="grid__col medium">
          <a :href="(section.links[1] !== null ? localePath(`${section.links[1]}`) : 'javascript:void(0)')">
            <SfImage
              class="image"
              :src="isMobile ? section.imgOneSm : section.imgOneMd"
              alt=""
            />
          </a>
        </div>
        <div class="grid__col medium">
          <a :href="(section.links[3] !== null ? localePath(`${section.links[3]}`) : 'javascript:void(0)')">
            <SfImage
              class="image"
              :src="isMobile ? section.imgThreeSm : section.imgThreeMd"
              alt=""
            />
          </a>
        </div>
      </div>
    </div>
    <div class="grid grid-images"
    v-else
    >
      <div class="grid__row">
        <div class="grid__col medium">
          <a :href="(section.links[1] !== null ? localePath(`${section.links[1]}`) : 'javascript:void(0)')">
            <SfImage
              class="image"
              :src="isMobile ? section.imgOneSm : section.imgOneMd"
              alt=""
            />
          </a>
        </div>
        <div class="grid__col medium">
          <a :href="(section.links[3] !== null ? localePath(`${section.links[3]}`) : 'javascript:void(0)')">
            <SfImage
              class="image"
              :src="isMobile ? section.imgThreeSm : section.imgThreeMd"
              alt=""
            />
          </a>
        </div>
      </div>
      <div class="grid__row">
        <div class="grid__col">
          <a :href="(section.links[2] !== null ? localePath(`${section.links[2]}`) : 'javascript:void(0)')">
            <SfImage
              class="image"
              :src="isMobile ? section.imgTwoMd : section.imgTwoXl"
              alt=""
            />
          </a>
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
import {mapMobileObserver, unMapMobileObserver} from '@storefront-ui/vue/src/utilities/mobile-observer';

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
  computed: {
    ...mapMobileObserver()
  },
  beforeDestroy() {
    unMapMobileObserver();
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
    width: 15rem;
    height: 10rem;
    @include for-desktop {
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
.image {
  fit: cover;
  ::v-deep .sf-image-loaded{
    outline-style: none;

  }
  //@include for-desktop {
  //  &.medium {
  //    --image-height: 14.1875rem;
  //  }
  //  --image-width: 29.375rem;
  //  --image-height: 29.375rem;
  //}
}

</style>
