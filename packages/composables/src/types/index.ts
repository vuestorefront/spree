import type { CategorySearchResult, LineItem, ProductVariant, Order, Country, State, WishedProduct } from '@vue-storefront/spree-api';
import type { AgnosticGroupedFacet, ComputedProperty } from '@vue-storefront/core';

export * from './content';

export { UseCategory, UseProduct } from '@vue-storefront/core';

export type UseCountryErrors = {
  load: Error;
  loadStates: Error;
};

export type UseCountry = {
  countries: ComputedProperty<Country[]>;
  states: ComputedProperty<State[]>;
  loading: ComputedProperty<boolean>
  error: ComputedProperty<UseCountryErrors>
  load(): Promise<void>;
  loadStates(key: string): Promise<void>;
};

export { Cart, Order, LineItem, ProductVariant, Category, Wishlist, User } from '@vue-storefront/spree-api';

export type UserAddress = Record<string, unknown>;

export type Coupon = Record<string, unknown>;

export type OrderItem = LineItem;

export type Review = Record<string, unknown>;

export type Shipping = Record<string, unknown>;

export type ShippingMethod = Record<string, unknown>;

export type WishlistProduct = WishedProduct;

export type ProductsResponse = {
  data: ProductVariant[];
  total: number;
};

export type OrderSearchParams = {
  orderId?: string
};

export type OrdersResponse = Order[] | Order;

export type PriceRange = {
  min: number;
  max: number;
};

export type SearchParamsOptionTypeFilter = {
  optionTypeName: string;
  optionValueId: number;
};

export type SearchParamsProductPropertyFilter = {
  productPropertyName: string;
  productPropertyValue: string;
}

export type SearchParams = {
  categorySlug?: string;
  term?: string;
  selectedOptionTypeFilters: SearchParamsOptionTypeFilter[];
  selectedProductPropertyFilters: SearchParamsProductPropertyFilter[];
  priceFilter: string;

  page?: number;
  itemsPerPage?: number;
  sort?: string;
};

export type SearchData = {
  categories: CategorySearchResult;
  products: ProductVariant[],
  productsMeta: {
    totalPages: number;
    totalCount: number;
  };
  facets: AgnosticGroupedFacet[];
  itemsPerPage: number;
};

export type PasswordResetResult = {
  isPasswordChanged?: boolean;
};
