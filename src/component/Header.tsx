import * as React from 'react';
import ClassTypePicker from './ClassType/ClassTypePicker.tsx';
import logo from '../assets/ringle_logo.png';
import { useState } from 'react';

function Header(props) {
	const [type, setType] = useState<Number>(20);
	props.setType(type);

	return (
		<div className='w-full h-16 bg-[#FAF8FF] flex flex-row justify-between items-center px-6 '>
			<div className='flex flex-row gap-x-5 h-full items-center'>
				<div className='font-normal text-xs'> 나가기 </div>
				<img
					src={logo}
					width={30}
					height={30}
				/>
				<div className='font-semibold'> 수업 예약</div>
				<div className='font-normal text-sm'> STEP 1. 튜터 및 시간선택 </div>
				<ClassTypePicker setType={setType} />
			</div>
			<div className='flex flex-row gap-x-7 items-center'>
				<div className='font-normal text-sm'> 예약 신청한 수업 0</div>
				<button className='w-32 h-10 text-sm bg-slate-300 rounded-lg'>
					{' '}
					다음
				</button>
			</div>
		</div>
	);
}

export default Header;
