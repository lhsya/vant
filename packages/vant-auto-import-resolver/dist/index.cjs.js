"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  VantResolver: () => VantResolver
});
module.exports = __toCommonJS(src_exports);
function kebabCase(key) {
  const result = key.replace(/([A-Z])/g, " $1").trim();
  return result.split(" ").join("-").toLowerCase();
}
function getModuleType(ssr) {
  return ssr ? "lib" : "es";
}
function getSideEffects(dirName, options) {
  const { importStyle = true, ssr = false } = options;
  if (!importStyle)
    return;
  const moduleType = getModuleType(ssr);
  if (importStyle === "less")
    return `vant/${moduleType}/${dirName}/style/less`;
  return `vant/${moduleType}/${dirName}/style/index`;
}
function VantResolver(options = {}) {
  const { ssr = false } = options;
  const moduleType = getModuleType(ssr);
  return {
    type: "component",
    resolve: (name) => {
      if (name.startsWith("Van")) {
        const partialName = name.slice(3);
        return {
          name: partialName,
          from: `vant/${moduleType}`,
          sideEffects: getSideEffects(kebabCase(partialName), options)
        };
      }
    }
  };
}
