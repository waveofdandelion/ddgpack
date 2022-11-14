const { series, parallel } = require("gulp");
const options = require("./tasks/helpers/OptionHelper");

const styles = require("./tasks/Style");
const scripts = require("./tasks/Script");
const watch = require("./tasks/Server");
const images = require("./tasks/Image");
const fonts = require("./tasks/Font");
const html = require("./tasks/Html");
const assets = require("./tasks/Public");
const clean = require("./tasks/Clean");

// All image transformations, the second task just for rebase images
if (options.imageResize) {
    exports.resizeImages = series(
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
} else {
    exports.rebaseImages = series(images.images, images.cachemin);
}

// // All font transformations, the second task just for rebase fonts
if (options.fontGeneration) {
    exports.convertFonts = series(
        fonts.transform,
        fonts.transformToWoff2,
        fonts.ttfRebase
    );
} else {
    exports.rebaseFonts = series(fonts.transform, fonts.ttfRebase);
}

// // HTML minification task
exports.htmlMin = series(html.html);

// // Clean all src or only styles and js files
if (options.deepCleanSrc) {
    exports.deepCleanSrc = series(clean.deepCleanSrc);
} else {
    exports.cleanSrc = clean.cleanSrc;
}

// // Build Task
exports.build = series(
    clean.cleanPublic,
    styles.styles,
    scripts.scripts,
    scripts.renameScript,
    scripts.deleteScript,
    styles.unusable,

    parallel(
        assets.publicCss,
        assets.publicJs,
        assets.publicFonts,
        assets.publicImages,
        html.html
    )
);

// Default main task for development you should to use it after devInit
exports.dev = series(
    series(
        styles.styles,
        scripts.scripts,
        scripts.renameScript,
        scripts.deleteScript
    ),
    parallel(watch.sync, watch.startWatch)
);

// You can change it from helpers/Option.js
exports.devInit = series(
    series(
        this.deepCleanSrc || this.cleanSrc,
        this.convertFonts || this.rebaseFonts,
        this.resizeImages || this.rebaseImages,
        styles.styles,
        scripts.scripts,
        scripts.renameScript,
        scripts.deleteScript
    )
);

exports.rename = scripts.renameScript;
