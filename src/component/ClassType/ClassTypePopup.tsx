import {
	Button,
	Dialog,
	DialogHeader,
	DialogBody,
	DialogFooter,
} from '@material-tailwind/react';
import { useState } from 'react';

const RadioCard = ({ val, time, title, description, selected, onChange }) => {
	return (
		<label className='bg-white p-4 rounded-md border border-solid mb-2 flex flex-row place-items-center w-full h-[80px] justify-between'>
			<div className='flex flex-row place-items-center gap-4'>
				<div
					className={
						val == 20
							? 'w-12 h-12 text-sm rounded-full bg-sky-100 flex place-items-center justify-center'
							: 'w-12 h-12 text-sm rounded-full bg-green-100 flex place-items-center justify-center'
					}
				>
					{' '}
					{time}{' '}
				</div>
				<div>
					<div className='text-md font-medium'>{title}</div>
					<div className='text-gray-500 text-sm'>{description}</div>
				</div>
			</div>
			<div className='flex flex-row gap-4 '>
				<div className='flex flex-col text-sm justify-end place-items-end '>
					<div> 미사용 수업권</div>
					<div> 1</div>
				</div>
				<input
					type='radio'
					value={val}
					checked={selected == val}
					onChange={onChange}
				/>
			</div>
		</label>
	);
};

function ClassTypePopup(props) {
	const [selectedOption, setSelectedOption] = useState('');

	props.change(selectedOption);

	const handleRadioChange = (e) => {
		setSelectedOption(e.target.value);
		props.openModal();
	};

	return (
		<div className='grid place-items-center'>
			<Dialog
				open={props.modalOpen}
				handler={props.openModal}
				className=' flex flex-col bg-white h-[260px] w-fit border-solid'
			>
				<DialogHeader className='flex text-md justify-self-start w-[650px]'>
					{' '}
					수업권 선택{' '}
				</DialogHeader>
				<DialogBody className='flex flex-col w-[650px] '>
					<div>
						<RadioCard
							val={20}
							time='20분'
							title='1회 패키지(20분)'
							description='수강기간: 30일 남음.'
							selected={selectedOption}
							onChange={handleRadioChange}
						/>
						<RadioCard
							val={40}
							time='40분'
							title='1회 패키지'
							description='수강 기간: 365일 남음'
							selected={selectedOption}
							onChange={handleRadioChange}
						/>
					</div>
				</DialogBody>
			</Dialog>
		</div>
	);
}

export default ClassTypePopup;
