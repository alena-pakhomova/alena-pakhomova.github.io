"use strict";

const gulp = require("gulp");
const debug = require("gulp-debug");
const del = require("del");
const imagemin = require("gulp-imagemin");
const concat = require("gulp-concat");
const newer = require("gulp-newer");
const browserSync = require("browser-sync").create();

const imagesGlob = "assets/images/**";
const assetsGlob = ["assets/**", "!"+imagesGlob];
const customCssGlob = "css/**";
const vendorCssGlob = ["node_modules/photoswipe/dist/photoswipe.css", 
                       "node_modules/photoswipe/dist/default-skin/default-skin.css"];

gulp.task("assets:images", function() {
   return gulp.src(imagesGlob, { since: gulp.lastRun("assets:images") })
              .pipe(debug({ title: "src" }))
              .pipe(newer("dist/assets/images"))
              .pipe(debug({ title: "newer" }))
              .pipe(imagemin())
              .pipe(debug({ title: "imagemin" }))
              .pipe(gulp.dest("dist/assets/images"));
});

gulp.task("assets:rest", function() {
    return gulp.src(assetsGlob)
               .pipe(debug({ title: "src" }))
               .pipe(newer("dist/assets/"))
              .pipe(debug({ title: "newer" }))
               .pipe(gulp.dest("dist/assets/"));
});

gulp.task("assets:clean", function() {
    return del("dist/assets");
});

gulp.task("assets", gulp.series("assets:images", "assets:rest"));

gulp.task("css:custom", function() {
    return gulp.src(customCssGlob)
               .pipe(debug({ title: "src" }))
               .pipe(concat("style.css"))
               .pipe(debug({ title: "concat" }))
               .pipe(gulp.dest("dist/css"));
});

gulp.task("css:vendor", function() {
    return gulp.src(vendorCssGlob)
               .pipe(debug({ title: "src" }))
               .pipe(concat("vendor.css"))
               .pipe(debug({ title: "concat" }))
               .pipe(gulp.dest("dist/css"));
});

gulp.task("css:clean", function() {
    return del("dist/css");
});

gulp.task("css", gulp.series("css:clean", gulp.parallel("css:custom", "css:vendor")));

gulp.task("clean", gulp.series("assets:clean", "css:clean"));

gulp.task("watch", function() {
    gulp.watch("assets/**", gulp.series("assets"));
    gulp.watch(customCssGlob, gulp.series("css:custom"));
});

gulp.task("serve", function() {
    browserSync.init({
        server: "./"
    });

    browserSync.watch(["dist/**/*.*", "*.html", "pages/*.html"]).on("change", browserSync.reload);
});

gulp.task("dev", gulp.series("assets", "css", gulp.parallel("watch", "serve")));