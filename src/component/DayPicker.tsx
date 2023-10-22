import * as React from 'react';
import { useState } from 'react';
import CustomCalendar from '../component/CustomCalendar.tsx';
import { addDays, format } from 'date-fns';
import { DateRange, DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import TutorPicker from './TutorPicker.tsx';
import dayjs from 'dayjs';
import { Tutor } from '../interfaces/Tutor.ts';

const today = dayjs();
const firstDayOfWeek = today.startOf('week');

const css = `
.my-selected:not([disabled]) { 
    font-weight: bold; 
    border-top: 2px solid purple;
    border-left: none;
    border-right:none;
    border-bottom: 2px solid purple;
  }
 `;

function DatePicker(props: any) {
	const defaultSelected: DateRange = {
		from: firstDayOfWeek.toDate(),
		to: addDays(firstDayOfWeek.toDate(), 6),
	};
	// functions related to datepicker
	const [range, setRange] = useState<DateRange | undefined>(defaultSelected);
	const [hover, setHover] = useState<DateRange | undefined>(defaultSelected);
	const [selectedSunday, setSelected] = useState<Date>(firstDayOfWeek.toDate());
	const [schedule, setSchedule] = useState<Date | undefined>(undefined);
	const [dateTutor, setDateTutor] = useState<Map<Date, Tutor>>(new Map());

	const hoverAction = (date: Date) => {
		const firstDayofHover = dayjs(date).startOf('week').toDate();
		const range: DateRange = {
			from: firstDayofHover,
			to: addDays(firstDayofHover, 6),
		};
		setHover(range);
	};

	const setSelectedTutor = (t: Tutor) => {
		if (schedule !== undefined) {
			const newMap = new Map(dateTutor);
			newMap.set(schedule, t);

			setDateTutor(newMap);
		}
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
	//function related to communication between customcalendar

	return (
		<div className='w-screen h-screen flex flex-row justify-between'>
			<style> {css} </style>
			<div className='w-[1/4 h-screen pt-20 text-xs'>
				<DayPicker
					showOutsideDays
					id='test'
					mode='range'
					defaultMonth={firstDayOfWeek.toDate()}
					selected={range}
					onDayClick={setWeekRange}
					onDayMouseEnter={hoverAction}
					modifiersClassNames={{
						selected: 'my-selected',
					}}
				/>
			</div>
			<div className='w-1/2'>
				<CustomCalendar
					sunday={selectedSunday}
					today={today}
					type={props.classType}
					schedule={schedule}
					setSchedule={setSchedule}
					dateTutor={dateTutor}
				/>
			</div>
			<div className='w-1/4'>
				<TutorPicker
					picked={schedule}
					pickTutor={setSelectedTutor}
				/>
			</div>
		</div>
	);
}

export default DatePicker;
