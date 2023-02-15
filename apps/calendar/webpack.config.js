const {
  withModuleFederationPlugin, share,
} = require('@angular-architects/module-federation/webpack');
const path = require("path");
const mfNgBindings = require('@angular-architects/module-federation/webpack');

const ngSharedMappings = new mfNgBindings.SharedMappings();
ngSharedMappings.register(
  path.join(__dirname, '../../tsconfig.base.json'),
  [/* mapped paths to share */]);

module.exports = withModuleFederationPlugin({
  name: 'calendarMf',

  remotes: {
    "mapMf": "http://localhost:4201/remoteEntry.js",
  },

  exposes: {
    './routes': './apps/calendar/src/app/app.routes.ts',
  },

  shared: share({
    '@angular/animations': {singleton: true, strictVersion: true, requiredVersion: '15.1.4', eager: false},
    '@angular/common': {singleton: true, strictVersion: true, requiredVersion: '15.1.4', eager: false},
    '@angular/compiler': {singleton: true, strictVersion: true, requiredVersion: '15.1.4', eager: false},
    '@angular/core': {singleton: true, strictVersion: true, requiredVersion: '15.1.4', eager: false},
    '@angular/forms': {singleton: true, strictVersion: true, requiredVersion: '15.1.4', eager: false},
    '@angular/router': {singleton: true, strictVersion: true, requiredVersion: '15.1.4', eager: false},
    '@ngxs/store': {singleton: true, strictVersion: true, requiredVersion: '^3.7.6', eager: false},

    ...ngSharedMappings.getDescriptors(),
  })
})
