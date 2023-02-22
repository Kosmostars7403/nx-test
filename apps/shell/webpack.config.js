const {
  withModuleFederationPlugin, share,
} = require('@angular-architects/module-federation/webpack');


module.exports = {
  ...withModuleFederationPlugin({
    remotes: {
      "mapMf": "http://localhost:4201/remoteEntry.js",
      "calendarMf": "http://localhost:4202/remoteEntry.js",
      "orthomosaicMakerMf": "http://localhost:4203/remoteEntry.js",
    },

    shared: share({
      '@angular/animations': {singleton: true, strictVersion: true, requiredVersion: '15.1.4', eager: false},
      '@angular/common': {
        singleton: true,
        strictVersion: true,
        requiredVersion: '15.1.4',
        eager: false,
        includeSecondaries: true
      },
      '@angular/compiler': {singleton: true, strictVersion: true, requiredVersion: '15.1.4', eager: false},
      '@angular/core': {singleton: true, strictVersion: true, requiredVersion: '15.1.4', eager: false},
      '@angular/forms': {singleton: true, strictVersion: true, requiredVersion: '15.1.4', eager: false},
      '@angular/router': {singleton: true, strictVersion: true, requiredVersion: '15.1.4', eager: false},
      '@ngxs/store': {singleton: true, strictVersion: true, requiredVersion: '^3.7.6', eager: false},
    }),
    sharedMappings: ['@nx-test/orwell-cesium']
  }),
  // resolve: {
  //   fallback: {
  //     fs: false,
  //     Buffer: false,
  //     http: false,
  //     https: false,
  //     zlib: false,
  //     url: false
  //   }
  // },
  // module: {
  //   unknownContextCritical: false
  // }
}
