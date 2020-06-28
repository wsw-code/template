const yargs = require('yargs');
var name =  yargs.argv.project || '';
console.log("name="+name);
var merge  = require('webpack-merge');
var baseConfig = require('./config/webpack.base.js');
var entryPath = `./pages/${name}/views/index.js`
var extraConfig = require('./config/project.js');
var extraMerge = extraConfig[name] || {};
var entry = {};
if(!name) {
  console.log("请输入项目!!!");
  return 
}
if(process.env.NODE_ENV == 'production') { 
  entry[name] = entryPath
} else { 
  entry[name] = ['webpack-hot-middleware/client?path=/__webpack_hmr&reload=true',entryPath];
}
var mergeConfig = merge(baseConfig,{entry},extraMerge);

module.exports = mergeConfig


