export const filterItemsByCategory = (data: any, categoryName: string) => {
  return data.items.filter((item: any) =>
    item.categories.some((category: any) => category.name === categoryName),
  );
};
