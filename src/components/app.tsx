import clsx from 'clsx';

import { Article } from './article/Article';
import { ArticleParamsForm } from './article-params-form/ArticleParamsForm';

import {
	defaultArticleState,
	ArticleStateType,
} from './../constants/articleProps';

import styles from './../styles/index.module.scss';

import { CSSProperties, useState } from 'react';

export const App = () => {
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
