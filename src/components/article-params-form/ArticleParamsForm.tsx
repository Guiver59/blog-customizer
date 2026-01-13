import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { useState, useRef, SyntheticEvent, useEffect } from 'react';

import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import { Separator } from 'src/ui/separator';
import { RadioGroup } from 'src/ui/radio-group';
import clsx from 'clsx';

import {
	ArticleStateType,
	defaultArticleState,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';

type ArticleParamsProps = {
	state: ArticleStateType;
	submit: (state: ArticleStateType) => void;
	update: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	state,
	submit,
	update,
}: ArticleParamsProps) => {
	const formRef = useRef<HTMLFormElement | null>(null);
	const [formIsOpen, setFormIsOpen] = useState(false);

	const handleOpen = () => {
		setFormIsOpen(!formIsOpen);
	};

	useEffect(() => {
		if (!formIsOpen) {
			return;
		}

		const handleEscape = (e: KeyboardEvent) => {
			e.key === 'Escape' && setFormIsOpen(false);
		};

		const handleClose = (e: MouseEvent) => {
			if (formRef.current && !formRef.current.contains(e.target as Node)) {
				setFormIsOpen(false);
			}
		};

		document.addEventListener('keydown', handleEscape);
		document.addEventListener('mousedown', handleClose);

		return () => {
			document.removeEventListener('keydown', handleEscape);
			document.removeEventListener('mousedown', handleClose);
		};
	}, [formIsOpen]);

	const handleReset = () => {
		submit(defaultArticleState);
		update(defaultArticleState);
	};

	const handleSubmit = (event: SyntheticEvent) => {
		event.preventDefault();
		update(state);
	};

	const updateFormField = (field: keyof ArticleStateType) => {
		return (value: OptionType) => {
			submit({ ...state, [field]: value });
		};
	};

	return (
		<>
			<ArrowButton isOpen={formIsOpen} onClick={handleOpen} />
			<aside
				className={clsx(styles.container, formIsOpen && styles.container_open)}>
				<form
					ref={formRef}
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text weight={800} uppercase={true} size={31} as={'h2'}>
						Задайте параметры
					</Text>
					<Select
						selected={state.fontFamilyOption}
						options={fontFamilyOptions}
						title={'шрифт'}
						onChange={updateFormField('fontFamilyOption')}
					/>
					<RadioGroup
						name={'fontSizeGroup'}
						options={fontSizeOptions}
						selected={state.fontSizeOption}
						title={'размер шрифта'}
						onChange={updateFormField('fontSizeOption')}
					/>
					<Select
						selected={state.fontColor}
						options={fontColors}
						title={'цвет шрифта'}
						onChange={updateFormField('fontColor')}
					/>
					<Separator key={'separator'} />
					<Select
						selected={state.backgroundColor}
						options={backgroundColors}
						title={'цвет фона'}
						onChange={updateFormField('backgroundColor')}
					/>
					<Select
						selected={state.contentWidth}
						options={contentWidthArr}
						title={'ширина контента'}
						onChange={updateFormField('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
