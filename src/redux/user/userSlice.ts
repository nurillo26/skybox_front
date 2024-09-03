import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { IUser } from '../../interfaces/IUser';
import { getUserFromLS } from '../../utils/getUserFromLC';

export interface UserState {
  name: string | null;
  user: null | IUser;
}

const initialState: UserState = {
  name: 'user',
  user: getUserFromLS(),
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser | null>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
