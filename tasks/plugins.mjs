import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import builtins from 'rollup-plugin-node-builtins';
import compress from 'brotli';
import commonJS from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import clear from 'rollup-plugin-clear';
import terser from 'rollup-plugin-terser';
import json from 'rollup-plugin-json';
import eslint from 'rollup-plugin-eslint';
import gzipPlugin from 'rollup-plugin-gzip';
import globals from 'rollup-plugin-node-globals';
import { clientBuildPath, serverBuildPath } from './config.mjs';


function listOfPlugins(serverBuild, isProduction) {
    return {
        eslint: eslint.eslint(),
        replace: replace({
                'process.env.NODE_ENV': isProduction? JSON.stringify('production'): JSON.stringify('development')
            }),
        json: json(),
        babel: babel(),
        builtIns: builtins(),
        resolve: nodeResolve({
                extensions: [ '.mjs', '.js', '.jsx', '.json' ],
            }),
        commonJS: commonJS({
            include: [
                    'node_modules/react/**',
                    'node_modules/react-dom/**',
                    'node_modules/express/**',
                    'node_modules/object-assign/**',
                    'node_modules/scheduler/**',
                    'node_modules/prop-types/**',
                ]
            }),
        global: globals(),
        clear: clear({
                targets: serverBuild? [serverBuildPath]: [clientBuildPath]
            }),
        tarser: terser.terser(),
        brotli: gzipPlugin.default({
                customCompression: content => compress.compress(Buffer.from(content)),
                fileName: '.br',
            }),
        gzip: gzipPlugin.default()
    }
}

// Plugin Array order is very important, more than taking your girlfriend out for icecream.
// Server and client may have different plugins. (like livereload)
// Development and Production may have different plugins. (like brotli, minification)
export default (serverBuild, isProduction) => {
    let allPlugins = listOfPlugins(serverBuild, isProduction);
    if(serverBuild) {
        let {tarser, brotli, gzip, resolve, ...serverProductionPlugins} = allPlugins;
        //console.log(serverProductionPlugins);
        return Object.values(serverProductionPlugins);
    } else {
        if(isProduction) {
            let {builtIns, globals, ...clientProductionPlugins} = allPlugins;
            //console.log(Object.values(clientProductionPlugins));
            return Object.values(clientProductionPlugins);
        } else {
            let {builtIns, globals,tarser, brotli, gzip, ...clientDevelopmentPlugins} = allPlugins;
            return Object.values(clientDevelopmentPlugins);
        }
    }
}