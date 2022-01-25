import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import userApi from '../../apis/userApi'


export const processLogin = createAsyncThunk(
    "user/login",
    async (user) => {
        const respone = await userApi.login(user)

        localStorage.setItem('access_token', respone.data.content.accessToken)
        return respone.data.content
    }
)

export const processRegister = createAsyncThunk(
    "user/register",
    async (user) => {
        const respone = await userApi.register(user)

        return respone.data
    }
)

const userSlice = createSlice({
    name: "user",
    initialState: {
        userInfo: JSON.parse(localStorage.getItem('userInfo')) || {},
        statusCode: ''
    },
    reducers: {
        processLogout: (state, action) =>{
            state.userInfo = {}
            localStorage.removeItem("userInfo");
            localStorage.removeItem("access_token");
        }
    },
    extraReducers: {
        [processLogin.fulfilled]: (state, action) => {
            state.userInfo = action.payload
            localStorage.setItem('userInfo', JSON.stringify(state.userInfo))
        },
        [processRegister.fulfilled]: (state, action) => {
            state.statusCode = action.payload.statusCode
        }
    }
})

export const {processLogout} = userSlice.actions
export default userSlice.reducer