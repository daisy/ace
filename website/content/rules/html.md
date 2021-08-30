+++
title = "HTML Rules"
weight = 1
+++

Under the hood, most of the accessibility checks ran by Ace are powered by [Deque axe](https://github.com/dequelabs/axe-core), an engine for automated testing of HTML. Ace uses axe's rules, with some modifications (described [here](#modifications)).

## Rules

Here is a list of axe's rules used by Ace (see the full up to date documentation [in GitHub](https://github.com/daisy/axe-core/blob/v4.3.3_DAISY/doc/rule-descriptions.md) ):

| Rule ID                                                                                                                                          | Description                                                                                                |
| :----------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------- |
| [accesskeys](https://dequeuniversity.com/rules/axe/4.3/accesskeys?application=RuleDescription)                                                   | Ensures every accesskey attribute value is unique                                                          |
| [aria-allowed-role](https://dequeuniversity.com/rules/axe/4.3/aria-allowed-role?application=RuleDescription)                                     | Ensures role attribute has an appropriate value for the element                                            |
| [aria-dialog-name](https://dequeuniversity.com/rules/axe/4.3/aria-dialog-name?application=RuleDescription)                                       | Ensures every ARIA dialog and alertdialog node has an accessible name                                      |
| [aria-text](https://dequeuniversity.com/rules/axe/4.3/aria-text?application=RuleDescription)                                                     | Ensures &quot;role=text&quot; is used on elements with no focusable descendants                            |
| [aria-treeitem-name](https://dequeuniversity.com/rules/axe/4.3/aria-treeitem-name?application=RuleDescription)                                   | Ensures every ARIA treeitem node has an accessible name                                                    |
| [empty-heading](https://dequeuniversity.com/rules/axe/4.3/empty-heading?application=RuleDescription)                                             | Ensures headings have discernible text                                                                     |
| [epub-type-has-matching-role](https://dequeuniversity.com/rules/axe/4.3/epub-type-has-matching-role?application=RuleDescription)                 | Ensure the element has an ARIA role matching its epub:type                                                 |
| [frame-tested](https://dequeuniversity.com/rules/axe/4.3/frame-tested?application=RuleDescription)                                               | Ensures &lt;iframe&gt; and &lt;frame&gt; elements contain the axe-core script                              |
| [frame-title-unique](https://dequeuniversity.com/rules/axe/4.3/frame-title-unique?application=RuleDescription)                                   | Ensures &lt;iframe&gt; and &lt;frame&gt; elements contain a unique title attribute                         |
| [heading-order](https://dequeuniversity.com/rules/axe/4.3/heading-order?application=RuleDescription)                                             | Ensures the order of headings is semantically correct                                                      |
| [identical-links-same-purpose](https://dequeuniversity.com/rules/axe/4.3/identical-links-same-purpose?application=RuleDescription)               | Ensure that links with the same accessible name serve a similar purpose                                    |
| [image-redundant-alt](https://dequeuniversity.com/rules/axe/4.3/image-redundant-alt?application=RuleDescription)                                 | Ensure image alternative is not repeated as text                                                           |
| [label-title-only](https://dequeuniversity.com/rules/axe/4.3/label-title-only?application=RuleDescription)                                       | Ensures that every form element is not solely labeled using the title or aria-describedby attributes       |
| [landmark-banner-is-top-level](https://dequeuniversity.com/rules/axe/4.3/landmark-banner-is-top-level?application=RuleDescription)               | Ensures the banner landmark is at top level                                                                |
| [landmark-complementary-is-top-level](https://dequeuniversity.com/rules/axe/4.3/landmark-complementary-is-top-level?application=RuleDescription) | Ensures the complementary landmark or aside is at top level                                                |
| [landmark-contentinfo-is-top-level](https://dequeuniversity.com/rules/axe/4.3/landmark-contentinfo-is-top-level?application=RuleDescription)     | Ensures the contentinfo landmark is at top level                                                           |
| [landmark-main-is-top-level](https://dequeuniversity.com/rules/axe/4.3/landmark-main-is-top-level?application=RuleDescription)                   | Ensures the main landmark is at top level                                                                  |
| [landmark-no-duplicate-banner](https://dequeuniversity.com/rules/axe/4.3/landmark-no-duplicate-banner?application=RuleDescription)               | Ensures the document has at most one banner landmark                                                       |
| [landmark-no-duplicate-contentinfo](https://dequeuniversity.com/rules/axe/4.3/landmark-no-duplicate-contentinfo?application=RuleDescription)     | Ensures the document has at most one contentinfo landmark                                                  |
| [landmark-no-duplicate-main](https://dequeuniversity.com/rules/axe/4.3/landmark-no-duplicate-main?application=RuleDescription)                   | Ensures the document has at most one main landmark                                                         |
| [landmark-one-main](https://dequeuniversity.com/rules/axe/4.3/landmark-one-main?application=RuleDescription)                                     | Ensures the document has a unique main landmark                                                            |
| [landmark-unique](https://dequeuniversity.com/rules/axe/4.3/landmark-unique?application=RuleDescription)                                         | Landmarks should have a unique role or role/label/title (i.e. accessible name) combination                 |
| [meta-viewport-large](https://dequeuniversity.com/rules/axe/4.3/meta-viewport-large?application=RuleDescription)                                 | Ensures &lt;meta name=&quot;viewport&quot;&gt; can scale a significant amount                              |
| [meta-viewport](https://dequeuniversity.com/rules/axe/4.3/meta-viewport?application=RuleDescription)                                             | Ensures &lt;meta name=&quot;viewport&quot;&gt; does not disable text scaling and zooming                   |
| [page-has-heading-one](https://dequeuniversity.com/rules/axe/4.3/page-has-heading-one?application=RuleDescription)                               | Ensure that the page, or at least one of its frames contains a level-one heading                           |
| [presentation-role-conflict](https://dequeuniversity.com/rules/axe/4.3/presentation-role-conflict?application=RuleDescription)                   | Flags elements whose role is none or presentation and which cause the role conflict resolution to trigger. |
| [region](https://dequeuniversity.com/rules/axe/4.3/region?application=RuleDescription)                                                           | Ensures all page content is contained by landmarks                                                         |
| [scope-attr-valid](https://dequeuniversity.com/rules/axe/4.3/scope-attr-valid?application=RuleDescription)                                       | Ensures the scope attribute is used correctly on tables                                                    |
| [skip-link](https://dequeuniversity.com/rules/axe/4.3/skip-link?application=RuleDescription)                                                     | Ensure all skip links have a focusable target                                                              |
| [tabindex](https://dequeuniversity.com/rules/axe/4.3/tabindex?application=RuleDescription)                                                       | Ensures tabindex attribute values are not greater than 0                                                   |
| [table-duplicate-name](https://dequeuniversity.com/rules/axe/4.3/table-duplicate-name?application=RuleDescription)                               | Ensure that tables do not have the same summary and caption                                                |

Developer note: regular expression replace all: `(\| .+? \| .+? \|) .+? \| .+? \| .+? \| .+? \|` => `$1`

## Modifications

Certain aspects of HTML accessibility checking don't apply to EPUBs, so Ace has modified axe's default ruleset slightly.

* Ace disables axe's `bypass`, `region`, `page-has-heading-one`, and `landmark-complementary-is-top-level` rules.
* Ace changes axe's `landmark-one-main` rule to add the `page-no-duplicate-main` check (was `has-no-more-than-one-main`, see https://github.com/dequelabs/axe-core/blob/develop/CHANGELOG.md#300-2018-03-19 ).
* DAISY Axe fork: https://github.com/daisy/axe-core/pull/6
