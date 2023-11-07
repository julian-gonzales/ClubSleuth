import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { User } from '../domain/user';

export interface UserIDState {
  value: User;
}

const initialState: UserIDState = {
  value: {
    _id: '',
    activated: false,
    clubs: [],
    email: '',
    firstName: '',
    lastName: '',
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeUser: (state, action: PayloadAction<User>) => {
      state.value = action.payload;
    },
  },
});

export const { changeUser } = userSlice.actions;

export default userSlice.reducer;
