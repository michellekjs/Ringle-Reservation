import * as React from 'react';
import { useState } from 'react';
import ScheduleSelector from 'react-schedule-selector';
import dayjs from 'dayjs';

function CustomCalendar() {
	const [schedule, setSchedule] = useState();

	const handleChange = (newSchedule) => {
		setSchedule(newSchedule);
	};

	const renderCustomDateCell = (time, selected, innerRef) =>
		selected ? (
			<div className='border-2 border-violet-800 border-solid h-8 w-1/8 rounded-lg shadow-lg shadow-gray-600' />
		) : (
			<div className='border border-solid h-12 hover:bg-violet-50 hover:h-8 w-1/8 hover:shadow-lg hover:shadow-gray-600 hover:rounded-lg' />
		);

	const renderCustomTimeLabel = (time: Date) => {
		const ampm =
			time.getHours() >= 18 ? '저녁' : time.getHours() >= 12 ? '오후' : '오전';

		return (
			<>
				{time.getMinutes() == 30 ? (
					<div className='text-xs mr-4 text-zinc-400 '>
						{ampm} {time.getHours()}시
					</div>
				) : (
					<div />
				)}
			</>
		);
	};

	return (
		<div className='w-full p-16 h-screen overflow-scroll'>
			<ScheduleSelector
				selection={schedule}
				onChange={handleChange}
				hourlyChunks={2}
				rowGap={0}
				columnGap={0}
				renderDateCell={renderCustomDateCell}
				renderTimeLabel={renderCustomTimeLabel}
			/>
		</div>
	);
}

export default CustomCalendar;
