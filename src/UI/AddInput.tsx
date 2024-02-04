import { FC } from 'react';
import { AddInputProps } from '@/types/IAddBlock';

const AddInput: FC<AddInputProps> = ({ value, setValue }) => {
	return (
		<input
			className='
                        outline-none
                        bg-transparent
                        border
                        border-gray-500
                        p-2 mb-8
                        rounded
                        text-black
                        placeholder:text-gray-300'
			type='text'
			placeholder='New todo'
			value={value}
			onChange={e => setValue(e.target.value)}
		/>
	);
};

export default AddInput;
