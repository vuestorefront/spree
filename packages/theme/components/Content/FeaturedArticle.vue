<template>
  <div>
    <SfHeading :title="section.title"/>
    <div v-html="section.rteContent"
    />
    <SfButton
      :link="localePath(section.links[0])"
    >
      {{ $t(section.buttonText) }}
    </SfButton>
  </div>
</template>

<script>
import {
  SfHeading,
  SfButton
} from '@storefront-ui/vue';

export default {
  name: 'FeaturedArticle',
  props: {
    section: {
      type: Object
    }
  },
  components: {
    SfHeading,
    SfButton
  }
};
</script>

<style scoped>

</style>
