---
description: Reference documentation of the PolyLine class.
---

The PolyLine object is used to render a polyline on the screen. A polyline
cannot be filled, and is not a closed shape -- the last point is not connected
back to the first. It is created by the
[**CreatePolyLine**](#wwtcontrol-createpolyline-method) method.

The PolyLine object inherits the properties of the
[**Annotation**](#annotation-object) object.


| Property | Description |
| :-- |
| [**LineColor**](#polyline-linecolor-property) | Specifies the line color as an ARGB value. |
| [**LineWidth**](#polyline-linewidth-property) | Specifies the line width in pixels. |

| Method | Description
| :-- |
| [**AddPoint**](#polyline-addpoint-method) | Adds a point to the polyline. |


### PolyLine LineColor Property

The **LineColor** property specifies the line color as an ARGB value.

#### Remarks
The default color is white. The four bytes of the unsigned integer are the
alpha, red, green and blue values respectively.

#### Syntax
```js
PolyLine.set_lineColor([uint])
[uint] PolyLine.get_lineColor()
```

#### Example Code
```js
// Set a solid blue color
poly.set_fillColor("blue");
```


### PolyLine LineWidth Property

The **LineWidth** property specifies the line width in pixels.

#### Remarks
The default line width is 1 pixel.

#### Syntax
```js
PolyLine.set_lineWidth([double])
[double] PolyLine.get_lineWidth()
```

#### Example Code
```js
poly.set_lineWidth(3);
```


### PolyLine AddPoint Method

The **AddPoint** method adds a point to a polyline.

#### Parameters
_x_
  Specifies the x coordinate, right ascension if in space, longitude if on a planet surface.
_y_
  Specifies the y coordinate, declination if in space, latitude if on a planet surface.

#### Return Values
This method does not return a value.

#### Remarks
There is no theoretical limit to the number of points that can be added to a
PolyLine object, however the number of points does affect performance -- so
complex geometry should be simplified.

#### Syntax
```js
PolyLine.addPoint(
  x  [Double],
  y  [Double]
)
```

#### Example Code
```js
// The following function will add any number of points [ra, dec] to a polyline.

function expandPolyLine(polyline, newPoints) {
    for (var i in newPoints) {
        polyline.addPoint(newPoints[i][0], newPoints[i][1]);
    }
}

var polyline1 = wwtView.createPolyLine();

var points = [[20,-20], [21,-21]];

expandPolyLine(polyline1, points);
```
