const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const baseConfig = require('./webpack.config');
const sharedModuleMappings = require('./webpack.mf-shared-mappings');
const sharedModuleExposes = require('./webpack.shared-exposes');

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
  path.join(__dirname, 'tsconfig.json'),
  ['@nx-test/cc-cesium']);

function getSubsystemPathResolver(path, ssName) {
  return `promise new Promise(resolve => {
    const urlParams = new URLSearchParams(window.location.search)
    // This part depends on how you plan on hosting and versioning your federated modules
    // add base href: to respect case when app serves at non root path, like "torgi.ru/new"
    const baseElm = document.getElementsByTagName('base')[0];
    const baseHref = baseElm ? baseElm.getAttribute('href') : '/';
    const remoteUrl = window.location.protocol + '//' + window.location.host + baseHref + '${path}/${ssName}.js'
    const script = document.createElement('script')
    script.src = remoteUrl
    script.onload = () => {
      // the injected script has loaded and is available on window
      // we can now resolve this Promise
      const proxy = {
        get: (request) => {
          console.log(request)
          return window.${ssName}.get(request)
        },
        init: (arg) => {
          try {
            console.log(arg)
            return window.${ssName}.init(arg)
          } catch(e) {
            console.log('remote container already initialized')
          }
        }
      }
      resolve(proxy)
    }
    script.onerror = () => {
      const proxy = {
        get: (request) => {
          console.log('${ssName}.js недоступен')
        },
        init: (arg) => {
          console.error('${ssName}.js недоступен');
        }
      }
      resolve(proxy)
    }
    // inject this script with the src set to the versioned remoteEntry.js
    document.head.appendChild(script);
  })
  `;
}

const remotes = {
};

const mfName = 'orthomosaicMakerMf';

module.exports = {
  ...baseConfig,
  plugins: [
    new ModuleFederationPlugin({

      remotes,

      name: mfName,
      filename: `${mfName}.js`,
      exposes: sharedModuleExposes,

      shared: mf.share({
        ...sharedModuleMappings,
        ...sharedMappings.getDescriptors(),
      }),
    }),
    sharedMappings.getPlugin(),
  ],
};
