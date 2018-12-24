import path from 'path';
import { clientBuildPath, serverBuildPath, clientInitial, serverInitial } from './config';
import plugins from './plugins.mjs';


// Vendor file is an anti pattern since http2 muliplexing feature, 
// but should still be used since chrome(most popular browser) do not follow specification.
export const inputOptions = (serverBuild, isProduction) => {
  return {
    input: serverBuild? serverInitial: clientInitial,
    experimentalCodeSplitting: true,
    /* manualChunks: {
      'vendor': ['react', 'react-dom']
    }, */
    plugins: plugins(serverBuild, isProduction),
    external: ['stream', 'fs', 'events', 'path', 'net', 'querystring', 'http']
  }
};

export const outputESMOptions = (serverBuild) => {
  return {
    name: 'ESMMainBundle',
    entryFileNames: "./esm/js/[name].[hash].mjs",
    chunkFileNames: "./esm/js/[name].[hash].mjs",
    assetFileNames: "./esm/js/[name].[hash].mjs",
    dir: serverBuild? path.resolve(serverBuildPath): path.resolve(clientBuildPath),
    format: 'esm',
    sourcemap: true
  }
}

export const outputUMDOptions = (serverBuild) => {
  return {
    name: 'UMDMainBundle',
    entryFileNames: serverBuild? "./umd/js/[name].js": "./umd/js/[name].[hash].js",
    chunkFileNames: serverBuild? "./umd/js/[name].js": "./umd/js/[name].[hash].js",
    assetFileNames: serverBuild? "./umd/js/[name].js": "./umd/js/[name].[hash].js",
    dir: serverBuild? path.resolve(serverBuildPath): path.resolve(clientBuildPath),
    format: serverBuild? 'cjs': 'umd',
    sourcemap: true
  }
}