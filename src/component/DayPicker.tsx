import * as React from 'react';
import { useState } from 'react';

import { addDays, format } from 'date-fns';
import { DateRange, DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import dayjs from 'dayjs';

const today = dayjs();
const firstDayOfWeek = today.startOf('week').toDate();

function DatePicker(props: any) {
	const defaultSelected: DateRange = {
		from: firstDayOfWeek,
		to: addDays(firstDayOfWeek, 6),
	};
	const [range, setRange] = useState<DateRange | undefined>(defaultSelected);
	const [hover, setHover] = useState<DateRange | undefined>(defaultSelected);

	const hoverAction = (date: Date) => {
		const firstDayofHover = dayjs(date).startOf('week').toDate();
		const range: DateRange = {
			from: firstDayofHover,
			to: addDays(firstDayofHover, 6),
		};
		console.log(range);
		setHover(range);
	};

	const setWeekRange = (date: Date) => {
		const selectedWeek = dayjs(date).startOf('week').toDate();
		const newRange: DateRange = {
			from: selectedWeek,
			to: addDays(selectedWeek, 6),
		};
		setRange(newRange);
	};

	return (
		<div className='w-1/4 pt-20  '>
			<DayPicker
				id='test'
				mode='range'
				defaultMonth={firstDayOfWeek}
				selected={range}
				onDayClick={setWeekRange}
				onDayMouseEnter={hoverAction}
			/>
		</div>
	);
}

export default DatePicker;
