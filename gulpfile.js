const { series, parallel } = require("gulp");
const styles = require("./tasks/Styles");

exports.default = series(styles.styles, styles.unusable);
