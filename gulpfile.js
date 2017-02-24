const gulp = require('gulp');
//Lazy loading gulp modules
let $ = require('gulp-load-plugins')({lazy: true});
const config = require('./gulp.config')();
const del = require('del');

gulp.task('vet',()=>{
  console.log('Analyzing source with JSHint and JSCS');
  return gulp.src(config.alljs)
  .pipe($.jscs())
  .pipe($.jshint())
  .pipe($.jshint.reporter('jshint-stylish', {verbose:true}))
  .pipe($.jshint.reporter('fail'));
});

//Transpile all custom javascript to ES5 for older browsers
gulp.task('babel',()=>{
      gulp.src(config.alljs)
      .pipe($.babel({
        presets:['es2015']
      }))
      .pipe(gulp.dest(config.temp));
});

//Use vulcanize to optimize and generate build folder
gulp.task('build',['copy-source'], function () {
    return gulp.src(`${config.temp}/index.html`)
        .pipe($.vulcanize({inlineScripts:true,inlineCss:true}))
        .pipe(gulp.dest(`${config.build}`));
});

//Prepare sourcode and files in temp folder for optimization
gulp.task('copy-source',['babel','copy-third-party','copy-images'],()=>{
      gulp.src([...config.allcss,...config.allhtml])
      .pipe(gulp.dest(config.temp));
});

//Copy all bower_components libraries
gulp.task('copy-third-party',()=>{
      gulp.src(config.allthirdparty)
      .pipe(gulp.dest(`${config.build}/bower_components`));
});

//Copy all images to ./temp/images folder
gulp.task('copy-images',()=>{
      gulp.src(config.allimages)
      .pipe(gulp.dest(`${config.build}/images`));
});

//Delete all folders generated during the build process
gulp.task('clean',(done)=>{
  let delconfig = [].concat(config.build, config.temp);
  console.log('Cleaning: ' + delconfig);
  return del(delconfig,done);
});
