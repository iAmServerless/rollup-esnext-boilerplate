# Rollup ESM Build Boilerplate

This is experimantal project to serve ES modules to supported browsers.

ES modules are supported in almost all major browsers now, which gives website developers a chance to serve better and performant js bundle to client. All browsers which support ES modules will get ES build while browsers which do not support ES modules will get UMD build.

## Why Rollup not webpack

Webpack and Rollup try to achieve same goal to provide smaller and faster javascript bundles, but both try to achieve the goal differently. Rollup works directly on ES modules and convert non ES module dependencies to ES modules before bundling, webpack just does the opposite.

Due to Static module structure of ES modules, It is very easy to optimize code at compile time, this feature of ES module gives edge to rollup in optimizing javascript code.

Rollup has always dominated as a bundler for libraries but, It is very difficult to build applications using rollup as most of the helping plugins do not work out of the box. A simple search for replacement of html-webpack-plugin in rollup gives you multiple results and non of them works with the latest version of Rollup (onwrite gets Deprecated) as those plugins are not actively maintained.

As of Christmas 2018, Webpack has a PR to generate ES modules but has no plan to release in webpack version 5.
Webpack has very rich set of plugins which are actively maintained. Once webpack will release support for ESM modules will love to rewite bundling of this repo to support webpack.

## About Project

This project has its own limitation, It cannot support code splitting for umd build(rollup do not have support for it at present).

Code splitting works only with esm bundle.

You can configure codesplitting bundle using
```
codeSplitting = true or false in tasks/config.mjs
```

1. React with dynamic code splitting (Using React.Lazy) and no server side rendering. SSR with code splitting has some challenges(like loading all splitted js before calling hydrate) which are solved by react-loadable or loadable-components. You can also wait for React Team to support SSR for suspense by end of 2019. Also Rollup do not support experimental code splitting in UMD and iife builds so will not work in ESM unsupported browsers.
2. React with SSR.

## Commands

First set type of build you want to generate by setting codeSplitting in tasks/config.mjs

1. yarn install
2. yarn run build
3. yarn run start

Open - http://localhost:8080.

## ToDo

1. Support livereload for HMR
2. Adding react-router-dom
3. generate performace focused bundles mostly using benifits of http2. http2 makes generating vendor bundle an anti pattern as sending more bundles can help you get better caching in the browser, but chrome do not do multiplexing of javascript and stick to its older "max 8 requests concurrently" rule. 
follow discussion on the same https://bugs.chromium.org/p/chromium/issues/detail?id=655585
4. Support for Apollo Server
5. waiting for release of react-cache to write library to supoort graphQL on client (Apollo Client is 30KB (including other dependencies can't afford that)).
6. Adding SSR with codesplitting (Not sure about it, have to avoid suspense completely which I don't want).


# License

MIT Licensed





