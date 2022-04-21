import axios from 'axios';
import { Page, ApiContext } from '../../types';
import { deserializePage } from '../serializers/page';

const getPageInclude = 'cms_sections';

export default async function getCMSPage({ config }: ApiContext, {cmsPageSlug: cmsPageSlug}): Promise<Page> {
  const url = config.backendUrl.concat(`/api/v2/storefront/cms_pages/${cmsPageSlug}`);

  const result = await axios.get(url, { params: {
    include: getPageInclude
  }
  });

  const { data, included } = result.data;
  return deserializePage(data, included, config.backendUrl);
}
