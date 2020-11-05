var path = require(`path`);

module.exports = {
  entry: [
    `./js/filter.js`,
    `./js/backend.js`,
    `./js/message.js`,
    `./js/data.js`,
    `./js/util.js`,
    `./js/map.js`,
    `./js/card.js`,
    `./js/pin.js`,
    `./js/form.js`,
    `./js/main.js`,
  ],
  output: {
    filename: `bundle.js`,
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
