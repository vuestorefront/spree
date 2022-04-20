<template>
  <div id="category">
    <SfBreadcrumbs
      class="breadcrumbs desktop-only"
      :breadcrumbs="breadcrumbs"
    />
    <div class="navbar section">
      <div class="navbar__aside desktop-only">
        <LazyHydrate never>
          <SfHeading
            :level="3"
            :title="$t('pages.category.categories')"
            class="navbar__title" />
        </LazyHydrate>
      </div>
      <CategoryPageHeader :pagination="pagination"/>
    </div>

    <div class="main section">
      <div class="sidebar desktop-only">
        <LazyHydrate when-idle>
          <SfLoader
          :class="{ 'loading--categories': loading }"
          :loading="loading">
            <SfAccordion
              v-e2e="'categories-accordion'"
              :open="activeCategory"
              :show-chevron="true"
            >
              <SfAccordionItem
                v-for="(cat, i) in ((menu && menu.items) || (categoryTree && categoryTree.items))"
                :key="i"
                :header="cat.name || cat.label"
              >
                <template>
                  <SfList class="list">
                    <SfListItem class="list__item">
                      <SfMenuItem
                        :count="cat.count || ''"
                        :label="cat.name || cat.label"
                      >
                        <template #label>
                          <nuxt-link
                            :to="localePath(getRoute(cat))"
                            :class="cat.isCurrent ? 'sidebar--cat-selected' : ''"
                          >
                            All
                          </nuxt-link>
                        </template>
                      </SfMenuItem>
                    </SfListItem>
                    <SfListItem
                      class="list__item"
                      v-for="(subCat, j) in cat.items"
                      :key="j"
                    >
                      <SfMenuItem
                        :count="subCat.count || ''"
                        :label="subCat.name || subCat.label"
                      >
                        <template #label="{ label }">
                          <nuxt-link
                            :to="localePath(getRoute(subCat))"
                            :class="subCat.isCurrent ? 'sidebar--cat-selected' : ''"
                          >
                            {{ label }}
                          </nuxt-link>
                        </template>
                      </SfMenuItem>
                    </SfListItem>
                  </SfList>
                </template>
              </SfAccordionItem>
            </SfAccordion>
          </SfLoader>
        </LazyHydrate>
      </div>
      <SfLoader :class="{ loading }" :loading="loading">
        <div class="products" v-if="!loading">
          <transition-group
            v-if="isCategoryGridView"
            appear
            name="products__slide"
            tag="div"
            class="products__grid"
          >
            <SfProductCard
              v-e2e="'category-product-card'"
              v-for="(product, i) in products"
              :key="productGetters.getSlug(product)"
              :style="{ '--index': i }"
              :title="productGetters.getName(product)"
              :image="productGetters.getCoverImage(product)"
              :regular-price="$n(productGetters.getPrice(product).regular, 'currency')"
              :special-price="productGetters.getPrice(product).special && $n(productGetters.getPrice(product).special, 'currency')"
              :show-add-to-cart-button="true"
              :add-to-cart-disabled="!productGetters.getInStock(product)"
              :is-in-wishlist="isInWishlist({ product })"
              :is-added-to-cart="isInCart({ product })"
              :link="localePath(`/p/${productGetters.getId(product)}/${productGetters.getSlug(product)}`)"
              :wishlist-icon="isWishlistDisabled ? false : undefined"
              class="products__product-card"
              @click:wishlist="handleWishlistClick(product)"
              @click:add-to-cart="addItemToCart({ product, quantity: 1 })"
            />
          </transition-group>
          <transition-group
            v-else
            appear
            name="products__slide"
            tag="div"
            class="products__list"
          >
            <SfProductCardHorizontal
              v-e2e="'category-product-card'"
              v-for="(product, i) in products"
              class="products__product-card-horizontal"
              :key="productGetters.getSlug(product)"
              :style="{ '--index': i }"
              :title="productGetters.getName(product)"
              :description="productGetters.getDescription(product)"
              :image="productGetters.getCoverImage(product)"
              :regular-price="$n(productGetters.getPrice(product).regular, 'currency')"
              :special-price="productGetters.getPrice(product).special && $n(productGetters.getPrice(product).special, 'currency')"
              :is-in-wishlist="isInWishlist({ product })"
              :link="localePath(`/p/${productGetters.getId(product)}/${productGetters.getSlug(product)}`)"
              @click:wishlist="handleWishlistClick(product)"
              @click:add-to-cart="addItemToCart({ product, quantity: 1 })"
            >
              <template #configuration>
                <SfProperty
                  class="desktop-only"
                  name="Size"
                  value="XS"
                  style="margin: 0 0 1rem 0;"
                />
                <SfProperty class="desktop-only" name="Color" value="white" />
              </template>
              <template #actions>
                <SfButton
                  v-if="!isInWishlist({ product })"
                  class="sf-button--text wishlist__button desktop-only"
                  @click="handleWishlistClick(product)"
                >
                  {{ $t('pages.category.save_for_later') }}
                </SfButton>
                <SfButton
                  v-else
                  class="sf-button--text wishlist__button desktop-only"
                  @click="handleWishlistClick(product)"
                >
                  {{ $t('pages.category.remove_from_wishlist') }}
                </SfButton>
              </template>
            </SfProductCardHorizontal>
          </transition-group>

          <LazyHydrate on-interaction>
            <SfPagination
              v-if="!loading"
              class="products__pagination desktop-only"
              v-show="pagination.totalPages > 1"
              :current="pagination.currentPage"
              :total="pagination.totalPages"
              :visible="5"
            />
          </LazyHydrate>

          <div
            v-show="pagination.totalPages > 1"
            class="products__show-on-page"
          >
            <span class="products__show-on-page__label">{{ $t('pages.category.show_on_page') }}</span>
            <LazyHydrate on-interaction>
              <SfSelect
                :value="pagination && pagination.itemsPerPage ? pagination.itemsPerPage.toString() : ''"
                class="products__items-per-page"
                @input="th.changeItemsPerPage"
              >
                <SfSelectOption
                  v-for="option in pagination.pageOptions"
                  :key="option"
                  :value="option"
                  class="products__items-per-page__option"
                >
                  {{ option }}
                </SfSelectOption>
              </SfSelect>
            </LazyHydrate>
          </div>
        </div>
      </SfLoader>
    </div>
  </div>
</template>

<script>
import {
  SfSidebar,
  SfButton,
  SfList,
  SfIcon,
  SfHeading,
  SfMenuItem,
  SfFilter,
  SfProductCard,
  SfProductCardHorizontal,
  SfPagination,
  SfAccordion,
  SfSelect,
  SfBreadcrumbs,
  SfLoader,
  SfColor,
  SfProperty
} from '@storefront-ui/vue';
import { computed, onMounted, useContext } from '@nuxtjs/composition-api';
import { useCart, useWishlist, productGetters, useFacet, facetGetters, useUser, wishlistGetters, useMenus } from '@vue-storefront/spree';
import { useUiHelpers, useUiState } from '~/composables';
import { onSSR } from '@vue-storefront/core';
import LazyHydrate from 'vue-lazy-hydration';
import cacheControl from './../helpers/cacheControl';
import CategoryPageHeader from '~/components/CategoryPageHeader';

// TODO(addToCart qty, horizontal): https://github.com/vuestorefront/storefront-ui/issues/1606
export default {
  transition: 'fade',
  middleware: cacheControl({
    'max-age': 60,
    'stale-when-revalidate': 5
  }),
  setup() {
    const th = useUiHelpers();
    const uiState = useUiState();
    const context = useContext();
    const { addItem: addItemToCart, isInCart } = useCart();
    const { result, search, loading, error } = useFacet();
    const { wishlist, addItem: addItemToWishlist, isInWishlist, removeItem: removeItemFromWishlist } = useWishlist();
    const { isAuthenticated } = useUser();
    const { menu, loadMenu } = useMenus('header');
    const products = computed(() => facetGetters.getProducts(result.value));
    const breadcrumbs = computed(() => facetGetters.getBreadcrumbs(result.value).map(e => ({...e, link: context.localePath(e.link)})));
    const pagination = computed(() => facetGetters.getPagination(result.value));
    const categoryTree = computed(() => facetGetters.getCategoryTree(result.value));
    const { locale } = context.app.i18n;

    const getRoute = (category) => {
      if (menu.value.isDisabled) {
        return '/c/' + category.slug;
      }
      return category.link;
    };

    const activeCategory = computed(() => {
      const items = categoryTree.value.items;

      if (!items || !items.length) {
        return '';
      }

      const category = items.find(({ isCurrent, items }) => isCurrent || items.find(({ isCurrent }) => isCurrent));
      return category?.label || items[0]?.label;
    });

    const isWishlistDisabled = computed(() => wishlistGetters.isWishlistDisabled(wishlist.value));

    const handleWishlistClick = async (product) => {
      if (!isAuthenticated.value) {
        uiState.toggleLoginModal();
      } else if (!isInWishlist({ product })) {
        await addItemToWishlist({ product });
      } else {
        await removeItemFromWishlist({ product });
      }
    };

    onMounted(async () => {
      await loadMenu({menuType: 'header', menuName: 'Main menu', locale: locale});
    });

    onSSR(async () => {
      await search(th.getFacetsFromURL());
      if (error?.value?.search) context.app.nuxt.error({ statusCode: 404 });
    });
    return {
      ...uiState,
      th,
      products,
      categoryTree,
      loading,
      productGetters,
      pagination,
      activeCategory,
      breadcrumbs,
      addItemToCart,
      isInWishlist,
      isInCart,
      handleWishlistClick,
      isWishlistDisabled,
      getRoute,
      menu
    };
  },
  components: {
    CategoryPageHeader,
    SfButton,
    SfSidebar,
    SfIcon,
    SfList,
    SfFilter,
    SfProductCard,
    SfProductCardHorizontal,
    SfPagination,
    SfMenuItem,
    SfAccordion,
    SfSelect,
    SfBreadcrumbs,
    SfLoader,
    SfColor,
    SfHeading,
    SfProperty,
    LazyHydrate
  }
};
</script>

<style lang="scss" scoped>
#category {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1240px;
    margin: 0 auto;
  }
}
.main {
  &.section {
    padding: var(--spacer-xs);
    @include for-desktop {
      padding: 0;
    }
  }
}
.breadcrumbs {
  margin: var(--spacer-base) auto var(--spacer-lg);
}
.navbar {
  position: relative;
  display: flex;
  border: 1px solid var(--c-light);
  border-width: 0 0 1px 0;
  @include for-desktop {
    border-width: 1px 0 1px 0;
  }
  &.section {
    padding: var(--spacer-sm);
    @include for-desktop {
      padding: 0;
    }
  }
  &__aside {
    display: flex;
    align-items: center;
    padding: var(--spacer-sm) 0;
    flex: 0 0 15%;
    padding: var(--spacer-sm) var(--spacer-sm);
    border: 1px solid var(--c-light);
    border-width: 0 1px 0 0;
  }
  &__title {
    --heading-title-font-weight: var(--font-weight--semibold);
    --heading-title-font-size: var(--font-size--xl);
  }
}
.main {
  display: flex;
}
.list {
  --menu-item-font-size: var(--font-size--sm);
  &__item {
    &:not(:last-of-type) {
      --list-item-margin: 0 0 var(--spacer-sm) 0;
    }
    .nuxt-link-exact-active {
      text-decoration: underline;
    }
  }
}
.products {
  box-sizing: border-box;
  flex: 1;
  margin: 0;
  &__grid {
    justify-content: center;
    @include for-desktop {
      justify-content: flex-start;
    }
  }
  &__grid,
  &__list {
    display: flex;
    flex-wrap: wrap;
  }
  &__product-card {
    --product-card-title-margin: var(--spacer-base) 0 0 0;
    --product-card-title-font-weight: var(--font-weight--medium);
    --product-card-title-margin: var(--spacer-xs) 0 0 0;
    flex: 1 1 50%;
    @include for-desktop {
      --product-card-title-font-weight: var(--font-weight--normal);
      --product-card-add-button-bottom: var(--spacer-base);
      --product-card-title-margin: var(--spacer-sm) 0 0 0;
    }
  }
  &__product-card-horizontal {
    flex: 0 0 100%;
    @include for-mobile {
      ::v-deep .sf-image {
        --image-width: 5.3125rem;
        --image-height: 7.0625rem;
      }
    }
  }
  &__slide-enter {
    opacity: 0;
    transform: scale(0.5);
  }
  &__slide-enter-active {
    transition: all 0.2s ease;
    transition-delay: calc(0.1s * var(--index));
  }
  @include for-desktop {
    &__grid {
      margin: var(--spacer-sm) 0 0 var(--spacer-sm);
    }
    &__pagination {
      display: flex;
      justify-content: flex-start;
      margin: var(--spacer-xl) 0 0 0;
    }
    &__product-card-horizontal {
      margin: var(--spacer-lg) 0;
    }
    &__product-card {
      flex: 1 1 25%;
    }
    &__list {
      margin: 0 0 0 var(--spacer-sm);
    }
  }
  &__show-on-page {
    display: flex;
    justify-content: flex-end;
    align-items: baseline;
    &__label {
      font-family: var(--font-family--secondary);
      font-size: var(--font-size--sm);
    }
  }
}
.sidebar {
  flex: 0 0 15%;
  padding: var(--spacer-sm);
  border: 1px solid var(--c-light);
  border-width: 0 1px 0 0;
}
.loading {
  margin: var(--spacer-3xl) auto;
  @include for-desktop {
    margin-top: 6.25rem;
  }
  &--categories {
    @include for-desktop {
      margin-top: 3.75rem;
    }
  }
}
.wishlist__button{
  margin: 0 0 1rem auto;
  display: block;
}
</style>
