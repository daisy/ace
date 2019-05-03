'use strict';

/* 
This patch is needed to ensure that roles that do not explicitly define allowed elements
are still evaluated for the element they're used on.
E.g. `doc-cover` on `img`.
*/
(function axePatch(window) {
  const axe = window.axe;
  axe.commons.aria.isAriaRoleAllowedOnElement = function isAriaRoleAllowedOnElement(node, role) {
    var nodeName = node.nodeName.toUpperCase();
    var lookupTable = axe.commons.aria.lookupTable;
    if (matches(node, lookupTable.elementsAllowedNoRole)) {
      return false;
    }
    if (matches(node, lookupTable.elementsAllowedAnyRole)) {
      return true;
    }
    var roleValue = lookupTable.role[role];
    if (!roleValue) {
      return false;
    }
    var allowedElements = roleValue.allowedElements || [];
    var out = matches(node, allowedElements);
    if (Object.keys(lookupTable.evaluateRoleForElement).includes(nodeName)) {
      return lookupTable.evaluateRoleForElement[nodeName]({
        node: node,
        role: role,
        out: out
      });
    }
    return out;
  };
}(window));
