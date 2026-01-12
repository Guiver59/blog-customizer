import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';

import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [stateParamForm, setStateParamForm] =
		useState<ArticleStateType>(defaultArticleState);
	const [applyStateToPage, updateStateToPage] =
		useState<ArticleStateType>(stateParamForm);

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': applyStateToPage.fontFamilyOption.value,
					'--font-size': applyStateToPage.fontSizeOption.value,
					'--font-color': applyStateToPage.fontColor.value,
					'--container-width': applyStateToPage.contentWidth.value,
					'--bg-color': applyStateToPage.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				submit={setStateParamForm}
				state={stateParamForm}
				update={updateStateToPage}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
