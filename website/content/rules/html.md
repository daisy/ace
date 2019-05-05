+++
title = "HTML Rules"
weight = 1
+++

Under the hood, most of the accessibility checks ran by Ace are powered by [aXe](https://github.com/dequelabs/axe-core), an engine for automated testing of HTML. Ace uses aXe's rules, with some modifications (described [here](#modifications)).

## Rules

Here is a list of aXe's rules used by Ace, taken from [their documentation](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md):

| Rule | Description |
| :------- | :------- |
| accesskeys | Ensures every accesskey attribute value is unique. |
| area-alt | Ensures &lt;area&gt; elements of image maps have alternate text. |
| aria-allowed-attr | Ensures ARIA attributes are allowed for an element&apos;s role. |
| aria-hidden-body | Ensures aria-hidden=&apos;true&apos; is not present on the document body. |
| aria-required-attr | Ensures elements with ARIA roles have all required ARIA attributes. |
| aria-required-children | Ensures elements with an ARIA role that require child roles contain them. |
| aria-required-parent | Ensures elements with an ARIA role that require parent roles are contained by them. |
| aria-roles | Ensures all elements with a role attribute use a valid value. |
| aria-valid-attr-value | Ensures all ARIA attributes have valid values. |
| aria-valid-attr | Ensures attributes that begin with aria- are valid ARIA attributes. |
| audio-caption | Ensures &lt;audio&gt; elements have captions. |
| blink | Ensures &lt;blink&gt; elements are not used. |
| button-name | Ensures buttons have discernible text. |
| checkboxgroup | Ensures related &lt;input type=&quot;checkbox&quot;&gt; elements have a group and that that group designation is consistent. |
| color-contrast | Ensures the contrast between foreground and background colors meets WCAG 2 AA contrast ratio thresholds. |
| definition-list | Ensures &lt;dl&gt; elements are structured correctly. |
| dlitem | Ensures &lt;dt&gt; and &lt;dd&gt; elements are contained by a &lt;dl&gt;. |
| document-title | Ensures each HTML document contains a non-empty &lt;title&gt; element. |
| duplicate-id | Ensures every id attribute value is unique. |
| empty-heading | Ensures headings have discernible text. |
| focus-order-semantics | Ensures elements in the focus order have an appropriate role. |
| frame-title-unique | Ensures &lt;iframe&gt; and &lt;frame&gt; elements contain a unique title attribute. |
| frame-title | Ensures &lt;iframe&gt; and &lt;frame&gt; elements contain a non-empty title attribute. |
| heading-order | Ensures the order of headings is semantically correct. |
| hidden-content | Informs users about hidden content. |
| html-has-lang | Ensures every HTML document has a lang attribute. |
| html-lang-valid | Ensures the lang attribute of the &lt;html&gt; element has a valid value. |
| image-alt | Ensures &lt;img&gt; elements have alternate text or a role of none or presentation. |
| image-redundant-alt | Ensure button and link text is not repeated as image alternative. |
| input-image-alt | Ensures &lt;input type=&quot;image&quot;&gt; elements have alternate text. |
| label-title-only | Ensures that every form element is not solely labeled using the title or aria-describedby attributes. |
| label | Ensures every form element has a label. |
| landmark-main-is-top-level | The main landmark should not be contained in another landmark. |
| landmark-one-main | Ensures a navigation point to the primary content of the page. If the page contains iframes, each iframe should contain either no main landmarks or just one. |
| layout-table | Ensures presentational &lt;table&gt; elements do not use &lt;th&gt;, &lt;caption&gt; elements or the summary attribute. |
| link-in-text-block | Links can be distinguished without relying on color. |
| link-name | Ensures links have discernible text. |
| list | Ensures that lists are structured correctly. |
| listitem | Ensures &lt;li&gt; elements are used semantically. |
| marquee | Ensures &lt;marquee&gt; elements are not used. |
| meta-refresh | Ensures &lt;meta http-equiv=&quot;refresh&quot;&gt; is not used. |
| meta-viewport-large | Ensures &lt;meta name=&quot;viewport&quot;&gt; can scale a significant amount. |
| meta-viewport | Ensures &lt;meta name=&quot;viewport&quot;&gt; does not disable text scaling and zooming. |
| object-alt | Ensures &lt;object&gt; elements have alternate text. |
| p-as-heading | Ensure p elements are not used to style headings. |
| radiogroup | Ensures related &lt;input type=&quot;radio&quot;&gt; elements have a group and that the group designation is consistent. |
| region | Ensures all content is contained within a landmark region. |
| scope-attr-valid | Ensures the scope attribute is used correctly on tables. |
| server-side-image-map | Ensures that server-side image maps are not used. |
| skip-link | Ensure all skip links have a focusable target. |
| tabindex | Ensures tabindex attribute values are not greater than 0. |
| table-duplicate-name | Ensure that tables do not have the same summary and caption. |
| table-fake-caption | Ensure that tables with a caption use the &lt;caption&gt; element. |
| td-has-header | Ensure that each non-empty data cell in a large table has one or more table headers. |
| td-headers-attr | Ensure that each cell in a table using the headers refers to another cell in that table. |
| th-has-data-cells | Ensure that each table header in a data table refers to data cells. |
| valid-lang | Ensures lang attributes have valid values. |
| video-caption | Ensures &lt;video&gt; elements have captions. |
| video-description | Ensures &lt;video&gt; elements have audio descriptions. |

## Modifications

Certain aspects of HTML accessibility checking don't apply to EPUBs, so Ace has modified aXe's default ruleset slightly.

* Ace disables aXe's `bypass` rule.
* Ace changes aXe's `landmark-one-main` rule to remove the `page-no-duplicate-main` check (was `has-no-more-than-one-main`, see https://github.com/dequelabs/axe-core/blob/develop/CHANGELOG.md#300-2018-03-19 ).
