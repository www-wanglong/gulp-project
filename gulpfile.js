const { series, watch, parallel, src, dest, EventEmitter } = require('gulp');
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
// 1. 创建task
// -- 导出任务 （公开任务 私有任务）
/**
  // `clean` 函数未被导出（export），因此被认为是私有的
  function clean(cb) {
    cb();
  }

  // 公开任务（public task）
  function build(cb) {
    cb();
  }

  exports.build = build;
  exports.default = series(clean, build)
 */

// 组合任务
//让任务（task）按顺序执行 使用series()方法
function transpile(cb) {
  console.log('transpile')
  cb();
}

function bundle(cb) {
  console.log('bundle')
  cb();
}
// exports.build = series(transpile, bundle)
// exports.default = series(transpile, bundle)


// 对于希望以最大并发来运行的任务（tasks），可以使用parallel()方法将它们组合起来
function javascript(cb) {
  console.log('javascript');
  cb();
}

function css(cb) {
  console.log('css');
  cb();
}

// exports.build = parallel(javascript, css)
// exports.default = parallel(javascript, css)

// 当series() 或 parallel被调用时， 任务（tasks）被立即组合在一起。
// 这就允许在组合中进行改变，而不需要在单个任务(task)中进行条件判断
function minify(cb) {
  console.log('minify');
  cb();
}

function livereload(cb) {
  console.log('livereload')
  cb();
}

// if (process.env.NODE_ENV === 'product') {
//   exports.build = series(transpile, minify)
// } else {
//   exports.build = series(transpile, livereload)
// }

// series()和parallel() 可以被嵌套到任意深度
function clean(cb) {
  console.log('clean')
  cb();
}

function cssTranspile(cb) {
  console.log('cssTranspile')
  cb();
}

function jsTranspile(cb) {
  console.log('jsTranspile')
  cb();
}

function publish(cb) {
  console.log('public')
  cb()
}

// exports.build = series(
//   clean,
//   parallel(cssTranspile, jsTranspile),
//   publish
// )

// exports.default = series(
//   clean,
//   parallel(cssTranspile, jsTranspile),
//   publish
// )

// 2. 异步执行
// 任务完成通知
// 当使用series()组合多个任务task时， 任何一个任务task的错误将导致整个任务组合结束， 并且不会进一步执行其他任务。
// 当使用parallel()组合多个任务(task)时，一个任务的错误将结束整个任务组合的结束，但是其他并行的任务(task)可能会执行完，有可能没有执行完

// 返回stream
function streamTask() {
  return src('*.js')
    .pipe(dest('output'))
}

// 返回promise
function promiseTask() {
  return Promise.resolve('the value is ignored')
}

// 返回event emitter
function eventEmitter() {
  const emitter = new EventEmitter();
  setTimeout( () => emitter.emit('finish'), 250)
  return emitter
}

// 返回child process
function childProcessTask() {
  return exec();
}

// 使用callback
// 如果任务(task)不返回任何内容，则必须使用callback来指示任务已完成
function callbackTask(cb) {
  cb();
}

// console.log(streamTask())
// exports.default = streamTask


exports.default = function() {
  return src('src/*.js')
    .pipe(babel())
    .pipe(src('vendor/*.js'))
    .pipe(uglify())
    .pipe(dest('output/'))
}

function css(cb) {
  console.log('change css')
  cb();
}

watch('src/*.css', {ignoreInitial: false}, css)