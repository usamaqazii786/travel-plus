import { createSlice } from '@reduxjs/toolkit';


// utils
// import { axiosInstance } from '../../utils/AxiosInstance';
// import { dispatch } from '../store';



const initialState = {
  isLoading: false,
  error: null,
  website: [],

 
};

const slice = createSlice({
  name: 'website',
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

    // GET PRODUCTS
    getProductsSuccess(state, action) {
      state.isLoading = false;
      state.website = action.payload;
    },

  
   
  },
});

// Reducer
export default slice.reducer;



// ----------------------------------------------------------------------

// export function getProducts() {
//   return async () => {
//     dispatch(slice.actions.startLoading());
//     try {
//       const response = await axiosInstance.get('/admin/websites');
//       dispatch(slice.actions.getProductsSuccess(response.data.data));
//     } catch (error) {
//       dispatch(slice.actions.hasError(error));
//     }
//   };
// }

// ----------------------------------------------------------------------
