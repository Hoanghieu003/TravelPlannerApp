module.exports = function (api) {
  api.cache(true);

  const presets = ['module:metro-react-native-babel-preset', '@babel/preset-flow'];
  const plugins = [
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    'graphql-tag',
    'import-graphql',
  ];

  return {
    presets,
    plugins,
  };
};
