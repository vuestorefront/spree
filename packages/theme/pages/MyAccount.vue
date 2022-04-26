<template>
  <div id="my-account">
    <SfBreadcrumbs
      class="breadcrumbs desktop-only"
      :breadcrumbs="breadcrumbs"
    />
    <SfContentPages
      v-e2e="'my-account-content-pages'"
      :title="$t('pages.my_account.content_page_title_my_account')"
      :active="activePage.localizedTitle"
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
        <OrderDetails v-if="activePage.pageName === 'order-details'" />
      </SfContentCategory>

      <SfContentPage :title="$t('pages.my_account.content_page_title_log_out')" />
    </SfContentPages>
  </div>
</template>
<script>
import { SfBreadcrumbs, SfContentPages } from '@storefront-ui/vue';
import {
  computed,
  useRoute,
  useRouter,
  onBeforeUnmount
} from '@nuxtjs/composition-api';
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
  middleware: ['is-authenticated'],
  setup(props, context) {
    const route = useRoute();
    const router = useRouter();
    const { logout } = useUser();
    const isMobile = computed(mapMobileObserver().isMobile);

    const handleOpenPage = async ({ pageName }) => {
      const pageRoute = {
        ...route.value,
        path: context.root.localePath(route.value.path),
        params: { pageName }
      };
      router.push(pageRoute);
    };

    const handleLogout = async () =>
      logout()
        .then(() => context.root.localePath({ name: 'home' }))
        .then(path => router.push(path));

    const pages = computed(() => [
      { pageName: 'my-profile', i18nKey: 'pages.my_account.content_page_title_my_profile', onActive: handleOpenPage },
      { pageName: 'saved-addresses', i18nKey: 'pages.my_account.content_page_title_saved_addresses', onActive: handleOpenPage },
      { pageName: 'order-history', i18nKey: 'pages.my_account.content_page_title_order_history', onActive: handleOpenPage },
      { pageName: 'order-details', i18nKey: 'pages.my_account.content_page_title_order_details' },
      { pageName: 'log-out', i18nKey: 'pages.my_account.content_page_title_log_out', onActive: handleLogout }
    ].map((page) => ({ ...page, localizedTitle: context.root.$i18n.t(page.i18nKey) })));

    const findPageByPageName = (name) => pages.value.find(({ pageName }) => pageName === name);

    const findPageByLocalizedTitle = (title) => pages.value.find(({ localizedTitle }) => localizedTitle === title);

    const changeActivePage = async (title) => {
      const page = findPageByLocalizedTitle(title);
      if (!page) return handleOpenPage({ pageName: undefined });
      await page?.onActive?.(page);
    };

    const activePage = computed(() => {
      const { pageName } = route.value.params;
      if (!pageName) return isMobile.value ? {} : findPageByPageName('my-profile');
      return findPageByPageName(pageName);
    });

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

<style lang="scss" scoped>
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
