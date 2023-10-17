import * as React from 'react';
import './App.css';
import Header from './component/Header.tsx';
import CustomCalendar from './component/CustomCalendar.tsx';
import DayPicker from './component/DayPicker.tsx';
import TutorPicker from './component/TutorPicker.tsx';
import ClassTypePopup from './component/ClassType/ClassTypePopup.tsx';

function App() {
	return (
		<div>
			<Header />
			<div className='flex flex-row justify-between'>
				<DayPicker />
				<CustomCalendar />
				<TutorPicker />
			</div>
		</div>
	);
}

export default App;
