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


const userSlice = createSlice({
    name: "user",
    initialState: {
        userInfo: {},
    },
    extraReducers: {
        [processLogin.fulfilled]: (state, action) => {
            state.userInfo = action.payload
        }
    }
})


export default userSlice.reducer