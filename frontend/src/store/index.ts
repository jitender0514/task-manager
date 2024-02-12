import { configureStore } from "@reduxjs/toolkit";
import configReducers from "./reducers";


 export const store = configureStore({
    reducer: configReducers

 })

 export type RootState = ReturnType<typeof store.getState>
 export type AppDispatch = typeof store.dispatch