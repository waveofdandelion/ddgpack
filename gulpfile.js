const { series, parallel } = require("gulp");

const images = require("./tasks/Image");
const styles = require("./tasks/Style");
const scripts = require("./tasks/Script");
const watch = require("./tasks/Server");

exports.imageResize = series(
    images.images,
    images.resizeSm,
    images.resizeMd,
    images.resizeLg,
    images.resizeSm2x,
    images.resizeMd2x,
    images.resizeLg2x,
    images.resizeSm3x,
    images.resizeMd3x,
    images.resizeLg3x,
    images.cachemin
);

exports.convertImages = series(images.images, images.cachemin);

exports.default = series(
    series(styles.styles, scripts.scripts),
    parallel(watch.sync, watch.startWatch)
);
