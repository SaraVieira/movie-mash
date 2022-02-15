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
exports.id = "pages/api/movies/watched";
exports.ids = ["pages/api/movies/watched"];
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

/***/ "(api)/./src/pages/api/movies/watched.ts":
/*!*****************************************!*\
  !*** ./src/pages/api/movies/watched.ts ***!
  \*****************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__) => {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _src_helpers_prisma__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/src/helpers/prisma */ \"(api)/./src/helpers/prisma.ts\");\n/* harmony import */ var camelcase_keys__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! camelcase-keys */ \"camelcase-keys\");\n/* harmony import */ var camelcase_keys__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(camelcase_keys__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var lodash_es__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash-es */ \"lodash-es\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([lodash_es__WEBPACK_IMPORTED_MODULE_2__]);\nlodash_es__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? await __webpack_async_dependencies__ : __webpack_async_dependencies__)[0];\n\n\n\nconst New = async (req, res)=>{\n    if (req.method === \"POST\") {\n        return;\n    }\n    try {\n        const ourMovies = await _src_helpers_prisma__WEBPACK_IMPORTED_MODULE_0__[\"default\"].movies.findMany({\n            where: {\n                OR: [\n                    {\n                        liked: {\n                            not: null\n                        }\n                    },\n                    {\n                        disliked: {\n                            not: null\n                        }\n                    }, \n                ],\n                NOT: {\n                    liked: false,\n                    disliked: false\n                }\n            },\n            include: {\n                posters: true,\n                genres: true\n            }\n        });\n        res.json(camelcase_keys__WEBPACK_IMPORTED_MODULE_1___default()({\n            results: ourMovies.map((movie)=>({\n                    ...movie,\n                    posters: (0,lodash_es__WEBPACK_IMPORTED_MODULE_2__.omit)(movie.posters[0], \"id\")\n                })\n            )\n        }, {\n            deep: true\n        }));\n    } catch (e) {\n        // eslint-disable-next-line no-console\n        console.log(e);\n        res.status(500).json(e);\n    }\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (New);\n\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvcGFnZXMvYXBpL21vdmllcy93YXRjaGVkLnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQXlDO0FBRUM7QUFDVjtBQUloQyxLQUFLLENBQUNHLEdBQUcsVUFBVUMsR0FBbUIsRUFBRUMsR0FBb0IsR0FBSyxDQUFDO0lBQ2hFLEVBQUUsRUFBRUQsR0FBRyxDQUFDRSxNQUFNLEtBQUssQ0FBTSxPQUFFLENBQUM7UUFDMUIsTUFBTTtJQUNSLENBQUM7SUFFRCxHQUFHLENBQUMsQ0FBQztRQUNILEtBQUssQ0FBQ0MsU0FBUyxHQUFHLEtBQUssQ0FBQ1AsMkVBQXNCLENBQUMsQ0FBQztZQUM5Q1UsS0FBSyxFQUFFLENBQUM7Z0JBQ05DLEVBQUUsRUFBRSxDQUFDO29CQUNILENBQUM7d0JBQ0NDLEtBQUssRUFBRSxDQUFDOzRCQUNOQyxHQUFHLEVBQUUsSUFBSTt3QkFDWCxDQUFDO29CQUNILENBQUM7b0JBQ0QsQ0FBQzt3QkFDQ0MsUUFBUSxFQUFFLENBQUM7NEJBQ1RELEdBQUcsRUFBRSxJQUFJO3dCQUNYLENBQUM7b0JBQ0gsQ0FBQztnQkFDSCxDQUFDO2dCQUNERSxHQUFHLEVBQUUsQ0FBQztvQkFDSkgsS0FBSyxFQUFFLEtBQUs7b0JBQ1pFLFFBQVEsRUFBRSxLQUFLO2dCQUNqQixDQUFDO1lBQ0gsQ0FBQztZQUNERSxPQUFPLEVBQUUsQ0FBQztnQkFDUkMsT0FBTyxFQUFFLElBQUk7Z0JBQ2JDLE1BQU0sRUFBRSxJQUFJO1lBQ2QsQ0FBQztRQUNILENBQUM7UUFFRGIsR0FBRyxDQUFDYyxJQUFJLENBQ05sQixxREFBYSxDQUNYLENBQUM7WUFDQ21CLE9BQU8sRUFBRWIsU0FBUyxDQUFDYyxHQUFHLEVBQUVDLEtBQUssSUFBTSxDQUFDO3VCQUMvQkEsS0FBSztvQkFDUkwsT0FBTyxFQUFFZiwrQ0FBSSxDQUFDb0IsS0FBSyxDQUFDTCxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUk7Z0JBQ3RDLENBQUM7O1FBQ0gsQ0FBQyxFQUNELENBQUM7WUFBQ00sSUFBSSxFQUFFLElBQUk7UUFBQyxDQUFDO0lBR3BCLENBQUMsQ0FBQyxLQUFLLEVBQUVDLENBQUMsRUFBRSxDQUFDO1FBQ1gsRUFBc0M7UUFDdENDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDRixDQUFDO1FBQ2JuQixHQUFHLENBQUNzQixNQUFNLENBQUMsR0FBRyxFQUFFUixJQUFJLENBQUNLLENBQUM7SUFDeEIsQ0FBQztBQUNILENBQUM7QUFFRCxpRUFBZXJCLEdBQUcsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL21vdmllLW1hc2gvLi9zcmMvcGFnZXMvYXBpL21vdmllcy93YXRjaGVkLnRzPzRiNDIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHByaXNtYSBmcm9tIFwiQC9zcmMvaGVscGVycy9wcmlzbWFcIjtcblxuaW1wb3J0IGNhbWVsY2FzZUtleXMgZnJvbSBcImNhbWVsY2FzZS1rZXlzXCI7XG5pbXBvcnQgeyBvbWl0IH0gZnJvbSBcImxvZGFzaC1lc1wiO1xuXG5pbXBvcnQgdHlwZSB7IE5leHRBcGlSZXF1ZXN0LCBOZXh0QXBpUmVzcG9uc2UgfSBmcm9tIFwibmV4dFwiO1xuXG5jb25zdCBOZXcgPSBhc3luYyAocmVxOiBOZXh0QXBpUmVxdWVzdCwgcmVzOiBOZXh0QXBpUmVzcG9uc2UpID0+IHtcbiAgaWYgKHJlcS5tZXRob2QgPT09IFwiUE9TVFwiKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBvdXJNb3ZpZXMgPSBhd2FpdCBwcmlzbWEubW92aWVzLmZpbmRNYW55KHtcbiAgICAgIHdoZXJlOiB7XG4gICAgICAgIE9SOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbGlrZWQ6IHtcbiAgICAgICAgICAgICAgbm90OiBudWxsLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGRpc2xpa2VkOiB7XG4gICAgICAgICAgICAgIG5vdDogbnVsbCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgICAgTk9UOiB7XG4gICAgICAgICAgbGlrZWQ6IGZhbHNlLFxuICAgICAgICAgIGRpc2xpa2VkOiBmYWxzZSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBpbmNsdWRlOiB7XG4gICAgICAgIHBvc3RlcnM6IHRydWUsXG4gICAgICAgIGdlbnJlczogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICByZXMuanNvbihcbiAgICAgIGNhbWVsY2FzZUtleXMoXG4gICAgICAgIHtcbiAgICAgICAgICByZXN1bHRzOiBvdXJNb3ZpZXMubWFwKChtb3ZpZSkgPT4gKHtcbiAgICAgICAgICAgIC4uLm1vdmllLFxuICAgICAgICAgICAgcG9zdGVyczogb21pdChtb3ZpZS5wb3N0ZXJzWzBdLCBcImlkXCIpLFxuICAgICAgICAgIH0pKSxcbiAgICAgICAgfSxcbiAgICAgICAgeyBkZWVwOiB0cnVlIH1cbiAgICAgIClcbiAgICApO1xuICB9IGNhdGNoIChlKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICBjb25zb2xlLmxvZyhlKTtcbiAgICByZXMuc3RhdHVzKDUwMCkuanNvbihlKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgTmV3O1xuIl0sIm5hbWVzIjpbInByaXNtYSIsImNhbWVsY2FzZUtleXMiLCJvbWl0IiwiTmV3IiwicmVxIiwicmVzIiwibWV0aG9kIiwib3VyTW92aWVzIiwibW92aWVzIiwiZmluZE1hbnkiLCJ3aGVyZSIsIk9SIiwibGlrZWQiLCJub3QiLCJkaXNsaWtlZCIsIk5PVCIsImluY2x1ZGUiLCJwb3N0ZXJzIiwiZ2VucmVzIiwianNvbiIsInJlc3VsdHMiLCJtYXAiLCJtb3ZpZSIsImRlZXAiLCJlIiwiY29uc29sZSIsImxvZyIsInN0YXR1cyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./src/pages/api/movies/watched.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./src/pages/api/movies/watched.ts"));
module.exports = __webpack_exports__;

})();