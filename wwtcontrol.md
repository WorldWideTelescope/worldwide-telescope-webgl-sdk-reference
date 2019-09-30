---
description: Reference documentation of the WWTControl class.
---




The **WWTControl** object is the starting point for initializing the WebGL engine but is 
mostly an internal private class after the control instance is returned. However 
some useful properties and methods are described below.

nitialization happens via the [**initControlParam**] function, add a callback that waits for the [**ready** event] 
to be fired from the control’s paired singleton instance of the [**ScriptInterface** class]. 

#Initialization
```js
let wwt_ctl = wwtlib.WWTControl.initControlParam('WWTCanvas', true);
wwt_ctl.add_ready(() => {
  //open tour, collection, modify settings etc.
});
```
Once the [**ScriptInterface** class] instance (`wwt_ctl` above) is returned and  the [**ready** event] fires, it becomes the main entry 
  point for subsequent api calls. 
  
  
It is important to distinguish the control instance (`wwt_ctl` above) from the singleton which 
is described below. To use the WWTControl class methods after initialization, you point to  `wwtlib.WWTControl.singleton`
  
The most relevant properties and functions are documented below. Other internals exist 
but fall outside the scope of this documentation.

| Native Property | Type | Description |
| :-- |
| [**constellation**] | string | Current constellation abbreviation |
| [**renderContext**] | class | Render Context |
| [**renderType**] | int | ImageSetType (enum) |


| Static Function | Description |
| :-- |
| [**gotoTarget**] | Go to place |
| [**gotoTarget3**] | Go to planet in planet mode |
| [**initControl**] | Legacy function |
| [**initControlParam**] | Initialization function |


<!-- ====================================================================== -->
# **constellation** Property

Current active constellation abbreviation. For example SGR = Sagittarius 
[full constellation list]


<!-- ====================================================================== -->
# **renderType** Property

ImageSetType int representing current rendered imagery. 
```
{ Earth = 0, Planet = 1, Sky = 2, Panorama = 3, SolarSystem = 4, Sandbox = 5}
```

<!-- ====================================================================== -->
# **renderContext** Property

A class that holds and governs render state and functionality.



<!-- ====================================================================== -->
# **gotoTarget** function
### arguments 
- place (required) - a place object constructed with wwtlib.Place or an already initialized or a native, 
in-memory place 
- noZoom (optional, default: false) - when true, does not automatically zoom to best zoom level. Maintains current FOV. 
- instant (optional, default: false) - when true, bypasses animation and instantly navigates to place.
- trackObject (optional, default: false) - when true, sets the tracking object to the supplied place.

<!-- ====================================================================== -->
# **gotoTarget3** function
### arguments 
- camParams (required) - a camParams instance. Cam params, if they exist, are obtained by calling place.get_camParams() on a wwtlib.Place. 
- noZoom (optional, default: false) - when true, does not automatically zoom to best zoom level. Maintains current FOV. 
- instant (optional, default: false) - when true, bypasses animation and instantly navigates to place.



<!-- ====================================================================== -->
# **initControl** function
### arguments 
- elementId (required - string)
Legacy function used to initialize in software (non-webGL) mode, however you can simply pass WebGL = false into initControlParam for the same effect.


<!-- ====================================================================== -->
# **initControlParam** function
### arguments 
- elementId (required - string)
- useWebGL (required - bool)
Function used to initialize wwt in either WebGL or software rendering mode.


[full constellation list]: http://worldwidetelescope.org/wwtweb/catalog.aspx?q=ConstellationNamePositions_EN
[WebGL Engine Examples]: http://webhosted.wwt-forum.org/webengine-examples/
[**ready** event]: ./scriptinterface.md#ready-event

[**ScriptInterface** class]: ./scriptinterface.md
[**Settings** class]: ./settings.md
[**Annotation** class]: ./annotation.md
[**Circle** class]: ./circle.md
[**Poly** class]: ./poly.md
[**PolyLine** class]: ./polyline.md

[**constellation**]: #constellation-property

[**renderContext**]: #rendercontext-property
[**renderType**]: #rendertype-property

[**gotoTarget**]: #gototarget-function
[**gotoTarget3**]: #gototarget3-function
[**initControl**]: #initcontrol-function
[**initControlParam**]: #initcontrolparam-function
