import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserIDState {
  value: string;
}

const initialState: UserIDState = {
  value: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeUser: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { changeUser } = userSlice.actions;

export default userSlice.reducer;
