<template>
  <div>
    <SfHeading :title="section.title"/>
    <div v-html="section.rteContent"
       :title="section.title"
    />
    <SfButton
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
    },
  },
  components: {
    SfHeading,
    SfButton
  },
  // setup(props) {
  //   console.log(props.section);
  // }
};
</script>

<style scoped>

</style>
