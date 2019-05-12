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
    <meta http-equiv="X-UA-Compatible" content="chrome=1, IE=edge"/>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
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
