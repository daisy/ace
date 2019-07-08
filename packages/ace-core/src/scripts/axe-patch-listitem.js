'use strict';

/* 
This patch is needed to ensure that roles *inheriting* a list role are allowed
as listitem parents.
E.g. `<ul role="directory">` as parent of `li`.
*/

(function axePatch(window) {
  const axe = window.axe;

  axe._audit.checks['listitem'].evaluate = function evaluate(node, options, virtualNode, context) {
    const parent = axe.commons.dom.getComposedParent(node);
    if (!parent) {
        // Can only happen with detached DOM nodes and roots:
        return undefined;
    }

    const parentTagName = parent.nodeName.toUpperCase();
    const parentRole = (parent.getAttribute('role') || '').toLowerCase();

    if (parentRole === 'list') {
        return true;
    }

    if (parentRole && axe.commons.aria.isValidRole(parentRole)) {
        return aria.getRoleType(role) === 'list';
    }

    return ['UL', 'OL'].includes(parentTagName);
  }
}(window));
