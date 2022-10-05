const { series, parallel } = require("gulp");
const styles = require("./tasks/Style");
const scripts = require("./tasks/Script");
const watch = require("./tasks/Server");

exports.default = series(
    series(styles.styles, scripts.scripts),
    parallel(watch.sync, watch.startWatch)
);
