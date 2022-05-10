import axios from 'axios';
import { ContentPage, ApiContext, GetContentPageParams } from '../../types';
import { deserializePage } from '../serializers/page';

const getPageInclude = 'cms_sections';

export default async function getCMSPage({ config }: ApiContext, { contentPageSlug }: GetContentPageParams): Promise<ContentPage> {
  const url = config.backendUrl.concat(`/api/v2/storefront/cms_pages/${contentPageSlug}`);

  const result = await axios.get(url, { params: {
    include: getPageInclude
  }
  });

  const { data, included } = result.data;
  return deserializePage(data, included, config.backendUrl);
}
