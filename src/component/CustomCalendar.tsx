import * as React from 'react';
import { useState } from 'react';
import ScheduleSelector from 'react-schedule-selector';
import dayjs from 'dayjs';
import profile from '../assets/profile.png';
import TutorPicker from './TutorPicker';

function CustomCalendar(props) {
	const [schedule, setSchedule] = useState([new Date()]);
	const [tippopup, settippopup] = useState(true);
	const [hover, setHover] = useState<boolean>(false);

	const handleChange = (newSchedule) => {
		setSchedule(newSchedule.slice(-1));
	};

	const closeButtonClick = () => {
		settippopup(false);
	};

	const today = new Date();

	const renderCustomDateCell = (time, selected, innerRef) => {
		const ampm =
			time.getHours() >= 18 ? '저녁' : time.getHours() >= 12 ? '오후' : '오전';
		return time < new Date() ? (
			<div className='border border-gray-100 h-8 w-1/8 bg-[#F6F4FA]' />
		) : selected ? (
			<div className='border-2 border-violet-400 border-solid h-6 w-1/8 rounded-lg text-xs text-gray-400 shadow-lg shadow-gray-400 flex justify-center place-items-center'>
				<img
					src={profile}
					width={15}
					height={15}
				/>{' '}
				튜터 선택
			</div>
		) : (
			<div className='flex place-items-center border border-gray-100 border-solid h-8 hover:h-6 text-transparent text-xs hover:text-gray-800  hover:bg-violet-50 hover:h-8 w-1/8 hover:shadow-lg hover:shadow-gray-400 hover:rounded-lg'>
				{ampm}
				{time.getHours()}시 {time.getMinutes() == 0 ? '' : '30분'}
			</div>
		);
	};

	const renderCustomTimeLabel = (time: Date) => {
		const ampm =
			time.getHours() >= 18 ? '저녁' : time.getHours() >= 12 ? '오후' : '오전';

		return (
			<>
				{time.getMinutes() == 0 ? (
					<div className='text-xs mr-4 text-zinc-400 '>
						{ampm} {time.getHours()}시
					</div>
				) : (
					<div />
				)}
			</>
		);
	};

	const renderCustomDateLabel = (date: Date) => {
		const days = ['일', '월', '화', '수', '목', '금', '토'];
		return (
			<div className='flex flex-col justify-center text-center mb-4'>
				<div className='text-sm'> {days[date.getDay()]} </div>
				<div className='text-2xl'> {date.getDate().toString()} </div>
			</div>
		);
	};

	return (
		<div className='flex flex-row'>
			<div className=' flex flex-col w-full overflow-scroll h-screen gap-8 pr-4 pt-4'>
				{tippopup && (
					<div className='flex w-full py-2 rounded-l place-content-center bg-violet-100 text-sm '>
						{' '}
						<div className='text-violet-500 mr-4 font-bold'> Ringle's Tip </div>
						<div> 지금 한 달 수업을 미리 예약해보세요! </div>
						<button
							className='self-end'
							onClick={closeButtonClick}
						>
							{' '}
							x{' '}
						</button>
					</div>
				)}
				<div className='flex flex-row gap-1'>
					<button className='text-sm w-16 h-8 rounded-2xl border-2 border-violet-400'>
						{' '}
						오늘{' '}
					</button>
					<button className='text-sm w-8 h-8 rounded-2xl border-2 border-violet-400'>
						{' '}
						{'<'}{' '}
					</button>
					<button className='text-sm w-8 h-8 rounded-2xl border-2 border-violet-400'>
						{' '}
						{'>'}{' '}
					</button>
				</div>
				<ScheduleSelector
					numDays={7}
					selection={schedule}
					onChange={handleChange}
					hourlyChunks={2}
					rowGap={0}
					columnGap={0}
					minTime={0}
					maxTime={24}
					startDate={props.sunday}
					renderDateCell={renderCustomDateCell}
					renderTimeLabel={renderCustomTimeLabel}
					renderDateLabel={renderCustomDateLabel}
				/>
			</div>
			<div className='w-[500px]'>
				<TutorPicker picked={schedule[0]} />
			</div>
		</div>
	);
}

export default CustomCalendar;
