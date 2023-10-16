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
				className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
				onClick={openModal}
			>
				1회 패키지(20분)
			</button>
			<ClassTypePopup
				modalOpen={modalOpen}
				openModal={openModal}
			/>
		</div>
	);
}

export default ClassTypePicker;
