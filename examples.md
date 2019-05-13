---
description: Sample code using the WebGL engine in applications.
---

Due to technical limitations, our collection of WebGL engine samples must
currently be hosted on a separate domain:

> <http://webhosted.wwt-forum.org/webengine-examples/>

In particular, the core WWT web services are not currently HTTPS-capable,
which means that they cannot be used in webpages served over HTTPS. (Because
that would be [mixed active content] which is a no-no.) Both GitBook and the
`github.io` domain force HTTPS, so we must host the content separately for the
examples to work live in your browser.

[mixed active content]: https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content#Mixed_active_content

**Note:** *Due to this limitation, these example will only work if you access
  them through unencrypted HTTP, not secure HTTPS. Please ensure that you
  access them over an unencrypted, plain-HTTP channel.*

Rest assured that we are working to fix this limitation!

The samples are version-controlled in the [webengine-examples directory] of
the [wwt-web-examples] repository on GitHub. API documentation in this
reference manual will link to the examples as appropriate.

[webengine-examples directory]: https://github.com/WorldWideTelescope/wwt-web-examples/tree/master/webengine-examples
[wwt-web-examples]: https://github.com/WorldWideTelescope/wwt-web-examples

There are a few additional examples integrated into the main WWT website:

- [ImportImage] (implemented in [ImportImage.js])
- [Spectroscopy] (implemented in [Spectroscopy.js])
- [Great Observatories] (implemented in [Observatories.js])
- [Planet Explorer] (implemented in [PlanetExplorer.js])

[ImportImage]: http://www.worldwidetelescope.org/GetInvolved/ImportImage
[Spectroscopy]: http://www.worldwidetelescope.org/GetInvolved/Spectrum
[Great Observatories]: http://www.worldwidetelescope.org/GetInvolved/GreatObservatories
[Planet Explorer]: http://www.worldwidetelescope.org/GetInvolved/PlanetExplorer

[ImportImage.js]: https://github.com/WorldWideTelescope/wwt-website/blob/master/WWTMVC5/Scripts/pages/ImportImage.js
[Spectroscopy.js]: https://github.com/WorldWideTelescope/wwt-website/blob/master/WWTMVC5/Scripts/pages/Spectroscopy.js
[Observatories.js]: https://github.com/WorldWideTelescope/wwt-website/blob/master/WWTMVC5/Scripts/pages/Observatories.js
[PlanetExplorer.js]: https://github.com/WorldWideTelescope/wwt-website/blob/master/WWTMVC5/Scripts/pages/PlanetExplorer.js
