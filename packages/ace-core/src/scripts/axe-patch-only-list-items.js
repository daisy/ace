'use strict';

/* 
This patch is needed to ensure that roles *inheriting* a listitem role are allowed
as list children.
E.g. `doc-biblioentry` and others as children of `ul`.
*/

(function axePatch(window) {
  const axe = window.axe;

  axe._audit.checks['only-listitems'].evaluate = function evaluate(node, options, virtualNode, context) {
    var dom = axe.commons.dom;
    var aria = axe.commons.aria;
    var getIsListItemRole = function getIsListItemRole(role, tagName) {
      return role === 'listitem' || aria.getRoleType(role) === 'listitem' || tagName === 'LI' && !role;
    };
    var getHasListItem = function getHasListItem(hasListItem, tagName, isListItemRole) {
      return hasListItem || tagName === 'LI' && isListItemRole || isListItemRole;
    };
    var base = {
      badNodes: [],
      isEmpty: true,
      hasNonEmptyTextNode: false,
      hasListItem: false,
      liItemsWithRole: 0
    };
    var out = virtualNode.children.reduce(function(out, _ref6) {
      var actualNode = _ref6.actualNode;
      var tagName = actualNode.nodeName.toUpperCase();
      if (actualNode.nodeType === 1 && dom.isVisible(actualNode, true, false)) {
        var role = (actualNode.getAttribute('role') || '').toLowerCase();
        var isListItemRole = getIsListItemRole(role, tagName);
        out.hasListItem = getHasListItem(out.hasListItem, tagName, isListItemRole);
        if (isListItemRole) {
          out.isEmpty = false;
        }
        if (tagName === 'LI' && !isListItemRole) {
          out.liItemsWithRole++;
        }
        if (tagName !== 'LI' && !isListItemRole) {
          out.badNodes.push(actualNode);
        }
      }
      if (actualNode.nodeType === 3) {
        if (actualNode.nodeValue.trim() !== '') {
          out.hasNonEmptyTextNode = true;
        }
      }
      return out;
    }, base);
    var virtualNodeChildrenOfTypeLi = virtualNode.children.filter(function(_ref7) {
      var actualNode = _ref7.actualNode;
      return actualNode.nodeName.toUpperCase() === 'LI';
    });
    var allLiItemsHaveRole = out.liItemsWithRole > 0 && virtualNodeChildrenOfTypeLi.length === out.liItemsWithRole;
    if (out.badNodes.length) {
      this.relatedNodes(out.badNodes);
    }
    var isInvalidListItem = !(out.hasListItem || out.isEmpty && !allLiItemsHaveRole);
    return isInvalidListItem || !!out.badNodes.length || out.hasNonEmptyTextNode;
  }
}(window));
