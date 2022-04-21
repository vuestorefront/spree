<template>
  <SfFooter v-if="!menu.isDisabled" :column="parseInt(menuSize)" multiple class="footer">
    <SfFooterColumn
      v-for="(column, i) in menu && menu.items"
      :key="i"
      :title="column.name"
    >
      <SfList>
        <SfListItem
          v-for="(footerItem, j) in column.items"
          :key="j">
          <SfMenuItem
            :label="footerItem.name"
            :link="localePath(footerItem.link)"
          />
        </SfListItem>
      </SfList>
    </SfFooterColumn>
  </SfFooter>
  <SfFooter v-else :column="4" multiple class="footer">
    <SfFooterColumn :title="$t('components.app_footer.about_us.title')">
      <SfList>
        <SfListItem
          v-for="item in $t(`components.app_footer.about_us.items`)"
          :key="item"
          >
          <SfMenuItem
            :label="item"
          />
        </SfListItem>
      </SfList>
    </SfFooterColumn>
    <SfFooterColumn :title="$t('components.app_footer.departments.title')">
      <SfList>
        <SfListItem
          v-for="item in $t(`components.app_footer.departments.items`)"
          :key="item"
        >
          <SfMenuItem
            :label="$t(item)"
          />
        </SfListItem>
      </SfList>
    </SfFooterColumn>
    <SfFooterColumn :title="$t('components.app_footer.help.title')">
      <SfList>
        <SfListItem
          v-for="item in $t(`components.app_footer.help.items`)"
          :key="item"
        >
          <SfMenuItem
            :label="$t(item)"
          />
        </SfListItem>
      </SfList>
    </SfFooterColumn>
    <SfFooterColumn :title="$t('components.app_footer.payment_and_delivery.title')">
      <SfList>
        <SfListItem
          v-for="item in $t(`components.app_footer.payment_and_delivery.items`)"
          :key="item"
        >
          <SfMenuItem
            :label="$t(item)"
          />
        </SfListItem>
      </SfList>
    </SfFooterColumn>
    <SfFooterColumn :title="$t('components.app_footer.social.title')">
      <div class="footer__socials">
        <SfImage class="footer__social-image" v-for="item in $t('components.app_footer.social.items')" :key="item" :src="'/icons/'+item+'.svg'" :alt="item" width="32" height="32" />
      </div>
    </SfFooterColumn>
  </SfFooter>
</template>

<script>
import { SfFooter, SfList, SfImage, SfMenuItem } from '@storefront-ui/vue';
import { onMounted, ref} from '@nuxtjs/composition-api';
import { useMenus } from '@vue-storefront/spree';
import { onSSR } from '@vue-storefront/core';

export default {
  components: {
    SfFooter,
    SfList,
    SfImage,
    SfMenuItem
  },
  data() {
    return {
      isMobile: false,
      desktopMin: 1024
    };
  },
  setup(props, context) {
    const { menu, loadMenu } = useMenus('footer');
    const menuSize = ref({});
    const { locale } = context.root.$i18n;

    onMounted(() => menuSize.value = menu.value?.items?.length || 0);

    onSSR(async () => {
      await loadMenu({menuType: 'footer', menuName: 'Footer menu', locale: locale});
    });

    return {
      menu,
      menuSize
    };
  }
};
</script>

<style lang="scss">

.footer {
  margin-bottom: 3.75rem;
  @include for-desktop {
    margin-bottom: 0;
  }
  &__socials {
    display: flex;
    justify-content: space-between;
    margin: 0 auto var(--spacer-lg);
    padding: var(--spacer-base) var(--spacer-xl);
    @include for-desktop {
      justify-content: flex-start;
      padding: var(--spacer-xs) 0;
      margin: 0 auto;
    }
  }
  &__social-image {
    margin: 0 var(--spacer-2xs) 0 0;
  }
}
.sf-footer {
  @include for-desktop {
    border-top: var(--spacer-xs) solid var(--c-primary);
    padding-bottom: 0;
    margin-top: var(--spacer-2xl);
  }
  &__container {
    margin: var(--spacer-sm);
    @include for-desktop {
      max-width: 69rem;
      margin: 0 auto;
    }
  }
}
</style>
