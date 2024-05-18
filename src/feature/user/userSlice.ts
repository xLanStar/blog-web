import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
export interface IUserState {
  id: number;
  name: string;
  email: string;
  picture: string;
}

// Define the initial state using that type
const initialState: IUserState = {
  id: -1,
  name: "",
  email: "",
  picture: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserState>) => {
      console.log("setUser", action.payload);
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.picture = action.payload.picture;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice;
