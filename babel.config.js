module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          extensions: [
            '.js',
            '.jsx',
            '.ts',
            '.tsx',
            '.android.js',
            '.android.tsx',
            '.ios.js',
            '.ios.tsx'
          ],
          alias: {
            "@components": "./src/components",
            "@styles": "./src/styles",
            "@data": "./src/data-model",
            "@hooks": "./src/hooks",
            "@constants": "./src/constants",
            "@redux": "./src/redux"
          }
        }
      ]
    ]
  };
};
