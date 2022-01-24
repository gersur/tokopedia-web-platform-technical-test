import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import thunk from 'redux-thunk';

import myPokemonSlice from '../actions/my-pokemon';

const rootReducer = combineReducers({
  myPokemonSlice,
});

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['myPokemonSlice'], // elements that will be persisted
  blacklist: [], // elements that will not be persisted
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});
const persistor = persistStore(store);

export { persistor, store };

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
