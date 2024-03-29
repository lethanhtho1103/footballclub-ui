import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from '../reducer';

const userPersistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(userPersistConfig, userSlice.reducer);

const store = configureStore({
  reducer: {
    user: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);
export { persistor };

export default store;
