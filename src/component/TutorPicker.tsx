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
}) => {
	return (
		<label className='bg-white p-4 shadow-lg rounded-lg flex flex-row place-items-center w-full h-32 justify-between'>
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
			/>
		</label>
	);
};

function TutorPicker() {
	const [selectedOption, setSelectedOption] = useState('');

	const handleRadioChange = (e) => {
		setSelectedOption(e.target.value);
	};

	return (
		<div className='w-96 h-screen border-l-2 divide-y divide-solid'>
			<div> Picked Date </div>
			<div> Tutor List</div>
			{mentor.map((m, index) => (
				<RadioCard
					name={m.name}
					school={m.school}
					major={m.major}
					acceptance={m.acceptance}
					hashtag={m.hastag}
					selected={selectedOption}
					onChange={handleRadioChange}
				/>
			))}
		</div>
	);
}

export default TutorPicker;
