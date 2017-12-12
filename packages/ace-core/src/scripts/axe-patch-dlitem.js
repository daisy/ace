'use strict';

(function axePatch(window) {
  const axe = window.axe;
  axe._audit.checks.dlitem.evaluate = function evaluate(node, options) {
    return node.parentNode.nodeName.toUpperCase() === 'DL';
  }
}(window));
