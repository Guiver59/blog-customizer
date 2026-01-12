import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { useState, ReactNode, SyntheticEvent, useEffect } from 'react';

type ArticleParamsProps = {
	children?: ReactNode[];
	resetValue?: () => void;
	submit?: (e: SyntheticEvent) => void;
};

export const ArticleParamsForm = ({
	children,
	resetValue,
	submit,
}: ArticleParamsProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleOpen = () => {
		setIsOpen(!isOpen);
	};

	const styleIsOpen = isOpen ? ' ' + styles.container_open : '';
	const asideStyle = styles.container + styleIsOpen;

	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			e.key === 'Escape' && setIsOpen(false);
		};
		document.addEventListener('keydown', handleEscape);
		return () => {
			document.removeEventListener('keydown', handleEscape);
		};
	}, []);

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleOpen} />
			<aside className={asideStyle}>
				<form className={styles.form} onSubmit={submit}>
					{children}
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={resetValue}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
