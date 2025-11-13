import { createSlice } from "@reduxjs/toolkit";

type AuthState = {
  isLoading: boolean;
  error: string | null;
  token: string;
  data:  object;
};

const initialState: AuthState = {
  isLoading: false,
  error: null,
  token: '',
  data: {}
}

export const {
  actions: {
    setAuthData,
    setLoading
  },
  reducer: authReducer,
} = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthData: (state, action) => {
      state.data = action.payload.data;
      state.token = action.payload.token;
    },
    setLoading: (state, {payload}) => {
      state.isLoading = payload;
     
    }
  },
  extraReducers:(()=>{})
});