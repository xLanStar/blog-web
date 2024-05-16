import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./feature/user/userSlice";

const rootReducer = combineReducers({ user: userSlice.reducer });

const store = configureStore({
  reducer: rootReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export default store;
