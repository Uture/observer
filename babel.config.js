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
            "@pretty": "./src/pretty",
            "@data": "./src/data-model",
            "@hooks": "./src/hooks"
          }
        }
      ]
    ]
  };
};
