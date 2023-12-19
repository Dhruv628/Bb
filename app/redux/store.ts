import { configureStore } from "@reduxjs/toolkit";  
import { photosReducer } from "./reducers/photographyReducer";
import { userReducer } from "./reducers/userReducer";
import { clientGalleryReducer } from "./reducers/clientGalleryReducer";
import { videosReducer } from "./reducers/videoReducer";
 
 

export const store = configureStore({
  reducer: {
    photosReducer,
    clientGalleryReducer,
    userReducer,
    videosReducer
  }, 
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
