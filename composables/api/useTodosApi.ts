import { useFetch } from '#imports';
import { baseFetchConfig } from '~/composables/api/useFetchConfig';

const getAllTodos = (query: any) => useFetch('/api/todos', { ...baseFetchConfig, method: 'GET', query });

export const useTodosApi = () => ({
	getAllTodos,
});