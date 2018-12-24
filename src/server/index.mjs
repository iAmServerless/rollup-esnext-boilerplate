import express from 'express';
import fs from 'fs';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import expressStaticGzip from 'express-static-gzip';
import AboutMe from '../shared/aboutme.mjs';
import {codeSplitting} from './../../tasks/config.mjs';

//Currently not supported on server use loadable-component or react-loadable or write your own.
//const AboutMe = React.lazy(() => import('../shared/aboutme.mjs'));

const app = express();

// Reverse Proxy this server using nginx and serving brotli, gzip, setting cache headers, cors headers and 
// thousand other things should be done at nginx layer.
app.use('/esm', expressStaticGzip('clientBuild/esm', {
	enableBrotli: true,
	orderPreference: ['br', 'gz']
}));

// Reverse Proxy this server using nginx and serving brotli, gzip, setting cache headers, cors headers and 
// thousand other things should be done at nginx layer.
app.use('/umd', expressStaticGzip('clientBuild/umd', {
	enableBrotli: true,
	orderPreference: ['br', 'gz']
}));


//app.use(express.static('clientBuild'));
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || '0.0.0.0';
let bundles = [];
let closeDocumentHTML = '';

const openDocumentHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
</head>
<body>
	<div id="root">`;

fs.readFile('./serverBuild/manifest.json', 'utf8', function (err, data) {
	if (err) throw err;
	bundles = JSON.parse(data);
	closeDocumentHTML = `</div>
	${bundles.filter((bundle)=>{
		return !!(bundle.fileName.indexOf('index') !== -1);
	}).map(bundle => {
		return bundle.type == 'esm'? 
			`<script src="/${bundle.fileName}" type="module"></script>`:
			`<script src="/${bundle.fileName}" nomodule></script>`;
	}).join('\n')}
	</body>
	</html>
	`;
});

app.get('/', (req, res) => {
	if(codeSplitting) {
		res.send(openDocumentHTML + closeDocumentHTML);
		return;
	}
	res.write(openDocumentHTML);
	const stream = ReactDOMServer.renderToNodeStream(<AboutMe />);
	stream.pipe(res, {end: false});
	stream.on('end', () => {
		res.end(closeDocumentHTML);
	});
});

  
app.listen(PORT, HOST);
