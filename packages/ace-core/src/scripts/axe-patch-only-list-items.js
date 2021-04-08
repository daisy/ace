// 'use strict';

// /* 
// This patch is needed to ensure that roles *inheriting* a listitem role are allowed
// as list children.
// E.g. `doc-biblioentry` and others as children of `ul`.
// */

// (function axePatch(window) {
//   const axe = window.axe;

//   // v4.0.2
//   // axe._audit.checks['only-listitems'].evaluate.toString()
//   // =>
//   // "function(e,t,r){var o=!1,i=!1,s=!0,l=[],u=[],c=[];return r.children.forEach(function(e){var t,r,n,a=e.actualNode;3!==a.nodeType||""===a.nodeValue.trim()?1===a.nodeType&&Object(d.isVisible)(a,!0,!1)&&(s=!1,t="LI"===a.nodeName.toUpperCase(),n="listitem"===(r=Object(m.getRole)(e)),t||n||l.push(a),t&&!n&&(u.push(a),c.includes(r)||c.push(r)),n&&(i=!0)):o=!0}),o||l.length?(this.relatedNodes(l),!0):!s&&!i&&(this.relatedNodes(u),this.data({messageKey:"roleNotValid",roles:c.join(", ")}),!0)}"

//   // in the WebPack bundle (node_modules/axe-core/axe.js)
//   // './lib/checks/lists/only-listitems-evaluate.js'

//   axe._audit.checks['only-listitems'].evaluate = function evaluate(node, options, virtualNode, context) {

//     // ----------------------------------------------------------------------------------------------------
//     // https://github.com/dequelabs/axe-core/blob/v4.0.2/lib/checks/lists/only-listitems-evaluate.js
//     // ----------------------------------------------------------------------------------------------------
//     // let hasNonEmptyTextNode = false;
//     // let atLeastOneListitem = false;
//     // let isEmpty = true;
//     // let badNodes = [];
//     // let badRoleNodes = [];
//     // let badRoles = [];
  
//     // virtualNode.children.forEach(vNode => {
//     //   const { actualNode } = vNode;
  
//     //   if (actualNode.nodeType === 3 && actualNode.nodeValue.trim() !== '') {
//     //     hasNonEmptyTextNode = true;
//     //     return;
//     //   }
  
//     //   if (actualNode.nodeType !== 1 || !isVisible(actualNode, true, false)) {
//     //     return;
//     //   }
  
//     //   isEmpty = false;
//     //   const isLi = actualNode.nodeName.toUpperCase() === 'LI';
//     //   const role = getRole(vNode);
//     //   const isListItemRole = role === 'listitem';
//     //   if (!isLi && !isListItemRole) {
//     //     badNodes.push(actualNode);
//     //   }
  
//     //   if (isLi && !isListItemRole) {
//     //     badRoleNodes.push(actualNode);
  
//     //     if (!badRoles.includes(role)) {
//     //       badRoles.push(role);
//     //     }
//     //   }
  
//     //   if (isListItemRole) {
//     //     atLeastOneListitem = true;
//     //   }
//     // });
  
//     // if (hasNonEmptyTextNode || badNodes.length) {
//     //   this.relatedNodes(badNodes);
//     //   return true;
//     // }
  
//     // if (isEmpty || atLeastOneListitem) {
//     //   return false;
//     // }
  
//     // this.relatedNodes(badRoleNodes);
//     // this.data({
//     //   messageKey: 'roleNotValid',
//     //   roles: badRoles.join(', ')
//     // });
//     // return true;

//     // ----------------------------------------------------------------------------------------------------
//     // https://github.com/dequelabs/axe-core/blob/v3.5.4/lib/checks/lists/only-listitems.js
//     // ----------------------------------------------------------------------------------------------------
//     // const { dom, aria } = axe.commons;

//     // let hasNonEmptyTextNode = false;
//     // let atLeastOneListitem = false;
//     // let isEmpty = true;
//     // let badNodes = [];
//     // let badRoleNodes = [];
//     // let badRoles = [];

//     // virtualNode.children.forEach(vNode => {
//     //   const { actualNode } = vNode;

//     //   if (actualNode.nodeType === 3 && actualNode.nodeValue.trim() !== '') {
//     //     hasNonEmptyTextNode = true;
//     //     return;
//     //   }

//     //   if (actualNode.nodeType !== 1 || !dom.isVisible(actualNode, true, false)) {
//     //     return;
//     //   }

//     //   isEmpty = false;
//     //   const isLi = actualNode.nodeName.toUpperCase() === 'LI';
//     //   const role = aria.getRole(vNode);
//     //   const isListItemRole = role === 'listitem';

//     //   if (!isLi && !isListItemRole) {
//     //     badNodes.push(actualNode);
//     //   }

//     //   if (isLi && !isListItemRole) {
//     //     badRoleNodes.push(actualNode);

//     //     if (!badRoles.includes(role)) {
//     //       badRoles.push(role);
//     //     }
//     //   }

//     //   if (isListItemRole) {
//     //     atLeastOneListitem = true;
//     //   }
//     // });

//     // if (hasNonEmptyTextNode || badNodes.length) {
//     //   this.relatedNodes(badNodes);
//     //   return true;
//     // }

//     // if (isEmpty || atLeastOneListitem) {
//     //   return false;
//     // }

//     // this.relatedNodes(badRoleNodes);
//     // this.data({
//     //   messageKey: 'roleNotValid',
//     //   roles: badRoles.join(', ')
//     // });
//     // return true;

//     // ----------------------------------------------------------------------------------------------------
//     // https://github.com/dequelabs/axe-core/blob/v3.2.2/lib/checks/lists/only-listitems.js
//     // ----------------------------------------------------------------------------------------------------
//     // const { dom } = axe.commons;
//     // const getIsListItemRole = (role, tagName) => {
//     //   return role === 'listitem' || (tagName === 'LI' && !role);
//     // };
    
//     // const getHasListItem = (hasListItem, tagName, isListItemRole) => {
//     //   return hasListItem || (tagName === 'LI' && isListItemRole) || isListItemRole;
//     // };
    
//     // let base = {
//     //   badNodes: [],
//     //   isEmpty: true,
//     //   hasNonEmptyTextNode: false,
//     //   hasListItem: false,
//     //   liItemsWithRole: 0
//     // };
    
//     // let out = virtualNode.children.reduce((out, { actualNode }) => {
//     //   /*eslint 
//     //     max-statements: ["error", 20]
//     //     complexity: ["error", 12]
//     //     */
//     //   const tagName = actualNode.nodeName.toUpperCase();
    
//     //   if (actualNode.nodeType === 1 && dom.isVisible(actualNode, true, false)) {
//     //     const role = (actualNode.getAttribute('role') || '').toLowerCase();
//     //     const isListItemRole = getIsListItemRole(role, tagName);
    
//     //     out.hasListItem = getHasListItem(out.hasListItem, tagName, isListItemRole);
    
//     //     if (isListItemRole) {
//     //       out.isEmpty = false;
//     //     }
//     //     if (tagName === 'LI' && !isListItemRole) {
//     //       out.liItemsWithRole++;
//     //     }
//     //     if (tagName !== 'LI' && !isListItemRole) {
//     //       out.badNodes.push(actualNode);
//     //     }
//     //   }
//     //   if (actualNode.nodeType === 3) {
//     //     if (actualNode.nodeValue.trim() !== '') {
//     //       out.hasNonEmptyTextNode = true;
//     //     }
//     //   }
    
//     //   return out;
//     // }, base);
    
//     // const virtualNodeChildrenOfTypeLi = virtualNode.children.filter(
//     //   ({ actualNode }) => {
//     //     return actualNode.nodeName.toUpperCase() === 'LI';
//     //   }
//     // );
    
//     // const allLiItemsHaveRole =
//     //   out.liItemsWithRole > 0 &&
//     //   virtualNodeChildrenOfTypeLi.length === out.liItemsWithRole;
    
//     // if (out.badNodes.length) {
//     //   this.relatedNodes(out.badNodes);
//     // }
    
//     // const isInvalidListItem = !(
//     //   out.hasListItem ||
//     //   (out.isEmpty && !allLiItemsHaveRole)
//     // );
//     // return isInvalidListItem || !!out.badNodes.length || out.hasNonEmptyTextNode;

//     // ----------------------------------------------------------------------------------------------------
//     // OLD PATCH FOR AXE 3.2.2 (see above)
//     // https://github.com/daisy/ace/blob/v1.1.1/packages/ace-core/src/scripts/axe-patch-only-list-items.js
//     // ----------------------------------------------------------------------------------------------------

//     var dom = axe.commons.dom;
//     var aria = axe.commons.aria;
//     var getIsListItemRole = function getIsListItemRole(role, tagName) {
//       // ------------------------------------------------
//       // THIS IS THE ACTUAL PATCH:
//       return role === 'listitem' || aria.getRoleType(role) === 'listitem' || tagName === 'LI' && !role;
//       // ------------------------------------------------
//     };
//     var getHasListItem = function getHasListItem(hasListItem, tagName, isListItemRole) {
//       return hasListItem || tagName === 'LI' && isListItemRole || isListItemRole;
//     };
//     var base = {
//       badNodes: [],
//       isEmpty: true,
//       hasNonEmptyTextNode: false,
//       hasListItem: false,
//       liItemsWithRole: 0
//     };
//     var out = virtualNode.children.reduce(function(out, _ref6) {
//       var actualNode = _ref6.actualNode;
//       var tagName = actualNode.nodeName.toUpperCase();
//       if (actualNode.nodeType === 1 && dom.isVisible(actualNode, true, false)) {
//         var role = (actualNode.getAttribute('role') || '').toLowerCase();
//         var isListItemRole = getIsListItemRole(role, tagName);
//         out.hasListItem = getHasListItem(out.hasListItem, tagName, isListItemRole);
//         if (isListItemRole) {
//           out.isEmpty = false;
//         }
//         if (tagName === 'LI' && !isListItemRole) {
//           out.liItemsWithRole++;
//         }
//         if (tagName !== 'LI' && !isListItemRole) {
//           out.badNodes.push(actualNode);
//         }
//       }
//       if (actualNode.nodeType === 3) {
//         if (actualNode.nodeValue.trim() !== '') {
//           out.hasNonEmptyTextNode = true;
//         }
//       }
//       return out;
//     }, base);
//     var virtualNodeChildrenOfTypeLi = virtualNode.children.filter(function(_ref7) {
//       var actualNode = _ref7.actualNode;
//       return actualNode.nodeName.toUpperCase() === 'LI';
//     });
//     var allLiItemsHaveRole = out.liItemsWithRole > 0 && virtualNodeChildrenOfTypeLi.length === out.liItemsWithRole;
//     if (out.badNodes.length) {
//       this.relatedNodes(out.badNodes);
//     }
//     var isInvalidListItem = !(out.hasListItem || out.isEmpty && !allLiItemsHaveRole);
//     return isInvalidListItem || !!out.badNodes.length || out.hasNonEmptyTextNode;
//   };

//   if (axe._audit.checks['only-listitems'].evaluate.boundContext) {
//     axe._audit.checks['only-listitems'].evaluate = axe._audit.checks['only-listitems'].evaluate.bind(axe._audit.checks['only-listitems'].evaluate.boundContext);
//   }
// }(window));
