/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/*!*********************!*\
  !*** ./src/test.js ***!
  \*********************/
eval("const object = {\n  name: \"john\",\n  surname: \"Bill\",\n};\nObject.defineProperty(object, \"fullName\", {\n  get() {\n    return this.name + this.surname;\n  },\n});\nconsole.log(object.fullName);\n\n\n//# sourceURL=webpack://react/./src/test.js?");
/******/ })()
;