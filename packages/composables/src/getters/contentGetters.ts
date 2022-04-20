import { ContentGetters, ContentPage } from '../types';
import { CmsSection } from '@vue-storefront/spree-api/src/types';

const standardPageType = 'Spree::Cms::Pages::StandardPage';

const contentSectionTypes = Object.freeze({
  heroImage: 'Spree::Cms::Sections::HeroImage',
  featuredArticle: 'Spree::Cms::Sections::FeaturedArticle',
  productCarousel: 'Spree::Cms::Sections::ProductCarousel',
  imageGallery: 'Spree::Cms::Sections::ImageGallery',
  sideBySideImages: 'Spree::Cms::Sections::SideBySideImages',
  richTextContent: 'Spree::Cms::Sections::RichTextContent'
});

export const getPageTitle = (contentPage: ContentPage): string => {
  return contentPage?.title;
};

export const getPageContent = (contentPage: ContentPage): string => {
  return contentPage?.content;
};

export const getSectionComponentName = (cmsSection: CmsSection): string => {
  switch (cmsSection.type) {
    case contentSectionTypes.heroImage:
      return '';
    case contentSectionTypes.featuredArticle:
      return '';
    case contentSectionTypes.productCarousel:
      return '';
    case contentSectionTypes.imageGallery:
      return '';
    case contentSectionTypes.sideBySideImages:
      return '';
    case contentSectionTypes.richTextContent:
      return '';
    default:
      return undefined;
  }
};

export const isStandardPage = (contentPage: ContentPage): boolean => {
  return contentPage?.type === standardPageType;
};

const contentGetters: ContentGetters = {
  getPageTitle,
  getPageContent,
  getSectionComponentName,
  isStandardPage
};

export default contentGetters;
