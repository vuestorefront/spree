<template>
  <SfSection>
    <div class="grid grid-images"
    v-if="isLayoutReversed"
    >
      <div class="grid__row">
        <div class="grid__col">
          <SfImage
            class="image"
            :src="section.imgTwoXl"
            alt=""
            @click="router.push('/c/'.concat(section.link[1]))"
          />
        </div>
      </div>
      <div class="grid__row">
        <div class="grid__col medium">
          <SfImage
            class="image"
            :src="section.imgOneMd"
            alt=""
            @click="router.push('/c/'.concat(section.link[3]))"
          />
        </div>
        <div class="grid__col medium">
          <SfImage
            class="image"
            :src="section.imgThreeMd"
            alt=""
            @click="router.push('/c/'.concat(section.link[2]))"
          />
        </div>
      </div>
    </div>
    <div class="grid grid-images"
    v-else
    >
      <div class="grid__row">
        <div class="grid__col medium">
          <SfImage
            class="image medium"
            :src="section.imgOneMd"
            alt=""
            @click="router.push('/c/'.concat(section.link[1]))"
          />
        </div>
        <div class="grid__col medium">
          <SfImage
            class="image medium"
            :src="section.imgThreeMd"
            alt=""
            @click="router.push('/c/'.concat(section.link[2]))"
          />
        </div>
      </div>
      <div class="grid__row">
        <div class="grid__col">
          <SfImage
            class="image"
            :src="section.imgTwoXl"
            alt=""
            @click="router.push('/c/'.concat(section.link[3]))"
          />
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
import {useRouter} from '@nuxtjs/composition-api';

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
    const router = useRouter();
    const isLayoutReversed = props.section.layout === 'Reversed';
    return {
      isLayoutReversed,
      router
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
.image {
  --image-width: 10rem;
  ::v-deep .sf-image-loaded{
    outline-style: none;

  }
  @include for-desktop {
    &.medium {
      --image-height: 14.1875rem;
    }
    --image-width: 29.375rem;
    --image-height: 29.375rem;
  }
}

</style>
