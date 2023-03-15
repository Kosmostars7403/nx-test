const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const sharedModuleMappings = require('./webpack.mf-shared-mappings');
const sharedModuleExposes = require('./webpack.shared-exposes');

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
  path.join(__dirname, 'tsconfig.json'),
  ['@nx-test/cc-cesium']);

const remotes = {};
const mfName = 'calendarMf';

module.exports = {
  output: {
    uniqueName: mfName,
    publicPath: "auto",
    scriptType: 'text/javascript'
  },
  optimization: {
    runtimeChunk: false
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    }
  },
  plugins: [
    new ModuleFederationPlugin({
      remotes,

      name: mfName,
      filename: `${mfName}.js`,
      exposes: sharedModuleExposes,

      shared: mf.share({
        ...sharedModuleMappings,
        ...sharedMappings.getDescriptors()
      })

    }),
    sharedMappings.getPlugin()
  ],
};

