const path = require('path');
const defaultConfig = require("@wordpress/scripts/config/webpack.config");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  ...defaultConfig,
  entry: {
    'block-show-editor': ['./frontend/block-show'],
    public: ['./frontend/public.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]-bundle.min.js'
  },
};
