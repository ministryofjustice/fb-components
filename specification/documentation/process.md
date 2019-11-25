---
layout: layout-pane.njk
title: Process
---

## What is the technical approach?

We build a digital service by representing it as data.

By creating this data using consistent definitions (the build-time “logical” representation), we can then generate the service using generic frontend components and backend components (the run-time "physical instantiation") rather than through bespoke development.

This approach is known as metadata-driven design.

## Process steps

There are 4 distinct parts of the Form Builder process.

- The [editor](/process/editor) creates the service’s data
- The [publisher](/process/publisher) deploys and manages the service
- The [runner](/process/runner) hosts the citizen-facing part of the service
- The [submitter](/process/submitter) sends the information entered by the user where specified
