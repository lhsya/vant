// src/index.ts
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
export {
  VantResolver
};
