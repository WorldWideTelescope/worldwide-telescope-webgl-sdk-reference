---
description: Reference documentation of the Poly class.
---

The Poly object is used to render a polygon on the screen. The polygon can be
filled with color, or unfilled, but is always a closed shape -- the last point
entered for the polygon is connected to the first. It is created by the
[**CreatePolygon**](#wwtcontrol-createpolygon-method) method.

The Poly object inherits the properties of the [**Annotation**](#annotation-object) object.

| Property | Description |
| :-- |
| [**Fill**](#poly-fill-property) | Specifies whether the polygon is filled or not. |
| [**FillColor**](#poly-fillcolor-property) | Specifies the fill color as an ARGB value. |
| [**LineColor**](#poly-linecolor-property) | Specifies the line color as an ARGB value. |
| [**LineWidth**](#poly-linewidth-property) | Specifies the line width in pixels. |

| Method | Description |
| :-- |
| [**AddPoint**](#poly-addpoint-method) | Adds a point to a polygon. |


### Poly Fill Property

The **Fill** property specifies whether the polygon is filled or not.

#### Remarks
The default fill setting is false.

#### Syntax
```js
Poly.set_fill([Bool])
[Bool] Poly.get_fill()
```
#### Example Code
```js
// Fill a polygon with a slightly transparent blue
poly.set_fill(true);
poly.set_fillColor("0xBB0000AA");
```


### Poly FillColor Property

The **FillColor** property specifies the fill color as an ARGB value.

#### Remarks
The default fill color is white. The four bytes of the unsigned integer are
the alpha, red, green and blue values respectively.

#### Syntax
```js
Poly.set_fillColor([uint])
[uint] Poly.get_fillColor()
```

#### Example Code
```js
// Set a solid red fill color
poly.set_fill(true);
poly.set_fillColor("red");
```


### Poly LineColor Property

The **LineColor** property specifies the line color as an ARGB value.

#### Remarks
The default color is white. The four bytes of the unsigned integer are the
alpha, red, green and blue values respectively.

#### Syntax
```js
Poly.set_lineColor([uint])
[uint] Poly.get_lineColor()
```

#### Example Code
```js
// Set a solid black line color
poly.set_lineColor("0xFF000000");
```


### Poly LineWidth Property

The **LineWidth** property specifies the line width in pixels.

#### Remarks
The default line width is 1 pixel.

#### Syntax
```js
Poly.set_lineWidth([double])
[double] Poly.get_lineWidth()
```

#### Example Code
```js
// Double the line width
poly.set_lineWidth(2 * poly.get_lineWidth());
```


### Poly AddPoint Method

The **AddPoint** method adds a point to a polygon.

#### Parameters
_x_
  Specifies the x coordinate, right ascension if in space, longitude if on a planet surface.
_y_
  Specifies the y coordinate, declination if in space, latitude if on a planet surface.

#### Return Values
This method does not return a value.

#### Remarks
There is no theoretical limit to the number of points that can be added to a
Poly object, however the number of points does affect performance -- so
complex geometry should be simplified.

#### Syntax
```js
Poly.addPoint(
  x  [Double],
  y  [Double]
)
```

#### Example Code
```js
// The following function will add any number of points [ra, dec] to a polygon.

function expandPolygon(poly, newPoints) {
    for(var i in newPoints) {
        poly.addPoint(newPoints[i][0], newPoints[i][1]);
    }
}

var poly1 = wwtView.createPolygon(true);

var points = [[20,-20], [20,-21], [21,-21], [21,-20]];

expandPolygon(poly1, points);
```
