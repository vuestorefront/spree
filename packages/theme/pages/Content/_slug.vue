<template>
  <div class="content-page">
    <div v-if="!isSearchPageError">
      <SfHeading :title="contentGetters.getPageTitle(contentPage)" :level="1" />
      <div
        v-if="contentGetters.isStandardPage(contentPage)"
        v-html="contentGetters.getPageContent(contentPage)"
      />
      <div v-else>
        <component
          v-for="section in contentGetters.getPageSections(contentPage)"
          :key="`content-section-${section.sectionId}`"
          :is="contentGetters.getSectionComponentName(section)"
          :section="section"
        />
      </div>
    </div>
    <div v-else class="content-page__error">
      <SfHeading :title="$t('Content page not found')" :level="1" />
      <p class="content-page__error-description">
        {{ $t('Try again with different URL') }}
      </p>
    </div>
  </div>
</template>

<script>
import { onMounted, useRoute, computed } from '@nuxtjs/composition-api';
import { useContent, contentGetters } from '@vue-storefront/spree';
import { SfHeading } from '@storefront-ui/vue';
import RichTextContent from '../../components/Content/RichTextContent';
import SideBySideImages from '../../components/Content/SideBySideImages';
import ImageGallery from '../../components/Content/ImageGallery';
import HeroImage from '../../components/Content/HeroImage';
import FeaturedArticle from '../../components/Content/FeaturedArticle';
import ProductCarousel from '../../components/Content/ProductCarousel';

export default {
  components: {
    SfHeading,
    RichTextContent,
    SideBySideImages,
    ImageGallery,
    HeroImage,
    FeaturedArticle,
    ProductCarousel
  },
  setup() {
    const route = useRoute();
    const {
      content: contentPage,
      search: searchContentPage,
      error
    } = useContent();

    const pageSlug = computed(() => route.value.params.slug);
    const isSearchPageError = computed(() => Boolean(error.value.search));

    onMounted(async () => {
      await searchContentPage({ contentPageSlug: pageSlug.value });
    });

    return {
      contentPage,
      contentGetters,
      isSearchPageError
    };
  }
};
</script>

<style lang="scss">
.content-page {
  padding: var(--spacer-xl) 0;
}

.content-page__error {
  margin-top: var(--spacer-xl);
}

.content-page__error-description {
  text-align: center;
}
</style>
