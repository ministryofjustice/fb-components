---
layout: layout-pane.njk
title: Repeatable pages and components
section: Overview
---

<!-- Repeating parts? -->

## Multiple instances

Lets a user add information about another instance of something the service is asking for.

eg.

- Add a child
- Add another transcript
- Add an address
- Add a phone number

Individual inputs

## Multiple instances of a page

The following page types can have multiple instances.

- [Single question page](/page/pageSingleQuestion)
- [Generic form page](/page/pageForm)

If the page has steps, the flow represented by those steps is also repeated.

## Multiple component instances

The following components can have multiple instances

- All individual control components
- [Fieldset](/component/fieldset)
- Group?? (why not?) - *indeed, otherwise what is the purpose of group, other than to group components for a pattern (really?)*

Multiple instances of such components are repeated on the same page.

## Requirement for namespace

The `namespace` property must be be set when `multiple` is set.

[More about the `namespace` property](/overview/namespace)


## Properties for defining multiple
- `multiple`

  Whether the block is repeatable
- `multipleMinimum`

  The minimum number of instances

  By default, 1
- `multipleMaximum`

  The maximum number of instances
- `multipleAdd`

  Custom text to use for any add button
- `multipleDelete`

  Custom text to use for any delete button

## Additional multiple-related properties
- `multipleSummary`

  *TODO: could this not just be achieved by explicitly adding a summary page?*
- `multipleAddLocation`

  *TODO: figure out how many pattern variants we might support - is it greater than 1?*



[See multiple properties definition](/definition/multiple)



<!--
Some services allow citizens to provide details of an arbitrary number of relevant entitiies, e.g. children. 

**What this could look like**
A syntax in the JSON schema that allows "add another/now I'm finished"
-->
<!--
If a question asks a citizen if they have a certain number of something, then a user journey is repeated as many times as required. E.g. A question asks how many children the user has then a the next x number of screens are repeated as many times as necessary (e.g. finding out details about all of the children).
-->