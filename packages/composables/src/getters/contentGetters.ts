import { ContentGetters, ContentPage } from '../types';

export const getPageTitle = (contentPage: ContentPage): string => {
  return contentPage?.title;
};

export const getPageContent = (contentPage: ContentPage): string => {
  return contentPage?.content;
};

const contentGetters: ContentGetters = {
  getPageTitle,
  getPageContent
};

export default contentGetters;
