"use strict";

const gulp = require("gulp");
const debug = require("gulp-debug");
const del = require("del");
const imagemin = require("gulp-imagemin");
const browserSync = require("browser-sync").create();

const imagesGlob = "assets/images/**";
const assetsGlob = ["assets/**", "!"+imagesGlob];

gulp.task("assets:images", function() {
   return gulp.src(imagesGlob, { since: gulp.lastRun("assets:images") })
              .pipe(debug({ title: "src" }))
              .pipe(imagemin())
              .pipe(debug({ title: "imagemin" }))
              .pipe(gulp.dest("dist/assets/images"));
});

gulp.task("assets:rest", function() {
    return gulp.src(assetsGlob)
               .pipe(debug({ title: "src" }))
               .pipe(gulp.dest("dist/assets/"));
});

gulp.task("assets:clean", function() {
    return del("dist/assets");
});

gulp.task("assets", gulp.series("assets:images", "assets:rest"));

gulp.task("clean", gulp.series("assets:clean"));

gulp.task("watch", function() {
    gulp.watch("assets/**", "assets");
});