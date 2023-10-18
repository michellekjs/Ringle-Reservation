import * as React from 'react';
import { useState } from 'react';
import ClassTypePopup from './ClassTypePopup';

function ClassTypePicker(props: any) {
	const [modalOpen, setmodalOpen] = useState(false);

	const openModal = () => {
		setmodalOpen(!modalOpen);
	};

	return (
		<div>
			<button
				className=' bg-blue-500 bg-white font-medium text-sm py-2 px-4 w-[300px] rounded-lg border-2'
				onClick={openModal}
			>
				<div className='flex flex-row flex justify-start items-center gap-4'>
					<div className='w-9 h-6 bg-blue-100 text-xs flex justify-center items-center'>
						<div className='text-blue-400 rounded-lg'>20분 </div>
					</div>
					<div>1회 패키지(20분) </div>
					<div>(1회 남음)</div>
				</div>
			</button>
			<ClassTypePopup
				modalOpen={modalOpen}
				openModal={openModal}
			/>
		</div>
	);
}

export default ClassTypePicker;
