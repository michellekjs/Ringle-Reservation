import * as React from 'react';
import { useState } from 'react';
import CustomCalendar from '../component/CustomCalendar.tsx';
import { addDays, format } from 'date-fns';
import { DateRange, DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import dayjs from 'dayjs';

const today = dayjs();
const firstDayOfWeek = today.startOf('week');

function DatePicker(props: any) {
	const defaultSelected: DateRange = {
		from: firstDayOfWeek.toDate(),
		to: addDays(firstDayOfWeek.toDate(), 6),
	};
	const [range, setRange] = useState<DateRange | undefined>(defaultSelected);
	const [hover, setHover] = useState<DateRange | undefined>(defaultSelected);
	const [selectedSunday, setSelected] = useState<Date>(firstDayOfWeek.toDate());

	const hoverAction = (date: Date) => {
		const firstDayofHover = dayjs(date).startOf('week').toDate();
		const range: DateRange = {
			from: firstDayofHover,
			to: addDays(firstDayofHover, 6),
		};
		setHover(range);
	};

	const setWeekRange = (date: Date) => {
		const selected = dayjs(date).startOf('week').toDate();
		const newRange: DateRange = {
			from: selected,
			to: addDays(selected, 6),
		};
		setRange(newRange);
		setSelected(selected);
	};

	return (
		<div className='w-full h-screen flex flex-row justify-between'>
			<div className='w-fit h-screen pt-20 text-xs'>
				<DayPicker
					showOutsideDays
					id='test'
					mode='range'
					defaultMonth={firstDayOfWeek.toDate()}
					selected={range}
					onDayClick={setWeekRange}
					onDayMouseEnter={hoverAction}
					style={{}}
				/>
			</div>
			<div className='w-full'>
				<CustomCalendar
					sunday={selectedSunday}
					today={today}
					type={props.classType}
				/>
			</div>
		</div>
	);
}

export default DatePicker;
