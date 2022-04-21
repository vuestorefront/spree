<template>
  <div id="my-account">
    <SfBreadcrumbs
      class="breadcrumbs desktop-only"
      :breadcrumbs="breadcrumbs"
    />
    <SfContentPages
      v-e2e="'my-account-content-pages'"
      :title="$t('pages.my_account.content_page_title_my_account')"
      :active="activePage"
      class="my-account"
      @click:change="changeActivePage"
    >
      <SfContentCategory :title="$t('pages.my_account.content_category_title_personal_details')">
        <SfContentPage :title="$t('pages.my_account.content_page_title_my_profile')">
          <MyProfile />
        </SfContentPage>

        <SfContentPage :title="$t('pages.my_account.content_page_title_saved_addresses')">
          <SavedAddressesDetails />
        </SfContentPage>
      </SfContentCategory>

      <SfContentCategory :title="$t('pages.my_account.content_category_title_order_details')">
        <SfContentPage :title="$t('pages.my_account.content_page_title_order_history')">
          <OrderHistory />
        </SfContentPage>
        <OrderDetails />
      </SfContentCategory>

      <SfContentPage :title="$t('pages.my_account.content_page_title_log_out')" />
    </SfContentPages>
  </div>
</template>
<script>
import { SfBreadcrumbs, SfContentPages } from '@storefront-ui/vue';
import { computed, onBeforeUnmount, useRoute, useRouter } from '@nuxtjs/composition-api';
import { useUser } from '@vue-storefront/spree';
import MyProfile from './MyAccount/MyProfile';
import SavedAddressesDetails from './MyAccount/SavedAddressesDetails';
import MyNewsletter from './MyAccount/MyNewsletter';
import OrderHistory from './MyAccount/OrderHistory';
import OrderDetails from './MyAccount/OrderDetails';
import {
  mapMobileObserver,
  unMapMobileObserver
} from '@storefront-ui/vue/src/utilities/mobile-observer.js';

export default {
  name: 'MyAccount',
  components: {
    SfBreadcrumbs,
    SfContentPages,
    MyProfile,
    SavedAddressesDetails,
    MyNewsletter,
    OrderHistory,
    OrderDetails
  },
  middleware: [
    'is-authenticated'
  ],
  setup(props, context) {
    const route = useRoute();
    const router = useRouter();
    const { logout } = useUser();
    const isMobile = computed(mapMobileObserver().isMobile);
    const activePage = computed(() => {
      const { pageName } = route.value.params;
      if (!pageName) return isMobile.value ? '' : 'My profile';
      return `${pageName.charAt(0).toUpperCase()}${pageName.slice(1)}`.replace('-', ' ');
    });

    const changeActivePage = async (title) => {
      if (title === 'Log out') {
        await logout();
        router.push(context.root.localePath({ name: 'home' }));
        return;
      }

      const slugifiedTitle = (title || '').toLowerCase().replace(' ', '-');
      const transformedPath = `/my-account/${slugifiedTitle}`;
      const localeTransformedPath = context.root.localePath(transformedPath);
      router.push(localeTransformedPath);
    };

    onBeforeUnmount(() => {
      unMapMobileObserver();
    });

    return { changeActivePage, activePage };
  },

  data(root) {
    return {
      breadcrumbs: [
        {
          text: 'Home',
          link: root.localePath('/')
        },
        {
          text: 'My Account',
          link: root.localePath('/my-account')
        }
      ]
    };
  }
};
</script>

<style lang='scss' scoped>
#my-account {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1240px;
    margin: 0 auto;
  }
}
.my-account {
  @include for-mobile {
    --content-pages-sidebar-category-title-font-weight: var(
      --font-weight--normal
    );
    --content-pages-sidebar-category-title-margin: var(--spacer-sm)
    var(--spacer-sm) var(--spacer-sm) var(--spacer-base);
  }
  @include for-desktop {
    --content-pages-sidebar-category-title-margin: var(--spacer-xl) 0 0 0;
  }
}
.breadcrumbs {
  margin: var(--spacer-base) 0 var(--spacer-lg);
}
</style>
