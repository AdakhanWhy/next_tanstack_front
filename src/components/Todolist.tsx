'use client';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { MdDone } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';
import { FaSave } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { TData } from '@/types/TodoType';
import axios from 'axios';
import { useMutation, useQuery } from 'react-query';

const Todolist = () => {
	const URL = 'http://localhost:4000/todos';
	const [inp, setInp] = useState('');
	const [editingTodo, setEditingTodo] = useState({ id: 0, todo: '' });

	const fetchData = async () => {
		const response = await axios.get(URL);
		return response.data;
	};

	const postTodo = async (newTodo: TData) => {
		const { data } = await axios.post(URL, newTodo);
		return data;
	};

	const deleteTodo = async (id: number) => {
		const { data } = await axios.delete(`${URL}/${id}`);
		return data;
	};

	const toggleTodo = async (id: number) => {
		const todoToUpdate = data.find((todo: TData) => todo._id === id);
		if (todoToUpdate) {
			const { data } = await axios.put(`${URL}/${id}`, {
				status: !todoToUpdate.status
			});
			return data;
		}
	};

	const editTodo = async (id: number) => {
		const { data } = await axios.put(`${URL}/${id}`, editingTodo);
		return data;
	};

	const handlePostTodo = () => {
		if (inp.length !== 0) {
			const newTodo = {
				todo: inp,
				status: false,
				_id: Date.now()
			};
			setInp('');
			createTodo(newTodo);
		}
		return;
	};

	const handleDeleteTodo = (id: number) => {
		removeTodo(id);
	};

	const handleToggleStatus = (id: number) => {
		switchTodo(id);
	};

	const handleEditTodo = (id: number) => {
		updateTodo(id);
		setEditingTodo({ id: 0, todo: '' });
	};

	const edit_todo = (id: number) => {
		const todoToEdit = data.find((elem: TData) => elem._id === id);
		setEditingTodo({ id, todo: todoToEdit ? todoToEdit.todo : '' });
	};

	const { mutate: createTodo } = useMutation(postTodo, {
		onSuccess: () => refetch()
	});
	const { mutate: removeTodo } = useMutation(deleteTodo, {
		onSuccess: () => refetch()
	});
	const { mutate: switchTodo } = useMutation(toggleTodo, {
		onSuccess: () => refetch()
	});
	const { mutate: updateTodo } = useMutation(editTodo, {
		onSuccess: () => refetch()
	});

	const { data, isLoading, error, refetch } = useQuery('data', fetchData);

	if (isLoading) return 'loading';

	if (error) return 'error';

	return (
		<main className='bg-gray-700 w-3/5 px-6 py-7 mt-3 mx-auto'>
			<div>
				<input
					className='
                        outline-none
                        bg-transparent
                        border
                        border-gray-500
                        px-4 py-1 mb-8
                        rounded
                        text-white
                        placeholder:text-gray-300'
					type='text'
					placeholder='New todo'
					value={inp}
					onChange={e => setInp(e.target.value)}
				/>
				<button
					className='bg-gray-500
                    border-none
                    rounded
                    text-white
                    cursor-pointer
                    ml-2 px-4 py-1'
					onClick={handlePostTodo}
				>
					Add
				</button>
			</div>
			<ul className=''>
				{data.map((elem: TData) => (
					<li
						key={elem._id}
						className={`${
							elem.status ? 'line-through' : ''
						} bg-gray-600 text-white flex justify-between items-center rounded px-3 py-2 mb-1 cursor-pointer`}
					>
						{editingTodo.id === elem._id ? (
							<input
								className='rounded bg-gray-800 outline-none pl-1'
								type='text'
								value={editingTodo.todo}
								onChange={e =>
									setEditingTodo({
										...editingTodo,
										todo: e.target.value
									})
								}
							/>
						) : (
							<span>{elem.todo}</span>
						)}
						<div>
							<button
								onClick={() => {
									if (editingTodo.id === elem._id) {
										handleEditTodo(elem._id);
									} else {
										edit_todo(elem._id);
									}
								}}
							>
								{editingTodo.id === elem._id ? (
									<FaSave />
								) : (
									<CiEdit />
								)}
							</button>
							<button
								onClick={() => handleToggleStatus(elem._id)}
							>
								<MdDone />
							</button>
							<button onClick={() => handleDeleteTodo(elem._id)}>
								<MdDelete />
							</button>
						</div>
					</li>
				))}
			</ul>
		</main>
	);
};

export default Todolist;
