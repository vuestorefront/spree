<template>
  <div>
    <SfHeading :title="section.title"/>
    <div v-html="section.rteContent"
    />
    <SfButton
      @click="router.push(section.link[0])"
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
import { useRouter } from '@nuxtjs/composition-api';

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
  },
  setup() {
    const router = useRouter();
    return {
      router
    };
  }
};
</script>

<style scoped>

</style>
