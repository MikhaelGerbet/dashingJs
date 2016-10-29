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
    return gulp.src(['css/main.scss'])
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.sass.sync({
            outputStyle: 'expanded',
            precision: 10,
            includePaths: ['.']
        }).on('error', $.sass.logError))
        .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest('css'))
        .pipe(reload({stream: true}));
});

gulp.task('scripts', () => {
    return gulp.src('js/main.js')
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.babel())
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest('js/min'))
        .pipe(reload({stream: true}));
});

function lint(files, options) {
    return gulp.src(files)
        .pipe(reload({stream: true, once: true}))
        .pipe($.eslint(options))
        .pipe($.eslint.format())
        .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
}



gulp.task('serve', () => {
    runSequence(['styles', 'scripts'], () => {
    browserSync({
        notify: false,
        port: 8080,
        server: {
            routes: {
                '/bower_components': 'bower_components'
            }
        }
    });

    gulp.watch([
        'index.html',
        'css/**/*',
        'js/**/*'
    ]).on('change', reload);

    gulp.watch('css/main.scss', ['styles']);
    gulp.watch('js/main.js', ['scripts']);
    gulp.watch('bower.json', ['wiredep']);
});
});

gulp.task('serve:dist', () => {
    browserSync({
        notify: false,
        port: 8080,
        server: {
            baseDir: ['dist']
        }
    });
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

gulp.task('build', ['lint', 'html', 'extras'], () => {
    return gulp.src('/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', () => {
    runSequence(['clean', 'wiredep'], 'build');
});
