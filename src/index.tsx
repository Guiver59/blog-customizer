import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState, SyntheticEvent } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';

import {
	defaultArticleState,
	ArticleStateType,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import { Separator } from 'src/ui/separator';
import { RadioGroup } from 'src/ui/radio-group';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [state, setState] = useState<ArticleStateType>(defaultArticleState);
	const [applyState, updateState] = useState<ArticleStateType>(state);

	const resetFormParam = () => {
		setState(defaultArticleState);
		updateState(defaultArticleState);
	};

	const submitFormParam = (event: SyntheticEvent) => {
		event.preventDefault();
		updateState(state);
	};
	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': applyState.fontFamilyOption.value,
					'--font-size': applyState.fontSizeOption.value,
					'--font-color': applyState.fontColor.value,
					'--container-width': applyState.contentWidth.value,
					'--bg-color': applyState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm resetValue={resetFormParam} submit={submitFormParam}>
				<Text weight={800} uppercase={true} size={31} as={'h2'}>
					Задайте параметры
				</Text>
				<Select
					selected={state.fontFamilyOption}
					options={fontFamilyOptions}
					title={'шрифт'}
					onChange={(new_selected) => {
						setState({ ...state, fontFamilyOption: new_selected });
					}}
				/>
				<RadioGroup
					name={'fontSizeGroup'}
					options={fontSizeOptions}
					selected={state.fontSizeOption}
					title={'размер шрифта'}
					onChange={(new_selected) => {
						setState({ ...state, fontSizeOption: new_selected });
					}}
				/>
				<Select
					selected={state.fontColor}
					options={fontColors}
					title={'цвет шрифта'}
					onChange={(new_selected) => {
						setState({ ...state, fontColor: new_selected });
					}}
				/>
				<Separator key={'separator'} />
				<Select
					selected={state.backgroundColor}
					options={backgroundColors}
					title={'цвет фона'}
					onChange={(new_selected) => {
						setState({ ...state, backgroundColor: new_selected });
					}}
				/>
				<Select
					selected={state.contentWidth}
					options={contentWidthArr}
					title={'ширина контента'}
					onChange={(new_selected) => {
						setState({ ...state, contentWidth: new_selected });
					}}
				/>
			</ArticleParamsForm>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
