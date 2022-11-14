const { src, dest } = require("gulp");
const { paths } = require("./helpers/PathHelper");
const del = require("del");
const rename = require("gulp-rename");
// const browserSync = require("browser-sync").create();
const sourcemap = require("gulp-sourcemaps");
const parcel = require("gulp-parcel");

let scripts = () => {
    return src(paths.scripts.src, { read: false })
        .pipe(
            parcel(
                { outDir: "src/js/min/", publicURL: "./" },
                { source: "build" }
            )
        )
        .pipe(sourcemap.init())
        .pipe(sourcemap.write("./maps"))
        .pipe(dest(paths.scripts.dest));
};

let renameScript = () => {
    return src(paths.scripts.srcMin)
        .pipe(rename("app.min.js"))
        .pipe(dest("src/js/min/"));
};

let deleteScript = () => {
    return del(["src/js/min/app.js"]);
};

exports.deleteScript = deleteScript;
exports.renameScript = renameScript;
exports.scripts = scripts;

// .pipe(browserSync.stream());
