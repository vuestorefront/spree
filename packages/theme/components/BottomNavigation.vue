<template>
  <SfBottomNavigation class="navigation-bottom smartphone-only">
    <a :href="localePath('/')" class="home-button">
    <SfBottomNavigationItem
      :is-active="route.path === '/' && !isMobileMenuOpen"
      icon="home" size="20px" :label="$t('components.bottom_navigation.label_home_icon')"
    /></a>
    <SfBottomNavigationItem icon="menu" size="20px" :label="$t('components.bottom_navigation.label_menu_icon')" @click="toggleMobileMenu" :is-active="isMobileMenuOpen"/>
    <SfBottomNavigationItem v-if="!isWishlistDisabled" icon="heart" size="20px" :label="$t('components.bottom_navigation.label_wishlist_icon')" @click="toggleWishlistSidebar"/>
    <SfBottomNavigationItem icon="profile" size="20px" :label="$t('components.bottom_navigation.label_account_icon')" @click="handleAccountClick" :is-active="route.path === '/my-account' && !isMobileMenuOpen"/>
    <!-- TODO: add logic for label - if on Home then Basket, if on PDC then AddToCart etc. -->
    <SfBottomNavigationItem
      :label="$t('components.bottom_navigation.label_basket_icon')"
      icon="add_to_cart"
      @click="toggleCartSidebar"
    >
      <template #icon>
        <SfCircleIcon class="cart-button" :aria-label="$t('components.bottom_navigation.aria_label_add_to_cart')">
          <SfIcon
            icon="add_to_cart"
            color="white"
            size="25px"
            :style="{margin: '0 0 0 -2px'}"
          />
          <SfBadge v-if="cartTotalItems" class="sf-badge--number cart-badge">{{cartTotalItems}}</SfBadge>
        </SfCircleIcon>
      </template>
    </SfBottomNavigationItem>
  </SfBottomNavigation>
</template>

<script>
import { SfBottomNavigation, SfIcon, SfCircleIcon, SfBadge } from '@storefront-ui/vue';
import { useUiState } from '~/composables';
import { useUser, useCart, cartGetters, useWishlist, wishlistGetters } from '@vue-storefront/spree';
import { computed, useRoute, useRouter } from '@nuxtjs/composition-api';

export default {
  components: {
    SfBottomNavigation,
    SfIcon,
    SfCircleIcon,
    SfBadge
  },
  setup(_props, { root }) {
    const route = useRoute();
    const router = useRouter();
    const { toggleCartSidebar, toggleWishlistSidebar, toggleLoginModal, toggleMobileMenu, isMobileMenuOpen } = useUiState();
    const { isAuthenticated } = useUser();
    const { cart } = useCart();
    const { wishlist } = useWishlist();

    const isWishlistDisabled = computed(() => wishlistGetters.isWishlistDisabled(wishlist.value));

    const handleAccountClick = async () => {
      if (isMobileMenuOpen.value) {
        toggleMobileMenu();
      }
      if (isAuthenticated.value) {
        return router.push(root.localePath('/my-account'));
      }
      toggleLoginModal();
    };

    const cartTotalItems = computed(() => {
      const count = cartGetters.getTotalItems(cart.value);

      return count ? count.toString() : null;
    });

    return {
      route,
      isMobileMenuOpen,
      toggleWishlistSidebar,
      toggleCartSidebar,
      toggleMobileMenu,
      cartTotalItems,
      handleAccountClick,
      isWishlistDisabled
    };
  }
};
</script>
<style lang="scss" scoped>
.navigation-bottom {
  --bottom-navigation-z-index: 3;
}
.home-button {
  --icon-color: var(--c-link);
  background: transparent;
  border: 0;
  flex: 1;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--c-link);
  font-weight: var(--font-weight--light);
  font-size: var(--font-size--xs);
  font-family: var(--font-family--primary);
  cursor: pointer;
}
.cart-button {
  position: relative;
}
.cart-badge {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
