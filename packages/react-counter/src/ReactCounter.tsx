import {FC} from 'react';
import styles from './ReactCounter.module.css';

const ReactCounter: FC<{
	onIncrement: () => void;
	onDecrement: () => void;
}> = ({onDecrement, onIncrement}) => {
	return (
		<div className={styles.layout}>
			<button className={styles.button} onClick={onIncrement}>
				+
			</button>
			<button className={styles.button} onClick={onDecrement}>
				-
			</button>
		</div>
	);
};

export default ReactCounter;
