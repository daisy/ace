'use strict';

/* 
This patch is needed to ensure that axe's ARIA lookup table is consistent
with the mappings defined in the ARIA in HTML spec.
*/
(function axePatch(window) {
  const axe = window.axe;
  axe.commons.aria.lookupTable.role.listitem.implicit = ['li'];
  axe.commons.aria.lookupTable.role.figure.implicit = ['figure'];
}(window));
