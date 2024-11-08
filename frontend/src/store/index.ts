import { configureStore } from '@reduxjs/toolkit';

import { docsApi } from './docsApi';
import { usersApi } from './usersApi';
import { filesApi } from './filesApi';
import modalSlice from './modalSlice';

const store = configureStore({
  reducer: {
    [docsApi.reducerPath]: docsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [filesApi.reducerPath]: filesApi.reducer,
    modalSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      docsApi.middleware,
      usersApi.middleware,
      filesApi.middleware,
    ),
});

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;

export default store;
