import React from 'react';

const Loader = () => {
	return (
		<div
			className='
                w-screen 
                h-screen 
                bg-slate-800 
                flex 
                justify-center
                items-center'
		>
			<div
				className='
                border-x-8 
                border-indigo-400 
                w-40
                h-40
                rounded-full
                flex
                justify-center
                items-center
                animate-spin'
			>
				{/* <div>Loading...</div> */}
			</div>
		</div>
	);
};

export default Loader;
