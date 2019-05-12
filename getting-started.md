---
description: Getting started with the WWT WebGL engine.
---

While the WWT WebGL engine is a sophisticated piece of code, its external
interface resembles that of many other Web libraries. Here is a simple HTML
file that embeds an interactive WWT viewer:

{% code-tabs %}
{% code-tabs-item title="index.html" %}
```html
<!doctype html>
<html lang="en">
  <head>
    <title>My First WWT Application</title>
    <script src="http://www.worldwidetelescope.org/webclient/sdk/wwtsdk.js"></script>
    <!--[if IE]> <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script><![endif]-->
  </head>
  <body>
    <div id="wwtcanvas" style="width: 750px; height: 750px"></div>

    <script type="text/javascript">
function init_wwt() {
    wwtlib.WWTControl.initControlParam('wwtcanvas', true);
}

window.addEventListener('load', init_wwt);
    </script>
  </body>
</html>
```
{% endcode-tabs-item %}
{% endcode-tabs %}

The key elements are:

1. The `<script>` tag that loads up the WWT WebGL engine. You interface with
   this library via a global variable named `wwtlib`.
2. A `<div>` element that becomes home for the WWT viewport.
3. A JavaScript shim that calls the function
   [**WWTControl.initControlParam()**] to initialize the engine and start it
   rendering.

[**WWTControl.initControlParam()**]: ./wwtcontrol.md#initcontrolparam-function

The ["simple viewer" example] in our collection of [WebGL engine examples]
demonstrates what you get in such a webpage. (However, the code used in that
example is not quite identical to what is shown above.) You can pan around and
use the scroll wheel to zoom in, providing an interface reminiscent of popular
Earth map web apps. The detailed map of the sky shown in this example, which
derives from the [Digitized Sky Survey], totals up to about a terabyte of data!
The WWT WebGL engine streams the data to your browser as you navigate.

["simple viewer" example]: http://webhosted.wwt-forum.org/webengine-examples/#simple-viewer
[WebGL engine examples]: http://webhosted.wwt-forum.org/webengine-examples/
[Digitized Sky Survey]: https://en.wikipedia.org/wiki/Digitized_Sky_Survey

If you leave your browser window open, you may notice your CPU fans kicking
in. This is because the WWT engine’s display is informed by a real-time
simulation of the known universe! If you centered your display on the Sun and
came back a day later, you would see that the Sun had moved a little bit
relative to the background stars while you were gone. The WWT engine has a
“3D” mode in which you can speed up time and watch the planets of the Solar
System as they spin and orbit the Sun.
