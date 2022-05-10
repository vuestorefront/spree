import type { ContentPage, CmsSection } from '@vue-storefront/spree-api/src/types';

export type { ContentPage };

export type ContentSearchParams = {
  contentPageSlug: string;
};

export type ContentGetters = {
  getPageTitle: (contentPage: ContentPage) => string;
  getPageContent: (contentPage: ContentPage) => string;
  getPageSections: (contentPage: ContentPage) => CmsSection[];
  getSectionComponentName: (cmsSection: CmsSection) => string;
  isStandardPage: (contentPage: ContentPage) => boolean;
};
