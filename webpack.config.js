module.exports = function () {
  if (process.env.BUILD_TARGET === 'package') {
    return {};
  }

  return {
    devServer: {
      port: 3000,
    },
    entry: {
      'site-mobile': ['./docs/site/entry'],
      'site-desktop': ['./docs/site/entry'],
    },
  };
};
