import * as React from 'react';
import tutorlist from '../tutors.ts';
import { useState } from 'react';
import { Tutor } from '../interfaces/Tutor.ts';

type RadioCardProps = {
	person: Tutor;
	selected: Tutor | undefined;
	onChange: React.FormEventHandler;
};

type TutorPickerProps = {
	picked: Date | undefined;
	setDT: Function;
};

const RadioCard = ({ person, selected, onChange }: RadioCardProps) => {
	return (
		<label className='bg-white p-4 flex flex-row  w-full h-40 justify-between'>
			<div className='text-xs flex flex-col place-items-center gap-2'>
				<img
					src={`/images/${person.profile}.jpeg`}
					alt='profile'
					className='w-20 h-20 rounded-full object-cover'
				/>
				<div>수락률 {person.acceptance} %</div>
				<div>
					{' '}
					{person.hashtag.map((h, index) => (
						<div className='px-4 py-0.5 bg-violet-100 rounded-xl'> #{h} </div>
					))}
				</div>
			</div>
			<div>
				<div className='text-lg font-semibold'> {person.name} </div>
				<div className='text-sm font-semibold'>{person.school}</div>
				<div className='text-sm text-gray-500'>{person.major}</div>
			</div>
			<input
				type='radio'
				value={JSON.stringify(person)}
				checked={selected ? selected.id === person.id : false}
				onChange={onChange}
				className='w-6 h-6 flex self-center'
			/>
		</label>
	);
};

function TutorPicker(props: TutorPickerProps) {
	const [selectedOption, setSelectedOption] = useState<Tutor>();
	const pickedDate = props.picked;

	const handleRadioChange = (e) => {
		setSelectedOption(JSON.parse(e.target.value));
		props.setDT([pickedDate, JSON.parse(e.target.value)]);
	};

	const days = ['일', '월', '화', '수', '목', '금', '토'];

	return pickedDate === undefined ? (
		<div className='flex h-screen items-center place-content-center'>
			{' '}
			<div className=' border border-solid w-2/3 text-center px-4 py-4 text-gray-400'>
				캘린더에서 원하시는 시간을 눌러 수업을 신청해 주세요{' '}
			</div>
		</div>
	) : (
		<div className='h-screen border-l-2 divide-y divide-solid '>
			<div className='flex h-12 items-center pl-4 '>
				{' '}
				{pickedDate.getMonth() + 1}월 {pickedDate.getDate()}일 (
				{days[pickedDate.getDay()]}) {pickedDate.getHours()}:
				{pickedDate.getMinutes() === 0 ? '00' : '30'}
			</div>
			<div>
				<div className='pl-4 pt-4'> 튜터 직접 선택 </div>
				<div className='divide-y divide-solid overflow-scroll'>
					{tutorlist.map((m, index) => (
						<>
							<RadioCard
								person={m}
								selected={selectedOption}
								onChange={handleRadioChange}
							/>
						</>
					))}
				</div>
			</div>
		</div>
	);
}

export default TutorPicker;
