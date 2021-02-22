'use strict';
const gulp          = require("gulp");
const browserSync   = require("browser-sync").create();
const sass          = require("gulp-sass");
const plumber       = require("gulp-plumber");
const sourceMaps    = require('gulp-sourcemaps');
const postcss       = require("gulp-postcss");
const autoprefixer  = require('autoprefixer');
const cssnano       = require("cssnano");

const browserify    = require('browserify');
const babelify      = require('babelify');
const source        = require('vinyl-source-stream');
const buffer        = require('vinyl-buffer');
const uglify        = require('gulp-uglifyjs');


const styleSRC      = 'stylesheets/main.{sass,scss}';
const styleDIST     = 'assets/css/';
const styleWatch    = 'stylesheets/**/*.{sass,scss}';

const jsAll = './js/**/*.js';
const jsMain = 'js/main.js';
const jsDIST = 'assets/js/';

const gulpAutoprefixer = require('gulp-autoprefixer');

const serve = () => {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        //proxy: "http://name.loc/", // for wp and osp
        open: true,
        port: 8080
    });
};

const css = () => {
    return gulp.src(styleSRC)
        .pipe(plumber())
        // .pipe(sourceMaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        })).on('error', sass.logError)
        .pipe(postcss([
            autoprefixer(),
            cssnano()
        ]))
		.pipe(gulpAutoprefixer(['last 15 versions'], { cascade: true }))
        .pipe(sourceMaps.write('./maps'))
        .pipe(gulp.dest(styleDIST))
        .pipe(browserSync.stream());
};

const scripts = () => {
    return browserify({
        entries: jsMain,
        debug: true
    }).transform(babelify, {
        presets:[
            ["@babel/preset-env"]
        ]
    }).bundle()
        .pipe(source("app.js"))
        .pipe(buffer())
        .pipe(gulp.dest(jsDIST))
        .pipe(browserSync.stream())
};

// BrowserSync Reload
function browserReload(done) {
    browserSync.reload();
    done();
}

gulp.task("serve", serve);

gulp.task("css", css);

gulp.task("scripts", scripts);

gulp.task("watch", () => {
    gulp.watch(styleWatch, css);
    gulp.watch('**/*.html', browserReload);
    gulp.watch('**/*.php', browserReload);
    gulp.watch(jsAll , scripts);
});

gulp.task("server", gulp.parallel("watch", serve, browserReload));

