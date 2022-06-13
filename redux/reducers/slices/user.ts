import { createSlice } from '@reduxjs/toolkit';

const userStore = createSlice({
  name: 'user',
  initialState: {
    email: '',
    name: '',
    category:'group'
  },
  reducers: {
    setUser: (state, param) => {
      const { payload } = param;
      state = payload;
    },
  },
});
const { actions, reducer } = userStore;
export const { setUser } = actions;
export default userStore;
