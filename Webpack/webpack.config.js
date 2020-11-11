const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "js/site.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          "style-loader",
          "css-loader",
          'postcss-loader',
          "sass-loader"
        ],
        // sass-loader : sass => css
        // postcss-loader : Ajouter les prefix
        // css-loader: ajouter le css dans le fichier javascript
        // style-loader : injecter le css dans le html
      },
    ], // end rules array
  }, // end module
}; // end module.exports
