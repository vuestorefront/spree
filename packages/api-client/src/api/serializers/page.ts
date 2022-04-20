import { CmsSection, Page } from '../../types';

export const deserializeCmsSection = (cmsSections): CmsSection[] => {
  return cmsSections.map(section => ({
    sectionId: section.id,
    type: section.attributes.type,
    rteContent: section.attributes.content.rte_content,
    title: section.attributes.content.title,
    subtitle: section.attributes.content.subtitle,
    buttonText: section.attributes.content.button_text,
    settings: section.attributes.settings,
    fit: section.attributes.fit,
    imgOneSm: section.attributes.im_one_sm,
    imgOneMd: section.attributes.im_one_md,
    imgOneLg: section.attributes.im_one_lg,
    imgOneXl: section.attributes.im_one_xl,
    imgTwoSm: section.attributes.im_two_sm,
    imgTwoMd: section.attributes.im_two_md,
    imgTwoLg: section.attributes.im_two_lg,
    imgTwoXl: section.attributes.im_two_xl,
    imgThreeSm: section.attributes.im_three_sm,
    imgThreeMd: section.attributes.im_three_md,
    imgThreeLg: section.attributes.im_three_lg,
    imgThreeXl: section.attributes.im_three_xl
  }));
};

export const deserializePage = (data, included): Page => ({
  id: data.id,
  title: data.attributes.title,
  content: data.attributes.content,
  locale: data.attributes.locale,
  type: data.attributes.type,
  slug: data.attributes.slug,
  cmsSections: deserializeCmsSection(included)
});
