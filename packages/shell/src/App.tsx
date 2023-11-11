import {FC, Suspense, lazy, useEffect, useState} from 'react';
import styles from './App.module.css';

const ReactCounter = lazy(() => import('react_counter/ReactCounter'));

const YEW_COUNTER = 'yew-counter';

const YewCounter: FC<{
	id: string;
	onIncrement: () => void;
	onDecrement: () => void;
}> = ({id, onIncrement, onDecrement}) => {
	useEffect(() => {
		import('yew_counter/yew')
			.then((module) => {
				module.run_app(id, onIncrement, onDecrement);
			})
			.catch((err) => console.error(`Module with error: ${err}`));
	}, []);

	return <div id={id} />;
};

const App: FC = () => {
	const [counter, setCounter] = useState(0);

	const onIncrement = () => setCounter((c) => c + 1);

	const onDecrement = () => setCounter((c) => c - 1);

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
				<Suspense fallback="Loading YewCounter">
					<YewCounter
						id={YEW_COUNTER}
						onIncrement={onIncrement}
						onDecrement={onDecrement}
					/>
				</Suspense>
			</div>
		</div>
	);
};

export default App;
