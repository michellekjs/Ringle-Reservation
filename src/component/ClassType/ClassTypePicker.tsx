import * as React from 'react';
import { useState } from 'react';
import ClassTypePopup from './ClassTypePopup';

type ButtonModalContentProps = {
	type: number;
};

type ClassTypePickerProps = {
	type: number;
	onChangeType: (type: number) => void;
};

function ClassTypePicker({ type, onChangeType }: ClassTypePickerProps) {
	const [modalOpen, setmodalOpen] = useState(false);

	const openModal = () => {
		setmodalOpen(!modalOpen);
	};

	const ButtonModalContent = ({ type }: ButtonModalContentProps) => {
		return (
			<div className='flex flex-row flex justify-start items-center gap-3'>
				{type === 20 ? (
					<div className='w-9 h-6 bg-blue-100 text-xs flex justify-center items-center'>
						<div className='text-blue-400 rounded-lg'> 20분 </div>
					</div>
				) : (
					<div className='w-9 h-6 bg-green-100 text-xs flex justify-center items-center'>
						<div className='text-green-400 rounded-lg'> 40분 </div>
					</div>
				)}
				<div> 1회 패키지 {type === 20 && '(20분)'} </div>
				<div>(1회 남음)</div>
			</div>
		);
	};

	return (
		<div>
			<button
				className=' bg-blue-500 bg-white font-medium text-sm py-2 px-4 w-[300px] rounded-lg border-2'
				onClick={openModal}
			>
				<ButtonModalContent type={type} />
			</button>
			<ClassTypePopup
				type={type}
				onChangeType={onChangeType}
				modalOpen={modalOpen}
				openModal={openModal}
			/>
		</div>
	);
}

export default ClassTypePicker;
