const gulp = require('gulp');
const ts = require('gulp-typescript');
const ts_import = require('gulp-typescript-path-resolver');

const tsProject = ts.createProject('tsconfig.json');

gulp.task('default', () => {
  return tsProject.src()
    .pipe(tsProject())
    .pipe(ts_import.tsPathResolver(tsProject.config.compilerOptions), {
      "paths": {
        "src/*": ["./src/*"]
      }
    })
    .pipe(gulp.dest(tsProject.config.compilerOptions.outDir));
});
