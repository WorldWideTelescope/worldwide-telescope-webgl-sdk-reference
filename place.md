---
  description: Place class common methods and properties.
---


# Place class

Jump to section:
 - [**Place Property Getters**]
 - [**Place Property Setters**]
 - [**Place Methods**]

[**Place Property Getters**]: #place-property-getters
[**Place Property Setters**]: #place-property-setters
[**Place Methods**]: #place-methods
[Top]: #place-class

Places are locations within WWT and can contain imagery or other data. The most common way to create places within WWT is using WTML files. However you can also create places on-the-fly with raw values. This page documents the most common properties of place objects. Note that most of the setters are not documented because they should be set during construction. Though interfaces to set various properties exist, they are not all meant for scripting.


#### Basic creation and usage example

```js
const ra = 0;
const dec = 0;
const classification = 1;//star
const imagesetType = 2;//sky
const constellation = wwtlib.Constellations.containment.findConstellationForPoint(ra, dec);
const zoomFactor = 0;
const center = wwtlib.Place.create('center', dec, ra, classification, constellation, imagesetType, zoomFactor);

wwtlib.WWTControl.singleton.gotoTarget(center);
```

<!-- ====================================================================== -->


[Top]

# Place Property Getters
<!-- ====================================================================== -->



| Getter                       | Description                                                                   |
|:-----------------------------|:------------------------------------------------------------------------------|
| [**get_RA**]                 | (decimal) right ascension/longitude                                           |
| [**get_annotation**]         | (Annotation) annotation if any                                                |
| [**get_backgroundImageset**] | (Imageset) backgroundImageset that is rendered                                |
| [**get_camParams**]          | (CameraParameters) The camera parameters for the place                        |
| [**get_classification**]     | (Classification) Place classification                                         |
| [**get_constellation**]      | Retrieves the 3-letter constellation the place (centroid) is contained within |
| [**get_dec**]                | (decimal) declination or latitude                                             |
| [**get_distance**]           | Distance to place if available                                                |
| [**get_elevation**]          | (decimal) Elevation if applicable                                             |
| [**get_lat**]                | (decimal) Latitude/Declination of place                                       |
| [**get_lng**]                | (decimal) Longitude / right ascension of place                                |
| [**get_magnitude**]          | (number) Magnitude if applicable                                              |
| [**get_name**]               | (string) Place name                                                           |
| [**get_names**]              | (array) Name collection for place                                             |
| [**get_opacity**]            | (number) Opacity percentage [0-100]                                           |
| [**get_studyImageset**]      | (ImageSet) The study imageset                                                 |
| [**get_target**]             | (SolarSystemObjects type) If applicable                                       |
| [**get_thumbnailUrl**]       | (string) Thumbnail url                                                        |
| [**get_type**]               | (ImageSetType) The imageset type context                                      |
| [**get_url**]                | Do not use. See below                                                         |
| [**get_zoomLevel**]          | (decimal) zoomLevel                                                           |



#### Not documented Getters

| Getter                     | Description |
|:---------------------------|:------------|
| _get_bounds_               | -           |
| _get_children_             | -           |
| _get_isCloudCommunityItem_ | -           |
| _get_isFolder_             | -           |
| _get_isImage_              | -           |
| _get_isTour_               | -           |
| _get_location3d_           | -           |
| _get_readOnly_             | -           |
| _get_searchDistance_       | -           |
| _get_tag_                  | -           |
| _get_thumbnail_            | -           |


<!-- ====================================================================== -->



## get_RA Getter
The **get_RA** getter returns the right ascension / longitude of the place in decimal degrees.


<!-- ====================================================================== -->



## get_annotation Getter
The **get_annotation** getter returns any annotation (Circle, Poly, etc.) that were added to the place.


<!-- ====================================================================== -->



## get_backgroundImageset Getter
The **get_backgroundImageset** getter returns the background Imageset (if any) that renders when you navigate to the place.


<!-- ====================================================================== -->



## get_bounds Getter
Not documented at this time.


<!-- ====================================================================== -->



## get_camParams Getter
The get_camParams getter returns the CameraParameters for the place. CameraParameters is not currently documented, but contains the following properties.


#### Camera Parameters Properties


| Name                   | Description                                                       |
|:-----------------------|:------------------------------------------------------------------|
| _lat_                  | (decimal) Declination or latitude                                 |
| _lng_                  | (decimal) Right ascension or longitude                            |
| _angle_                | (decimal) Degrees of camera tilt                                  |
| _rotation_             | (decimal) Degrees of camera rotation                              |
| _opacity_              | (number) Percent opacity (0-100)                                  |
| _raDec_                | (boolean) indicates if lat/lng values indicate RA/Dec coordinates |
| _target_               | (int wwtlib.SolarSystemObjects) Specifies the target type         |
| _targetReferenceFrame_ | (string) Name of a reference frame                                |
| _viewTarget_           | (Vector3d) A 3d vector representing the view target               |


<!-- ====================================================================== -->



## get_children Getter
Not documented at this time.


<!-- ====================================================================== -->



## get_classification Getter
The get_classification getter returns the place classification as one of the following values in the table below.


| Name                  | Description |
|:----------------------|:------------|
| _Star_                | 1           |
| _Supernova_           | 2           |
| _BlackHole_           | 4           |
| _NeutronStar_         | 8           |
| _DoubleStar_          | 16          |
| _MultipleStars_       | 32          |
| _Asterism_            | 64          |
| _Constellation_       | 128         |
| _OpenCluster_         | 256         |
| _GlobularCluster_     | 512         |
| _NebulousCluster_     | 1024        |
| _Nebula_              | 2048        |
| _EmissionNebula_      | 4096        |
| _PlanetaryNebula_     | 8192        |
| _ReflectionNebula_    | 16384       |
| _DarkNebula_          | 32768       |
| _GiantMolecularCloud_ | 65536       |
| _SupernovaRemnant_    | 131072      |
| _InterstellarDust_    | 262144      |
| _Quasar_              | 524288      |
| _Galaxy_              | 1048576     |
| _SpiralGalaxy_        | 2097152     |
| _IrregularGalaxy_     | 4194304     |
| _EllipticalGalaxy_    | 8388608     |
| _Knot_                | 16777216    |
| _PlateDefect_         | 33554432    |
| _ClusterOfGalaxies_   | 67108864    |
| _OtherNGC_            | 134217728   |
| _Unidentified_        | 268435456   |
| _SolarSystem_         | 536870912   |
| _Unfiltered_          | 1073741823  |
| _Stellar_             | 63          |
| _StellarGroupings_    | 2032        |
| _Nebulae_             | 523264      |
| _Galactic_            | 133693440   |
| _Other_               | 436207616   |


<!-- ====================================================================== -->



## get_constellation Getter
The get_constellation getter returns the constellation (or null) containing the place RA/Dec as a 3-letter abbreviation.


#### Constellation abbreviation reference


| Name   | Description         |
|:-------|:--------------------|
| _AND_  | Andromeda           |
| _ANT_  | Antlia              |
| _APS_  | Apus                |
| _AQL_  | Aquila              |
| _AQR_  | Aquarius            |
| _ARA_  | Ara                 |
| _ARI_  | Aries               |
| _AUR_  | Auriga              |
| _BOO_  | Bootes              |
| _CAE_  | Caelum              |
| _CAM_  | Camelopardalis      |
| _CAP_  | Capricornus         |
| _CAR_  | Carina              |
| _CAS_  | Cassiopeia          |
| _CEN_  | Centaurus           |
| _CEP_  | Cepheus             |
| _CET_  | Cetus               |
| _CHA_  | Chamaeleon          |
| _CIR_  | Circinus            |
| _CMA_  | Canis Major         |
| _CMI_  | Canis Minor         |
| _CNC_  | Cancer              |
| _COL_  | Columba             |
| _COM_  | Coma Berenices      |
| _CRA_  | Corona Australis    |
| _CRB_  | Corona Borealis     |
| _CRT_  | Crater              |
| _CRU_  | Crux                |
| _CRV_  | Corvus              |
| _CVN_  | Canes Venatici      |
| _CYG_  | Cygnus              |
| _DEL_  | Delphinus           |
| _DOR_  | Dorado              |
| _DRA_  | Draco               |
| _EQU_  | Equuleus            |
| _ERI_  | Eridanus            |
| _FOR_  | Fornax              |
| _GEM_  | Gemini              |
| _GRU_  | Grus                |
| _HER_  | Hercules            |
| _HOR_  | Horologium          |
| _HYA_  | Hydra               |
| _HYI_  | Hydrus              |
| _IND_  | Indus               |
| _LAC_  | Lacerta             |
| _LEO_  | Leo                 |
| _LEP_  | Lepus               |
| _LIB_  | Libra               |
| _LMI_  | Leo Minor           |
| _LUP_  | Lupus               |
| _LYN_  | Lynx                |
| _LYR_  | Lyra                |
| _MEN_  | Mensa               |
| _MIC_  | Microscopium        |
| _MON_  | Monoceros           |
| _MUS_  | Musca               |
| _NOR_  | Norma               |
| _OCT_  | Octans              |
| _OPH_  | Ophiuchus           |
| _ORI_  | Orion               |
| _PAV_  | Pavo                |
| _PEG_  | Pegasus             |
| _PER_  | Perseus             |
| _PHE_  | Phoenix             |
| _PIC_  | Pictor              |
| _PSA_  | Piscis Austrinus    |
| _PSC_  | Pisces              |
| _PUP_  | Puppis              |
| _PYX_  | Pyxis               |
| _RET_  | Reticulum           |
| _SCL_  | Sculptor            |
| _SCO_  | Scorpius            |
| _SCT_  | Scutum              |
| _SER1_ | Serpens Caput       |
| _SER2_ | Serpens Cauda       |
| _SEX_  | Sextans             |
| _SGE_  | Sagitta             |
| _SGR_  | Sagittarius         |
| _TAU_  | Taurus              |
| _TEL_  | Telescopium         |
| _TRA_  | Triangulum Australe |
| _TRI_  | Triangulum          |
| _TUC_  | Tucana              |
| _UMA_  | Ursa Major          |
| _UMI_  | Ursa Minor          |
| _VEL_  | Vela                |
| _VIR_  | Virgo               |
| _VOL_  | Volans              |
| _VUL_  | Vulpecula           |


<!-- ====================================================================== -->



## get_dec Getter
The get_dec getter returns the declination in decimal degrees.


<!-- ====================================================================== -->



## get_distance Getter
The get_distance getter returns the distance if available


<!-- ====================================================================== -->



## get_elevation Getter
The get_elevation getter returns the elevation in meters if applicable


<!-- ====================================================================== -->



## get_isCloudCommunityItem Getter
Not documented at this time.


<!-- ====================================================================== -->



## get_isFolder Getter
Not documented at this time.


<!-- ====================================================================== -->



## get_isImage Getter
Not documented at this time.


<!-- ====================================================================== -->



## get_isTour Getter
Not documented at this time.


<!-- ====================================================================== -->



## get_lat Getter
The get_lat getter returns the latitude / declination of the place in decimal degrees.


<!-- ====================================================================== -->



## get_lng Getter
The get_lng getter returns the longitude / right ascension of the place in decimal degrees.


<!-- ====================================================================== -->



## get_location3d Getter
Not documented at this time.


<!-- ====================================================================== -->



## get_magnitude Getter
The get_magnitude getter returns the magnitude of the object if applicable.


<!-- ====================================================================== -->



## get_name Getter
The get_name getter returns the name of the place as a string.


<!-- ====================================================================== -->



## get_names Getter
The get_names getter returns the collection of names associated with the place as an array of strings. E.g., ["Whirlpool Galaxy", "M51"]


<!-- ====================================================================== -->



## get_opacity Getter
The get_opacity getter returns the opacity of the place as a number representing percent opacity (min=0, max=100).


<!-- ====================================================================== -->



## get_readOnly Getter
Not documented at this time.


<!-- ====================================================================== -->



## get_searchDistance Getter
Not documented at this time.


<!-- ====================================================================== -->



## get_studyImageset Getter
The get_studyImageset getter returns the wwtlib.ImageSet (if applicable) that will render when the place is navigated to.


<!-- ====================================================================== -->



## get_tag Getter
Not documented at this time.


<!-- ====================================================================== -->



## get_target Getter
The get_target getter returns a wwtlib.SolarSystemObjects type if applicable.


#### SolarSystemObjects enum values


| Name             | Description |
|:-----------------|:------------|
| _Sun_            | 0           |
| _Mercury_        | 1           |
| _Venus_          | 2           |
| _Mars_           | 3           |
| _Jupiter_        | 4           |
| _Saturn_         | 5           |
| _Uranus_         | 6           |
| _Neptune_        | 7           |
| _Pluto_          | 8           |
| _Moon_           | 9           |
| _Io_             | 10          |
| _Europa_         | 11          |
| _Ganymede_       | 12          |
| _Callisto_       | 13          |
| _IoShadow_       | 14          |
| _EuropaShadow_   | 15          |
| _GanymedeShadow_ | 16          |
| _CallistoShadow_ | 17          |
| _SunEclipsed_    | 18          |
| _Earth_          | 19          |
| _Custom_         | 20          |
| _Undefined_      | 65536       |


<!-- ====================================================================== -->



## get_thumbnail Getter
Not documented at this time.


<!-- ====================================================================== -->



## get_thumbnailUrl Getter
The get_thumbnailUrl getter returns the url (string) of the thumbnail associated with the place.


<!-- ====================================================================== -->



## get_type Getter
The get_type getter refers to the ImagesetType context. E.g., `{earth: 0, planet: 1, sky: 2, panorama: 3, solarSystem: 4}`. Within WWT, image set type corresponds to the "Look At" dropdown in the bottom left corner of the application


<!-- ====================================================================== -->



## get_url Getter
This getter is not commonly used. Use the `place.get_studyImageset().get_creditsUrl()` or `place.get_backgroundImageset().get_creditsUrl()` as the most reliable url location for external credits and other information about imagery displayed. 


<!-- ====================================================================== -->



## get_zoomLevel Getter
The get_zoomLevel getter returns the default zoom level specified for this place

[**get_ra**]: #get_ra-getter
[**get_annotation**]: #get_annotation-getter
[**get_backgroundimageset**]: #get_backgroundimageset-getter
[**get_bounds**]: #get_bounds-getter
[**get_camparams**]: #get_camparams-getter
[**get_children**]: #get_children-getter
[**get_classification**]: #get_classification-getter
[**get_constellation**]: #get_constellation-getter
[**get_dec**]: #get_dec-getter
[**get_distance**]: #get_distance-getter
[**get_elevation**]: #get_elevation-getter
[**get_iscloudcommunityitem**]: #get_iscloudcommunityitem-getter
[**get_isfolder**]: #get_isfolder-getter
[**get_isimage**]: #get_isimage-getter
[**get_istour**]: #get_istour-getter
[**get_lat**]: #get_lat-getter
[**get_lng**]: #get_lng-getter
[**get_location3d**]: #get_location3d-getter
[**get_magnitude**]: #get_magnitude-getter
[**get_name**]: #get_name-getter
[**get_names**]: #get_names-getter
[**get_opacity**]: #get_opacity-getter
[**get_readonly**]: #get_readonly-getter
[**get_searchdistance**]: #get_searchdistance-getter
[**get_studyimageset**]: #get_studyimageset-getter
[**get_tag**]: #get_tag-getter
[**get_target**]: #get_target-getter
[**get_thumbnail**]: #get_thumbnail-getter
[**get_thumbnailurl**]: #get_thumbnailurl-getter
[**get_type**]: #get_type-getter
[**get_url**]: #get_url-getter
[**get_zoomlevel**]: #get_zoomlevel-getter



<!-- ====================================================================== -->


[Top]

# Place Property Setters

Most place property setters are not intended for external scripting and are present due to how the library is generated. However, they _can_ be used if you find use cases for them.       The most relevant and useful setters are documented below
<!-- ====================================================================== -->



| Setter               | Description                                          |
|:---------------------|:-----------------------------------------------------|
| [**set_annotation**] | Adds an annotation                                   |
| [**set_camParams**]  | Sets a wwtlib.CameraParameters object                |
| [**set_names**]      | Sets a collection of names associated with the place |
| [**set_opacity**]    | Sets the place opacity as a percentage (0-100)       |



#### Not Implemented Setters

| Setter               | Description |
|:---------------------|:------------|
| _set_bounds_         | -           |
| _set_classification_ | -           |


#### Not documented Setters

| Setter                   | Description |
|:-------------------------|:------------|
| _set_RA_                 | -           |
| _set_backgroundImageset_ | -           |
| _set_constellation_      | -           |
| _set_dec_                | -           |
| _set_distance_           | -           |
| _set_elevation_          | -           |
| _set_lat_                | -           |
| _set_lng_                | -           |
| _set_magnitude_          | -           |
| _set_searchDistance_     | -           |
| _set_studyImageset_      | -           |
| _set_tag_                | -           |
| _set_target_             | -           |
| _set_thumbnail_          | -           |
| _set_thumbnailUrl_       | -           |
| _set_type_               | -           |
| _set_url_                | -           |
| _set_zoomLevel_          | -           |


<!-- ====================================================================== -->



## set_RA Setter
Not documented at this time.


<!-- ====================================================================== -->



## set_annotation Setter
The set_annotation setter can add an annotation to a place. This toggles the visibility of the annotation along with the place.


#### Example Code
```js
// This example assumes you have a fully initialized wwt_ctl object.
//See scriptInterface documentation for examples. 
const loadChildrenFromUrl = (url) => {
  return new Promise(resolved, rejected) => {
    let folder = wwt_ctl.createFolder();
    folder.set_name('Example');
    folder.loadFromUrl(url, () => {
      const children = folder.get_children();
      resolved(children);
    });
  }
};
loadChildrenFromUrl('http://worldwidetelescope.org/data/hubble.wtml')
  .then(places => {
    let annotatedPlace = places[3];
    let circle = wwt_ctl.createCircle(false);
    circle.set_radius(0.5);
    circle.setCenter(annotatedPlace.get_RA(), annotatedPlace.get_dec());
    wwt_ctl.addAnnotation(circle);
    annotatedPlace.set_annotation(circle);
  });
```


<!-- ====================================================================== -->



## set_backgroundImageset Setter
Not documented at this time.


<!-- ====================================================================== -->



## set_bounds Setter
Not yet implemented. This is a stub.
undefined


<!-- ====================================================================== -->



## set_camParams Setter
The set_camParams setter sets default camera parameters associated with the place.


#### CameraParameters constructor

To set a cameraParameters value to a place, you must first construct a wwtlib.CameraParameters object


#### Parameters

| Name       | Description                                       |
|:-----------|:--------------------------------------------------|
| _lat_      | (decimal) latitude or declination in degrees      |
| _lng_      | (decimal) longitude or right ascension in degrees |
| _zoom_     | (decimal) default zoom level                      |
| _rotation_ | (decimal) Degrees of camera rotation              |
| _angle_    | (decimal) Degrees of camera tilt                  |
| _opacity_  | (number) Percent opacity (0-100)                  |


#### Example Code
```js
const lagoonNebulaCam = () => {
  const declination = -24.3793262667;
  const RA = -270.9106555759995;
  const zoom = 0.36;
  let angle, rotation;
  angle = rotation = 0;
  const opacity = 100;
  return wwtlib.CameraParameters.create(declination, RA, zoom, rotation, angle, opacity);
};

const lagoonNebulaPlace = () => {
  const ra = 18.0607103717333;
  const dec = 24.3793262667;
  const classification = wwtlib.Classification.nebula;
  const imagesetType = wwtlib.ImageSetType.sky;
  const constellation = 'SGR';
  const zoomFactor = 0.36427571987415;
  return wwtlib.Place.create('lagoonNeb', dec, ra, classification, constellation, imagesetType, zoomFactor);
};

let lagoon = lagoonNebulaPlace();
let lCam = lagoonNebulaCam();
lagoon.set_camParams(lCam);
wwtlib.WWTControl.singleton.gotoTarget(lagoon);
```


<!-- ====================================================================== -->



## set_classification Setter
Not yet implemented. This is a stub.
undefined


<!-- ====================================================================== -->



## set_constellation Setter
Not documented at this time.


<!-- ====================================================================== -->



## set_dec Setter
Not documented at this time.


<!-- ====================================================================== -->



## set_distance Setter
Not documented at this time.


<!-- ====================================================================== -->



## set_elevation Setter
Not documented at this time.


<!-- ====================================================================== -->



## set_lat Setter
Not documented at this time.


<!-- ====================================================================== -->



## set_lng Setter
Not documented at this time.


<!-- ====================================================================== -->



## set_magnitude Setter
Not documented at this time.


<!-- ====================================================================== -->



## set_names Setter
The set_names setter sets an array of names of alternate names for the place. The whirlpool galaxy for example could have a names collection of `["Whirlpool Galaxy", "Whirlpool Galaxy and companion", "M51", "NGC 5194", "NGC 5195"]`


<!-- ====================================================================== -->



## set_opacity Setter
The set_opacity setter can adjust the opacity of the place imagery (if applicable). This value represents a percentage from 0-100.


<!-- ====================================================================== -->



## set_searchDistance Setter
Not documented at this time.


<!-- ====================================================================== -->



## set_studyImageset Setter
Not documented at this time.


<!-- ====================================================================== -->



## set_tag Setter
Not documented at this time.


<!-- ====================================================================== -->



## set_target Setter
Not documented at this time.


<!-- ====================================================================== -->



## set_thumbnail Setter
Not documented at this time.


<!-- ====================================================================== -->



## set_thumbnailUrl Setter
Not documented at this time.


<!-- ====================================================================== -->



## set_type Setter
Not documented at this time.


<!-- ====================================================================== -->



## set_url Setter
Not documented at this time.


<!-- ====================================================================== -->



## set_zoomLevel Setter
Not documented at this time.

[**set_ra**]: #set_ra-setter
[**set_annotation**]: #set_annotation-setter
[**set_backgroundimageset**]: #set_backgroundimageset-setter
[**set_bounds**]: #set_bounds-setter
[**set_camparams**]: #set_camparams-setter
[**set_classification**]: #set_classification-setter
[**set_constellation**]: #set_constellation-setter
[**set_dec**]: #set_dec-setter
[**set_distance**]: #set_distance-setter
[**set_elevation**]: #set_elevation-setter
[**set_lat**]: #set_lat-setter
[**set_lng**]: #set_lng-setter
[**set_magnitude**]: #set_magnitude-setter
[**set_names**]: #set_names-setter
[**set_opacity**]: #set_opacity-setter
[**set_searchdistance**]: #set_searchdistance-setter
[**set_studyimageset**]: #set_studyimageset-setter
[**set_tag**]: #set_tag-setter
[**set_target**]: #set_target-setter
[**set_thumbnail**]: #set_thumbnail-setter
[**set_thumbnailurl**]: #set_thumbnailurl-setter
[**set_type**]: #set_type-setter
[**set_url**]: #set_url-setter
[**set_zoomlevel**]: #set_zoomlevel-setter



<!-- ====================================================================== -->


[Top]

# Place Methods

_No documented methods exist for the place class_
<!-- ====================================================================== -->






#### Not documented Methods

| Method                 | Description |
|:-----------------------|:------------|
| _toString_             | -           |
| _updatePlanetLocation_ | -           |


<!-- ====================================================================== -->



## toString Method
Not documented at this time.


<!-- ====================================================================== -->



## updatePlanetLocation Method
Not documented at this time.

[**tostring**]: #tostring-method
[**updateplanetlocation**]: #updateplanetlocation-method

