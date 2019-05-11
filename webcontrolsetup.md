## Web Control Setup

This section shows you how to set up your computer to develop applications
using the WorldWide Telescope web control.

### System Requirements

* Windows 7 or Windows 8 \(older versions of Windows are not supported\).
* Discrete graphics card with at least 512MB VRAM \(1GB VRAM recommended\),
  DirectX 10 or DirectX 11 compatibility. GTX 480 class or better is
  recommended.
* HTML editing software of your choice.

To ensure that the WorldWide Telescope web control works on your system, run
the
[WWT Web Client Simple](http://www.worldwidetelescope.org/docs/Samples/wwtwebclientsimpleUIHtml5.html)
sample.

### Data Preparation Tools

Data tools are included with the
[WorldWide Telescope May 2009 ADK](http://research.microsoft.com/en-us/collaboration/wwt-ap/resources.aspx).
Once installed these tools are available in the Programs menu under
\*\*Microsoft Research.

## Web Control Development

This section explains the basic elements of a WorldWide Telescope web client
application.

[View the source code.](http://wwt.thewebkid.com/docs/Samples/displaycode.htm?codeExample=WWTWebClientSimpleHtml5.html)

### Simple Web Control Walkthrough

Setting up a web page to host the WorldWide Telescope web control is simple.
There are four key things that need to happen.

1. Link to the WorldWide Telescope script in the document **head**:

   ```html
   <script src="http://www.worldwidetelescope.org/scripts/wwtsdk.aspx" type="text/javascript">
   </script>
   ```

2. Declare a variable for the web control, and add a function to initialize
   the control and call the ready event function:

   ```js
   var wwt;

   function initialize() {
     wwt = wwtlib.WWTControl.initControl("WWTCanvas");
     wwtControl.add_ready(wwtReady;)
   }
   ```

3. Add a ready event function. This is where you can place your own custom
   initialization code. Note that a call to `wwtControl.loadImageCollection`
   is already there. This call loads the default complete image collection
   when the control loads.

   ```js
   function wwtReady() {
       wwtControl.loadImageCollection("http://www.worldwidetelescope.org/COMPLETE/wwtcomplete.wtml");
       // Put your custom initialization code here.
   }
   ```

4. Set up the body of the HTML document to call `initialize()` on load, and
   add a **div** to contain the control. The WorldWide Telescope object uses
   the HTML5 Canvas element to display the control. Note that div tag should
   be sized at a minimum of 750px x 750px to accommodate the web client. This
   will prevent the view from being cropped.

   ```html
   <body onload="initialize()" >
       <div id="WWTCanvas" style="width:750px; height:750px; border-style: none; border-width: 0px;">
   ```

Now that you have the basics, take a look at other run-able samples in the
[Web Control Samples](samples.md) section. Start out with the
[WWT Web Client Simple sample](http://www.worldwidetelescope.org/docs/worldwidetelescopewebcontrolscriptreference.html#WWTWebClientSimple),
which takes our basic example a step further and adds a simple user interface
to the mix.
