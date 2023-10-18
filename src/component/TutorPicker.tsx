import * as React from 'react';
import mentor from '../assets/tutors.json';
import { useState } from 'react';
import { select } from '@material-tailwind/react';

const RadioCard = ({
	name,
	school,
	major,
	acceptance,
	hashtag,
	selected,
	onChange,
	profile,
}) => {
	return (
		<label className='bg-white p-4 flex flex-row  w-full h-40 justify-between'>
			<div className='text-xs flex flex-col place-items-center gap-2'>
				<img
					src={`/images/${profile}.jpeg`}
					alt='profile'
					className='w-20 h-20 rounded-full object-cover'
				/>
				<div>수락률 {acceptance} %</div>
				<div>
					{' '}
					{hashtag.map((h, index) => (
						<div className='px-4 py-0.5 bg-violet-100 rounded-xl'> #{h} </div>
					))}
				</div>
			</div>
			<div>
				<div className='text-lg font-semibold'> {name} </div>
				<div className='text-sm font-semibold'>{school}</div>
				<div className='text-sm text-gray-500'>{major}</div>
			</div>
			<input
				type='radio'
				value={name}
				checked={selected === name}
				onChange={onChange}
				className='w-4 h-4 flex align-center'
			/>
		</label>
	);
};

function TutorPicker(props) {
	const [selectedOption, setSelectedOption] = useState('');
	const pickedDate: Date = props.picked;

	const handleRadioChange = (e) => {
		setSelectedOption(e.target.value);
	};

	const days = ['일', '월', '화', '수', '목', '금', '토'];

	return (
		<div className='h-screen border-l-2 divide-y divide-solid '>
			<div className='flex h-12 items-center pl-4 '>
				{' '}
				{pickedDate.getMonth() + 1}월 {pickedDate.getDate()}일 (
				{days[pickedDate.getDay()]}) {pickedDate.getHours()}:
				{pickedDate.getMinutes() == 0 ? '00' : '30'}
			</div>
			<div>
				<div className='pl-4 pt-4'> 튜터 직접 선택 </div>
				<div className='divide-y divide-solid overflow-scroll'>
					{mentor.map((m, index) => (
						<RadioCard
							name={m.name}
							school={m.school}
							major={m.major}
							acceptance={m.acceptance}
							hashtag={m.hastag}
							profile={m.profile}
							selected={selectedOption}
							onChange={handleRadioChange}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export default TutorPicker;
