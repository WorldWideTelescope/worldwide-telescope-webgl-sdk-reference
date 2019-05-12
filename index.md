---
description: Reference documentation for the embeddable WWT rendering engine.
---

The [WebGL] engine of the [AAS] [WorldWide Telescope] (WWT) puts essentially the
entire power of the [WWT web client] in a JavaScript package that can be
embedded in your own applications. This document is the detailed reference on
its usage and behavior.

[WebGL]: https://www.khronos.org/webgl/
[AAS]: https://aas.org/
[WorldWide Telescope]: http://www.worldwidetelescope.org/
[WWT web client]: http://www.worldwidetelescope.org/webclient/

{% hint style="warning" %}
This documentation is a work in progress, and its formatting is being updated
to track changes in the [GitBook] service that we use for our documentation.
Please bear with us as we bring it up-to-date.

In particular, this documentation is derived from that of the earlier “HTML5”
web engine and has not been fully updated to reflect the differences in
capabilities between the two.
{% endhint %}

[GitBook]: https://docs.gitbook.com/

{% hint style="info" %}
The JavaScript engine described in this document is also sometimes called the
“web control”, “web client”, or the “web SDK”.
{% endhint %}


## Historical Note

The Web manifestation of WWT has gone through several stages of evolution.
These stages include a [Silverlight] version and the `<canvas>`-based “HTML5”
version. This documentation describes the “WebGL” version, which is the latest
and, we hope, final version of the WWT web engine. We won’t intentionally
break the older versions, but there are no guarantees that they will continue
functioning going forward.

[Silverlight]: https://www.microsoft.com/silverlight/
