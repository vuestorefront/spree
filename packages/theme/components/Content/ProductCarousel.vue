<template>
  <SfCarousel
    :settings="{ peek: 16, breakpoints: { 1023: { peek: 0, perView: 2 } } }"
    class="carousel"
  >
    <SfCarouselItem class="carousel__item" v-for="(product, i) in products" :key="i">
      <SfProductCard
        :title="productGetters.getName(product)"
        :image="productGetters.getCoverImage(product)"
        :regular-price="$n(productGetters.getPrice(product).regular, 'currency')"
        :special-price="productGetters.getPrice(product).special && $n(productGetters.getPrice(product).special, 'currency')"
        :show-add-to-cart-button="false"
        wishlistIcon=""
        :link="localePath(`/p/${productGetters.getId(product)}/${productGetters.getSlug(product)}`)"
        />
    </SfCarouselItem>
  </SfCarousel>
</template>

<script>
import { computed, onMounted } from '@nuxtjs/composition-api';
import { useFacet, facetGetters, productGetters } from '@vue-storefront/spree';
import {
  SfCarousel,
  SfProductCard
} from '@storefront-ui/vue';

export default {
  name: 'ProductCarousel',
  props: {
    section: {
      type: Object
    }
  },
  components: {
    SfCarousel,
    SfProductCard
  },
  setup(props) {
    const { search, result } = useFacet('content');

    const products = computed(() => facetGetters.getProducts(result.value));

    onMounted(async () => {
      await search({ categorySlug: props.section.links[0].slice(3)});
    });

    return {
      productGetters,
      products
    };
  }
};
</script>

<style lang="scss" scoped>

.carousel {
  margin: 0 calc(0 - var(--spacer-sm)) 0 0;
  @include for-desktop {
    margin: 0;
  }
  &__item {
    margin: 1.375rem 0 2.5rem 0;
    @include for-desktop {
      margin: var(--spacer-xl) 0 var(--spacer-xl) 0;
    }
  }
  ::v-deep .sf-arrow--long .sf-arrow--right {
    --arrow-icon-transform: rotate(180deg);
    -webkit-transform-origin: center;
    transform-origin: center;
  }
}

</style>
