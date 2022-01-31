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

export const getProjectDetail = createAsyncThunk(
    "project/getProjectDetail",
    async (id) => {
        const respone = await projectAPI.getProjectDetail(id)
        return respone.data.content
    }
)

export const getAllStatus = createAsyncThunk(
    "project/getAllStatus",
    async () => {
        const respone = await projectAPI.getAllStatus()
        return respone.data.content
    }
)

export const getPriorities = createAsyncThunk(
    "project/getPriorities",
    async () => {
        const respone = await projectAPI.getPriorities()
        return respone.data.content
    }
)

export const getAllTaskType = createAsyncThunk(
    "project/getAllTaskType",
    async () => {
        const respone = await projectAPI.getAllTaskType()
        return respone.data.content
    }
)

export const getAssignUsers = createAsyncThunk(
    "project/getAssignUsers",
    async (projectId) => {
        const respone= await projectAPI.getAssignUsers(projectId)
        return respone.data.content
    }
)

const projectSlice = createSlice({
    name: 'project',
    initialState: {
        projectList: [],
        categories: [],
        project: {},
        updatedProject: undefined,
        searchProject: '',
        filerProject: undefined,
        projectDetail: {},
        listStatus: [],
        priorities: [],
        listTaskType: [],
        assignUsers: [],
        searchTask: ''
    },
    reducers: {
        getUpdatedProject: (state, action) => {
            state.updatedProject = action.payload
        },
        clearUpdateProject: (state, action) => {
            state.updatedProject = undefined
        },
        searchProject: (state, action) => {
            state.searchProject = action.payload
        },
        filerProject: (state, action) => {
            state.filerProject = action.payload
        },
        processSearchTask: (state, action) => {
            state.searchTask = action.payload
        }
    },
    extraReducers: {
        [getAllProject.fulfilled]: (state, action) => {
            state.projectList = action.payload
            state.searchProject = ""
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
            state.searchProject = ""
        },
        [updateProject.fulfilled]: (state, action) => {
            state.updatedProject = undefined
        },
        [getProjectDetail.fulfilled]: (state, action) => {
            state.projectDetail = action.payload
        },
        [getAllStatus.fulfilled]: (state, action) => {
            state.listStatus = action.payload
        },
        [getPriorities.fulfilled]: (state, action) => {
            state.priorities = action.payload
        },
        [getAllTaskType.fulfilled]: (state, action) => {
            state.listTaskType = action.payload
        },
        [getAssignUsers.fulfilled]: (state, action) => {
            state.assignUsers = action.payload
        }, 
        [getAssignUsers.rejected]: (state, action) => {
            state.assignUsers = []
        }
    }
})

export const {getUpdatedProject, clearUpdateProject, searchProject,filerProject, processSearchTask} = projectSlice.actions
export default projectSlice.reducer