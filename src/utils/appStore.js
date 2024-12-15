import { configureStore } from "@reduxjs/toolkit";
import userReducer  from "./userSlice";
import feedReducer from "./feedSlice";
import connectionReducer from "./connectionSlice";
import requestsReduecer from "./requestSlice";


const appStore = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer,
        connections: connectionReducer,
        requests: requestsReduecer,
    },
});

export default appStore;