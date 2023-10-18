import * as React from 'react';
import './App.css';
import Header from './component/Header.tsx';
import DayPicker from './component/DayPicker.tsx';
import { useState } from 'react';

function App() {
	return (
		<div className='divide-y'>
			<Header />
			<DayPicker />
		</div>
	);
}

export default App;
