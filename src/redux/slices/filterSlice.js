import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  currentPage: 1,
  sortType: {
    name: 'популярности',
    sortProperty: 'rating',
  },
  searchValue: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSortType(state, action) {
      state.sortType = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setFilters(state, action) {
      state.categoryId = +action.payload.categoryId;
      state.currentPage = +action.payload.currentPage;
      state.searchValue = action.payload.searchValue;
      state.sortType = action.payload.sortType;
    },
  },
});

export const { setCategoryId, setSortType, setCurrentPage, setSearchValue, setFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
