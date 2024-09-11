import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
}

interface UserState {
  users: User[];
  filter: {
    name: string;
    username: string;
    email: string;
    phone: string;
  };
}

const initialState: UserState = {
  users: [],
  filter: {
    name: '',
    username: '',
    email: '',
    phone: '',
  },
};

// Fetch users asynchronously
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  return (await response.json()) as User[];
});

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<Partial<UserState['filter']>>) {
      state.filter = { ...state.filter, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    });
  },
});

export const { setFilter } = userSlice.actions;
export default userSlice.reducer;
