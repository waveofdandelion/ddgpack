const del = require("del");

let cleanPublic = () => {
    return del(["public"]);
};

let cleanSrc = () => {
    return del(["src/css", "src/js/min/app.js.map", "src/js/min/app.min.js"]);
};

let deepCleanSrc = () => {
    return del([
        "src/css",
        "src/**/dest",
        "src/images/dest",
        "src/js/min/app.js.map",
        "src/js/min/app.min.js",
    ]);
};

exports.cleanPublic = cleanPublic;
exports.cleanSrc = cleanSrc;
exports.deepCleanSrc = deepCleanSrc;
