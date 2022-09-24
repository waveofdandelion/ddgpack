const { series, parallel } = require("gulp");
const styles = require("./tasks/Style");
const scripts = require("./tasks/Script");

exports.default = series(series(styles.styles), scripts.scripts);
