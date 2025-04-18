import { createSlice } from '@reduxjs/toolkit';
// utils
// import axiosInstance from '../../utils/axiosInstance';
//
import { dispatch } from '../store';
import { axiosInstance } from '../../utils/AxiosInstance';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  products: [],
  product: null,
  response: null,
};

const slice = createSlice({
  name: 'weedowlproduct',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    // Response
    getResponse(state, action) {
      console.log(action.payload, 'action');
      state.isLoading = false;
      state.response = action.payload;
    },
   
    // GET PRODUCTS
    getProductsSuccess(state, action) {
      state.isLoading = false;
      state.products = action.payload;
    },

    // GET PRODUCT
    getProductSuccess(state, action) {
      state.isLoading = false;
      state.product = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getProducts() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axiosInstance.get('api/admin/products');
      dispatch(slice.actions.getProductsSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
// ----------------------------------------------------------------------

export function Addweedporduct(data, imagetosend) {
  return async () => {
    try {
      dispatch(slice.actions.startLoading());

      const fromdata = new FormData();
      fromdata.append('website_id', '1');
      fromdata.append('cat_id', data.catagory);
      fromdata.append('title', data.title);
      fromdata.append('plant_type', data.planttype);
      fromdata.append('description', data.description);
      fromdata.append('quantity', data.quantity);
      fromdata.append('amount', data.amount);
      fromdata.append('weight', data.weight);
      fromdata.append('cbd', data.cbd);
      fromdata.append('thc', data.thc);
      imagetosend.flat(1).map((file, index) => fromdata.append(`media[${index}]`, file));

      const response = await axiosInstance.post('api/admin/products', fromdata);
      const responseData = response.data;
      if (response.status === 200) {
        dispatch(slice.actions.getResponse(responseData.response));
      } else {
        dispatch(slice.actions.hasError(responseData.message))
        throw new Error(responseData.message);
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      throw error;
    }
  };
}

// ----------------------------------------------------------------------

export function getProduct(name) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axiosInstance.get('/api/products/product', {
        params: { name },
      });
      dispatch(slice.actions.getProductSuccess(response.data.product));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}
