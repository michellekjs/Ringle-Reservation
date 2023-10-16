import * as React from 'react';
import './App.css';
import Header from './component/Header.tsx';
import CustomCalendar from './component/CustomCalendar.tsx';
import DayPicker from './component/DayPicker.tsx';
import TutorPicker from './component/TutorPicker.tsx';

function App() {
	return (
		<div>
			<Header />
			<div className='flex flex-row'>
				<DayPicker />
				<CustomCalendar />
				<TutorPicker />
			</div>
		</div>
	);
}

export default App;
