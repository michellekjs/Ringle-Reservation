import * as React from 'react';
import ClassTypePicker from './ClassType/ClassTypePicker.tsx';

function Header() {
	return (
		<div className='w-full h-16 bg-purple-50 flex flex-row justify-between items-center px-6 '>
			<div className='flex flex-row gap-x-7 h-full items-center'>
				<div> 나가기 </div>
				<div> 로고 </div>
				<div> 수업 예약</div>
				<div> STEP 1. 튜터 및 시간선택 </div>
				<ClassTypePicker />
			</div>
			<div className='flex flex-row gap-x-7'>
				<div> 예약 신청한 수업 0</div>
				<div> 다음</div>
			</div>
		</div>
	);
}

export default Header;
