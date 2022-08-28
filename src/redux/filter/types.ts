export enum sortPropertyEnum {
  RATING = 'rating',
  PRICE_ASC = '-price',
  PRICE_DESC = 'price',
  TITLE = '-title',
}

export type Sort = {
  name: string;
  sortProperty: sortPropertyEnum;
};

export interface FilterSliceState {
  categoryId: number;
  currentPage: number;
  sortType: Sort;
  searchValue: string;
}
