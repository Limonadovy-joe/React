import path from 'path';
const ABSOLUTE_BASE = path.normalize(path.join(__dirname, ".."));

// export const DIST_DIR = path.join(ABSOLUTE_BASE, 'dist');
// export const SRC_DIR = path.join(ABSOLUTE_BASE, 'src');
export const HOT_RELOAD_PORT = process.env.HOT_RELOAD_PORT || 8080;
