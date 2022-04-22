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

export const getPageSections = (contentPage: ContentPage): CmsSection[] => {
  return contentPage?.cmsSections ?? [];
};

export const getSectionComponentName = (cmsSection: CmsSection): string => {
  switch (cmsSection.type) {
    case contentSectionTypes.heroImage:
      return 'HeroImage';
    case contentSectionTypes.featuredArticle:
      return 'FeaturedArticle';
    case contentSectionTypes.productCarousel:
      return 'ProductCarousel';
    case contentSectionTypes.imageGallery:
      return 'ImageGallery';
    case contentSectionTypes.sideBySideImages:
      return 'SideBySideImages';
    case contentSectionTypes.richTextContent:
      return 'RichTextContent';
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
  getPageSections,
  getSectionComponentName,
  isStandardPage
};

export default contentGetters;
