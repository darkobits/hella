module.exports = require('@darkobits/ts-unified/dist/config/package-scripts')({
  scripts: {
    build: 'NODE_ENV=production nps typeCheck && webpack --mode=production',
    start: 'NODE_ENV=development webpack-dev-server --mode=development'
  }
});
