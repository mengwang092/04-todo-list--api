import axios from 'axios';

export type TodoType = {
  id: string,
  text: string,
  done: boolean,
};

const apiURL = '/api/todolist/這裡要換上你的英文字名';

export const fetchTodo = (): Promise<TodoType[]> => {
  return axios(apiURL).then(({ data }) => data);
};

export const addTodo = (text: string): Promise<TodoType> => {
  return axios(apiURL, {
    method: 'POST',
    data: { text },
  }).then(({ data }) => data);
};

export const toggleTodo = (id: string): Promise<TodoType[]> => {
  return axios({
    method: 'PUT',
    url: apiURL,
    data: { id },
  }).then(({ data }) => data);
};

export const deleteTodo = (id: string): Promise<TodoType[]> => {
  return axios({
    method: 'DELETE',
    url: apiURL,
    data: { id },
  }).then(({ data }) => data);
};
