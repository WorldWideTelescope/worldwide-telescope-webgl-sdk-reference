---
  description: Folder class common methods and properties.
---


# Folder class

Jump to section:
 - [**Folder Property Getters**]
 - [**Folder Property Setters**]
 - [**Folder Methods**]

[**Folder Property Getters**]: #folder-property-getters
[**Folder Property Setters**]: #folder-property-setters
[**Folder Methods**]: #folder-methods
[Top]: #folder-class

The folder class serves as a management container for [**Place**], image set, and wtml collections.


#### Basic creation and usage example

```js
const makeFolder = (url, name) => {
  return new Promise(resolved => {
    const folder = wwt_ctl.createFolder();
    folder.set_name(name);
    folder.loadFromUrl(url, () => resolved(folder));
  });
};

const gotoPlace = (place, noZoom=false, instant=false) => {
  wwtlib.WWTControl.singleton.gotoTarget(place, noZoom, instant);
};

makeFolder('http://worldwidetelescope.org/data/wise.wtml', 'Example Folder')
  .then(folder => {
    let places = folder.get_children();
    gotoPlace(places[0]);
  });
```


#### Remarks
Folders are used by the wwt web client extensively and internally by the WebGL engine. Not all methods or properties are documented or intended for external scripting.

<!-- ====================================================================== -->


[Top]

# Folder Property Getters
<!-- ====================================================================== -->



| Getter              | Description              |
|:--------------------|:-------------------------|
| [**get_children**]  | Gets all child objects   |
| [**get_folders**]   | Gets child folders       |
| [**get_imagesets**] | Gets child image sets    |
| [**get_name**]      | (string) folder name     |
| [**get_places**]    | Gets child place objects |
| [**get_tours**]     | Gets child tour objects  |



<!-- ====================================================================== -->



## get_children Getter
The get_children getter returns the children (first level descendants only) of the folder. Folder contents can be a Place, ImageSet, Tour, or a nested Folder.


#### Remarks
Children are loaded asynchronously, so this method should be used within a loadFromUrl or a childLoadCallback function. In actuality, loadFromUrl (wtml collections) and childLoadCallback (used with nested folders) are the functions that load the children into the folder, then the children are access with the get_children getter.


#### Example Code
```js
const loadChildrenFromUrl = (url) => {
  return new Promise(resolved => {
    let folder = wwt_ctl.createFolder();
    folder.set_name('Example');
    folder.loadFromUrl(url, () => {
      const children = folder.get_children();
      resolved(children);
    });
  });
};
loadChildrenFromUrl('http://worldwidetelescope.org/data/hubble.wtml')
  .then(children => {
    console.log('children:', children);
  });
```


<!-- ====================================================================== -->



## get_folders Getter
The get_folders getter returns the children Folder objects (first level descendants only) of the folder.


#### Remarks
You must use `childLoadCallback` and `get_children` to retrieve the children inside the child folders.


#### Example Code
```js
const loadAllChildrenFromUrl = (url) => {
  const getSubfolderChildren = (folder) => {
    return new Promise(resolved => {
      folder.childLoadCallback(() => resolved(folder.get_children()));
    });
  } 
  return new Promise(resolved => {
    let folder = wwt_ctl.createFolder();
    folder.set_name('Example');
    folder.loadFromUrl('http://worldwidetelescope.org/data/surveys.wtml', () => {
      const children = folder.get_children();
      const folders = folder.get_folders();
      const allFolderPromises = folders.map(f => getSubfolderChildren(f));
      Promise.all(allFolderPromises).then(folderChildren => {
        children.concat(folderChildren.flat());
        resolved(children);
      });
    });
  });
};
```


<!-- ====================================================================== -->



## get_imagesets Getter
The get_imagesets getter returns the children Imageset objects (first level descendants only) of the folder. Sky surveys and planet imagery are examples of Imageset objects.


#### Example Code
```js
const loadSurveys = () => {
  return new Promise(resolved => {
    let folder = wwt_ctl.createFolder();
    folder.set_name('Example');
    folder.loadFromUrl('http://worldwidetelescope.org/data/surveys.wtml', () => {
      const imagesets = folder.get_imagesets();
      resolved(imagesets);
    });
  });
};

loadSurveys().then(surveys => console.log('surveys (imagesets):', surveys));
```


<!-- ====================================================================== -->



## get_name Getter
The get_name getter returns the name of the folder as a string.


<!-- ====================================================================== -->



## get_places Getter
The get_places getter returns the children place objects (first level descendants only) of the folder.


#### Example Code
```js
const loadPlaces = () => {
  return new Promise(resolved => {
    let folder = wwt_ctl.createFolder();
    folder.set_name('Example');
    folder.loadFromUrl('http://worldwidetelescope.org/data/hubble.wtml', () => {
      const places = folder.get_places();
      resolved(places);
    });
  });
};

loadPlaces().then(places => console.log('places:', places));
```


<!-- ====================================================================== -->



## get_tours Getter
The get_tours getter returns the child tours (first level descendants only) of the folder.


#### Example Code
```js
const loadTours = () => {
  return new Promise(resolved => {
    let folder = wwt_ctl.createFolder();
    folder.set_name('WebClientTours');
    folder.loadFromUrl('http://worldwidetelescope.org/webclient/gettours_webclient.xml', () => {
      const tours = folder.get_tours();
      resolved(tours);
    });
  });
};

loadTours().then(tours => console.log('tours:', tours));
```

[**get_children**]: #get_children-getter
[**get_folders**]: #get_folders-getter
[**get_imagesets**]: #get_imagesets-getter
[**get_name**]: #get_name-getter
[**get_places**]: #get_places-getter
[**get_tours**]: #get_tours-getter



<!-- ====================================================================== -->


[Top]

# Folder Property Setters
<!-- ====================================================================== -->



| Setter         | Description          |
|:---------------|:---------------------|
| [**set_name**] | Sets the folder name |



<!-- ====================================================================== -->



## set_name Setter
Sets a name for the folder.

[**set_name**]: #set_name-setter



<!-- ====================================================================== -->


[Top]

# Folder Methods
<!-- ====================================================================== -->



| Method                  | Description                                               |
|:------------------------|:----------------------------------------------------------|
| [**addChildFolder**]    | Adds a nested child folder                                |
| [**addChildPlace**]     | Adds a [**Place**] to the folder                          |
| [**childLoadCallback**] | Passes a function to invoke when a folder's children load |
| [**loadFromUrl**]       | Loads a wtml collection into a folder                     |
| [**removeChildFolder**] | Removes a child folder from the folder                    |
| [**removeChildPlace**]  | Remove a child place from the folder                      |



<!-- ====================================================================== -->



## addChildFolder Method
Adds a new child folder to the current folder.


#### Example Code
```js
//creates the default folder structure used in WWT
// then adds a child folder with wtml from a custom location
// and resolves the promise with the returned array of wwtlib.Places
const loadCustomCollection = wtmlUrl => {
  return new Promise(resolved => {
    const rootFolder = wwt_ctl.createFolder();
    rootFolder.loadFromUrl('//worldwidetelescope.org/wwtweb/catalog.aspx?W=WCExploreRoot',  () => {
      const customFolder = wwt_ctl.createFolder();
      customFolder.set_name('Custom Folder');
      customFolder.loadFromUrl(wtmlUrl, () => {
        customFolder.get_children();// get_children initializes the folder contents
        rootFolder.addChildFolder(customFolder);
        resolved(customFolder);
      });
    });
  });
};

loadCustomCollection('http://worldwidetelescope.org/data/spitzer.wtml').then(folder=>{
  const children = folder.get_children();
  console.log('collection children:', children);
});
```


<!-- ====================================================================== -->



## addChildPlace Method
Adds a [**Place**] to the folder.


#### Parameters

| Name    | Description          |
|:--------|:---------------------|
| _place_ | A [**Place**] object |


#### Example Code
```js
const addChild = (ra, dec, name = 'temp') => {
  const childPlace = wwtlib.Place.create('tmp', dec, ra, null, null, 'Sky', 60);
  const folder = wwt_ctl.createFolder();
  folder.set_name('example');
  folder.addChildPlace(childPlace);
}
```


<!-- ====================================================================== -->



## childLoadCallback Method
This function is used when a folder contains nested folders. If you try to enumerate the children of a nested folder synchronously, the collection will be empty.


#### Parameters

| Name       | Description                                                      |
|:-----------|:-----------------------------------------------------------------|
| _callback_ | Function pointer to invoke when contents of the folder are ready |


#### Example Code
```js
//async helper to return folder contents
const getChildrenAsync = (folder) => {
  return new Promise(resolved=>{
    folder.childLoadCallback(()=>{
      resolved(folder.get_children());
    })
  });
};

const getWiseLatestImageryFeed = () => {
  return new Promise(resolved=>{
    const rootFolder = wwt_ctl.createFolder();
    //loadFromUrl initializes its direct descendants, but only first gen children
    rootFolder.loadFromUrl('//worldwidetelescope.org/wwtweb/catalog.aspx?W=WCExploreRoot', () => {
      const latestImageryFolder = root.get_children()[0];
      let wiseFolder;
      getChildrenAsync(latestImageryFolder).then(children => {
        //wwt latest imagery contents:
        //[folderUp, wise, chandra, hubble, spitzer, eso]
        wiseFolder = children[1];
        getChildrenAsync(wiseFolder).then(wiseImagery => resolved(wiseImagery));
      });
    });
  });
};

getWiseLatestImageryFeed().then(wiseImagery => console.log({wiseImagery}));
```


<!-- ====================================================================== -->



## loadFromUrl Method
The loadfromUrl method will load a wtml collection directly into the folder where you can then enumerate and interact with its children.


#### Parameters

| Name       | Description                                         |
|:-----------|:----------------------------------------------------|
| _url_      | Url for the collection being loaded                 |
| _callback_ | Callback function to call when collection is loaded |


#### Remarks
If the collection loaded contains folders, you will need to use the [**childLoadCallback** method] to properly retrieve deeper descendants of the collection tree.


#### Example Code
```js
const folder = wwt_ctl.createFolder();
  folder.set_name(name);
  folder.loadFromUrl('http://worldwidetelescope.org/data/eso.wtml', () => {
    let places = folder.get_children();
    wwtlib.WWTControl.singleton.gotoTarget(places[0]);
  });
```


<!-- ====================================================================== -->



## removeChildFolder Method
The removeChildFolder method removes the supplied child folder from the folder.


#### Parameters

| Name     | Description      |
|:---------|:-----------------|
| _folder_ | Folder to remove |


#### Example Code
```js
//async helper to return folder contents
const getChildrenAsync = (folder) => {
  return new Promise(resolved=>{
    folder.childLoadCallback(()=>{
      resolved(folder.get_children());
    })
  });
};

const removeNamedChild = (name) => {
  return new Promise(resolved, rejected => {
    const rootFolder = wwt_ctl.createFolder();    
    rootFolder.loadFromUrl('//worldwidetelescope.org/wwtweb/catalog.aspx?W=WCExploreRoot', function () {
      let folders = root.get_folders();
      let removeFolder = folders.find(f => f.get_name().toLowerCase() === name.toLowerCase());
      if (removeFolder){
        rootFolder.removeChildFolder(removeFolder);
        resolved(rootFolder);
      }else{
        rejected('not found');
      }
    });
  });
};

removeNamedChild('Constellations').then(folder => {
  console.log('Successfully removed constellations');
  console.log({'folderContents': folder.get_children()});
});
```


<!-- ====================================================================== -->



## removeChildPlace Method
The removeChildPlace can be used to remove a place from the folder (passed by reference), however it is just as easy and recommended to use javascript's native `splice` array method instead.

[**addchildfolder**]: #addchildfolder-method
[**addchildplace**]: #addchildplace-method
[**childloadcallback**]: #childloadcallback-method
[**loadfromurl**]: #loadfromurl-method
[**removechildfolder**]: #removechildfolder-method
[**removechildplace**]: #removechildplace-method
[**place** class]: ./place.md
[**place** object]: ./place.md
[**place**]: ./place.md

