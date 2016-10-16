// generated on 2016-10-15 using generator-webapp 2.2.0
const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserSync = require('browser-sync');
const del = require('del');
const wiredep = require('wiredep').stream;
const runSequence = require('run-sequence');
const babel = require('gulp-babel');
const urlAdjuster = require('gulp-css-url-adjuster');

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

gulp.task('styles', () => {
    return gulp.src(['app/**/*.scss'])
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.sass.sync({
            outputStyle: 'expanded',
            precision: 10,
            includePaths: ['.']
        }).on('error', $.sass.logError))
        .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest('.tmp'))
        .pipe(reload({stream: true}));
});

gulp.task('scripts', () => {
    return gulp.src('app/**/*.js')
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.babel())
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest('.tmp'))
        .pipe(reload({stream: true}));
});


gulp.task('config', () => {
    return gulp.src(['config.js','config.sample.js'])
        .pipe(gulp.dest('.tmp'))
        .pipe(gulp.dest('dist'))
        .pipe(reload({stream: true}));
});

gulp.task('jobs', () => {
    return gulp.src(['jobs.js','jobs.sample.js'])
        .pipe(gulp.dest('.tmp'))
        .pipe(gulp.dest('dist'))
        .pipe(reload({stream: true}));
});

gulp.task('yml', () => {
    return gulp.src('app/server/*.yml')
        .pipe(gulp.dest('dist/server'));
});

function lint(files, options) {
    return gulp.src(files)
        .pipe(reload({stream: true, once: true}))
        .pipe($.eslint(options))
        .pipe($.eslint.format())
        .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
}

gulp.task('lint', () => {
    return lint('app/**/*.js', {
        fix: true
    })
        .pipe(gulp.dest('app'));
});
gulp.task('lint:test', () => {
    return lint('test/spec/**/*.js', {
        fix: true,
        env: {
            mocha: true
        }
    })
        .pipe(gulp.dest('test/spec'));
});

gulp.task('html', ['styles', 'scripts'], () => {
    return gulp.src('app/**/*.html')
        .pipe($.useref({searchPath: ['.tmp', 'app', '.']}))
        .pipe($.if('**/main.js', babel({
            presets: ['es2015']
        })))
        .pipe($.if('*.js', $.uglify({
            beautify : true,
            mangle   : false
        })))
        .pipe($.if('*.css', $.cssnano({safe: true, autoprefixer: false})))

        .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
        .pipe(gulp.dest('dist'));
});


gulp.task('html_widgets', () => {
    return gulp.src('.tmp/widgets/**/*.css')
        .pipe($.if('*.css', $.cssnano({safe: true, autoprefixer: false})))
        .pipe(gulp.dest('dist/widgets'));
});
gulp.task('images', () => {
    return gulp.src('app/images/**/*')
        .pipe($.cache($.imagemin()))
        .pipe(gulp.dest('dist/images'));
});

gulp.task('images_bower', () => {
    return gulp.src('bower_components/angular-emoji/dist/emoji.png')
        .pipe($.cache($.imagemin()))
        .pipe(gulp.dest('dist/styles'));
});



gulp.task('fonts', () => {
    return gulp.src(require('main-bower-files')('**/*.{eot,svg,ttf,woff,woff2}', function (err) {})
        .concat('app/fonts/**/*'))
        .pipe(gulp.dest('.tmp/fonts'))
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('fonts_widgets', () => {
    return gulp.src(require('main-bower-files')('**/*.{eot,svg,ttf,woff,woff2}', function (err) {})
        .concat('app/widgets/**/*'))
        .pipe(gulp.dest('.tmp/widgets'))
        .pipe(gulp.dest('dist/widgets'));
});

gulp.task('extras', () => {
    return gulp.src([
        'app/*',
        'app/**/*.mp3',
        '!app/*.html'
    ], {
        dot: true
    }).pipe(gulp.dest('dist'));
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('serve', () => {
    runSequence(['clean', 'wiredep'], ['styles', 'scripts', 'fonts'], () => {
    browserSync({
        notify: false,
        port: 9001,
        server: {
            baseDir: ['.tmp', 'app'],
            routes: {
                '/bower_components': 'bower_components'
            }
        }
    });

    gulp.watch([
        'app/**/*.html',
        'app/images/**/*',
        '.tmp/fonts/**/*'
    ]).on('change', reload);

    gulp.watch('app/**/*.scss', ['styles']);
    gulp.watch('app/**/*.js', ['scripts']);
    gulp.watch('app/fonts/**/*', ['fonts']);
    gulp.watch('bower.json', ['wiredep', 'fonts']);
});
});

gulp.task('serve:dist', () => {
    browserSync({
        notify: false,
        port: 9001,
        server: {
            baseDir: ['dist']
        }
    });
});

gulp.task('serve:test', ['scripts'], () => {
    browserSync({
        notify: false,
        port: 9001,
        ui: false,
        server: {
            baseDir: 'test',
            routes: {
                '/scripts': '.tmp/scripts',
                '/widget': '.tmp/widget',
                '/bower_components': 'bower_components'
            }
        }
    });

gulp.watch('app/scripts/**/*.js', ['scripts']);
gulp.watch(['test/spec/**/*.js', 'test/index.html']).on('change', reload);
gulp.watch('test/spec/**/*.js', ['lint:test']);
});

// inject bower components
gulp.task('wiredep', () => {
    gulp.src('app/*.scss')
    .pipe(wiredep({
        ignorePath: /^(\.\.\/)+/
    }))
    .pipe(gulp.dest('app'));

gulp.src('app/*.html')
    .pipe(wiredep({
        exclude: ['bootstrap-sass'],
        ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest('app'));
});

gulp.task('build', ['lint', 'html', 'config', 'jobs', 'images', 'images_bower', 'fonts', 'fonts_widgets', 'yml', 'extras', 'html_widgets'], () => {
    return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', () => {
    runSequence(['clean', 'wiredep'], 'build');
});
