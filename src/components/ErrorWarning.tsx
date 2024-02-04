import React from 'react';

const ErrorWarning = () => {
	const reloadPage = () => {
		location.reload();
	};

	return (
		<div className='w-screen h-screen flex justify-center items-center text-lg bg-slate-800 text-white'>
			<div>
				<p>Something wrong...</p>
				<button
					onClick={reloadPage}
					className='bg-indigo-400 px-1 rounded mt-1'
				>
					Reload page
				</button>
			</div>
		</div>
	);
};

export default ErrorWarning;
