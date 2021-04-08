// 'use strict';

// /* 
// This patch is needed to ensure that roles *inheriting* a list role are allowed
// as listitem parents.
// E.g. `<ul role="directory">` as parent of `li`.
// */

// (function axePatch(window) {
//   const axe = window.axe;

//   // v4.0.2
//   // axe._audit.checks['listitem'].evaluate.toString()
//   // =>
//   // function(e){var t=Object(a.getComposedParent)(e);if(t){var r=t.nodeName.toUpperCase(),n=(t.getAttribute("role")||"").toLowerCase();return!!["presentation","none","list"].includes(n)||(n&&Object(o.isValidRole)(n)?(this.data({messageKey:"roleNotValid"}),!1):["UL","OL"].includes(r))}}

//   // in the WebPack bundle (node_modules/axe-core/axe.js)
//   // './lib/checks/lists/listitem-evaluate.js'

//   axe._audit.checks['listitem'].evaluate = function evaluate(node, options, virtualNode, context) {

//     // ----------------------------------------------------------------------------------------------------
//     // https://github.com/dequelabs/axe-core/blob/v4.0.2/lib/checks/lists/listitem-evaluate.js
//     // ----------------------------------------------------------------------------------------------------
//     // const parent = getComposedParent(node);
//     // if (!parent) {
//     //   // Can only happen with detached DOM nodes and roots:
//     //   return undefined;
//     // }

//     // const parentTagName = parent.nodeName.toUpperCase();
//     // const parentRole = (parent.getAttribute('role') || '').toLowerCase();

//     // if (['presentation', 'none', 'list'].includes(parentRole)) {
//     //   return true;
//     // }

//     // if (parentRole && isValidRole(parentRole)) {
//     //   this.data({
//     //     messageKey: 'roleNotValid'
//     //   });
//     //   return false;
//     // }

//     // return ['UL', 'OL'].includes(parentTagName);
    
//     // ----------------------------------------------------------------------------------------------------
//     // https://github.com/dequelabs/axe-core/blob/v3.5.4/lib/checks/lists/listitem.js
//     // ----------------------------------------------------------------------------------------------------
//     // const parent = axe.commons.dom.getComposedParent(node);
//     // if (!parent) {
//     //   // Can only happen with detached DOM nodes and roots:
//     //   return undefined;
//     // }

//     // const parentTagName = parent.nodeName.toUpperCase();
//     // const parentRole = (parent.getAttribute('role') || '').toLowerCase();

//     // if (parentRole === 'list') {
//     //   return true;
//     // }

//     // if (parentRole && axe.commons.aria.isValidRole(parentRole)) {
//     //   this.data({
//     //     messageKey: 'roleNotValid'
//     //   });
//     //   return false;
//     // }

//     // return ['UL', 'OL'].includes(parentTagName);

//     // ----------------------------------------------------------------------------------------------------
//     // https://github.com/dequelabs/axe-core/blob/v3.2.2/lib/checks/lists/listitem.js
//     // ----------------------------------------------------------------------------------------------------
      // const parent = axe.commons.dom.getComposedParent(node);
      // if (!parent) {
      //   // Can only happen with detached DOM nodes and roots:
      //   return undefined;
      // }

      // const parentTagName = parent.nodeName.toUpperCase();
      // const parentRole = (parent.getAttribute('role') || '').toLowerCase();

      // if (parentRole === 'list') {
      //   return true;
      // }

      // if (parentRole && axe.commons.aria.isValidRole(parentRole)) {
      //   this.data({
      //     messageKey: 'roleNotValid'
      //   });
      //   return false;
      // }

      // return ['UL', 'OL'].includes(parentTagName);

//     // ----------------------------------------------------------------------------------------------------
//     // OLD PATCH FOR AXE 3.2.2 (see above)
//     // https://github.com/daisy/ace/blob/v1.1.1/packages/ace-core/src/scripts/axe-patch-listitem.js
//     // ----------------------------------------------------------------------------------------------------

//     const parent = axe.commons.dom.getComposedParent(node);
//     if (!parent) {
//         // Can only happen with detached DOM nodes and roots:
//         return undefined;
//     }

//     const parentTagName = parent.nodeName.toUpperCase();
//     const parentRole = (parent.getAttribute('role') || '').toLowerCase();

//     if (['presentation', 'none', 'list'].includes(parentRole)) {
//         return true;
//     }

//     if (parentRole && axe.commons.aria.isValidRole(parentRole)) {
//         // ------------------------------------------------
//         // THIS IS THE ACTUAL PATCH:
//         if (axe.commons.aria.getRoleType(parentRole) === 'list') {
//           return true;
//         }
//         // ------------------------------------------------

//         try {
//           this.data({
//             messageKey: 'roleNotValid'
//           });
//         } catch (e) {
//           // ignore error ("this" binding?)
//         }
//         return false;
//     }

//     return ['UL', 'OL'].includes(parentTagName);
//   };

//   if (axe._audit.checks['listitem'].evaluate.boundContext) {
//     axe._audit.checks['listitem'].evaluate = axe._audit.checks['listitem'].evaluate.bind(axe._audit.checks['listitem'].evaluate.boundContext);
//   }
// }(window));
