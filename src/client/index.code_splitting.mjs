import React from 'react';
import ReactDOM from 'react-dom';

// import AboutMe from '../shared/aboutme.mjs';
// Will not work for ssr and also rollup do not have support for experimental code splitting in umd format.
// With SSR and code splitting all required chunks must come before calling hydrate. 
// Leads to unexpected behaviour where UI is rerendered post hydrate. Can use react-loadable or loadable-components.
const AboutMe = React.lazy(() => import('../shared/aboutme.mjs'));
 
ReactDOM.render(
	<React.Suspense fallback={<div>Loading...</div>}>
		<AboutMe />
	</React.Suspense>,
	document.querySelector('#root'));