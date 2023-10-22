import * as React from 'react';
import { useState, useEffect } from 'react';
import ScheduleSelector from 'react-schedule-selector';
import profile from '../assets/profile.png';
import close from '../assets/close.png';
import { Dialog, DialogBody } from '@material-tailwind/react';
import dayjs from 'dayjs';
import { Tutor } from '../interfaces/Tutor';

type CustomCalendarProps = {
	sunday: Date;
	today: dayjs.Dayjs;
	type: number;
	schedule: Date | undefined;
	setSchedule: React.Dispatch<React.SetStateAction<Date | undefined>>;
	dateTutor: Map<Date, Tutor>;
};

function CustomCalendar(props: CustomCalendarProps) {
	const [prevSchedule, setPrevSchedule] = useState<Date | undefined>(undefined);
	const [tippopup, settippopup] = useState<boolean>(true);
	const [cancel, setcancelOpen] = useState<boolean>(false);
	const [cancelTargetDate, setCancelTargetDate] = useState<Date | undefined>(
		undefined
	);

	const handleChange = (newSchedule: Date[]) => {
		if (newSchedule.slice(-1)[0] === prevSchedule) return;

		const clickedSchedule =
			newSchedule.length === 0 ? prevSchedule : newSchedule.slice(-1)[0];

		const key = Array.from(props.dateTutor.keys()).find(
			(key) => key.getTime() === clickedSchedule!.getTime()
		);

		// 취소 팝업 여는 액션
		if (key !== undefined && cancel === false) {
			setCancelTargetDate(key);
			setcancelOpen(true);
		} else {
			props.setSchedule(clickedSchedule);
		}

		setPrevSchedule(clickedSchedule);
	};

	const closeButtonClick = () => {
		settippopup(false);
	};
	const handleDialog = () => {
		setcancelOpen(!cancel);
	};

	const renderCustomDateCell = (
		time: Date,
		selected: boolean,
		_: (dateCellElement: HTMLElement) => void
	) => {
		const ampm =
			time.getHours() >= 18 ? '저녁' : time.getHours() >= 12 ? '오후' : '오전';

		const key = Array.from(props.dateTutor.keys()).find(
			(key) => key.getTime() === time.getTime()
		);
		const selectedTutor = key ? props.dateTutor.get(key) : undefined;

		return time < new Date() ? (
			<div className='border border-gray-100 z-10 h-8 bg-[#F6F4FA]' />
		) : selectedTutor !== undefined ? (
			<div
				className={
					props.type == 20
						? 'bg-gradient-to-r from-violet-200 to-violet-600 border border-violet-800 border-solid h-6 w-1/8 rounded-lg text-xs text-white shadow-lg shadow-gray-400 flex justify-center place-items-center z-20'
						: 'bg-gradient-to-r from-violet-200 to-violet-600 border border-violet-800 border-solid h-14 w-1/8 rounded-lg text-xs text-white shadow-lg shadow-gray-400 flex justify-center place-items-center z-40'
				}
			>
				<img
					src={`/images/${selectedTutor.profile}.jpeg`}
					alt='profile'
					className='w-5 h-5 rounded-full object-cover'
				/>
				선택완료
			</div>
		) : selected ? (
			<div className='h-8'>
				<div
					className={
						props.type == 20
							? 'bg-white border-2 border-violet-400 border-solid h-6 w-1/8 rounded-lg text-xs text-gray-400 shadow-lg shadow-gray-400 flex justify-center place-items-center z-20'
							: 'bg-white border-2 border-violet-400 border-solid h-14 w-1/8 rounded-lg text-xs text-gray-400 shadow-lg shadow-gray-400 flex justify-center place-items-center z-20 '
					}
				>
					<img
						src={profile}
						width={15}
						height={15}
						alt='profile'
					/>{' '}
					튜터 선택
				</div>
			</div>
		) : (
			<div className='h-8'>
				<div
					className={
						props.type == 20
							? 'flex place-items-center border border-gray-100 border-solid h-8 hover:h-6 text-transparent text-xs hover:text-gray-800  hover:bg-violet-50 w-1/8 hover:shadow-lg hover:shadow-gray-400 hover:rounded-lg z-40'
							: 'flex place-items-center border border-gray-100 border-solid h-8 hover:h-14 text-transparent text-xs hover:text-gray-800  hover:bg-violet-50 w-1/8 hover:shadow-lg hover:shadow-gray-400 hover:rounded-lg z-40'
					}
				>
					{ampm}
					{time.getHours()}시 {time.getMinutes() === 0 ? '' : '30분'}
				</div>
			</div>
		);
	};

	const renderCustomTimeLabel = (time: Date) => {
		const ampm =
			time.getHours() >= 18 ? '저녁' : time.getHours() >= 12 ? '오후' : '오전';

		return (
			<>
				{time.getMinutes() === 0 ? (
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
				{cancel && (
					<Dialog
						open={cancel}
						handler={handleDialog}
						className='w-[450px] h-[200px] flex justify-center p-2'
					>
						<DialogBody className='flex flex-col text-sm gap-4'>
							<div> {cancelTargetDate!.toString()} </div>
							<div className='flex flex-row items-center gap-2'>
								<img
									src={`/images/${
										props.dateTutor.get(cancelTargetDate!)?.profile
									}.jpeg`}
									alt='profile'
									className='w-8 h-8 rounded-full object-cover'
								/>
								<div> {props.dateTutor.get(cancelTargetDate!)?.name}</div>
							</div>
							<div> 이 수업을 삭제하시겠습니까?</div>
							<div className='flex justify-end gap-3'>
								<button
									className='w-fit h-fit px-8 py-2 border border-solid border-violet-300 rounded-xl'
									onClick={() => handleDialog()}
								>
									{' '}
									취소{' '}
								</button>
								<button
									className='w-fit h-fit px-8 py-2 bg-violet-800 text-white rounded-xl'
									onClick={() => {
										props.dateTutor.delete(cancelTargetDate!);
										handleDialog();
									}}
								>
									{' '}
									확인{' '}
								</button>
							</div>
						</DialogBody>
					</Dialog>
				)}
				{tippopup && (
					<div className='flex  align-middle w-full py-2 rounded-l bg-violet-100 text-sm p-4 '>
						{' '}
						<div className='flex flex-row m-auto'>
							<div className='text-violet-500 mr-4 font-bold'>
								{' '}
								Ringle's Tip{' '}
							</div>
							<div> 지금 한 달 수업을 미리 예약해보세요! </div>
						</div>
						<img
							alt='profile'
							src={close}
							width='15'
							height='15'
							onClick={closeButtonClick}
						/>
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
					selection={props.schedule === undefined ? [] : [props.schedule]}
					onChange={handleChange}
					hourlyChunks={2}
					rowGap='0'
					columnGap='0'
					minTime={0}
					maxTime={24}
					startDate={props.sunday}
					renderDateCell={renderCustomDateCell}
					renderTimeLabel={renderCustomTimeLabel}
					renderDateLabel={renderCustomDateLabel}
				/>
			</div>
		</div>
	);
}

export default CustomCalendar;
