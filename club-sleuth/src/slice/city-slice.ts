import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CityState {
  value: string;
}

const initialState: CityState = {
  value: '',
};

export const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { changeCity } = citySlice.actions;

export default citySlice.reducer;
