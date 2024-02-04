import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
import { TData } from '@/types/TodoType';

const URL = process.env.API || 'http://localhost:4000/todos';

export const useFetchData = () => {
	const fetchData = async () => {
		const response = await axios.get(URL);
		return response.data;
	};

	return useQuery('data', fetchData);
};

export const usePostTodo = (refetch: () => void) => {
	const postTodo = async (newTodo: TData) => {
		const { data } = await axios.post(URL, newTodo);
		refetch();
		return data;
	};

	return useMutation(postTodo);
};

export const useDeleteTodo = (refetch: () => void) => {
	const deleteTodo = async (id: number) => {
		const { data } = await axios.delete(`${URL}/${id}`);
		refetch();
		return data;
	};

	return useMutation(deleteTodo);
};

export const useToggleTodo = (refetch: () => void) => {
	const toggleTodo = async ({
		id,
		todoToUpdate
	}: {
		id: number;
		todoToUpdate: TData;
	}) => {
		const { data } = await axios.put(`${URL}/${id}`, {
			status: !todoToUpdate.status
		});
		refetch();
		return data;
	};

	return useMutation(toggleTodo);
};

export const useEditTodo = (refetch: () => void) => {
	const editTodo = async ({
		id,
		editingTodo
	}: {
		id: number;
		editingTodo: TData;
	}) => {
		const { data } = await axios.put(`${URL}/${id}`, editingTodo);
		refetch();
		return data;
	};

	return useMutation(editTodo);
};
