import {
	Button,
	Dialog,
	DialogHeader,
	DialogBody,
	DialogFooter,
} from '@material-tailwind/react';
import { useState } from 'react';

const RadioCard = ({ time, title, description, selected, onChange }) => {
	return (
		<label className='bg-white p-4 shadow-lg rounded-lg m-2 flex flex-row place-items-center w-full justify-between'>
			<div className='flex flex-row place-items-center gap-4'>
				<div> {time} </div>
				<div>
					<div className='text-xl font-semibold'>{title}</div>
					<div className='text-gray-500'>{description}</div>
				</div>
			</div>
			<div className='flex flex-row '>
				<div className='flex flex-col justify-end place-items-end '>
					<div> 미사용 수업권</div>
					<div> 1</div>
				</div>
				<input
					type='radio'
					value={title}
					checked={selected === title}
					onChange={onChange}
				/>
			</div>
		</label>
	);
};

function ClassTypePopup(props) {
	console.log(props);
	const [selectedOption, setSelectedOption] = useState('');

	const handleRadioChange = (e) => {
		setSelectedOption(e.target.value);
	};
	return (
		// <div className='grid place-items-center '>
		<Dialog
			open={props.modalOpen}
			handler={props.openModal}
			className=' grid place-items-center bg-slate-100 h-1/4 w-1/3 border-solid'
		>
			<DialogHeader> 수업권 선택 </DialogHeader>
			<DialogBody className='w-full'>
				<div className='flex flex-col'>
					<RadioCard
						time='20분'
						title='1회 패키지(20분)'
						description='수강기간: 30일 남음.'
						selected={selectedOption}
						onChange={handleRadioChange}
					/>
					<RadioCard
						time='40분'
						title='1회 패키지'
						description='수강 기간: 365일 남음'
						selected={selectedOption}
						onChange={handleRadioChange}
					/>
				</div>
			</DialogBody>
		</Dialog>
		// </div>
	);
}

export default ClassTypePopup;
