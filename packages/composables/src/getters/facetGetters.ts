import type {
  FacetsGetters,
  AgnosticCategoryTree,
  AgnosticGroupedFacet,
  AgnosticPagination,
  AgnosticSort,
  AgnosticBreadcrumb,
  AgnosticFacet,
  FacetSearchResult
} from '@vue-storefront/core';
import type { ProductVariant, SearchData } from '../types';
import {
  getCategoryTree as buildCategoryTree,
  getCategoryBreadcrumbs as buildBreadcrumbs
} from './categoryGetters';

const getAll = (searchData: FacetSearchResult<SearchData>): AgnosticFacet[] => {
  return searchData.data ? searchData.data.facets.flatMap(facet => facet.options) : [];
};

const getGrouped = (searchData: FacetSearchResult<SearchData>): AgnosticGroupedFacet[] => {
  return searchData.data ? searchData.data.facets : [];
};

const getSortOptions = (searchData: FacetSearchResult<SearchData>): AgnosticSort => {
  if (!searchData.input) return {} as AgnosticSort;

  const { sort } = searchData.input;
  const options = [
    {type: 'sort', id: 'price', value: 'composables.facet_getters.sort_price_ascending'},
    {type: 'sort', id: '-price', value: 'composables.facet_getters.sort_price_descending'},
    {type: 'sort', id: 'updated_at', value: 'composables.facet_getters.sort_updated_at_ascending'},
    {type: 'sort', id: '-updated_at', value: 'composables.facet_getters.sort_updated_at_descending'}
  ];

  const selectedOption = options.find(option => option.id === sort);

  return { options, selected: selectedOption.id };
};

const getCategoryTree = (searchData: FacetSearchResult<SearchData>): AgnosticCategoryTree => {
  return searchData.data ? buildCategoryTree(searchData.data.categories) : {} as any;
};

const getProducts = (searchData: FacetSearchResult<SearchData>): ProductVariant[] => {
  return (searchData && searchData.data) ? searchData.data.products : [];
};

const getPagination = (searchData: FacetSearchResult<SearchData>): AgnosticPagination => searchData.data ? ({
  currentPage: searchData.input.page,
  totalPages: searchData.data.productsMeta.totalPages,
  totalItems: searchData.data.productsMeta.totalCount,
  itemsPerPage: searchData.data.itemsPerPage,
  pageOptions: [10, 20, 40]
}) : {} as AgnosticPagination;

const getBreadcrumbs = (searchData: FacetSearchResult<SearchData>): AgnosticBreadcrumb[] => {
  return searchData.data ? buildBreadcrumbs(searchData.data.categories.current) : [];
};

const facetGetters: FacetsGetters<any, any> = {
  getSortOptions,
  getGrouped,
  getAll,
  getProducts,
  getCategoryTree,
  getBreadcrumbs,
  getPagination
};

export default facetGetters;
