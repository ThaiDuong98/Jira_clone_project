import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../features/auth/userSlice'
import projectReducer from '../features/project/projectSlice'


const store = configureStore({
    reducer: {
        user: userReducer,
        projects: projectReducer
    }
})

export default store