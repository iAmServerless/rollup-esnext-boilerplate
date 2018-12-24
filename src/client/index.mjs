import React from 'react';
import ReactDOM from 'react-dom';
import AboutMe from '../shared/aboutme.mjs';
 
ReactDOM.hydrate(
	<AboutMe />,
	document.querySelector('#root'));