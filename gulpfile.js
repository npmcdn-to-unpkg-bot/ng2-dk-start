"use strict";
var gulp = require("gulp");
var del = require("del");
var sourcemaps = require('gulp-sourcemaps');

/**
 * Remove build directory.
 */
gulp.task('clean', function (cb) {
  return del(["build"], cb);
});

/**
 * Copy all resources that are not TypeScript files into build directory.
 */
gulp.task("resources", ["server", "app", "assets"], function () {
  console.log("Building resources...");
});
/* copy the app core files to the build folder */
gulp.task("app", ['index'], function () {
  return gulp.src(["src/app/**", "!src/app/**/*.ts"])
    .pipe(gulp.dest("build/app"));
});
/* get the index file to the root of the build */
gulp.task("index", function () {
  return gulp.src(["src/index.html"])
    .pipe(gulp.dest("build"));
});
/* copy node server to build folder */
gulp.task("server", function () {
  return gulp.src(["*.js", "package.json", "!src/server/**/*.ts"], { cwd: "src/server/**" })
    .pipe(gulp.dest("build"));
});
/* styles and other assets */
gulp.task("assets", function () {
  return gulp.src(["styles.css"])
    .pipe(gulp.dest("build"));
});
/**
 * Copy all required libraries into build directory.
 */
gulp.task("libs", function () {
  return gulp.src([
    'systemjs/dist/system-polyfills.js',
    'systemjs/dist/system.src.js',
    'rxjs/bundles/Rx.js',
    'rxjs/Subject.js',
    'rxjs/Observable.js',
    'rxjs/Observer.js',
    'rxjs/Subscriber.js',
    'rxjs/Subscription.js',
    'rxjs/operator/toPromise.js',
    'rxjs/observable/PromiseObservable.js',
    'rxjs/util/throwError.js',
    'rxjs/util/ObjectUnsubscribedError.js',
    'rxjs/util/root.js',
    'rxjs/util/toSubscriber.js',
    'rxjs/util/isFunction.js',
    'rxjs/util/isArray.js',
    'rxjs/util/isObject.js',
    'rxjs/util/tryCatch.js',
    'rxjs/util/errorObject.js',
    'rxjs/util/UnsubscriptionError.js',
    'rxjs/SubjectSubscription.js',
    'rxjs/symbol/rxSubscriber.js',
    'rxjs/symbol/observable.js',
    '@angular/**/*',
    'angular2-in-memory-web-api/**/*',
    'core-js/**/*',
    'reflect-metadata/**/*',
    "zone.js/**/*",
    'bootstrap/**.*'
  ], { cwd: "node_modules/**" }) /* Glob required here. */
    .pipe(gulp.dest("build/libs"));
});
/**
 * Build the project.
 */
gulp.task("default", ['resources', 'libs'], function () {
  console.log("Building the project ...");
});
