'use strict';

let addScripts = (() => {
  var _ref = _asyncToGenerator(function* (paths, page) {
    // BEGIN HACK
    // Used to differentiate original `script` elements from the one
    // added by Puppeteer.
    // FIXME remove this hack when GoogleChrome/puppeteer#1179 is fixed
    yield page.$$eval('script', function (scripts) {
      scripts.forEach(function (script) {
        return script.setAttribute('data-ace-orig', '');
      });
    });
    /* eslint-disable no-restricted-syntax, no-await-in-loop */
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = paths[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        const path = _step.value;

        yield page.addScriptTag({ path });
      }
      /* eslint-enable no-restricted-syntax, no-await-in-loop */
      // BEGIN HACK
      // FIXME remove this hack when GoogleChrome/puppeteer#1179 is fixed
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    yield page.$$eval('script', function (scripts) {
      scripts.forEach(function (script) {
        if (script.hasAttribute('data-ace-orig')) {
          script.removeAttribute('data-ace-orig');
        } else {
          script.setAttribute('data-ace', '');
        }
      });
    });
    // END HACK
  });

  return function addScripts(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

module.exports = {
  addScripts
};