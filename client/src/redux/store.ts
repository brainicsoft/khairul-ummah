/* eslint-disable @typescript-eslint/no-explicit-any */
import { configureStore } from "@reduxjs/toolkit";
import { authMiddleware, endpoints, reducer, reducerPath } from "./api/api";




export const store = configureStore({
    reducer:{
        // auth: authReducer,
        // fundingRound:fundingRoundReducer,
       [reducerPath]: reducer
    },
    middleware: (getDefaultMiddleware:any) =>
        getDefaultMiddleware().concat(authMiddleware),
    })
    


export type  RootState = ReturnType<typeof store.getState>;
export type  AppDispatch = typeof store.dispatch;


 const initializeApp = async() =>{ 
    // await (store.dispatch as AppDispatch)((endpoints as any).refresh.initiate({},{forceRefetch: true}))
   await (store.dispatch as AppDispatch)((endpoints as any).getUser.initiate({},{forceRefetch: true}))

}
initializeApp()