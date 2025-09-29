import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from './api-services/baseApi';
import { authReducer } from './slices/auth-slice';
export const Store = configureStore({
    reducer:{
        [baseApi.reducerPath]: baseApi.reducer,
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(baseApi.middleware),
    
})
export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;