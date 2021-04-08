// /* eslint-disable */

// 'use strict';

// // var _bind = Function.prototype.apply.bind(Function.prototype.bind);
// // Object.defineProperty(Function.prototype, 'bind', {
// //     value: function(boundContext) {
// //         var boundFunction = _bind(this, arguments);
// //         boundFunction.boundContext = boundContext;
// //         return boundFunction;
// //     }
// // });

// (function (window, bind) {

//   Object.defineProperties(Function.prototype, {
//     'bind': {
//       value: function (boundContext) {
//         var newf = bind.apply(this, arguments);
//         newf.boundContext = boundContext;
//         return newf;
//       }
//     },
//     'isBound': {
//       value: function () {
//         return this.hasOwnProperty('boundContext');
//       }
//     }
//   });
// }(window, Function.prototype.bind));