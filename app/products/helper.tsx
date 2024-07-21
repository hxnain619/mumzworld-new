import { loadLanguage } from '@api/languageStorage';

export const ITEM_COUNT = 800;
export const ITEMS_PER_LOAD = 20;

export const generateItems = (items: any[]) => {
  return Array.from({ length: items.length }, (_, i) => items[i]);
};

export const getSearchData = (products: any[], searchText: string) => {
  return products.filter((product) =>
    product.name.toLowerCase().includes(searchText),
  );
};

export const warnings = [
  { icon: 'arrow-undo-outline', value: 'product.return_is_not_applicable' },
  { icon: 'key-outline', value: 'product.secure_payment' },
  { icon: 'checkmark-done-circle-outline', value: 'product.only_authentic' },
];

export const getProductByLanguage = async (product: any[] | undefined) => {
  if (!product) return [];

  const lang = await loadLanguage();
  return product?.filter((prod: any) => prod.language === lang);
};
