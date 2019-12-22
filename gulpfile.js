const gulp = require('gulp');
const ts = require('gulp-typescript');
const alias = require('gulp-ts-alias');
const sourcemaps = require('gulp-sourcemaps');
const path = require('path');

const tsProject = ts.createProject('tsconfig.json');

gulp.task('default', () => {
  const compiled = tsProject.src()
    .pipe(alias({ configuration: tsProject.config }))
    .pipe(sourcemaps.init())
    .pipe(tsProject());

  return compiled.js
    .pipe(sourcemaps.write({ sourceRoot: file => path.relative(path.join(file.cwd, file.path), file.base) }))
    .pipe(gulp.dest('build/'));
});
