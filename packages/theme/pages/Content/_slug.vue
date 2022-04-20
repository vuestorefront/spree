<template>
  <div>
    <h2>{{ pageTitle }}</h2>
    <div v-html="content" />
  </div>
</template>

<script>
import { onMounted, useRoute, computed } from '@nuxtjs/composition-api';
import { useContent, contentGetters } from '@vue-storefront/spree';

export default {
  setup() {
    const route = useRoute();
    const { content: contentPage, search: searchContentPage } = useContent();

    const pageSlug = computed(() => route.value.params.slug);
    const pageTitle = computed(() =>
      contentGetters.getPageTitle(contentPage.value)
    );
    const content = computed(() =>
      contentGetters.getPageContent(contentPage.value)
    );

    onMounted(async () => {
      await searchContentPage({ contentPageSlug: pageSlug.value });
    });

    return {
      pageTitle,
      content
    };
  }
};
</script>

<style></style>
