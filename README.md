# WorldWide Telescope Web Control Script Reference for WebGL

<span style="color:red">Warning: This reference is a work in progress. This
repo is a copy of the HTML5 documentation that we will update to reflect
changes/advances from WebGL</span>

Web Control scripts are used to customize the WorldWide Telescope web client.
This document describes the setup, development process, API set and samples to
aid developers in building their own applications. The customization scripts
are written in JScript and embedded in an html file, and along with custom
data files, can be used to do one or more of the following tasks:

* Create custom viewing interfaces
* Add images to the view, with their own annotations
* Add annotations to existing images
* Load in and interact with a VO (Virtual Observatory) table
* Load and play tours
* Change the settings for a view

Note that currently the SDK only applies to the **Sky** view of WorldWide
Telescope, and not the **Earth**, **Planet**, **Panorama** or **SolarSystem**
views.

## Attention Silverlight users

The Silverlight implementation of the Worldwide Telescope has been deprecated.
Please see this [conversion tutorial](../docs/conversionTutorial.htm) to help
you convert any Silverlight code to the new HTML5 implementation.
