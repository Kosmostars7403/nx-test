const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const mfNgBindings = require('@angular-architects/module-federation/webpack');
const path = require('path');
const sharedModuleMappings = require('./webpack.mf-shared-mappings');

const ngSharedMappings = new mfNgBindings.SharedMappings();
ngSharedMappings.register(
  path.join(__dirname, '../../tsconfig.base.json'),
  ['@nx-test/cc-cesium']);

const remotes = {
  "calendarMf": "calendarMf@http://localhost:4202/calendarMf.js",
  "orthomosaicMakerMf": "orthomosaicMakerMf@http://localhost:4203/orthomosaicMakerMf.js",
};

module.exports = {
  output: {
    uniqueName: 'shell',
    scriptType: 'text/javascript',
  },
  optimization: {
    runtimeChunk: false,
  },
  resolve: {
    alias: {
      ...ngSharedMappings.getAliases(),
    },
  },
  plugins: [
    new ModuleFederationPlugin({

      remotes,

      shared: {
        ...sharedModuleMappings,
        ...ngSharedMappings.getDescriptors(),
      },
    }),
    ngSharedMappings.getPlugin(),
  ],
};
