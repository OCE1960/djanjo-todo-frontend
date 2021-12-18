import { createSlice,  createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { todoType }  from "../../types/model"


const allTodos:todoType[] = []; 




export const todoRecord: todoType= {
                                        id: "",
                                        title: "",
                                        description: "",
                                        completed: false,
                                      };

const initialState = {
  todoRecord, 
  allTodos,
  status : "idle"
}

export const getTodoById = createAsyncThunk('todos/show', async (id: string, { rejectWithValue }) => {
      try{
        const response = await axios.get(`/todos/${id}`)
        return await response.data; 
      }catch (err:any){
        return rejectWithValue(err.response.data) 
      }
})



export const getAllTodos= createAsyncThunk('todos/index', async () => {
          const allTodos = await axios.get(`/todos`);
          return await allTodos.data;            
})
export const store = createAsyncThunk('todos/store', async (values: any, { rejectWithValue }) => {       
  try {
    const storeResponse = await axios.post(`/todos/`, values);
  return await storeResponse.data;  
  }catch (err:any){
    return rejectWithValue(err.response.data) 
  }  
})

export const update = createAsyncThunk('todos/update', async (values: any, { rejectWithValue } ) => {  
  try {
    const id = values.get('id');     
    const storeResponse = await axios.put(`/todos/${id}/`, values);
    return await storeResponse.data; 
  }catch (err:any){
    return rejectWithValue(err.response.data) 
  }     
})


export const todoSlice = createSlice({
    name: 'allTodos',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getAllTodos.pending, (state, action) => {
          state.status = 'pending';  
        }).addCase(getAllTodos.fulfilled, (state, action) => {
                state.status = 'succeeded';
                 state.allTodos = action.payload;
               console.log(action.payload)
          }).addCase(getAllTodos.rejected, (state, action) => {
            console.log(action)
            state.status = 'failed';
          }).addCase(store.pending, (state, action) => {
            state.status = 'pending';
            console.log(action);
          }).addCase(store.fulfilled, (state, action) => {
                      state.status = 'idle'; 
                      console.log(action);
                }).addCase(store.rejected, (state, action) => {
                  state.status = 'failed';
                  console.log(action);
          }).addCase(getTodoById.pending, (state) => {
            state.status = 'pending'
                }).addCase(getTodoById.fulfilled, (state, action) => {
                      state.status = 'idle';
                      state.todoRecord = action.payload;
                }).addCase(getTodoById.rejected, (state, action) => {
                  state.status = 'failed';
                  state.todoRecord = todoRecord;
                  console.log(action);
          }).addCase(update.pending, (state) => {
                    state.status = 'pending'
                }).addCase(update.fulfilled, (state, action) => {
                      state.status = 'idle';
                      state.todoRecord = todoRecord;
                }).addCase(update.rejected, (state) => {
                  state.status = 'failed';
          })
          
      },
})

//export const { } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAllTodos  = (state: RootState) => state.todos.allTodos; 
export const selectTodoStatus = (state: RootState) => state.todos.status;
export const selectTodoRecord = (state: RootState) => state.todos.todoRecord;  

export default todoSlice.reducer;