// 'use strict';

// /* 
// This patch is needed to ensure that axe's ARIA lookup table is consistent
// with the mappings defined in the ARIA in HTML spec.
// */
// (function axePatch(window) {
//   const axe = window.axe;

//   // https://github.com/dequelabs/axe-core/blob/v4.0.2/lib/commons/aria/lookup-table.js#L1205
//   axe.commons.aria.lookupTable.role.listitem.implicit = ['li'];

//   // https://github.com/dequelabs/axe-core/blob/v4.0.2/lib/commons/aria/lookup-table.js#L1024
//   axe.commons.aria.lookupTable.role.figure.implicit = ['figure'];
// }(window));
