import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import mainReducer from "../reducers";
import cartReducer from "../reducers/cartReducer";
import bookSelectReducer from "../reducers/bookSelectReducer";
import userReducer from "../reducers/userReducer";
import booksReducer from "../reducers/booksReducer";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";

// non avremo più un singolo reducer fornito allo store, ma combineremo assieme i vari reducer singoli, a comporre un nuovo oggetto globale

// per installare la funzionalità di persistenza:
// npm i redux-persist
// creare la configurazione

// per abilitare la criptazione usa il pacchetto
// npm install redux-persist-transform-encrypt
const persistConfig = {
  // decidiamo di tenere tutto lo Store ad ogni refresh
  key: "root",
  // salviamo nel localStorage,
  // storage: storage,
  storage,
  transforms: [
    encryptTransform({
      secretKey: import.meta.env.VITE_APP_SECRET_KEY
    })
  ]
};

const rootReducer = combineReducers({
  cart: cartReducer,
  bookSelected: bookSelectReducer,
  user: userReducer,
  books: booksReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  // reducer: mainReducer

  // sostituiamo il singolo reducer con quello che li combina insieme
  // reducer: rootReducer
  reducer: persistedReducer,
  // questo spegne il controllo che dà problemi in console
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export const persistor = persistStore(store);
