<template>
  <SfHero class="hero">
    <SfHeroItem
      :title="section.title"
      :image="section.imgOneMd"
      :link="section.links[0]"
      :buttonText="section.buttonText"
      :fit="section.fit"
    />
  </SfHero>
</template>

<script>
import {
  SfHero
} from '@storefront-ui/vue';

export default {
  name: 'HeroImage',
  props: {
    section: {
      type: Object
    }
  },
  components: {
    SfHero
  },
  setup(props) {
    console.log(props.section.links[0]);
  }
};
</script>

<style lang="scss" scoped>
.hero {
  margin: var(--spacer-xl) auto var(--spacer-lg);
  --hero-item-background-position: center;
  box-sizing: border-box;
  padding: 0 var(--spacer-sm);
  @include for-desktop {
    margin: var(--spacer-xl) auto var(--spacer-2xl);
    max-width: 1240px;
    padding: 0;
    margin: 0 auto;
  }
  .sf-hero-item {
    &:nth-child(even) {
      --hero-item-background-position: left;
      @include for-mobile {
        --hero-item-background-position: 30%;
        ::v-deep .sf-hero-item__subtitle,
        ::v-deep .sf-hero-item__title {
          text-align: right;
          width: 100%;
          padding-left: var(--spacer-sm);
        }
      }
    }
  }
  ::v-deep .sf-hero__control {
    &--right, &--left {
      display: none;
    }
  }
}

</style>
