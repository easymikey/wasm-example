import {FC, Suspense, lazy, useEffect, useState} from 'react';
import styles from './App.module.css';

const ReactCounter = lazy(() => import('react_counter/ReactCounter'));

const YEW_COUNTER = 'yew-counter';

const App: FC = () => {
	const [counter, setCounter] = useState(0);

	const onIncrement = () => setCounter((c) => c + 1);

	const onDecrement = () => setCounter((c) => c - 1);

	useEffect(() => {
		import('yew_counter/yew')
			.then((module) => {
				module.run_app(YEW_COUNTER, onIncrement, onDecrement);
			})
			.catch((err) => console.error(`Module with error: ${err}`));
	}, []);

	return (
		<div className={styles.root}>
			<div className={styles.layout}>
				<Suspense fallback="Loading ReactCounter">
					<ReactCounter
						onIncrement={onIncrement}
						onDecrement={onDecrement}
					/>
				</Suspense>
				<div className={styles.counter}>{counter}</div>
				<div id={YEW_COUNTER} />
			</div>
		</div>
	);
};

export default App;
