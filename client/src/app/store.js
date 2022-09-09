import { configureStore } from "@reduxjs/toolkit";
import roomReducer from '../features/roomSlice'

const store = configureStore({
    reducer: {
        room: roomReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }
    ),

});

export default store;
    