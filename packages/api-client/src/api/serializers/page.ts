import { CmsSection, Page } from '../../types';

export const deserializeLinks = (links): string => {
  return links.map(link => {
    if (!link) {
      return null;
    }
    if (link.includes('pages')) {
      return link.replace('pages', 'content');
    } else if (link.includes('categories')) {
      return link.replace('/t/', '/c/');
    }
  });
};

export const deserializeCmsSection = (cmsSections, backendUrl): CmsSection[] => {
  return cmsSections.map(section => ({
    sectionId: section.id,
    type: section.attributes.type,
    link: deserializeLinks([section.attributes.link, section.attributes.content?.link_one, section.attributes.content?.link_two, section.attributes.content?.link_three]),
    rteContent: section.attributes.content?.rte_content,
    title: section.attributes.content?.title,
    subtitle: section.attributes.content?.subtitle,
    buttonText: section.attributes.content?.button_text,
    settings: section.attributes.settings,
    fit: section.attributes.fit,
    imgOneSm: backendUrl.concat(section.attributes.img_one_sm),
    imgOneMd: backendUrl.concat(section.attributes.img_one_md),
    imgOneLg: backendUrl.concat(section.attributes.img_one_lg),
    imgOneXl: backendUrl.concat(section.attributes.img_one_xl),
    imgTwoSm: backendUrl.concat(section.attributes.img_two_sm),
    imgTwoMd: backendUrl.concat(section.attributes.img_two_md),
    imgTwoLg: backendUrl.concat(section.attributes.img_two_lg),
    imgTwoXl: backendUrl.concat(section.attributes.img_two_xl),
    imgThreeSm: backendUrl.concat(section.attributes.img_three_sm),
    imgThreeMd: backendUrl.concat(section.attributes.img_three_md),
    imgThreeLg: backendUrl.concat(section.attributes.img_three_lg),
    imgThreeXl: backendUrl.concat(section.attributes.img_three_xl)
  }));
};

export const deserializePage = (data, included, backendUrl): Page => ({
  id: data.id,
  title: data.attributes.title,
  content: data.attributes.content,
  locale: data.attributes.locale,
  type: data.attributes.type,
  slug: data.attributes.slug,
  cmsSections: deserializeCmsSection(included, backendUrl)
});

