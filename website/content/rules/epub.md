+++
title = "EPUB Rules"
weight = 2
+++

In addition to the [HTML rules]({{<ref "html.md">}}), Ace has a set of rules that are EPUB-specific:

| Rule | Description |
| :------- | :------- |
| epub-pagesource | Ensures that if the content has page breaks, the print source is identified in the Package Document metadata with `dc:source`. |
| epub-title  | Ensures that the EPUB’s title is defined in the Package Document. |
| epub-type-has-matching-role | Ensures that the element has an ARIA role matching its `epub:type`. |
| metadata-* <br/> (e.g. `metadata-schema-accessmode`)| Ensures that [schema.org accessibility metadata](http://kb.daisy.org/publishing/docs/metadata/schema-org.html) is defined in the Package Document.|
| pagebreak-label | Ensures that page markers have an accessible label. |
