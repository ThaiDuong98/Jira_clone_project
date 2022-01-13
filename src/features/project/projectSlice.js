import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import projectAPI from '../../apis/projectApi'

export const getAllProject = createAsyncThunk(
    'project/getAll',
    async (keyword) => {
        const respone = await projectAPI.getAllProject(keyword)
      
        return respone.data.content
    }
)

export const getAllCategory = createAsyncThunk(
    "project/getAllCategory",
    async () => {
        const respone = await projectAPI.getAllCategory()
        
        return respone.data.content
    }
)

export const createProject = createAsyncThunk(
    "project/createProject",
    async (data) => {
        const respone = await projectAPI.createProject(data)
       
        return respone.data.content
    }
)

export const deleteProject = createAsyncThunk(
    "project/deleteProject",
    async (id) => {
        const respone = await projectAPI.deleteProjectByid(id)
        
        return respone.data.content
    }
)

export const updateProject = createAsyncThunk(
    "project/updateProject",
    async (project, apiThunk) => {
         
        const respone = await projectAPI.updateProject(project)
       
        return respone.data
    }
)


const projectSlice = createSlice({
    name: 'project',
    initialState: {
        projectList: [],
        categories: [],
        project: {},
        updatedProject: undefined
    },
    reducers: {
        getUpdatedProject: (state, action) => {
            state.updatedProject = action.payload
        },
        clearUpdateProject: (state, action) => {
            state.updatedProject = undefined
        }
    },
    extraReducers: {
        [getAllProject.fulfilled]: (state, action) => {
            state.projectList = action.payload
        },
        [getAllCategory.fulfilled]: (state, action) => {
            state.categories = action.payload
        },
        [createProject.fulfilled]: (state, action) => {
            state.project = action.payload
            state.updatedProject = undefined
        },
        [deleteProject.fulfilled]: (state, action) => {
            const id = action.payload?.[0]
            state.projectList = state.projectList.filter(project => project.id !== id)
            state.updatedProject = undefined
        },
        [updateProject.fulfilled]: (state, action) => {
            state.updatedProject = undefined
        }
    }
})

export const {getUpdatedProject, clearUpdateProject} = projectSlice.actions
export default projectSlice.reducer