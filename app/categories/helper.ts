export const ITEM_COUNT = 800;
export const ITEMS_PER_LOAD = 20;

export const generateItems = (items: any[]) => {
  return Array.from({ length: items.length }, (_, i) => items[i]);
};
