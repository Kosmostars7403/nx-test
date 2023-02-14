const {
  withModuleFederationPlugin,
} = require('@angular-architects/module-federation/webpack');
const path = require("path");
const mfNgBindings = require('@angular-architects/module-federation/webpack');

const ngSharedMappings = new mfNgBindings.SharedMappings();
ngSharedMappings.register(
  path.join(__dirname, '../../tsconfig.base.json'),
  [/* mapped paths to share */]);

module.exports = {
  ...withModuleFederationPlugin({
    name: 'mapMf',

    exposes: {
      './routes': './apps/map/src/app/app.routes.ts',
    },

    shared: {
      '@angular/animations': {singleton: true, strictVersion: true, requiredVersion: '15.1.4', eager: false},
      '@angular/common': {singleton: true, strictVersion: true, requiredVersion: '15.1.4', eager: false},
      '@angular/compiler': {singleton: true, strictVersion: true, requiredVersion: '15.1.4', eager: false},
      '@angular/core': {singleton: true, strictVersion: true, requiredVersion: '15.1.4', eager: false},
      '@angular/forms': {singleton: true, strictVersion: true, requiredVersion: '15.1.4', eager: false},
      '@angular/router': {singleton: true, strictVersion: true, requiredVersion: '15.1.4', eager: false},
      ...ngSharedMappings.getDescriptors(),
    }
  }),
  resolve: {
    fallback: {
      fs: false,
      Buffer: false,
      http: false,
      https: false,
      zlib: false,
      url: false
    }
  },
  module: {
    unknownContextCritical: false
  }
}
