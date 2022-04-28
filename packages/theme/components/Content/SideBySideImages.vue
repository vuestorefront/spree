<template>
  <SfSection>
    <div class="grid grid-images">
      <div class="grid__row">
        <div class="grid__col">
          <a :href="(section.links[1] !== null ? localePath(`${section.links[1]}`) : 'javascript:void(0)')">
            <SfImage
              class="image"
              :src="isMobile ? section.imgOneMd : section.imgOneXl"
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
import { SfImage, SfSection } from '@storefront-ui/vue';
import {mapMobileObserver, unMapMobileObserver} from '@storefront-ui/vue/src/utilities/mobile-observer';

export default {
  name: 'SideBySideImages',
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
      &.small {
        height: 10rem;
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

}

</style>
