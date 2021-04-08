// 'use strict';

// /* 
// This patch is needed to ensure that roles that do not explicitly define allowed elements
// are still evaluated for the element they're used on.
// E.g. `doc-cover` on `img`.
// */
// (function axePatch(window) {
//   const axe = window.axe;

//   // v4.0.2
//   // axe.commons.aria.isAriaRoleAllowedOnElement.toString()
//   // =>
//   // function(e,t){var r=e instanceof o.default?e:Object(a.getNodeFromTree)(e);if(t===Object(i.default)(r))return!0;var n=Object(s.default)(r);return Array.isArray(n.allowedRoles)?n.allowedRoles.includes(t):!!n.allowedRoles}

//   axe.commons.aria.isAriaRoleAllowedOnElement_ = axe.commons.aria.isAriaRoleAllowedOnElement;

//   var func = function isAriaRoleAllowedOnElement(node, role) {

//     // ----------------------------------------------------------------------------------------------------
//     // https://github.com/dequelabs/axe-core/blob/v4.0.2/lib/commons/aria/is-aria-role-allowed-on-element.js
//     // ----------------------------------------------------------------------------------------------------
//     // const vNode =
//     //   node instanceof AbstractVirtuaNode ? node : getNodeFromTree(node);
//     // const implicitRole = getImplicitRole(vNode);
  
//     // // always allow the explicit role to match the implicit role
//     // if (role === implicitRole) {
//     //   return true;
//     // }
  
//     // const spec = getElementSpec(vNode);
  
//     // if (Array.isArray(spec.allowedRoles)) {
//     //   return spec.allowedRoles.includes(role);
//     // }
  
//     // return !!spec.allowedRoles;

//     return axe.commons.aria.isAriaRoleAllowedOnElement_(node, role);

//     // ----------------------------------------------------------------------------------------------------
//     // https://github.com/dequelabs/axe-core/blob/v3.2.2/lib/commons/aria/is-aria-role-allowed-on-element.js
//     // ----------------------------------------------------------------------------------------------------
//     // const nodeName = node.nodeName.toUpperCase();
//     // const lookupTable = axe.commons.aria.lookupTable;

//     // // if given node can have no role - return false
//     // if (matches(node, lookupTable.elementsAllowedNoRole)) {
//     //   return false;
//     // }
//     // // if given node allows any role - return true
//     // if (matches(node, lookupTable.elementsAllowedAnyRole)) {
//     //   return true;
//     // }

//     // // get role value (if exists) from lookupTable.role
//     // const roleValue = lookupTable.role[role];

//     // // if given role does not exist in lookupTable - return false
//     // if (!roleValue || !roleValue.allowedElements) {
//     //   return false;
//     // }

//     // // validate attributes and conditions (if any) from allowedElement to given node
//     // let out = matches(node, roleValue.allowedElements);

//     // // if given node type has complex condition to evaluate a given aria-role, execute the same
//     // if (Object.keys(lookupTable.evaluateRoleForElement).includes(nodeName)) {
//     //   return lookupTable.evaluateRoleForElement[nodeName]({ node, role, out });
//     // }
//     // return out;

//     // ----------------------------------------------------------------------------------------------------
//     // OLD PATCH FOR AXE 3.2.2 (see above)
//     // https://github.com/daisy/ace/blob/v1.1.1/packages/ace-core/src/scripts/axe-patch-is-aria-role-allowed.js
//     // ----------------------------------------------------------------------------------------------------
//     // var nodeName = node.nodeName.toUpperCase();
//     // var lookupTable = axe.commons.aria.lookupTable;
//     // if (matches(node, lookupTable.elementsAllowedNoRole)) {
//     //   return false;
//     // }
//     // if (matches(node, lookupTable.elementsAllowedAnyRole)) {
//     //   return true;
//     // }
//     // var roleValue = lookupTable.role[role];
//     // // ------------------------------------------------
//     // // THIS IS THE ACTUAL PATCH:
//     // if (!roleValue) { // || !roleValue.allowedElements
//     //   return false;
//     // }
//     // var allowedElements = roleValue.allowedElements || [];
//     // // ------------------------------------------------
//     // var out = matches(node, allowedElements);
//     // if (Object.keys(lookupTable.evaluateRoleForElement).includes(nodeName)) {
//     //   return lookupTable.evaluateRoleForElement[nodeName]({
//     //     node: node,
//     //     role: role,
//     //     out: out
//     //   });
//     // }
//     // return out;
//   };

//   axe.commons.aria.isAriaRoleAllowedOnElement = func;

//   if (axe.commons.aria.isAriaRoleAllowedOnElement_.boundContext) {
//     axe.commons.aria.isAriaRoleAllowedOnElement = axe.commons.aria.isAriaRoleAllowedOnElement.bind(axe.commons.aria.isAriaRoleAllowedOnElement_.boundContext);
//   }

// }(window));
