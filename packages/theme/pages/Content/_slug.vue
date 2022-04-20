<template>
  <div>
    <SfHeading :title="contentGetters.getPageTitle(contentPage)" :level="2" />
    <div
      v-if="contentGetters.isStandardPage(contentPage)"
      v-html="contentGetters.getPageContent(contentPage)"
    />
    <div v-else>
      <component
        v-for="section in contentPage.cmsSections"
        :key="`content-section-${section.sectionId}`"
        :is="contentGetters.getSectionComponentName(section)"
        :section="section"
      />
    </div>
  </div>
</template>

<script>
import { onMounted, useRoute, computed } from '@nuxtjs/composition-api';
import { useContent, contentGetters } from '@vue-storefront/spree';
import { SfHeading } from '@storefront-ui/vue';

export default {
  components: {
    SfHeading
  },
  setup() {
    const route = useRoute();
    const { content: contentPage, search: searchContentPage } = useContent();

    const pageSlug = computed(() => route.value.params.slug);

    onMounted(async () => {
      await searchContentPage({ contentPageSlug: pageSlug.value });
    });

    return {
      contentPage,
      contentGetters
    };
  }
};
</script>

<style></style>
