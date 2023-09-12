"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GENERATOR_DIR = exports.CWD = void 0;
const node_path_1 = require("node:path");
exports.CWD = process.cwd();
exports.GENERATOR_DIR = (0, node_path_1.join)(__dirname, '../generators');
