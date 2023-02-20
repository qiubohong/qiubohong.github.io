const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const common = require("./common.js");
module.exports = merge(common, {
  mode: "production",
  optimization: {
    minimize: true,
    minimizer: [
      "...",
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.(css|scss|sass)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [["autoprefixer"]],
              },
            },
          },
          "sass-loader",
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "assets/css/[hash:8].css",
    }),
  ],
});