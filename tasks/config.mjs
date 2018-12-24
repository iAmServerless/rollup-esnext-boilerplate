
const codeSplitting = true;
const clientBuildPath = './clientBuild';
const serverBuildPath = './serverBuild';
const clientInitial = codeSplitting? './src/client/index.code_splitting.mjs': './src/client/index.mjs';
const serverInitial = './src/server/index.mjs';
export {serverBuildPath, clientBuildPath, clientInitial, serverInitial, codeSplitting};