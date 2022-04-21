export type CmsSection = {
    sectionId: string;
    type: string;
    link?: string[];
    rteContent?: string;
    title?: string;
    subtitle?: string;
    buttonText?: string;
    settings?: string;
    fit?: string;
    imgOneSm?: string;
    imgOneMd?: string;
    imgOneLg?: string;
    imgOneXl?: string;
    imgTwoSm?: string;
    imgTwoMd?: string;
    imgTwoLg?: string;
    imgTwoXl?: string;
    imgThreeSm?: string;
    imgThreeMd?: string;
    imgThreeLg?: string;
    imgThreeXl?: string;
}

export type Page = {
    id: number;
    title: string;
    content: string;
    locale: string;
    type: string;
    slug: string;
    cmsSections: CmsSection[];
}