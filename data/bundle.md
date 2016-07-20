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
  "build": "webpack --progress --profile --colors"
},
"dependencies": {
  "vue": "^1.0.24",
  "vue-resource": "^0.7.0",
  "vue-router": "^0.7.13",
  "webpack": "^1.13.1"
},
"devDependencies": {
  "autoprefixer-loader": "^2.0.0",
  "babel": "^6.3.13",
  "babel-core": "^6.3.21",
  "babel-loader": "^6.2.0",
  "babel-plugin-transform-runtime": "^6.3.13",
  "babel-preset-es2015": "^6.3.13",
  "babel-runtime": "^5.8.34",
  "css-loader": "^0.16.0",
  "file-loader": "^0.8.5",
  "html-loader": "^0.3.0",
  "html-webpack-plugin": "^2.19.0",
  "jquery": "^1.10.2",
  "less": "^2.7.1",
  "less-loader": "^2.2.3",
  "node-less": "^1.0.0",
  "node-sass": "^3.7.0",
  "sass-loader": "^3.2.0",
  "style-loader": "^0.12.3",
  "url-loader": "^0.5.6",
  "vue-html-loader": "^1.2.0",
  "vue-loader": "^7.2.0",
  "webpack": "^1.12.0",
  "webpack-dev-server": "^1.14.0"
}
```

2. webpack.config.js

```
var webpack = require("webpack");
var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
// NodeJS中的Path对象，用于处理目录的对象，提高开发效率。

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'src');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
var TEM_PATH = path.resolve(ROOT_PATH, 'templates');

// 模块导入
module.exports = {
    // 入口文件地址，不需要写完，会自动查找
    entry: {
      app: path.resolve(APP_PATH, 'index.js'),
      //添加要打包在vendors里面的库
      vendors: ['jquery','./src/js/global.js']
    },
    // 输出
    output: {
        path: BUILD_PATH,
        // 文件地址，使用绝对路径形式
        filename: 'js/[name].js',
        //[name]这里是webpack提供的根据路口文件自动生成的名字
        // publicPath: BUILD_PATH
        // 公共文件生成的地址
    },
    // 加载器
    module: {
        // 加载器
        loaders: [
        // 解析.vue文件
            { test: /\.vue$/, loader: 'vue' },
        // 转化ES6的语法
            { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
        // 编译css并自动添加css前缀
            { test: /\.css$/, loader: 'style!css!autoprefixer'},
            { test: /\.scss$/, loader: 'style!css!sass'},
            { test: /\.less$/, loader: 'style!css!less?strictMath&noIeCompat'},
        // 图片转化，小于8K自动转化为base64的编码
            { test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192&name=img/[name].[ext]'},
        //html模板编译？
            { test: /\.(html|tpl)$/, loader: 'html-loader' },
        ]
    },
    // .vue的配置。需要单独出来配置，其实没什么必要--因为我删了也没保错，不过这里就留这把，因为官网文档里是可以有单独的配置的。
    vue: {
        loaders: {
            css: 'style!css!less!autoprefixer',
        }
    },
    // 转化成es5的语法
    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
    },
    resolve: {
        // require时省略的扩展名，如：require('module') 不需要module.js
        extensions: ['', '.js', '.vue'],
        // 别名，可以直接使用别名来代表设定的路径以及其他
        alias: {
            filter: path.join(__dirname, './src/filters'),
            components: path.join(__dirname, './src/components')
        }
    },
    plugins: [
      new HtmlwebpackPlugin({
        title: 'ARK Homepage',
        template: path.resolve(TEM_PATH, 'index.html'),
        filename: 'index.html',
        //chunks这个参数告诉插件要引用entry里面的哪几个入口
        chunks: ['app', 'vendors'],
        //要把script插入到标签里
        inject: 'body'
      }),
      new webpack.ProvidePlugin({
        $: "jquery"
      }),
      new webpack.optimize.CommonsChunkPlugin('vendors', 'js/vendors.js')
    ],
    // 服务器配置相关，自动刷新!
    devServer: {
        historyApiFallback: true,
        hot: false,
        inline: true,
        progress: true,
    }
    // 开启source-map，webpack有多种source-map，在官网文档可以查到
};
```
