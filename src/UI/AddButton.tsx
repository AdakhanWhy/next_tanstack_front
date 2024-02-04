import React from 'react';

const AddButton = ({ func }: { func: () => void }) => {
	return (
		<button
			className='bg-gray-500
                    border-none
                    rounded
                    text-white
                    cursor-pointer
                    ml-2 px-4 py-1'
			onClick={() => func()}
		>
			Add
		</button>
	);
};

export default AddButton;
