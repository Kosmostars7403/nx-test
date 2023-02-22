const {withModuleFederationPlugin, share} = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  name: 'orthomosaicMakerMf',

  exposes: {
    './routes': './apps/orthomosaic-maker/src/app/app.routes.ts',
  },

  shared: share({
    '@angular/animations': {singleton: true, strictVersion: true, requiredVersion: '15.1.4', eager: false},
    '@angular/common': {singleton: true, strictVersion: true, requiredVersion: '15.1.4', eager: false},
    '@angular/compiler': {singleton: true, strictVersion: true, requiredVersion: '15.1.4', eager: false},
    '@angular/core': {singleton: true, strictVersion: true, requiredVersion: '15.1.4', eager: false},
    '@angular/forms': {singleton: true, strictVersion: true, requiredVersion: '15.1.4', eager: false},
    '@angular/router': {singleton: true, strictVersion: true, requiredVersion: '15.1.4', eager: false},
    '@ngxs/store': {singleton: true, strictVersion: true, requiredVersion: '^3.7.6', eager: false},
  }),

});
