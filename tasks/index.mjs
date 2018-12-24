import rollup from 'rollup';
import fs from 'fs';
import { inputOptions, outputESMOptions, outputUMDOptions } from './build';
import { serverBuildPath, codeSplitting } from './config';

async function build(serverBuild, isProduction) {
  try {
    let bundle = await rollup.rollup(inputOptions(serverBuild, isProduction));
    let esmResult = !serverBuild? await bundle.write(outputESMOptions(serverBuild)): {output:{}};
    let umdResult = !serverBuild && codeSplitting? {output:{}}: await bundle.write(outputUMDOptions(serverBuild));
    let manifestESM = Object.keys(esmResult.output).filter((assetName) => {
      return !!esmResult.output[assetName].fileName
    }).map((assetName) => {
      return {
        fileName: esmResult.output[assetName].fileName,
        isEntry: esmResult.output[assetName].isEntry,
        type: 'esm'
      }
    });
    let manifestUMD = Object.keys(umdResult.output).filter((assetName) => {
      return !!umdResult.output[assetName].fileName
    }).map((assetName) => {
      return {
        fileName: umdResult.output[assetName].fileName,
        isEntry: umdResult.output[assetName].isEntry,
        type: 'umd'
      }
    })
    !serverBuild && fs.writeFile((serverBuildPath) + '/manifest.json', JSON.stringify([...manifestESM, ...manifestUMD]), () => {});
  } catch(err) {
    console.log(err);
  }
}


// Starting point for build process
if(process.argv.length < 4) throw new Error("Incomplete Arguments");
if(process.argv[2] == '-c') {
  process.argv[3] == '-p'? build(false, true): build(false, false);
} else {
  process.argv[3] == '-p'? build(true, true): build(true, false);
}