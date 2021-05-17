const path = require('path');

const SRC_PATH = path.join(process.cwd(), 'src');
const DIST_PATH = path.join(process.cwd(), 'dist');
const PUBLIC_PATH = path.join(process.cwd(), 'public');

module.exports = {
  SRC_PATH,
  DIST_PATH,
  PUBLIC_PATH
};
