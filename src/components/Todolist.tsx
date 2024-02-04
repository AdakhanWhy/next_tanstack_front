'use client';
import { useState } from 'react';
import { MdDone } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';
import { FaSave } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { TData } from '@/types/TodoType';
import {
	useFetchData,
	usePostTodo,
	useDeleteTodo,
	useToggleTodo,
	useEditTodo
} from '@/hooks/queryHooks';
import AddButton from '@/UI/AddButton';
import OptionButton from '@/UI/OptionButton';
import Loader from './Loader';
import ErrorWarning from './ErrorWarning';
import AddInput from '@/UI/AddInput';

const Todolist = () => {
	const [inp, setInp] = useState('');
	const [editingTodo, setEditingTodo] = useState<TData>({
		_id: 0,
		todo: '',
		status: false
	});

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
		const todoToUpdate = data.find((todo: TData) => todo._id === id);
		if (todoToUpdate) {
			switchTodo({ id, todoToUpdate });
		}
	};

	const handleEditTodo = (id: number) => {
		updateTodo({ id, editingTodo });
		setEditingTodo({ _id: 0, todo: '', status: false });
	};

	const edit_todo = (id: number) => {
		const todoToEdit = data.find((elem: TData) => elem._id === id);
		setEditingTodo({
			_id: id,
			todo: todoToEdit ? todoToEdit.todo : '',
			status: false
		});
	};

	const { data, isLoading, error, refetch } = useFetchData();
	const { mutate: createTodo } = usePostTodo(refetch);
	const { mutate: removeTodo } = useDeleteTodo(refetch);
	const { mutate: switchTodo } = useToggleTodo(refetch);
	const { mutate: updateTodo } = useEditTodo(refetch);

	if (isLoading) return <Loader />;

	if (error) return <ErrorWarning />;

	return (
		<main className='w-screen h-screen bg-black p-2'>
			<div className='bg-gray-700 w-3/5 px-6 py-7 mt-3 mx-auto'>
				<div className='mb-2 flex justify-around'>
					<AddInput value={inp} setValue={setInp} />
					<AddButton func={handlePostTodo} />
				</div>
				<ul className='flex items-center justify-center flex-col'>
					{data.length !== 0 ? (
						data.map((elem: TData) => (
							<li
								key={elem._id}
								className={`${
									elem.status ? 'line-through' : ''
								} bg-gray-600 text-white flex justify-between items-center rounded px-3 py-2 mb-1 cursor-pointer w-1/2`}
							>
								{editingTodo._id === elem._id ? (
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
									<OptionButton
										id={elem._id}
										icon={
											editingTodo._id === elem._id ? (
												<FaSave />
											) : (
												<CiEdit />
											)
										}
										func={
											editingTodo._id === elem._id
												? handleEditTodo
												: edit_todo
										}
									/>
									<OptionButton
										id={elem._id}
										icon={<MdDone />}
										func={handleToggleStatus}
									/>
									<OptionButton
										id={elem._id}
										icon={<MdDelete />}
										func={handleDeleteTodo}
									/>
								</div>
							</li>
						))
					) : (
						<li className='text-white text-lg mt-6'>
							<p>No todos!!</p>
						</li>
					)}
				</ul>
			</div>
		</main>
	);
};

export default Todolist;
