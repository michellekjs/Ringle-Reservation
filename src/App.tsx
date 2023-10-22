import * as React from 'react';
import './App.css';
import Header from './component/Header.tsx';
import DayPicker from './component/DayPicker.tsx';
import { useState } from 'react';

function App() {
	const [type, setType] = useState<number>(20);

	const onChangeType = (type: number) => {
		setType(type);
	};

	return (
		<div className='divide-y'>
			<Header
				type={type}
				onChangeType={onChangeType}
			/>
			<DayPicker classType={type} />
		</div>
	);
}

export default App;
