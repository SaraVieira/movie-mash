"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/movies/watchlist";
exports.ids = ["pages/api/movies/watchlist"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "camelcase-keys":
/*!*********************************!*\
  !*** external "camelcase-keys" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("camelcase-keys");

/***/ }),

/***/ "lodash-es":
/*!****************************!*\
  !*** external "lodash-es" ***!
  \****************************/
/***/ ((module) => {

module.exports = import("lodash-es");;

/***/ }),

/***/ "(api)/./src/helpers/prisma.ts":
/*!*******************************!*\
  !*** ./src/helpers/prisma.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst prisma = global.prisma || new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient({\n    log: [\n        \"query\"\n    ]\n});\nif (true) global.prisma = prisma;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (prisma);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvaGVscGVycy9wcmlzbWEudHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQTZDO0FBUzdDLEtBQUssQ0FBQ0MsTUFBTSxHQUNWQyxNQUFNLENBQUNELE1BQU0sSUFDYixHQUFHLENBQUNELHdEQUFZLENBQUMsQ0FBQztJQUNoQkcsR0FBRyxFQUFFLENBQUM7UUFBQSxDQUFPO0lBQUEsQ0FBQztBQUNoQixDQUFDO0FBRUgsRUFBRSxFQWZGLElBZXlDLEVBQUVELE1BQU0sQ0FBQ0QsTUFBTSxHQUFHQSxNQUFNO0FBRWpFLGlFQUFlQSxNQUFNLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tb3ZpZS1tYXNoLy4vc3JjL2hlbHBlcnMvcHJpc21hLnRzPzdmNTYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJpc21hQ2xpZW50IH0gZnJvbSBcIkBwcmlzbWEvY2xpZW50XCI7XG5cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgLy8gYWxsb3cgZ2xvYmFsIGB2YXJgIGRlY2xhcmF0aW9uc1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdmFyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuICB2YXIgcHJpc21hOiBQcmlzbWFDbGllbnQgfCB1bmRlZmluZWQ7XG59XG5cbmNvbnN0IHByaXNtYSA9XG4gIGdsb2JhbC5wcmlzbWEgfHxcbiAgbmV3IFByaXNtYUNsaWVudCh7XG4gICAgbG9nOiBbXCJxdWVyeVwiXSxcbiAgfSk7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIGdsb2JhbC5wcmlzbWEgPSBwcmlzbWE7XG5cbmV4cG9ydCBkZWZhdWx0IHByaXNtYTtcbiJdLCJuYW1lcyI6WyJQcmlzbWFDbGllbnQiLCJwcmlzbWEiLCJnbG9iYWwiLCJsb2ciXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./src/helpers/prisma.ts\n");

/***/ }),

/***/ "(api)/./src/pages/api/movies/watchlist.ts":
/*!*******************************************!*\
  !*** ./src/pages/api/movies/watchlist.ts ***!
  \*******************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__) => {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _src_helpers_prisma__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/src/helpers/prisma */ \"(api)/./src/helpers/prisma.ts\");\n/* harmony import */ var camelcase_keys__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! camelcase-keys */ \"camelcase-keys\");\n/* harmony import */ var camelcase_keys__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(camelcase_keys__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var lodash_es__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash-es */ \"lodash-es\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([lodash_es__WEBPACK_IMPORTED_MODULE_2__]);\nlodash_es__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? await __webpack_async_dependencies__ : __webpack_async_dependencies__)[0];\n\n\n\nconst New = async (req, res)=>{\n    if (req.method === \"POST\") {\n        return;\n    }\n    try {\n        const ourMovies = await _src_helpers_prisma__WEBPACK_IMPORTED_MODULE_0__[\"default\"].movies.findMany({\n            where: {\n                watchlist: true\n            },\n            include: {\n                posters: true,\n                genres: true\n            }\n        });\n        res.json(camelcase_keys__WEBPACK_IMPORTED_MODULE_1___default()({\n            results: ourMovies.map((movie)=>({\n                    ...movie,\n                    posters: (0,lodash_es__WEBPACK_IMPORTED_MODULE_2__.omit)(movie.posters[0], \"id\")\n                })\n            )\n        }, {\n            deep: true\n        }));\n    } catch (e) {\n        // eslint-disable-next-line no-console\n        console.log(e);\n        res.status(500).json(e);\n    }\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (New);\n\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvcGFnZXMvYXBpL21vdmllcy93YXRjaGxpc3QudHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBeUM7QUFFQztBQUNWO0FBSWhDLEtBQUssQ0FBQ0csR0FBRyxVQUFVQyxHQUFtQixFQUFFQyxHQUFvQixHQUFLLENBQUM7SUFDaEUsRUFBRSxFQUFFRCxHQUFHLENBQUNFLE1BQU0sS0FBSyxDQUFNLE9BQUUsQ0FBQztRQUMxQixNQUFNO0lBQ1IsQ0FBQztJQUVELEdBQUcsQ0FBQyxDQUFDO1FBQ0gsS0FBSyxDQUFDQyxTQUFTLEdBQUcsS0FBSyxDQUFDUCwyRUFBc0IsQ0FBQyxDQUFDO1lBQzlDVSxLQUFLLEVBQUUsQ0FBQztnQkFDTkMsU0FBUyxFQUFFLElBQUk7WUFDakIsQ0FBQztZQUNEQyxPQUFPLEVBQUUsQ0FBQztnQkFDUkMsT0FBTyxFQUFFLElBQUk7Z0JBQ2JDLE1BQU0sRUFBRSxJQUFJO1lBQ2QsQ0FBQztRQUNILENBQUM7UUFFRFQsR0FBRyxDQUFDVSxJQUFJLENBQ05kLHFEQUFhLENBQ1gsQ0FBQztZQUNDZSxPQUFPLEVBQUVULFNBQVMsQ0FBQ1UsR0FBRyxFQUFFQyxLQUFLLElBQU0sQ0FBQzt1QkFDL0JBLEtBQUs7b0JBQ1JMLE9BQU8sRUFBRVgsK0NBQUksQ0FBQ2dCLEtBQUssQ0FBQ0wsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFJO2dCQUN0QyxDQUFDOztRQUNILENBQUMsRUFDRCxDQUFDO1lBQUNNLElBQUksRUFBRSxJQUFJO1FBQUMsQ0FBQztJQUdwQixDQUFDLENBQUMsS0FBSyxFQUFFQyxDQUFDLEVBQUUsQ0FBQztRQUNYLEVBQXNDO1FBQ3RDQyxPQUFPLENBQUNDLEdBQUcsQ0FBQ0YsQ0FBQztRQUNiZixHQUFHLENBQUNrQixNQUFNLENBQUMsR0FBRyxFQUFFUixJQUFJLENBQUNLLENBQUM7SUFDeEIsQ0FBQztBQUNILENBQUM7QUFFRCxpRUFBZWpCLEdBQUcsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL21vdmllLW1hc2gvLi9zcmMvcGFnZXMvYXBpL21vdmllcy93YXRjaGxpc3QudHM/YmEwNCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcHJpc21hIGZyb20gXCJAL3NyYy9oZWxwZXJzL3ByaXNtYVwiO1xuXG5pbXBvcnQgY2FtZWxjYXNlS2V5cyBmcm9tIFwiY2FtZWxjYXNlLWtleXNcIjtcbmltcG9ydCB7IG9taXQgfSBmcm9tIFwibG9kYXNoLWVzXCI7XG5cbmltcG9ydCB0eXBlIHsgTmV4dEFwaVJlcXVlc3QsIE5leHRBcGlSZXNwb25zZSB9IGZyb20gXCJuZXh0XCI7XG5cbmNvbnN0IE5ldyA9IGFzeW5jIChyZXE6IE5leHRBcGlSZXF1ZXN0LCByZXM6IE5leHRBcGlSZXNwb25zZSkgPT4ge1xuICBpZiAocmVxLm1ldGhvZCA9PT0gXCJQT1NUXCIpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB0cnkge1xuICAgIGNvbnN0IG91ck1vdmllcyA9IGF3YWl0IHByaXNtYS5tb3ZpZXMuZmluZE1hbnkoe1xuICAgICAgd2hlcmU6IHtcbiAgICAgICAgd2F0Y2hsaXN0OiB0cnVlLFxuICAgICAgfSxcbiAgICAgIGluY2x1ZGU6IHtcbiAgICAgICAgcG9zdGVyczogdHJ1ZSxcbiAgICAgICAgZ2VucmVzOiB0cnVlLFxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIHJlcy5qc29uKFxuICAgICAgY2FtZWxjYXNlS2V5cyhcbiAgICAgICAge1xuICAgICAgICAgIHJlc3VsdHM6IG91ck1vdmllcy5tYXAoKG1vdmllKSA9PiAoe1xuICAgICAgICAgICAgLi4ubW92aWUsXG4gICAgICAgICAgICBwb3N0ZXJzOiBvbWl0KG1vdmllLnBvc3RlcnNbMF0sIFwiaWRcIiksXG4gICAgICAgICAgfSkpLFxuICAgICAgICB9LFxuICAgICAgICB7IGRlZXA6IHRydWUgfVxuICAgICAgKVxuICAgICk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgIGNvbnNvbGUubG9nKGUpO1xuICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKGUpO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBOZXc7XG4iXSwibmFtZXMiOlsicHJpc21hIiwiY2FtZWxjYXNlS2V5cyIsIm9taXQiLCJOZXciLCJyZXEiLCJyZXMiLCJtZXRob2QiLCJvdXJNb3ZpZXMiLCJtb3ZpZXMiLCJmaW5kTWFueSIsIndoZXJlIiwid2F0Y2hsaXN0IiwiaW5jbHVkZSIsInBvc3RlcnMiLCJnZW5yZXMiLCJqc29uIiwicmVzdWx0cyIsIm1hcCIsIm1vdmllIiwiZGVlcCIsImUiLCJjb25zb2xlIiwibG9nIiwic3RhdHVzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./src/pages/api/movies/watchlist.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./src/pages/api/movies/watchlist.ts"));
module.exports = __webpack_exports__;

})();