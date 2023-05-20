import axios from '../axios';
import { ADD_TASK, DELETE_TASK, UPDATE_TASK, FETCH_TASKS } from './types';

export const addTask = (task) => async (dispatch) => {
  const response = await axios.post('/main/task', task);
  dispatch({
    type: ADD_TASK,
    payload: response.data,
  });
};

export const deleteTask = (id) => async (dispatch) => {
  await axios.delete(`/api/tasks/${id}`);
  dispatch({
    type: DELETE_TASK,
    payload: id,
  });
};

export const updateTask = (task) => async (dispatch) => {
  const response = await axios.put(`/api/tasks/${task.id}`, task);
  dispatch({
    type: UPDATE_TASK,
    payload: response.data,
  });
};

export const fetchTasks = () => async (dispatch) => {
  const response = await axios.get('/main/tasks');
  dispatch({
    type: FETCH_TASKS,
    payload: response.data,
  });
};

