<template>
  <SfHero>
    <SfHeroItem
      :title="section.title"
      :image="section.imgOneMd"
      :link="section.link"
      background="#FCE4EC"
      :buttonText="section.buttonText"
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
    console.log(props.section.imgOneMd);
  }
};
</script>

<style scoped>

</style>
