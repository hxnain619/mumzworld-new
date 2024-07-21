import { loadLanguage } from '@api/languageStorage';
import { apiSlice } from '..';
import { filterItemsByCategory } from './helper';

const productSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query({
      query: () => ({
        url: '/mumzrn/product-list-large',
        method: 'GET',
      }),
      transformResponse: (response: { data: any }) => {
        if (!response?.data) return { categories: [] };
        const { products } = response.data;
        const categories = products.items.map((resp: any) => [
          ...resp.categories.map((categ: any) => categ.name),
        ]);

        return [...new Set(categories.flat())].slice(0, 100);
      },
    }),
    getProductsByCategory: build.query({
      query: () => ({
        url: '/mumzrn/product-list-large',
        method: 'GET',
      }),
      transformResponse: (response: any, _, args: string) => {
        if (!response?.data) return { data: [] };

        const { products } = response.data;
        const filteredData = filterItemsByCategory(products, args);
        return { data: filteredData, total: filteredData.length };
      },
    }),
    getProductById: build.query({
      query: () => ({
        url: '/mumzrn/product',
        method: 'GET',
      }),
      transformResponse: (response: any, _, args: string) => {
        if (!response?.data) return { data: [] };

        const { product } = response.data;
        return { product };
      },
    }),
  }),
});
export const {
  useGetCategoriesQuery,
  useLazyGetProductsByCategoryQuery,
  useGetProductByIdQuery,
} = productSlice;
export default productSlice;
