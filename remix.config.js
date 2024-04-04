/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  appDirectory: 'app',
  ignoredRouteFiles: ['**/.*'],
  watchPaths: ['./public', './.env'],
  server: './server.ts',
  /**
   * The following settings are required to deploy Hydrogen apps to Oxygen:
   */
  publicPath: (process.env.HYDROGEN_ASSET_BASE_URL ?? '/') + 'build/',
  assetsBuildDirectory: 'dist/client/build',
  // serverBuildPath: 'dist/worker/index.js',
  serverBuildPath: 'functions/[[path]].js',
  serverMainFields: ['browser', 'module', 'main'],
  // serverConditions: ['worker', process.env.NODE_ENV],
  serverConditions: ['workerd', 'worker', 'browser'],
  serverDependenciesToBundle: 'all',
  serverModuleFormat: 'esm',
  // serverNodeBuiltinsPolyfill: {
  //   modules: {
  //     crypto: true,
  //     stream: true,
  //     zlib: true,
  //     url: true,
  //     tls: true,
  //     net: true,
  //     http: true,
  //     https: true,
  //     events: true,
  //   },
  // },
  serverPlatform: 'neutral',
  serverMinify: process.env.NODE_ENV === 'production',
  future: {
    v3_fetcherPersist: true,
    v3_relativeSplatpath: true,
  },
};
