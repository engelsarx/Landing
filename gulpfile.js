var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var changed = require('gulp-changed');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var assets = require('postcss-assets');
var autoprefixer = require('autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var mqpacker = require('css-mqpacker');
var cssnano = require('cssnano');
var useref = require('gulp-useref');
var gutil = require('gulp-util');
var gulpIf = require('gulp-if');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();
var clean = require('gulp-clean');
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');
var kit = require('gulp-kit');
var removeEmptyLines = require('gulp-remove-empty-lines');
var series = require('stream-series');
var inject = require('gulp-inject');
var replace = require('gulp-replace-path');

var config = {
  base: './',
  ext: 'html',
  env: {
    server: './dev',
    serverDist: './dist'
  },
  runTimestamp: Math.round(Date.now() / 1000),
  iconFontName: 'babel-font',
  iconFontClass: 'babel-icon'
};

var paths = {
  dev: {
    root: 'dev/',
    files: 'dev/*.' + config.ext,
    kitAllFiles: 'dev/kit/**/*.kit',
    kitPartialsHead: 'dev/kit/partials/_head.kit',
    kitPartials: 'dev/kit/partials',
    kitFiles: 'dev/kit/*.kit',
    extras: [
      '.htaccess',
      'crossdomain.xml',
      'humans.txt',
      'manifest.appcache',
      'robots.txt',
      'favicon.ico',
      'README.md'
    ],
    images: 'dev/images/',
    imagesFiles: 'dev/images/**/*.+(png|jpg|gif|svg)',
    fonts: 'dev/fonts/**/*',
    css: 'dev/css/',
    cssMainFile: 'dev/css/styles.css',
    scss: 'dev/scss',
    scssIndex: 'dev/scss/styles.scss',
    scssFiles: 'dev/scss/**/*.scss',
    js: 'dev/js',
    jsAppFiles: 'dev/js/*.js',
    jsFiles: [
      'dev/js/**/*.js',
      '!./dev/js/lib/**/*.js'
    ],
    jsLibs: [
      'node_modules/jquery/dist/jquery.js',
      // 'node_modules/mustache/mustache.js',
      // 'node_modules/slick-carousel/slick/slick.js'
    ],
    jsLibFolder: 'dev/js/lib',
    jsLibFiles: 'dev/js/lib/*.js',
    svgIcons: 'dev/images/icons/*.svg',
    svgScss: '../scss/icon-font/_icon-font.scss',
    svgFonts: '../fonts/',
    svgFontsTemplate: './dev/scss/icon-font/templates/_icons.scss',
    svgFontsDev: 'dev/fonts/',
  },
  dist: {
    root: 'dist/',
    images: 'dist/images/',
    fonts: 'dist/fonts',
    css: 'dist/css',
    js: 'dist/js',
  }
}

// BROWSERSYNC
gulp.task('browserSync', function () {
  browserSync.init({
    server: {
      baseDir: config.env.server
    }
  });
});

// BROWSERSYNC - DIST
gulp.task('serve', function () {
  browserSync.init({
    server: {
      baseDir: config.env.serverDist
    }
  });
});

// SCSS
function handleErrors() {
  var gutil = require('gulp-util');
  var args = Array.prototype.slice.call(arguments);

  gutil.log(gutil.colors.white.bgRed.underline.bold('Gulp error:'));
  gutil.log(gutil.colors.red(args));

  // continue with gulp tasks
  this.emit('end');
}

gulp.task('scss', function () {

  var postCssOpts = [
    assets({ loadPaths: [paths.dev.images] }),
    autoprefixer({
      browsers: [
        'last 2 versions',
        'safari 5',
        'ie 9',
        'opera 12.1',
        'ios 6',
        'android 4'
      ]
    }),
    mqpacker,
    cssnano
  ];

  gulp.src(paths.dev.scssIndex)

    /*  return sass(paths.dev.scssIndex, {
        noCache: true,
        compass: false,
        sourcemap: true,
        style: 'nested',
        precision: 6,
        cacheLocation: config.base,
      })*/
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss(postCssOpts))
    .pipe(sourcemaps.write('.', { includeContent: false, sourceRoot: paths.dev.scss }))
    .on('error', handleErrors)
    .pipe(gulp.dest(paths.dev.css))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('inject', function () {
  var target = gulp.src(paths.dev.kitPartialsHead);
  var sources = gulp.src(paths.dev.cssMainFile, { read: false });
  var vendorStream = gulp.src([paths.dev.jsLibFiles], { read: false });
  var appStream = gulp.src([paths.dev.jsAppFiles], { read: false });

  return target.pipe(inject(series(sources, vendorStream, appStream)))
    .pipe(replace(/\/dev\//g, ''))
    .pipe(gulp.dest(paths.dev.kitPartials));
});

gulp.task('kit', function () {
  return gulp.src(paths.dev.kitFiles)
    .pipe(kit({ compilePartials: true }))
    .pipe(removeEmptyLines({
      removeComments: false,
      removeSpaces: false
    }))
    .pipe(gulp.dest(paths.dev.root))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// IMAGES
gulp.task('images', function () {
  gulp.src(paths.dev.imagesFiles)
    .pipe(changed(paths.dist.images))
    .pipe(imagemin())
    .pipe(gulp.dest(paths.dist.images));
});

// HTML
gulp.task('html', function () {
  return gulp.src(paths.dev.files)
    .pipe(changed(paths.dist.root))
    .pipe(gulp.dest(paths.dist.root))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// JSHINT
gulp.task('jshint', function () {
  return gulp.src(paths.dev.jsFiles)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// CLEAN
gulp.task('clean', function () {
  return gulp.src(paths.dist.root, { read: false })
    .pipe(clean());
});

// CLEAN
gulp.task('clean-kit', function () {
  return gulp.src(paths.dev.files, { read: false })
    .pipe(clean());
});

// IMPORT LIBARIES
gulp.task('copy-libs', function () {
  gulp.src(paths.dev.jsLibs)
    .pipe(gulp.dest(paths.dev.jsLibFolder));
});

// USEREF
gulp.task('useref', function () {
  return gulp.src(paths.dev.files)
    .pipe(useref({ searchPath: paths.dev.root }))
    .pipe(gulpIf('*.js', uglify().on('error', gutil.log)))
    .pipe(gulp.dest(paths.dist.root));
});

// COPY
gulp.task('copy', function () {
  gulp.src(paths.dev.root + '*.*', {
    base: paths.dev.root
  })
    .pipe(gulp.dest(paths.dist.root));

  gulp.src(paths.dev.fonts)
    .pipe(changed(paths.dist.fonts))
    .pipe(gulp.dest(paths.dist.fonts));
});

// ICONS SVG
gulp.task('iconfont', function () {
  return gulp.src([paths.dev.svgIcons])
    .pipe(iconfontCss({
      fontName: config.iconFontName,
      path: paths.dev.svgFontsTemplate,
      targetPath: paths.dev.svgScss,
      fontPath: paths.dev.svgFonts,
      firstGlyph: 0xB001,
      cssClass: config.iconFontClass
    }))
    .pipe(iconfont({
      fontName: config.iconFontName,
      prependUnicode: true,
      normalize: true,
      fontHeight: 1001,
      formats: ['ttf', 'eot', 'woff', 'woff2', 'svg'],
      timestamp: config.runTimestamp,
    }))
    /*.on('glyphs', function(glyphs, options) {
      console.log(glyphs, options);
    })*/
    .pipe(gulp.dest(paths.dev.svgFontsDev))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// WATCH
gulp.task('watch', ['browserSync'], function () {
  gulp.watch(paths.dev.files, browserSync.reload);
  //gulp.watch(paths.dev.svgIcons, ['iconfont']);
  gulp.watch(paths.dev.spritesFiles, ['sprites']);
  gulp.watch(paths.dev.scssFiles, ['scss']);
  gulp.watch(paths.dev.kitAllFiles, ['kit']);
  gulp.watch(paths.dev.jsFiles, ['jshint']);
  // gulp.watch(paths.dev.files, ['html']);
  // gulp.watch(paths.dev.images, ['images']);
});

// DEV
gulp.task('dev', function (callback) {
  runSequence(
    'clean-kit',
    ['copy-libs', 'scss'],
    ['inject'],
    ['kit'],
    ['browserSync', 'watch'],
    callback
  );
});

// BUILD
gulp.task('build', function (callback) {
  runSequence(
    'clean',
    'copy',
    ['images'],
    ['useref'],
    'serve',
    callback
  );
});

gulp.task('default', ['dev']);
