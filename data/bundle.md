打包工具
===

###Gulp

1. package.json
```
"devDependencies": {
  "del": "^2.2.0",
  "gulp": "^3.9.1",
  "gulp-autoprefixer": "^3.1.0",
  "gulp-base64": "^0.1.3",
  "gulp-cache": "^0.4.5",
  "gulp-concat": "^2.6.0",
  "gulp-imagemin": "^3.0.1",
  "gulp-jshint": "^2.0.1",
  "gulp-livereload": "^3.8.1",
  "gulp-minify-css": "^1.2.4",
  "gulp-notify": "^2.2.0",
  "gulp-rename": "^1.2.2",
  "gulp-sass": "^2.3.2",
  "gulp-uglify": "^1.5.3",
  "node-sass": "^3.7.0"
}
  ```

2. gulpfile.js

```
// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    base64 = require('gulp-base64'),
    del = require('del');

var base64opt={
    baseDir: "src/css",
    extensions: ['png'],
    maxImageSize: 10 * 1024, // bytes
    debug: true
}

// Styles
gulp.task('styles', function() {
  return gulp.src('src/css/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer('>1%'))
    .pipe(base64(base64opt))
    .pipe(gulp.dest('dist/css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/css'))
    .pipe(notify({ message: 'Styles task complete' }));
});
// Scripts
gulp.task('scripts', function() {
  return gulp.src('src/js/*.js')
    // .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});
// Images
gulp.task('images', function() {
  return gulp.src('src/img/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/img'))
    .pipe(notify({ message: 'Images task complete' }));
});
// Clean
gulp.task('clean', function(cb) {
    del(['dist/css', 'dist/js', 'dist/img'], cb)
});
// Watch
gulp.task('default',function() {
  // gulp.start('clean');
  // Watch .scss files
  gulp.watch('src/css/*.scss', ['styles']);
  // Watch .js files
  gulp.watch('src/js/*.js', ['scripts']);
  // Watch image files
  gulp.watch('src/img/*.*', ['images']);
  // Create LiveReload server
  // livereload.listen();
  // // Watch any files in dist/, reload on change
  // gulp.watch(['dist/**']).on('change', livereload.changed);
});
```

###Webpack

1. package.json
```
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "start": "webpack-dev-server --inline",
  "build": "set NODE_ENV = production && webpack --progress --profile --colors"
},
"dependencies": {
  "babel-polyfill": "^6.13.0",
  "express": "^4.14.0",
  "extract-text-webpack-plugin": "^1.0.1",
  "isomorphic-fetch": "^2.2.1",
  "react": "^15.3.0",
  "react-dom": "^15.3.0",
  "react-redux": "^4.4.5",
  "react-router": "^2.6.1",
  "redux": "^3.5.2",
  "redux-logger": "^2.6.1",
  "redux-thunk": "^2.1.0"
},
"devDependencies": {
  "autoprefixer-loader": "^2.0.0",
  "babel": "^6.5.2",
  "babel-core": "^6.13.2",
  "babel-loader": "^6.2.4",
  "babel-plugin-transform-runtime": "^6.12.0",
  "babel-preset-es2015": "^6.13.2",
  "babel-preset-react": "^6.11.1",
  "babel-runtime": "^6.11.6",
  "css-loader": "^0.23.1",
  "file-loader": "^0.9.0",
  "html-loader": "^0.4.3",
  "jsx-loader": "^0.13.2",
  "node-sass": "^3.7.0",
  "redux-devtools": "^3.3.1",
  "sass-loader": "^4.0.0",
  "style-loader": "^0.13.1",
  "url-loader": "^0.5.7",
  "webpack": "^1.13.1",
  "webpack-dev-server": "^1.14.1"
}
```

2. webpack.config.js

```
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'src');
var BUILD_PATH = path.resolve(ROOT_PATH, 'dist');

module.exports = {
  entry: {
    main: path.resolve(APP_PATH,'main.js'),
    vendors:["react","react-dom","react-router"]
  },
  output: {
    path: BUILD_PATH,
    filename: '[name].js',
    publicPath: 'dist/'
  },
  module:{
    loaders:[
      {test:/\.js$/, loader:'babel', exclude:/node_modules/},
      {test:/\.scss$/, loader:ExtractTextPlugin.extract("style-loader", "css-loader!autoprefixer-loader!sass-loader")},
      {test:/\.(png|jpg|gif)$/, loader:'url?limit=8192&name=[path][name].[ext]?[hash]'},
      {test:/\.(html|tpl)$/, loader:'html-loader'}
    ]
  },
  resolve:{
    extensions:['','.js'],
    alias:{
      components: path.resolve(APP_PATH,'components')
    }
  },
  babel: {
    presets: ['es2015','react'],
    plugins: ['transform-runtime']
  },
  plugins:[
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      mangle: false,
      minimum:true,
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
          NODE_ENV: JSON.stringify("production"),
      },
    }),
    new ExtractTextPlugin("bundle.css")
  ],
  devServer:{
    historyApiFallback: true,
    hot: false,
    inline: true,
    proxy:{
      '/api/*':{
        target: 'http://127.0.0.1:4000',
        secure: false
      }
    }
  },
  devtool: false
};
```
