module.exports = {
    plugins: {
      autoprefixer: {
        overrideBrowserslist: ['last 7 iOS versions', 'last 3 versions', '> 1%']
      },
      'postcss-plugin-px2rem': { 
        rootValue:75
      }  
    }
  };