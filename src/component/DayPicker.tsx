import * as React from 'react';
import { useState } from 'react';
import CustomCalendar from '../component/CustomCalendar.tsx';
import { addDays, format } from 'date-fns';
import { DateRange, DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import TutorPicker from './TutorPicker.tsx';
import dayjs from 'dayjs';

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
	const [schedule, setSchedule] = useState<Date[]>([]);
	const [dateTutor, setDateTutor] = useState({});
	const [tutor, setTutor] = useState('');

	const hoverAction = (date: Date) => {
		const firstDayofHover = dayjs(date).startOf('week').toDate();
		const range: DateRange = {
			from: firstDayofHover,
			to: addDays(firstDayofHover, 6),
		};
		setHover(range);
	};

	const setDT = (a) => {
		const pickedDate: string = a[0];
		const selectedOption = a[1];
		dateTutor[pickedDate] = selectedOption;
		setTutor(selectedOption);
		setDateTutor(dateTutor);
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
		<div className='w-full h-screen flex flex-row justify-between'>
			<style> {css} </style>
			<div className='w-1/4 h-screen pt-20 text-xs'>
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
			<div className='w-3/4 flex flex-row'>
				<CustomCalendar
					sunday={selectedSunday}
					today={today}
					type={props.classType}
					setSchedule={setSchedule}
					dateTutor={setDateTutor}
					tutor={setTutor}
				/>

				<div className='w-[500px]'>
					<TutorPicker
						picked={schedule.length === 0 ? undefined : schedule[0]}
						setDT={setDT}
					/>
				</div>
			</div>
		</div>
	);
}

export default DatePicker;
