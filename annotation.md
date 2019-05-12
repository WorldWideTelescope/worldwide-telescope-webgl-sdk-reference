---
description: Reference documentation of the Annotation class.
---

The Annotation Object is inherited by the [**Circle**](#circle-object) object,
the [**Poly**](#poly-object) object, and the [**PolyLine** ](#polyline-object)
object, and is used to describe the annotation for these objects. An
Annotation object is not used independently of these other objects, so this
object should not be instantiated on its own.

| Property | Description |
| :-- | :-- |
| [**id**](#annotation-id-property) | Contains a string for use by the web client. |
| [**label**](#annotation-label-property) | Contains descriptive text for the annotation. |
| [**opacity**](#annotation-opacity-property) | Specifies the opacity to be applied to the complete annotation. |
| [**showHoverLabel**](#annotation-showhoverlabel-property) | Specifies whether to render the label if the mouse is hovering over the annotation. |
| [**center**](#annotation-center-property) | Specifies the center of the annotation. |
| [**tag**](#annotation-tag-property) | Contains a string for use by the web client. |


### Annotation id property

The **id** property contains a string for use by the web client.

#### Remarks
This string can be used to hold information (perhaps a URL or link to related
information, reference string or number, credits, date, times, and so on) that
is of use to the web client. The id string is returned with a
[**AnnotationClicked**](#wwtcontrol-annotationclicked-event) event.

#### Syntax
```js
Annotation.set_id([string])
[string] Annotation.get_id()
```

#### Example Code
```js
// Draw a circle at the center of the constellation Sagittarius
circle.setCenter(286.485, -27.5231666666667);
circle.set_id("Center of the Constellation Sagittarius");
```


### Annotation label property

The **label** property contains descriptive text for the annotation.

#### Remarks
The label text will be rendered if the
[**showHoverLabel**](#annotation-showhoverlabel-property) property is set to
true.

#### Syntax
```js
Annotation.set_label([string])
[string] Annotation.get_label()
```

#### Example Code
```js
// Draw a circle at the center of the constellation Sagittarius
circle.setCenter(286.485, -27.5231666666667);
circle.set_id("Center of the Constellation Sagittarius");
circle.set_label("RA: 286.485, Dec: -27.5231666666667");
```


### Annotation opacity property

The **opacity** property specifies the opacity to be applied to the complete
annotation.

#### Remarks
The default opacity setting is 1.0, which means that no transparency blending
will be applied to the complete annotation. A value of 0.5, for example, will
result in a 50% transparency blending being applied. Note that the color
values for individual lines and fill color (which can include an alpha
transparency value) are applied to the specific lines and shapes before the
opacity value here is applied to the entire annotation.

#### Syntax
```js
Annotation.set_opacity([double])
[double] Annotation.get_opacity()
```

#### Example Code
```js
// Set a solid fill color
circle.set_fillColor("red");
circle.set_fill(true);
// Apply a 50% transparency to the entire annotation
circle.set_opacity(0.5);
```


### Annotation showHoverLabel property

The **showHoverLabel** property specifies whether to render the label if the
mouse is hovering over the annotation.

#### Remarks
The default setting is false.

#### Syntax
```js
Annotation.set_showHoverLabel([Bool])
[Bool] Annotation.get_showHoverLabel()
```
#### Example Code
```js
// Draw a circle at the center of the constellation Sagittarius
circle.setCenter(286.485, -27.5231666666667);
circle.set_id("Center of the Constellation Sagittarius");
circle.set_label("RA: 286.485, Dec: -27.5231666666667");
circle.set_showHoverLabel(true);
```

### Annotation center property

The **center** property contains a Vector3d object for use by the web client.

#### Remarks
This Vector3d object is used to hold the center position of the annotation
object used by the web client.

#### Syntax
```js
Annotation.setCenter([Vector3d])
[Vector3d] Annotation.getCenter()
```

#### Example Code
```js
var vector3d = new wwtlib.Vector3d(x, y, z);
circle.setCenter(vector3d);
```


### Annotation tag property

The **tag** property contains a string for use by the web client.

#### Remarks
This string can be used to hold information that is of use to the web client.
The string is not used internally by WorldWide Telescope.

#### Syntax
```js
Annotation.set_tag([string])
[string] Annotation.get_tag()
```

#### Example Code
```js
circle.set_tag("001");
```
