import * as React from 'react';
import './App.css';
import Header from './component/Header.tsx';
import DayPicker from './component/DayPicker.tsx';
import { useState } from 'react';

function App() {
	const [type, setType] = useState<Number>(20);

	return (
		<div className='divide-y'>
			<Header setType={setType} />
			<DayPicker classType={type} />
		</div>
	);
}

export default App;
