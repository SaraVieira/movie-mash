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
exports.id = "pages/api/auth/[...nextauth]";
exports.ids = ["pages/api/auth/[...nextauth]"];
exports.modules = {

/***/ "@next-auth/prisma-adapter":
/*!********************************************!*\
  !*** external "@next-auth/prisma-adapter" ***!
  \********************************************/
/***/ ((module) => {

module.exports = require("@next-auth/prisma-adapter");

/***/ }),

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "bcryptjs":
/*!***************************!*\
  !*** external "bcryptjs" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("bcryptjs");

/***/ }),

/***/ "next-auth":
/*!****************************!*\
  !*** external "next-auth" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("next-auth");

/***/ }),

/***/ "next-auth/providers/credentials":
/*!**************************************************!*\
  !*** external "next-auth/providers/credentials" ***!
  \**************************************************/
/***/ ((module) => {

module.exports = require("next-auth/providers/credentials");

/***/ }),

/***/ "(api)/./src/helpers/password.ts":
/*!*********************************!*\
  !*** ./src/helpers/password.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"hashPassword\": () => (/* binding */ hashPassword),\n/* harmony export */   \"verifyPassword\": () => (/* binding */ verifyPassword)\n/* harmony export */ });\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bcryptjs */ \"bcryptjs\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_0__);\n\nasync function hashPassword(password) {\n    const hashedPassword = await (0,bcryptjs__WEBPACK_IMPORTED_MODULE_0__.hash)(password, 12);\n    return hashedPassword;\n}\nasync function verifyPassword(password, hashedPassword) {\n    const isValid = await (0,bcryptjs__WEBPACK_IMPORTED_MODULE_0__.compare)(password, hashedPassword);\n    return isValid;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvaGVscGVycy9wYXNzd29yZC50cy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQXdDO0FBRWpDLGVBQWVFLFlBQVksQ0FBQ0MsUUFBZ0IsRUFBRSxDQUFDO0lBQ3BELEtBQUssQ0FBQ0MsY0FBYyxHQUFHLEtBQUssQ0FBQ0osOENBQUksQ0FBQ0csUUFBUSxFQUFFLEVBQUU7SUFDOUMsTUFBTSxDQUFDQyxjQUFjO0FBQ3ZCLENBQUM7QUFFTSxlQUFlQyxjQUFjLENBQUNGLFFBQWdCLEVBQUVDLGNBQXNCLEVBQUUsQ0FBQztJQUM5RSxLQUFLLENBQUNFLE9BQU8sR0FBRyxLQUFLLENBQUNMLGlEQUFPLENBQUNFLFFBQVEsRUFBRUMsY0FBYztJQUN0RCxNQUFNLENBQUNFLE9BQU87QUFDaEIsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL21vdmllLW1hc2gvLi9zcmMvaGVscGVycy9wYXNzd29yZC50cz9lY2Y5Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGhhc2gsIGNvbXBhcmUgfSBmcm9tIFwiYmNyeXB0anNcIjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGhhc2hQYXNzd29yZChwYXNzd29yZDogc3RyaW5nKSB7XG4gIGNvbnN0IGhhc2hlZFBhc3N3b3JkID0gYXdhaXQgaGFzaChwYXNzd29yZCwgMTIpO1xuICByZXR1cm4gaGFzaGVkUGFzc3dvcmQ7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB2ZXJpZnlQYXNzd29yZChwYXNzd29yZDogc3RyaW5nLCBoYXNoZWRQYXNzd29yZDogc3RyaW5nKSB7XG4gIGNvbnN0IGlzVmFsaWQgPSBhd2FpdCBjb21wYXJlKHBhc3N3b3JkLCBoYXNoZWRQYXNzd29yZCk7XG4gIHJldHVybiBpc1ZhbGlkO1xufVxuIl0sIm5hbWVzIjpbImhhc2giLCJjb21wYXJlIiwiaGFzaFBhc3N3b3JkIiwicGFzc3dvcmQiLCJoYXNoZWRQYXNzd29yZCIsInZlcmlmeVBhc3N3b3JkIiwiaXNWYWxpZCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./src/helpers/password.ts\n");

/***/ }),

/***/ "(api)/./src/helpers/prisma.ts":
/*!*******************************!*\
  !*** ./src/helpers/prisma.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst prisma = global.prisma || new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient({\n    log: [\n        \"query\"\n    ]\n});\nif (true) global.prisma = prisma;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (prisma);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvaGVscGVycy9wcmlzbWEudHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQTZDO0FBUzdDLEtBQUssQ0FBQ0MsTUFBTSxHQUNWQyxNQUFNLENBQUNELE1BQU0sSUFDYixHQUFHLENBQUNELHdEQUFZLENBQUMsQ0FBQztJQUNoQkcsR0FBRyxFQUFFLENBQUM7UUFBQSxDQUFPO0lBQUEsQ0FBQztBQUNoQixDQUFDO0FBRUgsRUFBRSxFQWZGLElBZXlDLEVBQUVELE1BQU0sQ0FBQ0QsTUFBTSxHQUFHQSxNQUFNO0FBRWpFLGlFQUFlQSxNQUFNLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tb3ZpZS1tYXNoLy4vc3JjL2hlbHBlcnMvcHJpc21hLnRzPzdmNTYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJpc21hQ2xpZW50IH0gZnJvbSBcIkBwcmlzbWEvY2xpZW50XCI7XG5cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgLy8gYWxsb3cgZ2xvYmFsIGB2YXJgIGRlY2xhcmF0aW9uc1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdmFyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuICB2YXIgcHJpc21hOiBQcmlzbWFDbGllbnQgfCB1bmRlZmluZWQ7XG59XG5cbmNvbnN0IHByaXNtYSA9XG4gIGdsb2JhbC5wcmlzbWEgfHxcbiAgbmV3IFByaXNtYUNsaWVudCh7XG4gICAgbG9nOiBbXCJxdWVyeVwiXSxcbiAgfSk7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIGdsb2JhbC5wcmlzbWEgPSBwcmlzbWE7XG5cbmV4cG9ydCBkZWZhdWx0IHByaXNtYTtcbiJdLCJuYW1lcyI6WyJQcmlzbWFDbGllbnQiLCJwcmlzbWEiLCJnbG9iYWwiLCJsb2ciXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./src/helpers/prisma.ts\n");

/***/ }),

/***/ "(api)/./src/pages/api/auth/[...nextauth].ts":
/*!*********************************************!*\
  !*** ./src/pages/api/auth/[...nextauth].ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"next-auth\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _next_auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @next-auth/prisma-adapter */ \"@next-auth/prisma-adapter\");\n/* harmony import */ var _next_auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_next_auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next-auth/providers/credentials */ \"next-auth/providers/credentials\");\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _src_helpers_password__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/src/helpers/password */ \"(api)/./src/helpers/password.ts\");\n/* harmony import */ var _src_helpers_prisma__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/src/helpers/prisma */ \"(api)/./src/helpers/prisma.ts\");\n\n\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (next_auth__WEBPACK_IMPORTED_MODULE_0___default()({\n    adapter: (0,_next_auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_1__.PrismaAdapter)(_src_helpers_prisma__WEBPACK_IMPORTED_MODULE_4__[\"default\"]),\n    providers: [\n        next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_2___default()({\n            async authorize (credentials) {\n                if (!(credentials === null || credentials === void 0 ? void 0 : credentials.password) || !(credentials === null || credentials === void 0 ? void 0 : credentials.email)) {\n                    throw new Error(\"User not fund\");\n                }\n                const user = await _src_helpers_prisma__WEBPACK_IMPORTED_MODULE_4__[\"default\"].user.findFirst({\n                    where: {\n                        email: credentials.email\n                    }\n                });\n                if (!user) {\n                    throw new Error(\"User not fund\");\n                }\n                const isValid = await (0,_src_helpers_password__WEBPACK_IMPORTED_MODULE_3__.verifyPassword)(credentials.password, user.password);\n                if (!isValid) {\n                    throw new Error(\"Could not log you in!\");\n                }\n                return {\n                    email: user.email\n                };\n            },\n            name: \"Email & Password\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"email\",\n                    placeholder: \"hello@example.com\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            }\n        }), \n    ],\n    pages: {\n        signIn: \"/auth\",\n        newUser: \"/auth\"\n    },\n    session: {\n        strategy: \"jwt\"\n    }\n}));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvcGFnZXMvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS50cy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBZ0M7QUFDeUI7QUFDUTtBQUNWO0FBQ2Q7QUFFekMsaUVBQWVBLGdEQUFRLENBQUMsQ0FBQztJQUN2QkssT0FBTyxFQUFFSix3RUFBYSxDQUFDRywyREFBTTtJQUM3QkUsU0FBUyxFQUFFLENBQUM7UUFDVkosc0VBQW1CLENBQUMsQ0FBQztrQkFDYkssU0FBUyxFQUNiQyxXQUE2RCxFQUM3RCxDQUFDO2dCQUNELEVBQUUsSUFBR0EsV0FBVyxhQUFYQSxXQUFXLEtBQVhBLElBQUksQ0FBSkEsQ0FBcUIsR0FBckJBLElBQUksQ0FBSkEsQ0FBcUIsR0FBckJBLFdBQVcsQ0FBRUMsUUFBUSxPQUFLRCxXQUFXLGFBQVhBLFdBQVcsS0FBWEEsSUFBSSxDQUFKQSxDQUFrQixHQUFsQkEsSUFBSSxDQUFKQSxDQUFrQixHQUFsQkEsV0FBVyxDQUFFRSxLQUFLLEdBQUUsQ0FBQztvQkFDbEQsS0FBSyxDQUFDLEdBQUcsQ0FBQ0MsS0FBSyxDQUFDLENBQWU7Z0JBQ2pDLENBQUM7Z0JBQ0QsS0FBSyxDQUFDQyxJQUFJLEdBQUcsS0FBSyxDQUFDUiwwRUFBcUIsQ0FBQyxDQUFDO29CQUN4Q1UsS0FBSyxFQUFFLENBQUM7d0JBQ05KLEtBQUssRUFBRUYsV0FBVyxDQUFDRSxLQUFLO29CQUMxQixDQUFDO2dCQUNILENBQUM7Z0JBRUQsRUFBRSxHQUFHRSxJQUFJLEVBQUUsQ0FBQztvQkFDVixLQUFLLENBQUMsR0FBRyxDQUFDRCxLQUFLLENBQUMsQ0FBZTtnQkFDakMsQ0FBQztnQkFFRCxLQUFLLENBQUNJLE9BQU8sR0FBRyxLQUFLLENBQUNaLHFFQUFjLENBQ2xDSyxXQUFXLENBQUNDLFFBQVEsRUFDcEJHLElBQUksQ0FBQ0gsUUFBUTtnQkFHZixFQUFFLEdBQUdNLE9BQU8sRUFBRSxDQUFDO29CQUNiLEtBQUssQ0FBQyxHQUFHLENBQUNKLEtBQUssQ0FBQyxDQUF1QjtnQkFDekMsQ0FBQztnQkFDRCxNQUFNLENBQUMsQ0FBQztvQkFBQ0QsS0FBSyxFQUFFRSxJQUFJLENBQUNGLEtBQUs7Z0JBQUMsQ0FBQztZQUM5QixDQUFDO1lBQ0RNLElBQUksRUFBRSxDQUFrQjtZQUN4QlIsV0FBVyxFQUFFLENBQUM7Z0JBQ1pFLEtBQUssRUFBRSxDQUFDO29CQUNOTyxLQUFLLEVBQUUsQ0FBTztvQkFDZEMsSUFBSSxFQUFFLENBQU87b0JBQ2JDLFdBQVcsRUFBRSxDQUFtQjtnQkFDbEMsQ0FBQztnQkFDRFYsUUFBUSxFQUFFLENBQUM7b0JBQUNRLEtBQUssRUFBRSxDQUFVO29CQUFFQyxJQUFJLEVBQUUsQ0FBVTtnQkFBQyxDQUFDO1lBQ25ELENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQztJQUNERSxLQUFLLEVBQUUsQ0FBQztRQUNOQyxNQUFNLEVBQUUsQ0FBTztRQUNmQyxPQUFPLEVBQUUsQ0FBTztJQUNsQixDQUFDO0lBQ0RDLE9BQU8sRUFBRSxDQUFDO1FBQUNDLFFBQVEsRUFBRSxDQUFLO0lBQUMsQ0FBQztBQUM5QixDQUFDLENBQUMsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL21vdmllLW1hc2gvLi9zcmMvcGFnZXMvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS50cz81MGExIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBOZXh0QXV0aCBmcm9tIFwibmV4dC1hdXRoXCI7XG5pbXBvcnQgeyBQcmlzbWFBZGFwdGVyIH0gZnJvbSBcIkBuZXh0LWF1dGgvcHJpc21hLWFkYXB0ZXJcIjtcbmltcG9ydCBDcmVkZW50aWFsc1Byb3ZpZGVyIGZyb20gXCJuZXh0LWF1dGgvcHJvdmlkZXJzL2NyZWRlbnRpYWxzXCI7XG5pbXBvcnQgeyB2ZXJpZnlQYXNzd29yZCB9IGZyb20gXCJAL3NyYy9oZWxwZXJzL3Bhc3N3b3JkXCI7XG5pbXBvcnQgcHJpc21hIGZyb20gXCJAL3NyYy9oZWxwZXJzL3ByaXNtYVwiO1xuXG5leHBvcnQgZGVmYXVsdCBOZXh0QXV0aCh7XG4gIGFkYXB0ZXI6IFByaXNtYUFkYXB0ZXIocHJpc21hKSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgQ3JlZGVudGlhbHNQcm92aWRlcih7XG4gICAgICBhc3luYyBhdXRob3JpemUoXG4gICAgICAgIGNyZWRlbnRpYWxzOiBSZWNvcmQ8XCJlbWFpbFwiIHwgXCJwYXNzd29yZFwiLCBzdHJpbmc+IHwgdW5kZWZpbmVkXG4gICAgICApIHtcbiAgICAgICAgaWYgKCFjcmVkZW50aWFscz8ucGFzc3dvcmQgfHwgIWNyZWRlbnRpYWxzPy5lbWFpbCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVzZXIgbm90IGZ1bmRcIik7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IHByaXNtYS51c2VyLmZpbmRGaXJzdCh7XG4gICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgIGVtYWlsOiBjcmVkZW50aWFscy5lbWFpbCxcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIXVzZXIpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVc2VyIG5vdCBmdW5kXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgaXNWYWxpZCA9IGF3YWl0IHZlcmlmeVBhc3N3b3JkKFxuICAgICAgICAgIGNyZWRlbnRpYWxzLnBhc3N3b3JkLFxuICAgICAgICAgIHVzZXIucGFzc3dvcmRcbiAgICAgICAgKTtcblxuICAgICAgICBpZiAoIWlzVmFsaWQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZCBub3QgbG9nIHlvdSBpbiFcIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgZW1haWw6IHVzZXIuZW1haWwgfTtcbiAgICAgIH0sXG4gICAgICBuYW1lOiBcIkVtYWlsICYgUGFzc3dvcmRcIixcbiAgICAgIGNyZWRlbnRpYWxzOiB7XG4gICAgICAgIGVtYWlsOiB7XG4gICAgICAgICAgbGFiZWw6IFwiRW1haWxcIixcbiAgICAgICAgICB0eXBlOiBcImVtYWlsXCIsXG4gICAgICAgICAgcGxhY2Vob2xkZXI6IFwiaGVsbG9AZXhhbXBsZS5jb21cIixcbiAgICAgICAgfSxcbiAgICAgICAgcGFzc3dvcmQ6IHsgbGFiZWw6IFwiUGFzc3dvcmRcIiwgdHlwZTogXCJwYXNzd29yZFwiIH0sXG4gICAgICB9LFxuICAgIH0pLFxuICBdLFxuICBwYWdlczoge1xuICAgIHNpZ25JbjogXCIvYXV0aFwiLFxuICAgIG5ld1VzZXI6IFwiL2F1dGhcIixcbiAgfSxcbiAgc2Vzc2lvbjogeyBzdHJhdGVneTogXCJqd3RcIiB9LFxufSk7XG4iXSwibmFtZXMiOlsiTmV4dEF1dGgiLCJQcmlzbWFBZGFwdGVyIiwiQ3JlZGVudGlhbHNQcm92aWRlciIsInZlcmlmeVBhc3N3b3JkIiwicHJpc21hIiwiYWRhcHRlciIsInByb3ZpZGVycyIsImF1dGhvcml6ZSIsImNyZWRlbnRpYWxzIiwicGFzc3dvcmQiLCJlbWFpbCIsIkVycm9yIiwidXNlciIsImZpbmRGaXJzdCIsIndoZXJlIiwiaXNWYWxpZCIsIm5hbWUiLCJsYWJlbCIsInR5cGUiLCJwbGFjZWhvbGRlciIsInBhZ2VzIiwic2lnbkluIiwibmV3VXNlciIsInNlc3Npb24iLCJzdHJhdGVneSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./src/pages/api/auth/[...nextauth].ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./src/pages/api/auth/[...nextauth].ts"));
module.exports = __webpack_exports__;

})();