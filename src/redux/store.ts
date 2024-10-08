import { configureStore } from '@reduxjs/toolkit';
import userSlice from './user/userSlice';
import filesSlice from './file/filesSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    userSlice,
    filesSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
