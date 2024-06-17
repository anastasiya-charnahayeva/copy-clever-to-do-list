import { useFetch } from '#imports';
import { baseFetchConfig } from '~/composables/api/useFetchConfig';

const getAllTodos = (query: any) => useFetch('/api/todos', { ...baseFetchConfig, method: 'GET', query });
const saveData = (body: any) => useFetch('/api/todos', { ...baseFetchConfig, method: 'POST', body: body });
const remove = (body: any) => useFetch('/api/todos', { ...baseFetchConfig, method: 'DELETE', body: body });
const updateTodo = (body: any) => useFetch('/api/todos', { ...baseFetchConfig, method: 'PUT', body: body });



export const useTodosApi = () => ({
	getAllTodos,
	saveData,
	remove,
	updateTodo,
});