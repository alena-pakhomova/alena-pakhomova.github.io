"use strict";

const gulp = require("gulp");
const debug = require("gulp-debug");
const del = require("del");
const imagemin = require("gulp-imagemin");
const concat = require("gulp-concat");
const newer = require("gulp-newer");
const wrapper = require("gulp-wrapper");
const browserSync = require("browser-sync").create();

/* Path */
const imagesGlob = "assets/images/**";
const photoSwipeImagesGlob = ["node_modules/photoswipe/dist/default-skin/default-skin.png", 
                              "node_modules/photoswipe/dist/default-skin/default-skin.svg", 
                              "node_modules/photoswipe/dist/default-skin/preloader.gif"];
const assetsGlob = ["assets/**", "!"+imagesGlob];
const customCssGlob = ["css/style.css", 
                       "css/media.css"];
const vendorCssGlob = ["node_modules/photoswipe/dist/photoswipe.css", 
                       "node_modules/photoswipe/dist/default-skin/default-skin.css"];
const customJsGlob = "js/**";
const vendorJsGlob = ["node_modules/photoswipe/dist/photoswipe.min.js",
                      "node_modules/photoswipe/dist/photoswipe-ui-default.min.js",
                      "node_modules/gsap/src/minified/TweenLite.min.js",
                      "node_modules/gsap/src/minified/plugins/ScrollToPlugin.min.js"];
/* /Path */

/* Assets tasks */
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
    return gulp.src(assetsGlob, { since: gulp.lastRun("assets:rest") })
               .pipe(debug({ title: "src" }))
               .pipe(newer("dist/assets/"))
               .pipe(debug({ title: "newer" }))
               .pipe(gulp.dest("dist/assets"));
});

gulp.task("assets:photoSwipe", function() {
    return gulp.src(photoSwipeImagesGlob)
               .pipe(debug({ title: "src" }))
               .pipe(gulp.dest("dist/css"));
});

gulp.task("assets:clean", function() {
    return del("dist/assets");
});

gulp.task("assets", gulp.series("assets:images", "assets:rest", "assets:photoSwipe"));
/* /Assets tasks */

/* CSS tasks */
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
    return del("dist/css/**/*.css");
});

gulp.task("css", gulp.series("css:clean", gulp.parallel("css:custom", "css:vendor")));
/* CSS tasks */

/* JS tasks */
gulp.task("js:custom", function() {
    return gulp.src(customJsGlob)
               .pipe(debug({ title: "src" }))
               .pipe(concat("app.js"))
               .pipe(debug({ title: "concat" }))
               .pipe(wrapper({
                   header: "\"use strict\"; \n"
               }))
               .pipe(debug({ title: "wrapper" }))
               .pipe(gulp.dest("dist/js"));
});

gulp.task("js:vendor", function() {
    return gulp.src(vendorJsGlob)
               .pipe(debug({ title: "src" }))
               .pipe(concat("vendor.js"))
               .pipe(debug({ title: "concat" }))
               .pipe(gulp.dest("dist/js"));
});

gulp.task("js:clean", function() {
    return del("dist/js");
});

gulp.task("js", gulp.series("js:clean", gulp.parallel("js:custom", "js:vendor")));
/* JS tasks */

/* Common tasks */
gulp.task("clean", gulp.series("assets:clean", "css:clean", "js:clean"));

gulp.task("watch", function() {
    gulp.watch("assets/**", gulp.series("assets"));
    gulp.watch(customCssGlob, gulp.series("css:custom"));
    gulp.watch(customJsGlob, gulp.series("js:custom"));
});

gulp.task("serve", function() {
    browserSync.init({
        server: "./"
    });

    browserSync.watch(["dist/**/*.*", "*.html", "pages/*.html"]).on("change", browserSync.reload);
});

gulp.task("dev", gulp.series("assets", "css", "js", gulp.parallel("watch", "serve")));
/* /Common tasks */