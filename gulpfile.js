const babel = require('gulp-babel');
const concat = require('gulp-concat');
const del = require('del');
const gulp = require('gulp');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync');

const server = browserSync.create();

const paths = {
  scripts: {
    src: ['./js/**/*.js', '!./js/**/*.min.js'],
    dest: './js/'
  }
};

const clean = () => del(['dist']);

function scripts() {
  return gulp.src(paths.scripts.src, { sourcemaps: true })
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('index.min.js'))
    .pipe(gulp.dest(paths.scripts.dest));
}

function reload(done) {
  server.reload();
  done();
}

function serve(done) {
  server.init({
    server: {
      baseDir: './'
    }
  });
  done();
}

const watch = () => gulp.watch(paths.scripts.src.concat(['./css/**/*.css', './index.html']), gulp.series(scripts, reload));

const dev = gulp.series(clean, scripts, serve, watch);
exports.default = dev;
