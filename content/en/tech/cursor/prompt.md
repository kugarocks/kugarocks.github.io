---
title: "Prompt"
alias: "Cursor Prompt"
description: ""
summary: ""
date: 2024-09-08T00:00:00+08:00
lastmod: 2024-09-08T00:00:00+08:00
weight: 900
seo:
  title: "Cursor Prompt"
  description: ""
  canonical: ""
  noindex: false
---

## Prompt

Change the markdown code block type.

```txt {frame="none"}
Change all markdown code block types to bash {frame="none"}
```

* The model I use is `cursor-small`.
* Adding the full range here will modify all code block types.
* If you don't add the full range, it will detect whether the code block type is `bash`.
  * Yes: Modify.
  * No: Do not modify.
