const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const mfNgBindings = require('@angular-architects/module-federation/webpack');
const path = require('path');
const baseConfig = require('./webpack.config');
const sharedModuleMappings = require('./webpack.mf-shared-mappings');

const ngSharedMappings = new mfNgBindings.SharedMappings();
ngSharedMappings.register(
  path.join(__dirname, '../../tsconfig.base.json'),
  ['@nx-test/cc-cesium']);

function getSubsystemPathResolver(path, ssName, forceUrl) {
  return `promise new Promise(resolve => {
    const urlParams = new URLSearchParams(window.location.search)
    // This part depends on how you plan on hosting and versioning your federated modules
    // add base href: to respect case when app serves at non root path, like "torgi.ru/new"
    const baseElm = document.getElementsByTagName('base')[0];
    const baseHref = baseElm ? baseElm.getAttribute('href') : '/';
    let remoteUrl = window.location.protocol + '//' + window.location.host + baseHref + '${path}/${ssName}.js'
    const script = document.createElement('script')

    // To pass hardcoded url
    const forceUrl = '${forceUrl || ""}'
    remoteUrl = forceUrl || remoteUrl;

    script.src = remoteUrl;

    script.onload = () => {
      // the injected script has loaded and is available on window
      // we can now resolve this Promise
      const proxy = {
        get: (request) => {
          console.log('Get ' + request + ' from ${ssName}');
          return window.${ssName}.get(request);
        },
        init: (arg) => {
          try {
            console.log('${ssName} is initializing');
            return window.${ssName}.init(arg);
          } catch(e) {
            console.warn('${ssName} initialization failed: ', e);
          }
        }
      }
      resolve(proxy);
    }
    script.onerror = () => {
      const proxy = {
        get: (request) => {
          console.warn('Cannot get ' + request + ' from ${ssName}.js: failed to load');
        },
        init: (arg) => {
          console.warn('Cannot init ${ssName}.js: failed to load');
        }
      }
      resolve(proxy);
    }
    // inject this script with the src set to the versioned remoteEntry.js
    document.head.appendChild(script);
  })
  `;
}

const remotes = {
  "calendarMf": getSubsystemPathResolver('mf/calendar', 'calendarMf'),
};

module.exports = {
  ...baseConfig,
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
