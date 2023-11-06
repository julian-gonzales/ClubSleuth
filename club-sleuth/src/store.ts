import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api/api-slice';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import cityReducer from './slice/city-slice';
import userReducer from './slice/user-slice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    city: cityReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

setupListeners(store.dispatch);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
