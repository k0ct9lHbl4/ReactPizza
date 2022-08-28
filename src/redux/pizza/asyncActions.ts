import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { PizzaItem, SearchPizzaParams } from './types';

export const fetchPizzas = createAsyncThunk<PizzaItem[], SearchPizzaParams>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { category, sortBy, order, search, currentPage } = params;
    const { data } = await axios.get<PizzaItem[]>(
      `https://62f0d7a8e2bca93cd23e14f3.mockapi.io/items?page=${currentPage}&limit=4${category}${sortBy}${order}${search}`,
    );
    return data;
  },
);
