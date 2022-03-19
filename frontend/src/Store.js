import {configureStore} from "@reduxjs/toolkit"
import { userReducer } from "./Reducers/User";



const Store = configureStore({
    reducer:{
        user:userReducer,
    }
})

export default Store