import {FC, Suspense, lazy, useEffect, useState} from 'react';
import styles from './App.module.css';

type CounterProps = {
	onIncrement: () => void;
	onDecrement: () => void;
};
const onRejectedComponentHandler = (
	error: unknown,
): {
	default: FC<CounterProps>;
} => {
	console.error('Component Failed Loading:', error);

	return {
		default: () => <div>Failed to Load</div>,
	};
};

const ReactCounter = lazy(() =>
	import('react_counter/ReactCounter').catch(onRejectedComponentHandler),
);

const YEW_COUNTER = 'yew-counter';

const YewCounter = lazy(() =>
	import('yew_counter/yew')
		.then((module) => {
			const YewCounter: FC<CounterProps> = ({
				onDecrement,
				onIncrement,
			}) => {
				useEffect(() => {
					module.run_app(YEW_COUNTER, onIncrement, onDecrement);
				}, []);

				return <div id={YEW_COUNTER} />;
			};
			return {default: YewCounter};
		})
		.catch(onRejectedComponentHandler),
);

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
						onIncrement={onIncrement}
						onDecrement={onDecrement}
					/>
				</Suspense>
			</div>
		</div>
	);
};

export default App;
