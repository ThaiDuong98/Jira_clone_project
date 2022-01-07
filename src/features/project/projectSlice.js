import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import projectAPI from '../../apis/projectApi'

export const getAllProject = createAsyncThunk(
    'project/getAll',
    async () => {
        const respone = await projectAPI.getAllProject()
        console.log("Res", respone.data.content)
        return respone.data.content
    }
)


const projectSlice = createSlice({
    name: 'project',
    initialState: {
        projectList: []
    },
    extraReducers: {
        [getAllProject.fulfilled]: (state, action) => {
            state.projectList = action.payload
        }
    }
})

export default projectSlice.reducer