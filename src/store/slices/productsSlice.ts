import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Product } from '../../types';

interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
  selectedCategory: string | null;
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
  selectedCategory: null,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      
      // Validate the response data
      if (!Array.isArray(response.data)) {
        throw new Error('Invalid response format');
      }

      // Transform and validate each product
      return response.data.map((item: any) => {
        if (!item.title || !item.price || !item.image) {
          console.warn('Invalid product data:', item);
        }

        return {
          id: item.id || Math.random(),
          name: item.title || 'Unknown Product',
          description: item.description || '',
          price: Number(item.price) || 0,
          image: item.image || '',
          category: item.category || 'Uncategorized',
          stock: Math.floor(Math.random() * 50) + 1, // Random stock for demo
        };
      });
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to fetch products');
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to fetch products';
        state.items = [];
      });
  },
});

export const { setSelectedCategory } = productsSlice.actions;
export default productsSlice.reducer; 