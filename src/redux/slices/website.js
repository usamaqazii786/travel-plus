import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  website: null,
}

const slice = createSlice({
  name: 'website',
  initialState,
  reducers: {
    setWebsite(state, action) {
      state.website = action.payload
    },
    clearWebsite(state) {
      state.website = null
    },
  },
})

export const { setWebsite, clearWebsite } = slice.actions
export default slice.reducer
