export const generateData = (list, title) => {
  if (!Array.isArray(list)) {
    list = Object.keys(list.__proto__);
  }
  const methods = {};
  const privateMembers = {};
  const events = {};
  const getters = {};
  const setters = {};


  const docItem = (bucket, name, type) => {
    bucket[name] = {
      desc:'',
      documented:true,
      implemented: true,
      content: [
        //{h1: `${name} ${type}`},
        {text: `${name} description`}
      ]

    };
  };
  list.sort().forEach(item => {
    if (item.startsWith('add_') || item.startsWith('remove_')) {
      const eventName = item.split('_')[1];
      if (events[eventName]) {
        return;
      }
      docItem(events, eventName, 'Event');
    } else if (item.startsWith('_')) {
      privateMembers[item.substr(1)] = item;
    } else if (item.startsWith('get_')) {
      docItem(getters, item/*.replace('get_', '')*/, 'Property getter');

    } else if (item.startsWith('set_')) {
      docItem(setters, item/*.replace('set_', '')*/, 'Property setter');
    } else {
      docItem(methods, item, 'Method');
    }
  });
  let head = [
    {desc:title + ' description'},
    {h:title},
    {text:title + ' intro'}
  ];

  return {methods, privateMembers, events, getters, setters};
};

export const folder = {
  head: [
    {desc:`Folder class common methods and properties.`},
    {h: 'Folder class'},
    {tofc:true},
    {text:'The folder class serves as a management container for [**Place**], image set, and wtml collections.'},
    {h4:'Basic creation and usage example'},
    {code:`const makeFolder = (url, name) => {
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
  });`},
    {rem:'Folders are used by the wwt web client extensively and internally by the WebGL engine. Not all methods or properties are documented or intended for external scripting.'}
  ],
  'methods': {
    methods:[{h:`Folder Methods`}],
    'addChildFolder': {
      desc:'Adds a nested child folder',
      implemented:true, documented:true,
      'content': [
        {'text': 'Adds a new child folder to the current folder.'},
        {example:`//creates the default folder structure used in WWT
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
});`
        }
      ]},
    'addChildPlace': {
      implemented:true, documented:true,
      'desc': 'Adds a [**Place**] to the folder',
      'content': [
        {'text': 'Adds a [**Place**] to the folder.'},
        {
          params: {
            place:'A [**Place**] object'
          }
        },
        {example:`const addChild = (ra, dec, name = 'temp') => {
  const childPlace = wwtlib.Place.create('tmp', dec, ra, null, null, 'Sky', 60);
  const folder = wwt_ctl.createFolder();
  folder.set_name('example');
  folder.addChildPlace(childPlace);
}`}
      ]
    },
    'childLoadCallback': {
      desc:`Passes a function to invoke when a folder's children load`,
      implemented:true, documented:true,
      'content': [
        {'text': 'This function is used when a folder contains nested folders. If you try to enumerate the children of a nested folder synchronously, the collection will be empty.'},
        {params:{callback:'Function pointer to invoke when contents of the folder are ready'}},
        {example:`//async helper to return folder contents
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

getWiseLatestImageryFeed().then(wiseImagery => console.log({wiseImagery}));`
        }
      ]
    },
    'loadFromUrl': {
      implemented:true, documented:true,
      desc:`Loads a wtml collection into a folder`,
      'content': [
        {'text': 'The loadfromUrl method will load a wtml collection directly into the folder where you can then enumerate and interact with its children.'},
        {params:{
            url:'Url for the collection being loaded',
            callback:'Callback function to call when collection is loaded'}
        },
        {rem:'If the collection loaded contains folders, you will need to use the [**childLoadCallback** method] to properly retrieve deeper descendants of the collection tree.'},
        {example:`const folder = wwt_ctl.createFolder();
  folder.set_name(name);
  folder.loadFromUrl('http://worldwidetelescope.org/data/eso.wtml', () => {
    let places = folder.get_children();
    wwtlib.WWTControl.singleton.gotoTarget(places[0]);
  });`}]
    },
    //
    'removeChildFolder': {
      implemented:true, documented:true,
      'desc':'Removes a child folder from the folder',
      'content': [
        {'text': 'The removeChildFolder method removes the supplied child folder from the folder.'},
        {params: { folder: 'Folder to remove'}},
        {example:`//async helper to return folder contents
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
});`}
      ]
    },
    'removeChildPlace': {
      desc:'Remove a child place from the folder',
      implemented:true, documented:true,
      'content': [
        {'text': `The removeChildPlace can be used to remove a place from the folder (passed by reference), however it is just as easy and recommended to use javascript's native \`splice\` array method instead.`}
      ]
    }
    //'toString': {implemented:true,documented:true, 'content': [{'text': 'toString description'}]}
  },
  'privateMembers': {'clearChildren': '_clearChildren', 'loadData': '_loadData', 'parseXML': '_parseXML'},
  //'events': {},
  'getters': {
    getters:[{h:`Folder Property Getters`}],
    /*'get_bounds': {
      desc:'',
      implemented:true,documented:true,
      'content': [
        {'text': 'get_bounds description'}
      ]
    },
    'get_browseable': {implemented:true,documented:true, 'content': [{'text': 'get_browseable description'}]},
    'get_browseableSpecified': {implemented:true,documented:true, 'content': [{'text': 'get_browseableSpecified description'}]},*/
    'get_children': {
      desc:'Gets all child objects',
      implemented:true, documented:true,
      'content': [
        {'text': 'The get_children getter returns the children (first level descendants only) of the folder. Folder contents can be a Place, ImageSet, Tour, or a nested Folder.'},
        {rem:'Children are loaded asynchronously, so this method should be used within a loadFromUrl or a childLoadCallback function. In actuality, loadFromUrl (wtml collections) and childLoadCallback (used with nested folders) are the functions that load the children into the folder, then the children are access with the get_children getter.'},
        {example:`const loadChildrenFromUrl = (url) => {
  return new Promise(resolved => {
    let folder = wwt.wc.createFolder();
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
  });`}
      ]
    },
    //
    'get_folders':  {
      desc:'Gets child folders',
      implemented:true, documented:true,
      'content': [
        {'text': 'The get_folders getter returns the children Folder objects (first level descendants only) of the folder.'},
        {rem:'You must use `childLoadCallback` and `get_children` to retrieve the children inside the child folders.'},
        {example:`const loadAllChildrenFromUrl = (url) => {
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
};`}
      ]
    },
    //'get_group': {implemented:true,documented:true, 'content': [{'text': 'get_group description'}]},
    'get_imagesets': {
      desc:'Gets child image sets',
      implemented:true, documented:true,
      'content': [
        {'text': 'The get_imagesets getter returns the children Imageset objects (first level descendants only) of the folder. Sky surveys and planet imagery are examples of Imageset objects.'},
        {example:`const loadSurveys = () => {
  return new Promise(resolved => {
    let folder = wwt_ctl.createFolder();
    folder.set_name('Example');
    folder.loadFromUrl('http://worldwidetelescope.org/data/surveys.wtml', () => {
      const imagesets = folder.get_imagesets();
      resolved(imagesets);
    });
  });
};

loadSurveys().then(surveys => console.log('surveys (imagesets):', surveys));`}
      ]
    },
    'get_name': {
      desc:'(string) folder name',
      implemented:true, documented:true,
      'content': [
        {'text': 'The get_name getter returns the name of the folder as a string.'}
      ]
    },
    'get_places': {
      desc:'Gets child place objects',
      implemented:true, documented:true,
      'content': [
        {'text': 'The get_places getter returns the children place objects (first level descendants only) of the folder.'},
        {example:`const loadPlaces = () => {
  return new Promise(resolved => {
    let folder = wwt_ctl.createFolder();
    folder.set_name('Example');
    folder.loadFromUrl('http://worldwidetelescope.org/data/hubble.wtml', () => {
      const places = folder.get_places();
      resolved(places);
    });
  });
};

loadPlaces().then(places => console.log('places:', places));`}
      ]
    },
    'get_tours': {
      desc:'Gets child tour objects',
      implemented:true, documented:true,
      'content': [
        {'text': 'The get_tours getter returns the child tours (first level descendants only) of the folder.'},
        {example:`const loadTours = () => {
  return new Promise(resolved => {
    let folder = wwt_ctl.createFolder();
    folder.set_name('WebClientTours');
    folder.loadFromUrl('http://worldwidetelescope.org/webclient/gettours_webclient.xml', () => {
      const tours = folder.get_tours();
      resolved(tours);
    });
  });
};

loadTours().then(tours => console.log('tours:', tours));`}
      ]
    }
    /*,
    'get_url': {implemented:true,documented:true, 'content': [{'text': 'get_url description'}]}
    'refresh': {implemented:true,documented:true, 'content': [{'text': 'refresh description'}]},
    'get_dirty': {implemented:true,documented:true, 'content': [{'text': 'get_dirty description'}]},
    'get_isCloudCommunityItem': {implemented:true,documented:true, 'content': [{'text': 'get_isCloudCommunityItem description'}]},
    'get_isFolder': {implemented:true,documented:true, 'content': [{'text': 'get_isFolder description'}]},
    'get_isImage': {implemented:true,documented:true, 'content': [{'text': 'get_isImage description'}]},
    'get_isTour': {implemented:true,documented:true, 'content': [{'text': 'get_isTour description'}]},
    'get_msrCommunityId': {implemented:true,documented:true, 'content': [{'text': 'get_msrCommunityId description'}]},
    'get_msrComponentId': {implemented:true,documented:true, 'content': [{'text': 'get_msrComponentId description'}]},
    'get_permission': {implemented:true,documented:true, 'content': [{'text': 'get_permission description'}]},
    'get_readOnly': {implemented:true,documented:true, 'content': [{'text': 'get_readOnly description'}]},
    'get_refreshInterval': {implemented:true,documented:true, 'content': [{'text': 'get_refreshInterval description'}]},
    'get_refreshType': {implemented:true,documented:true, 'content': [{'text': 'get_refreshType description'}]},
    'get_refreshTypeSpecified': {implemented:true,documented:true, 'content': [{'text': 'get_refreshTypeSpecified description'}]},
    'get_searchable': {implemented:true,documented:true, 'content': [{'text': 'get_searchable description'}]},
    'get_subType': {implemented:true,documented:true, 'content': [{'text': 'get_subType description'}]},
    'get_thumbnail': {implemented:true,documented:true, 'content': [{'text': 'get_thumbnail description'}]},
    'get_thumbnailUrl': {implemented:true,documented:true, 'content': [{'text': 'get_thumbnailUrl description'}]},
    'get_type': {implemented:true,documented:true, 'content': [{'text': 'get_type description'}]},
    'get_versionDependent': {implemented:true,documented:true, 'content': [{'text': 'get_versionDependent description'}]}*/
  },
  'setters': {
    setters:[{h:`Folder Property Setters`}],
    'set_name': {
      desc:'Sets the folder name',
      implemented:true, documented:true,
      'content': [
        {'text': 'Sets a name for the folder.'}
      ]
    }
    /*'set_bounds': {implemented:true,documented:true, 'content': [{'text': 'set_bounds description'}]},
    'set_browseable': {implemented:true,documented:true, 'content': [{'text': 'set_browseable description'}]},
    'set_browseableSpecified': {implemented:true,documented:true, 'content': [{'text': 'set_browseableSpecified description'}]},
    'set_dirty': {implemented:true,documented:true, 'content': [{'text': 'set_dirty description'}]},
    'set_folders': {implemented:true,documented:true, 'content': [{'text': 'set_folders description'}]},
    'set_group': {implemented:true,documented:true, 'content': [{'text': 'set_group description'}]},
    'set_imagesets': {implemented:true,documented:true, 'content': [{'text': 'set_imagesets description'}]},
    'set_msrCommunityId': {implemented:true,documented:true, 'content': [{'text': 'set_msrCommunityId description'}]},
    'set_msrComponentId': {implemented:true,documented:true, 'content': [{'text': 'set_msrComponentId description'}]},
    'set_permission': {implemented:true,documented:true, 'content': [{'text': 'set_permission description'}]},
    'set_places': {implemented:true,documented:true, 'content': [{'text': 'set_places description'}]},
    'set_readOnly': {implemented:true,documented:true, 'content': [{'text': 'set_readOnly description'}]},
    'set_refreshInterval': {implemented:true,documented:true, 'content': [{'text': 'set_refreshInterval description'}]},
    'set_refreshType': {implemented:true,documented:true, 'content': [{'text': 'set_refreshType description'}]},
    'set_refreshTypeSpecified': {implemented:true,documented:true, 'content': [{'text': 'set_refreshTypeSpecified description'}]},
    'set_searchable': {implemented:true,documented:true, 'content': [{'text': 'set_searchable description'}]},
    'set_subType': {implemented:true,documented:true, 'content': [{'text': 'set_subType description'}]},
    'set_thumbnail': {implemented:true,documented:true, 'content': [{'text': 'set_thumbnail description'}]},
    'set_thumbnailUrl': {implemented:true,documented:true, 'content': [{'text': 'set_thumbnailUrl description'}]},
    'set_tours': {implemented:true,documented:true, 'content': [{'text': 'set_tours description'}]},
    'set_type': {implemented:true,documented:true, 'content': [{'text': 'set_type description'}]},
    'set_url': {implemented:true,documented:true, 'content': [{'text': 'set_url description'}]},
    'set_versionDependent': {implemented:true,documented:true, 'content': [{'text': 'set_versionDependent description'}]}*/
  }
};
export const place = {
  head: [
    {desc:`Place class common methods and properties.`},
    {h: 'Place class'},
    {tofc:true},
    {text:'Places are locations within WWT and can contain imagery or other data. The most common way to create places within WWT is using WTML files. However you can also create places on-the-fly with raw values. This page documents the most common properties of place objects. Note that most of the setters are not documented because they should be set during construction. Though interfaces to set various properties exist, they are not all meant for scripting.'},
    {h4:'Basic creation and usage example'},
    {code:`const ra = 0;
const dec = 0;
const classification = 1;//star
const imagesetType = 2;//sky
const constellation = wwtlib.Constellations.containment.findConstellationForPoint(ra, dec);
const zoomFactor = 0;
const center = wwtlib.Place.create('center', dec, ra, classification, constellation, imagesetType, zoomFactor);

wwtlib.WWTControl.singleton.gotoTarget(center);`}
  ],
  methods: {
    methods:[{h:'Place Methods'},{text:'_No documented methods exist for the place class_'}],
    toString: {
      documented: false,
      implemented: true
    },
    updatePlanetLocation: {
      documented: false,
      implemented: true
    }
  },
  getters: {
    getters:[{h:'Place Property Getters'}],
    get_RA: {
      desc: '(decimal) right ascension/longitude',
      documented: true,
      implemented: true,
      content: [
        {
          text: 'The **get_RA** getter returns the right ascension / longitude of the place in decimal degrees.'
        }
      ]
    },
    get_annotation: {
      desc: '(Annotation) annotation if any',
      documented: true,
      implemented: true,
      content: [
        {
          text: 'The **get_annotation** getter returns any annotation (Circle, Poly, etc.) that were added to the place.'
        }
      ]
    },
    get_backgroundImageset: {
      desc: '(Imageset) backgroundImageset that is rendered',
      documented: true,
      implemented: true,
      content: [
        {
          text: 'The **get_backgroundImageset** getter returns the background Imageset (if any) that renders when you navigate to the place.'
        }
      ]
    },
    get_bounds: {
      documented: false,
      implemented: true
    },
    get_camParams: {
      desc: '(CameraParameters) The camera parameters for the place',
      documented: true,
      implemented: true,
      content: [
        {
          text: 'The get_camParams getter returns the CameraParameters for the place. CameraParameters is not currently documented, but contains the following properties.'
        }, {
          h4:'Camera Parameters Properties'
        },
        {
          ptable:{
            lat:'(decimal) Declination or latitude',
            lng:'(decimal) Right ascension or longitude',
            angle:'(decimal) Degrees of camera tilt',
            rotation:'(decimal) Degrees of camera rotation',
            opacity:'(number) Percent opacity (0-100)',
            raDec:'(boolean) indicates if lat/lng values indicate RA/Dec coordinates',
            target:'(int wwtlib.SolarSystemObjects) Specifies the target type',
            targetReferenceFrame:'(string) Name of a reference frame',
            viewTarget:'(Vector3d) A 3d vector representing the view target'
          }
        }
      ]
    },
    get_children: {
      desc: '',
      documented: false,
      implemented: true
    },
    get_classification: {
      desc: '(Classification) Place classification',
      documented: true,
      implemented: true,
      content: [
        {
          text: 'The get_classification getter returns the place classification as one of the following values in the table below.'
        }, {
          ptable:{
            Star: 1,
            Supernova: 2,
            BlackHole: 4,
            NeutronStar: 8,
            DoubleStar: 16,
            MultipleStars: 32,
            Asterism: 64,
            Constellation: 128,
            OpenCluster: 256,
            GlobularCluster: 512,
            NebulousCluster: 1024,
            Nebula: 2048,
            EmissionNebula: 4096,
            PlanetaryNebula: 8192,
            ReflectionNebula: 16384,
            DarkNebula: 32768,
            GiantMolecularCloud: 65536,
            SupernovaRemnant: 131072,
            InterstellarDust: 262144,
            Quasar: 524288,
            Galaxy: 1048576,
            SpiralGalaxy: 2097152,
            IrregularGalaxy: 4194304,
            EllipticalGalaxy: 8388608,
            Knot: 16777216,
            PlateDefect: 33554432,
            ClusterOfGalaxies: 67108864,
            OtherNGC: 134217728,
            Unidentified: 268435456,
            SolarSystem: 536870912,
            Unfiltered: 1073741823,
            Stellar: 63,
            StellarGroupings: 2032,
            Nebulae: 523264,
            Galactic: 133693440,
            Other: 436207616
          }
        }
      ]
    },
    get_constellation: {
      desc: 'Retrieves the 3-letter constellation the place (centroid) is contained within',
      documented: true,
      implemented: true,
      content: [
        {
          text: 'The get_constellation getter returns the constellation (or null) containing the place RA/Dec as a 3-letter abbreviation.'
        },
        {h4:'Constellation abbreviation reference'},
        {
          ptable:{
            AND: 'Andromeda',
            ANT: 'Antlia',
            APS: 'Apus',
            AQL: 'Aquila',
            AQR: 'Aquarius',
            ARA: 'Ara',
            ARI: 'Aries',
            AUR: 'Auriga',
            BOO: 'Bootes',
            CAE: 'Caelum',
            CAM: 'Camelopardalis',
            CAP: 'Capricornus',
            CAR: 'Carina',
            CAS: 'Cassiopeia',
            CEN: 'Centaurus',
            CEP: 'Cepheus',
            CET: 'Cetus',
            CHA: 'Chamaeleon',
            CIR: 'Circinus',
            CMA: 'Canis Major',
            CMI: 'Canis Minor',
            CNC: 'Cancer',
            COL: 'Columba',
            COM: 'Coma Berenices',
            CRA: 'Corona Australis',
            CRB: 'Corona Borealis',
            CRT: 'Crater',
            CRU: 'Crux',
            CRV: 'Corvus',
            CVN: 'Canes Venatici',
            CYG: 'Cygnus',
            DEL: 'Delphinus',
            DOR: 'Dorado',
            DRA: 'Draco',
            EQU: 'Equuleus',
            ERI: 'Eridanus',
            FOR: 'Fornax',
            GEM: 'Gemini',
            GRU: 'Grus',
            HER: 'Hercules',
            HOR: 'Horologium',
            HYA: 'Hydra',
            HYI: 'Hydrus',
            IND: 'Indus',
            LAC: 'Lacerta',
            LEO: 'Leo',
            LEP: 'Lepus',
            LIB: 'Libra',
            LMI: 'Leo Minor',
            LUP: 'Lupus',
            LYN: 'Lynx',
            LYR: 'Lyra',
            MEN: 'Mensa',
            MIC: 'Microscopium',
            MON: 'Monoceros',
            MUS: 'Musca',
            NOR: 'Norma',
            OCT: 'Octans',
            OPH: 'Ophiuchus',
            ORI: 'Orion',
            PAV: 'Pavo',
            PEG: 'Pegasus',
            PER: 'Perseus',
            PHE: 'Phoenix',
            PIC: 'Pictor',
            PSA: 'Piscis Austrinus',
            PSC: 'Pisces',
            PUP: 'Puppis',
            PYX: 'Pyxis',
            RET: 'Reticulum',
            SCL: 'Sculptor',
            SCO: 'Scorpius',
            SCT: 'Scutum',
            SER1: 'Serpens Caput',
            SER2: 'Serpens Cauda',
            SEX: 'Sextans',
            SGE: 'Sagitta',
            SGR: 'Sagittarius',
            TAU: 'Taurus',
            TEL: 'Telescopium',
            TRA: 'Triangulum Australe',
            TRI: 'Triangulum',
            TUC: 'Tucana',
            UMA: 'Ursa Major',
            UMI: 'Ursa Minor',
            VEL: 'Vela',
            VIR: 'Virgo',
            VOL: 'Volans',
            VUL: 'Vulpecula'
          }
        }
      ]
    },
    get_dec: {
      desc: '(decimal) declination or latitude',
      documented: true,
      implemented: true,
      content: [
        {
          text: 'The get_dec getter returns the declination in decimal degrees.'
        }
      ]
    },
    get_distance: {
      desc: 'Distance to place if available',
      documented: true,
      implemented: true,
      content: [
        {
          text: 'The get_distance getter returns the distance if available'
        }
      ]
    },
    get_elevation: {
      desc: '(decimal) Elevation if applicable',
      documented: true,
      implemented: true,
      content: [
        {
          text: 'The get_elevation getter returns the elevation in meters if applicable'
        }
      ]
    },
    get_isCloudCommunityItem: {
      documented: false,
      implemented: true
    },
    get_isFolder: {
      documented: false,
      implemented: true
    },
    get_isImage: {
      documented: false,
      implemented: true
    },
    get_isTour: {
      documented: false,
      implemented: true
    },
    get_lat: {
      desc: '(decimal) Latitude/Declination of place',
      documented: true,
      implemented: true,
      content: [
        {
          text: 'The get_lat getter returns the latitude / declination of the place in decimal degrees.'
        }
      ]
    },
    get_lng: {
      desc: '(decimal) Longitude / right ascension of place',
      documented: true,
      implemented: true,
      content: [
        {
          text: 'The get_lng getter returns the longitude / right ascension of the place in decimal degrees.'
        }
      ]
    },
    get_location3d: {
      documented: false,
      implemented: true
    },
    get_magnitude: {
      desc: '(number) Magnitude if applicable',
      documented: true,
      implemented: true,
      content: [
        {
          text: 'The get_magnitude getter returns the magnitude of the object if applicable.'
        }
      ]
    },
    get_name: {
      desc: '(string) Place name',
      documented: true,
      implemented: true,
      content: [
        {
          text: 'The get_name getter returns the name of the place as a string.'
        }
      ]
    },
    get_names: {
      desc: '(array) Name collection for place',
      documented: true,
      implemented: true,
      content: [
        {
          text: 'The get_names getter returns the collection of names associated with the place as an array of strings. E.g., ["Whirlpool Galaxy", "M51"]'
        }
      ]
    },
    get_opacity: {
      desc: '(number) Opacity percentage [0-100]',
      documented: true,
      implemented: true,
      content: [
        {
          text: 'The get_opacity getter returns the opacity of the place as a number representing percent opacity (min=0, max=100).'
        }
      ]
    },
    get_readOnly: {
      documented: false,
      implemented: true
    },
    get_searchDistance: {
      documented: false,
      implemented: true
    },
    get_studyImageset: {
      desc: '(ImageSet) The study imageset ',
      documented: true,
      implemented: true,
      content: [
        {
          text: 'The get_studyImageset getter returns the wwtlib.ImageSet (if applicable) that will render when the place is navigated to.'
        }
      ]
    },
    get_tag: {
      documented: false,
      implemented: true
    },
    get_target: {
      desc: '(SolarSystemObjects type) If applicable',
      documented: true,
      implemented: true,
      content: [
        {
          text: 'The get_target getter returns a wwtlib.SolarSystemObjects type if applicable.'
        }, {
          h4:'SolarSystemObjects enum values'
        },
        {
          ptable:{
            Sun: 0,
            Mercury: 1,
            Venus: 2,
            Mars: 3,
            Jupiter: 4,
            Saturn: 5,
            Uranus: 6,
            Neptune: 7,
            Pluto: 8,
            Moon: 9,
            Io: 10,
            Europa: 11,
            Ganymede: 12,
            Callisto: 13,
            IoShadow: 14,
            EuropaShadow: 15,
            GanymedeShadow: 16,
            CallistoShadow: 17,
            SunEclipsed: 18,
            Earth: 19,
            Custom: 20,
            Undefined: 65536
          }
        }
      ]
    },
    get_thumbnail: {
      documented: false,
      implemented: true
    },
    get_thumbnailUrl: {
      desc: '(string) Thumbnail url',
      documented: true,
      implemented: true,
      content: [
        {
          text: 'The get_thumbnailUrl getter returns the url (string) of the thumbnail associated with the place.'
        }
      ]
    },
    get_type: {
      desc: '(ImageSetType) The imageset type context',
      documented: true,
      implemented: true,
      content: [
        {
          text: 'The get_type getter refers to the ImagesetType context. E.g., `{earth: 0, planet: 1, sky: 2, panorama: 3, solarSystem: 4}`. Within WWT, image set type corresponds to the "Look At" dropdown in the bottom left corner of the application'
        }
      ]
    },
    get_url: {
      desc: 'Do not use. See below',
      documented: true,
      implemented: true,
      content: [
        {
          text: 'This getter is not commonly used. Use the `place.get_studyImageset().get_creditsUrl()` or `place.get_backgroundImageset().get_creditsUrl()` as the most reliable url location for external credits and other information about imagery displayed. '
        }
      ]
    },
    get_zoomLevel: {
      desc: '(decimal) zoomLevel',
      documented: true,
      implemented: true,
      content: [
        {
          text: 'The get_zoomLevel getter returns the default zoom level specified for this place'
        }
      ]
    }
  },
  setters: {
    setters:[
      {h:'Place Property Setters'},
      {text:`Most place property setters are not intended for external scripting and are present due to how the library is generated. However, they _can_ be used if you find use cases for them.
       The most relevant and useful setters are documented below`}],
    set_RA: {
      documented: false,
      implemented: true
    },
    set_annotation: {
      desc: 'Adds an annotation',
      documented: true,
      implemented: true,
      content: [
        {
          text: 'The set_annotation setter can add an annotation to a place. This toggles the visibility of the annotation along with the place.'
        }, {
          example:`// This example assumes you have a fully initialized wwt_ctl object.
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
  });`
        }
      ]
    },
    set_backgroundImageset: {
      documented: false,
      implemented: true
    },
    set_bounds: {
      documented: true,
      implemented:false
    },
    set_camParams: {
      desc: 'Sets a wwtlib.CameraParameters object',
      documented: true,
      implemented: true,
      content: [
        {
          text: 'The set_camParams setter sets default camera parameters associated with the place.'
        },
        {h4:'CameraParameters constructor'},
        {
          text:'To set a cameraParameters value to a place, you must first construct a wwtlib.CameraParameters object'
        }, {
          params:{
            //double lat, double lng, double zoom, double rotation, double angle, float opactity
            lat:'(decimal) latitude or declination in degrees',
            lng:'(decimal) longitude or right ascension in degrees',
            zoom:'(decimal) default zoom level',
            rotation:'(decimal) Degrees of camera rotation',
            angle:'(decimal) Degrees of camera tilt',
            opacity:'(number) Percent opacity (0-100)'
          }
        }, {
          example:`const lagoonNebulaCam = () => {
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
wwtlib.WWTControl.singleton.gotoTarget(lagoon);`
        }
      ]
    },
    set_classification: {
      documented: true,
      implemented: false
    },
    set_constellation: {
      documented: false,
      implemented: true
    },
    set_dec: {
      documented: false,
      implemented: true
    },
    set_distance: {
      documented: false,
      implemented: true
    },
    set_elevation: {
      documented: false,
      implemented: true
    },
    set_lat: {
      documented:false,
      implemented: true
    },
    set_lng: {
      documented:false,
      implemented: true
    },
    set_magnitude: {
      documented: false,
      implemented: true
    },
    set_names: {
      desc: 'Sets a collection of names associated with the place',
      documented: true,
      implemented: true,
      content: [
        {
          text: 'The set_names setter sets an array of names of alternate names for the place. The whirlpool galaxy for example could have a names collection of `["Whirlpool Galaxy", "Whirlpool Galaxy and companion", "M51", "NGC 5194", "NGC 5195"]`'
        }
      ]
    },
    set_opacity: {
      desc: 'Sets the place opacity as a percentage (0-100)',
      documented: true,
      implemented: true,
      content: [
        {
          text: 'The set_opacity setter can adjust the opacity of the place imagery (if applicable). This value represents a percentage from 0-100.'
        }
      ]
    },
    set_searchDistance: {
      documented: false,
      implemented: true
    },
    set_studyImageset: {
      documented: false,
      implemented: true
    },
    set_tag: {
      documented:false,
      implemented: true
    },
    set_target: {
      documented: false,
      implemented: true
    },
    set_thumbnail: {
      documented: false,
      implemented: true
    },
    set_thumbnailUrl: {
      documented:false,
      implemented: true
    },
    set_type: {
      documented:false,
      implemented: true
    },
    set_url: {
      documented:false,
      implemented: true
    },
    set_zoomLevel: {
      documented: false,
      implemented: true
    }
  }
};
export const webglReadme = {
  head: [
    {desc:`Reference documentation of the ScriptInterface class.`},
    {h: 'WWT WebGL SDK'},
    {tofc:true},
    {text:'The **ScriptInterface** is the main api entry point that is returned when you initialize the WebGL engine.'},
    {h4:'Initialization'},
    {html:`<body>
  <div id="WWTContainer" style="height:500px;width:800px"></div>
  <script src="//worldwidetelescope.org/html5sdk/wwtlib.min.js"></script>
  <script>
    const wwt_ctl = wwtlib.WWTControl.initControlParam('WWTContainer', true);
    wwt_ctl.add_ready(() => {//ready event handler
      console.log('WWT WebGL engine is initialized and ready for api calls'); 
      // all samples in this documentation can be run by 
      // pasting the code here
    });
  </script>
</body>`},
    {h4:'Sample code note'},
    {text:'In each code sample that follows, it is assumed that `wwt_ctl` has been initialized and the ready event has fired. Be sure to initialize the control properly before running any of the sample code. You may use the above initialization code as boilerplate.'},
    {h4:'Not Documented / Implemented Items'},
    {text:`Some properties, events, and methods are stubbed out for future implementation. Others are 
internal or are intended for use solely within the web client environment. Still others (VOTable for 
instance) require more extensive documentation and will be documented at a later date.`},
    {text:`We'd love to hear from you if you encounter issues using WWT or with any of this 
documentation. Please contact us through our github issue tracker.`}
  ],
  'methods': {
    methods:[{h:'WWT Methods'}],
    addAnnotation: {
      implemented:true,
      documented:true,
      desc: 'Adds an [**Annotation** class] to the view.',
      'content': [
        {'text': 'The **addAnnotation** method adds an [**Annotation**] object to the view.\n'},
        {'params': {annotation: 'The [**Annotation** object] to add.'}},
        {'returns': null},
        {rem: `WWT annotations include the [**Circle** class], the [**Poly** class], and the [**PolyLine** class], so you must instantiate a circle, poly, or polyline before adding.`},
        {
          text: `Typically one or more annotations are added to a view when a user clicks on a
custom UI element such as a checkbox, and then those annotations are removed
when the user deselects that UI element.`
        },
        {
          example: `const createCircle = ({ra=0, dec=0}) => {
  let circle = wwt_ctl.createCircle(false);
  circle.set_radius(0.5);//deg
  circle.setCenter(ra,dec);
  return circle;
};

const createPolygon = (points) => {
   const poly = wwt_ctl.createPolygon(false);
   points.forEach(pt => poly.addPoint(...pt));
   return poly;
};

const diamond = createPolygon([[-1.5, .5], [0, -1.2], [1.5, .5], [1, 1.2], [-1, 1.2]]);
const circle = createCircle({ra:5, dec:5});

// Function to toggle the display of annotations
const toggleAnnotation = (annotation, addFlag=true) => {
  let fn = (addFlag ? 'add' : 'remove') + 'Annotation';
  wwt_ctl[fn](annotation);  
};

// show (add) the annotations
toggleAnnotation(diamond, true);
toggleAnnotation(circle, true);

// wait 12 seconds and hide (remove) the annotations
setTimeout(()=>{
  toggleAnnotation(diamond,false);
  toggleAnnotation(circle,false);
}, 12000);`
        },
        {img: ['addAnnotation', 'Annotations turned on']},
        {img: ['removeAnnotation', 'Annotations turned off after delay']},
        {xlink: '* [poly-annotations-demo](http://webhosted.wwt-forum.org/webengine-examples/#poly-annotations-demo)'}
      ]
    },
    'addVoTableLayer': {'implemented': true, documented:false},
    'clearAnnotations': {
      desc: 'Removes all annotations from the view.',
      implemented:true,
      documented:true,
      'content': [
        {'text': 'The **clearAnnotations** method removes all annotations from the view.'},
        {example: `// set defaults so function can be called with just RA
const drawCircle = ({ra=0, dec=0, radius=0.5}) => {
  let circle = wwt.wc.createCircle(true);//fill
  circle.set_radius(radius);//deg
  circle.setCenter(ra, dec);
  wwt.wc.addAnnotation(circle);
  return circle;
};
//create 3 circles separated by 4 degrees
[4, 0, -4].forEach(ra => drawCircle({ra}));
// wait 3 seconds and remove all 
setTimeout(() => wwt_ctl.clearAnnotations(), 3000);`},
        {xlink: '* [click-event-demo](http://webhosted.wwt-forum.org/webengine-examples/#click-event-demo)'}
      ]
    },
    'createCircle': {
      desc: 'Creates a [**Circle** class] instance.',
      implemented:true, documented:true,
      'content': [
        {'text': 'The **createCircle** method creates a [**Circle** class], and returns a reference to the created object.'},
        {params: {fill: `_boolean_ Apply a fill to the circle.`}},
        {returns: 'This method returns a reference to a [**Circle** class]'},
        {rem: `In addition to creating the circle an [**Annotation**](annotation) object (which is inherited by the [Circle class]) will be created to provide supporting text.`},
        {text: 'The WebGL engine currently does not yet support (set_opacity, set_lineWidth, or set_skyRelative)'},
        {example:`let circle = wwt.wc.createCircle(true);//fill
circle.set_radius(1);//1 degree
circle.setCenter(0, 0);
wwt.wc.addAnnotation(circle);`},
        {h4:'Advanced Example'},
        {text:'This will draw a vertical set of circles with varying properties'},
        {
          code: `// Adds a circle with specified options to the view and returns it.
const drawCircle = ({ra=0, dec=0, radius=0.5, fillColor=null, uid="example-circle"}) => {
  let circle = wwt_ctl.createCircle(fillColor !== null);//fill
  
  //helper to convert to ":a:r:g:b" windows color format
  const argbColor = rgba=> \`:$\{Math.round(rgba.a * 255)}:$\{rgba.r}:$\{rgba.g}:$\{rgba.b}\`;
  
  if (fillColor){
    circle.set_fillColor(argbColor(fillColor));
    fillColor.a = 1;
    circle.set_lineColor(argbColor(fillColor));
  }
  circle.set_id(uid);
  circle.set_radius(radius);//deg
  circle.setCenter(ra, dec);
  wwt.wc.addAnnotation(circle);
  return circle;
}
let a = .5;//50% opacity
let fillColors = [null,//default color (white)
  {r:255, g:0, b:0, a},//red
  {r:0, g:255, b:0, a},//green
  {r:0, g:0, b:255, a},//blue
  {r:255, g:255, b:0, a}//yellow
];
// draw 5 circles increasing in declination and radius
// using the defined colors
let circles = fillColors.map((fillColor, index) => {
  return drawCircle({
    fillColor,
    ra: 0,
    dec: -6 + (index * 3),
    uid: 'example' + index,
    radius: 0.3 + (index * .1)
  });
});`
        },
        {img: ['Circles', 'Resulting circles from advanced example code']},
        {
          xlink: [
            '* [arrived-event-demo](http://webhosted.wwt-forum.org/webengine-examples/#arrived-event-demo)',
            '* [poly-annotations-demo](http://webhosted.wwt-forum.org/webengine-examples/#poly-annotations-demo)']
        }
      ]
    },
    'createFolder': {
      desc: 'Creates a [**Folder** class] that enables you to manage WTML collections',
      implemented:true, documented:true,
      'content': [
        {'text': 'The createFolder method creates a [**Folder** class] instance that serves as a virtual container for managing a WTML collections.'},
        {returns: 'A [**Folder** class] instance'},
        {rem:`See the [**Folder**] documentation for more details and examples of using folders to manage collections. `},
        {
          example: `const makeFolder = (url,name) => {
  return new Promise(resolved => {
    let folder = wwt_ctl.createFolder();
    folder.set_name(name);
    folder.loadFromUrl(url, () => {
      resolved(folder);
    });
  });
};
const gotoPlace = (place, noZoom=false, instant=false) => {
  wwtlib.WWTControl.singleton.gotoTarget(place, noZoom, instant);
}

makeFolder('http://worldwidetelescope.org/data/wise.wtml', 'Example Folder')
.then(folder=>{
  let places = folder.get_children();
  gotoPlace(places[0]);
});`
        }
      ]
    },
    'createPolyLine': {
      desc:'Creates a [**PolyLine** class] instance',
      implemented:true,
      documented:true,
      content: [
        {text: `The **createPolyLine** method creates a [**PolyLine**]
object, and returns a reference to the created object.`},
        {rem:`In addition to creating the polyline, an [**Annotation**]
object (which is inherited by the polyline object) will be created to provide
supporting text.`},
        {text:`The rendering of a polyline will simply take each point in the list and draw a
line to the next. In order to have a more complex polyline, for example with
forks with two or more lines coming from a single point, then there are two
main options, either create several polyline objects sharing a single point,
or backtrack over points after reaching the end of one fork, and then
continuing to add points along the second fork, and so on.`},
        {example:`
//creates a polyline with options
const createPolyLine = (lineColor, lineWidth, opacity, points) => {
    const polyLine = wwt.wc.createPolyLine();
    polyLine.set_lineColor(lineColor);
    polyLine.set_lineWidth(lineWidth);
    polyLine.set_opacity(opacity);
    points.forEach(p => polyLine.addPoint(p[0], p[1]));    
    return polyLine;
}

// Call this function with a two-dimensional array of [ra,dec] points
const points = [[20, -29], [22, -22], [16, -11], [12, -10], [15,-25]];
const poly = createPolyLine('red', 2, 1.0, points);
wwt.wc.addAnnotation(poly);`},
        {img: ['Polylines', 'Polyline created from example code above']}
      ]
    },
    'createPolygon': {
      desc:'creates a [**Poly** class]',
      implemented:true,
      documented:true,
      'content': [
        {'text': ` The **createPolygon** method creates a [**Poly** class] (a
polygon), and returns a reference to the created object.`},
        {params:{fill:`(boolean) when true, fills the polygon with the lineColor`}},
        {rem:`The [**Poly** class] inherits the [**Annotation** class] members.`},
        {example:`const createPolygon = (color, fill, points) => {
    const poly = wwt.wc.createPolygon(fill);
    //note that currently you can't set distinct fill AND line color
    poly.set_lineColor(color);
    poly.set_fillColor(color);
    points.forEach(p => poly.addPoint(p[0], p[1]));    
    return poly;
}
// Define a 2-D array of [ra,dec] points, and then create the polygon
const diamondPoints = [[-1.5, 0.5], [-1, 1.2], [1, 1.2], [1.5, 0.5], [0, -1.2], [-1.5, 0.5]];
const diamondInTheSky = createPolygon('lightblue', true, diamondPoints);
wwt.wc.addAnnotation(diamondInTheSky);
`},
        {h4:'Advanced example'},
        {text:`In this example, we will create a larger diamond shape out of the smaller 
  diamonds and toggle the fill and show varying opacity depths. This will demonstrate the various [**Poly** class] options. 
  Note that the WebGL version today currently does not support lineWidth or opacity, so included is a 
  workaround using the windows color object used by the engine. You can set opacity by simply using the alpha channel of the color.`},

        {code:`(function(){
const createPolygon = (color, fill, points) => {
  const poly = wwt.wc.createPolygon(fill);
  //note that currently you can't set distinct fill AND line color
  poly.set_lineColor(color);
  poly.set_fillColor(color);
  points.forEach(p => poly.addPoint(p[0], p[1]));    
  return poly;
}

// helper to convert to ":a:r:g:b" windows color format
const argbColor = rgba => \`:$\{Math.round(rgba.a * 255)}:$\{rgba.r}:$\{rgba.g}:$\{rgba.b}\`;
      
// Define a 2-D array of [ra,dec] points, and then create the polygon
const points = [[-1.5, 0.5], [-1, 1.2], [1, 1.2], [1.5, 0.5], [0, -1.2], [-1.5, 0.5]];
const color = {r: 100, g: 200, b: 255, a: 0.5};//light blue @50% opacity
const offsets = points.map(p => [p[0] * 7, p[1] * 7]);//stamp same shape into larger shape
const alpha = [.2, .4, .6, .8, 1];//increase opacity each polygon
let fillOption = false;
offsets.forEach((offset, i) => {
  color.a = alpha[i];
  fillOption = !fillOption;//toggle filled or not every shape;
  let adjustedPoints = points.map(p => [p[0] + offset[0], p[1] + offset[1]]);
  let argb = argbColor(color);
  const diamondInTheSky = createPolygon(argb, fillOption, adjustedPoints);
  wwt.wc.addAnnotation(diamondInTheSky);
});
})();`},
        {img: ['diamonds', 'Example of polygons drawn from above code']}
      ]
    },
    'displayVoTableLayer': {implemented:true, documented:false, 'content': [{'text': 'displayVoTableLayer description'}]},
    'endInit': {implemented:true, documented:false, 'content': [{'text': 'endInit description'}]},
    'gotoRaDecZoom': {
      desc:'Pans and zooms the view to the specified coordinates.',
      implemented:true,
      documented:true,
      'content': [
        {'text': `The **gotoRaDecZoom** method is used to go to a new viewing position.`},
        {
          params: {
            ra:'(decimal) right ascension in degrees',
            dec:'(decimal) declination in degrees',
            zoom:'(decimal) field of view in degrees (min: 0.00023, max: 60)',
            instant:'(boolean) when true navigation does not animate, but is _instant_'
          }
        },
        {example:`// The following code shows how to convert from hours, minutes and seconds
// to a right ascension and degrees, minutes and seconds to a declination.

const HMS = (h, m, s) => {
    h = h + (m / 60) + (s / 3600);
    return  h * 15; // Convert from hours to degrees (360 / 24 = 15)
};
const DMS = (d, m, s) => {
  if (d < 0) {
    m = -m;
    s = -s;
  }
  return d + (m / 60) + (s / 3600);
};
wwt.wc.gotoRaDecZoom(HMS(6, 25, 30), DMS(45, 0, 0), 30, false);`}
      ]
    },
    'hideUI': {implemented:true, documented:false, 'content': [{'text': 'hideUI description'}]},
    'loadFits': {
      desc:'Loads a FITS layer image into the view',
      implemented:true,
      documented:true,
      'content': [
        {'text': 'The loadFits method loads a FITS image layer then after it loads, navigates to and displays the image.'},
        {'rem':`This is a shortcut to the **loadFitsLayer** method that sets name='', gotoTarget=true, and loaded=null`},
        {params:{url:'Url to the fits image to load'}},
        {example:`//This sample is a very large fits file. May take over a minute to load 
wwt.wc.loadFits('https://wwtweb.blob.core.windows.net/images/FITS/CRISP_TXY_Cube.fits')`}
      ]
    },
    'loadFitsLayer': {
      desc:'Loads a FITS layer with optional callback, navigation, and layer name',
      implemented:true, documented:true,
      'content': [
        {'text': `The loadFits method loads a FITS image layer from a url, then optionally navigates to the target. If you 
supply a callback function, the loaded layer will be passed to the callback. See the example below.`},
        {
          params: {
            url:'(string) Url of the FITS layer [required]',
            name:'(string) Optional name of the layer',
            gotoTarget:'(boolean) flag whether to navigate after load',
            loaded:'(function) callback function to invoke when the layer is loaded'
          }
        }, {
          example:`//This sample is a very large fits file. May take over a minute to load
const url = 'https://wwtweb.blob.core.windows.net/images/FITS/CRISP_TXY_Cube.fits';
wwt.wc.loadFits(url,'sample', true, fitsLayer => {
  console.log('fitsLayer loaded', fitsLayer);
});`
        }
      ]
    },
    'loadImageCollection': {
      desc:'Loads a wtml image collection',
      implemented:true, documented:true,
      'content': [
        {'text': `The loadImageCollection method is used to load a WTML collection file, containing links to foreground 
and background images.`},
        {params:{url: `(string) Url of the wtml collection`}},
        {rem:`For a description of the content of image collection files, refer to the
[WorldWide Telescope Data Files Reference](https://worldwidetelescope.gitbook.io/data-files-reference/)
document.`},
        {text:`To interact with the collection, you pass a callback to the add_collectionLoaded, then you can load named
imagery using **setBackgroundImageByName** and **setForegroundImageByName**.`},
        {text:`For more advanced WTML interaction, see the [**createFolder**](#createFolder-method) method`},
        {example:`wwt.wc.add_collectionLoaded(() => {
  wwt.wc.setForegroundImageByName('Lagoon Nebula');
  wwt.wc.gotoRaDecZoom(270.9106555759995, -24.3793262667, 0.08, true);
});
wwt.wc.loadImageCollection('http://worldwidetelescope.org/data/hubble.wtml');`}

      ]
    },
    'loadTour': {
      desc:'Loads and plays a tour from the specified url',
      implemented:true, documented:true,
      'content': [
        {
          'text': 'The **loadTour** method is used to load and start a tour.'
        },
        {params:{url:`(string) Url of the tour (.wtt) file`}},
        {rem:`Tours are a sequence of tour stops. Each tour stop describes a viewing
position, with accompanying audio (music or speech), and graphics (text,
shapes or images). The amount of time a tour should spend at each stop is
specified, along with how the transition should be made (instant or slewing)
to the next stop. The tour completes when the last tour stop has been visited.`},
        {text:`Tours can be stand-alone, or part of collections. For more information on
tours refer to the WorldWide Telescope User Guide, and also to the
[WorldWide Telescope Data Files Reference](https://worldwidetelescope.gitbook.io/data-files-reference/)
document.`},
        {example:`wwt.wc.loadTour('http://worldwidetelescope.org/file/Download/46ed68e5-e0cb-4092-9bc8-07a05b518856/Universal%20Beauty/wtt');`}
      ]
    },
    'loadVOTable': {
      implemented:true, documented:false
    },
    'playTour': {
      desc:`Restarts a stopped tour`,
      implemented:true,
      documented:true,
      content: [
        {text: 'The **playTour** method is used to restart a tour from the beginning.'},
        {rem:`Refer to the remarks for the [**loadTour**] method.`},
        {example:`wwt.wc.loadTour('http://worldwidetelescope.org/file/Download/46ed68e5-e0cb-4092-9bc8-07a05b518856/Universal%20Beauty/wtt');
        wwt.wc.add_tourEnded(() => wwt.wc.playTour());//infinite loop`}
      ]
    },
    'refreshLayerManagerNow': {
      implemented:true, documented:false,
      'content': [{'text': 'refreshLayerManagerNow description'}]
    },
    'removeAnnotation': {
      desc:`Removes an annotation from the view`,
      implemented:true,
      documented:true,
      content: [
        {'text': 'The removeAnnotation method removes an annotation from being rendered by the view.'},
        {params:{annotation: 'The [**Annotation**] being removed'}},
        {example:`const drawCircle = ({ra=0, dec=0, radius=0.5}) => {
      let circle = wwt.wc.createCircle(true);//fill
      circle.set_radius(.5);//deg
      circle.setCenter(ra, dec);
      wwt.wc.addAnnotation(circle);
      return circle;
  };
  //create a row of circles separated by 4 degrees
  let raList = [16,12,8,4,0,-4,-8,-12,-16];
  let circles = raList.map(ra => drawCircle({ra}));
  
  let removeNext = () => {
    // remove the last circle annotation in the collection
    let annotation = circles.pop();
    wwt.wc.removeAnnotation(annotation);
    
    if (circles.length){
      //repeat until all are removed
      setTimeout(removeNext,500);
    }
  }
  // wait 1 second and begin removing the circles
  setTimeout(removeNext,1000);
  `}
      ]
    },
    'setBackgroundImageByName': {
      desc:`Sets the view background imagery to a named imageset from a loaded collection`,
      implemented:true, documented:true,
      'content': [
        {'text': 'The **setBackgroundImageByName** method loads an image to use as the view background.'},
        {params:{name:'(string) The name of the item in the collection to load'}},
        {text:`The string used as the name parameter for this method should be present as a
**Place** name in the .WTML  file loaded by the
[**loadImageCollection**] method.
Typically background images come from _Survey_ data, such as visible light,
x-ray, infrared, ultraviolet, gamma, and so on. In the UI of WorldWide
Telescope, the background image is selected with the **Imagery** entry, and if
there is a foreground image, the **Image Crossfade** slider will appear.`},
        {text:`A background image need not cover the whole sky, and can in fact be a simple
study of one object in space. In this case the rest of the sky will be dark
and empty, except for the solar system which is not considered foreground or
background.`},
        {example:`wwt.wc.add_collectionLoaded(() => {
  // full name of the imagery is not required. Will load first matching 
  // imagery that matches the substring
  wwt.wc.setBackgroundImageByName('wise');
});
wwt.wc.loadImageCollection('//worldwidetelescope.org/data/surveys.wtml');`}
      ]
    },
    'setForegroundImageByName': {
      desc:`Sets the view foreground imagery to a named imageset from a loaded collection`,
      implemented:true,
      documented:true,
      'content': [
        {'text': 'The setForegroundImageByName method sets the foreground imagery to a named item in a loaded image collection'},
        {params:{name:'(string) The name of the item in the collection to load'}},
        {rem:`The string used as the name parameter for this method should be present as a
**Place** name in the WTML file loaded by the [**loadImageCollection**]
method. There can be only one foreground image and only one background image
rendered at any one time. The _typical_ use is to render studies as foreground
images on top of a survey as a background image.`},
        {text:`If the opacity of the foreground image is solid, the background image will not
be visible underneath. However if the [**setForegroundOpacity**] method is
used to add some transparency, then both foreground and background images will
be visible, and can be compared. Typical use of these two layers is to load a
visual survey as either foreground or background, and then to compare it with
an x-ray, heat or image of another non-visible wavelength, enabling a visual
comparison between the two.`},
        {text:`In the UI of WorldWide Telescope the **Explore > Open > Collection** menu
selection is typically used to load foreground images. If the WTML collection
file explicitly defines a study as a background, or a survey as foreground,
then this menu selection can be used to reverse the normal process. However,
by default, studies loaded this way are treated as foreground, surveys as
background.`},
        {text:`To load a survey as a foreground image, or a study as a background image, use
**Folder** entries with the following structures. Note all the extra
information needed in the **Place** entry for a study image.`},
        {html:`<?xml version="1.0"?>
<Folder>
  <Folder Name="Background Studies" Group="View" Searchable="True" Type="Sky">
    <Place Name="Study One" DataSetType="Sky" RA="0" Dec="0" Constellation="0"
           Classification="0" Magnitude="0" Distance="0" ZoomLevel="0"
           Rotation="0" Angle="0" Opacity="100" AngularSize="1">
      <Target>Undefined</Target>
      <BackgroundImageSet>
        <ImageSet><!-- content here --></ImageSet>
      </BackgroundImageSet>
    </Place>
  </Folder>

  <Folder Name="Foreground Surveys" Group="Explorer">
    <Place Name="Survey One">
      <ForegroundImageSet>
        <ImageSet<!-- content here --></ImageSet>
      </ForegroundImageSet>
    </Place>
  </Folder>
</Folder>`},
        {text:`The Sun and solar system planets and moons are not considered either
foreground or background, and will be present in any sky view.`},
        {text:`Note that the _images_ used for both foreground and background are tiled image
pyramids. Refer to the tools documentation
[WorldWide Telescope Data Tools Guide](https://worldwidetelescope.gitbook.io/data-tools-guide/)
for details on how to create these image pyramids, and to the
[WorldWide Telescope Data Files Reference](https://worldwidetelescope.gitbook.io/data-files-reference/)
for details on the data file formats.`},
        {example:`wwt.wc.add_collectionLoaded(() => {
  /*This method does not navigate to the target automatically. 
    You must additionally call the gotoRaDecZoom method*/
  wwt.wc.setForegroundImageByName('The Serpens Dark Cloud');
  wwt.wc.gotoRaDecZoom(277.274985, 0.545000, 1, true);
});
wwt.wc.loadImageCollection('serpens.wtml');`},
        {text:'The `Serpens.wtml` file contains the following:'},
        {html:`<Folder Name="My Places" Group="Explorer" Searchable="True" Type="Sky">
  <VersionDependent>false</VersionDependent>
  <Place Name="Serpens Dark Cloud" DataSetType="Sky" RA="16.5496517733333"
         Dec="-23.25002666" Constellation="AND" Classification="Unfiltered"
         Magnitude="0" Distance="0" ZoomLevel="61.76666816142" Rotation="0"
         Angle="0" Opacity="100" AngularSize="1">
    <Target>Undefined</Target>
    <ForegroundImageSet>
      <ImageSet Generic="False" DataSetType="Sky" BandPass="Visible"
                Url="http://www.cfa.harvard.edu/~gmuench/wwtimages/161419573/{1}/{3}/{3}_{2}.png"
                TileLevels="4" WidthFactor="2" Sparse="True" Rotation="0"
                QuadTreeMap="" Projection="Tangent"
                Name="1120 micron image of the Serpens Dark Cloud;Serpens;Serpens Dark Cloud"
                FileType=".png" CenterY="-23.25002666" CenterX="248.2447766"
                BottomsUp="False" OffsetX="-0.0013888889225"
                OffsetY="-0.0013888889225" BaseTileLevel="0"
                BaseDegreesPerTile="11.37777805312">
        <Credits>Enoch/COMPLETE/CSO1120 micron image of the Serpens Dark Cloud.
Data were taken May-June 2003 and 2005. Flux units are in mJy per 31 arcsecond
beam. Reference: Melissa Enoch et al., Comparing Star Formation on Large Scales
in the c2d Legacy Clouds: Bolocam 1.1 mm Dust Continuum Surveys of Serpens,
Perseus, and Ophiuchus, ApJ, 2007, 666, 982</Credits>
        <CreditsUrl>http://www.cfa.harvard.edu/COMPLETE/data_html_pages/SerA_1120uBolo_F.html</CreditsUrl>
        <ThumbnailUrl>http://www.cfa.harvard.edu/~gmuench/wwtimages/161419573.jpg</ThumbnailUrl>
      </ImageSet>
    </ForegroundImageSet>
  </Place>
</Folder>`},
        {xlink:`[load-additional-imagery](http://webhosted.wwt-forum.org/webengine-examples/#load-additional-imagery)`}
      ]
    },
    'setForegroundOpacity': {
      desc:'sets the opacity of the foreground imagery',
      implemented:true, documented:true,
      'content': [
        {'text': `The **setForegroundOpacity** method specifies the opacity of the foreground
image, which can be useful when visually comparing the foreground and
background images.`},
        {params:{opacity:`(number) percent opacity between 0-100`}},
        {rem:`This setting enables some see-through in the foreground image, to enable a
comparison with the background image. Note that if the foreground image is a
.png file, then some transparency information is usually held within the file.
The [**setForegroundImageByName**] method sets the foreground opacity to 100 each
time a new image is loaded.`},
        {example:`wwt.wc.add_collectionLoaded(() => {
  wwt.wc.setForegroundImageByName('Lagoon Nebula');
  wwt.wc.gotoRaDecZoom(270.9106555759995, -24.3793262667, 0.08, true);
  wwt.wc.setForegroundOpacity(50);
});
wwt.wc.loadImageCollection('http://worldwidetelescope.org/data/hubble.wtml');`}
      ]
    },
    'setTimeScrubberPosition': {
      implemented:true, documented:false,
      'content': [{'text': 'setTimeScrubberPosition description'}]
    },
    'setTimeSlider': {implemented:true, documented:false, 'content': [{'text': 'setTimeSlider description'}]},
    'showColorPicker': {implemented:true, documented:false, 'content': [{'text': 'showColorPicker description'}]},
    'stopTour': {
      desc:'Stops the currently playing tour',
      implemented:true, documented:true,
      content: [
        {text: `The **stopTour** method is used to stop and exit a tour.`},
        {rem:`After a tour has been stopped with this call, it cannot be restarted from the
position it was stopped at. [**playTour**] (which restarts a tour) will not
work after a tour has been stopped. Also refer to the remarks for [**loadTour**].`},
        {example:`wwt.wc.loadTour('http://worldwidetelescope.org/file/Download/46ed68e5-e0cb-4092-9bc8-07a05b518856/Universal%20Beauty/wtt');
//monitor playing state through events
let playing = false;
//log playing state and events  that fired
let log = (event) => console.log({event, playing});

//tour begins immediately after tourReady fires
wwt.wc.add_tourReady(() => {
  playing = true;
  log('ready');
});

//tourEnded fires if tour ends naturally or through our 
// stopTour click code below 
wwt.wc.add_tourEnded(() => {
  playing = false;
  log('ended');
});

//stop or restart tour based on playing state
wwt.wc.add_clicked(() => {
  if (playing){
    wwt.wc.stopTour();
    playing = false;
  }else{
    wwt.wc.playTour();
    playing = true;
  }  
  log('click');
});`},
        {xlink:'[load-tours](http://webhosted.wwt-forum.org/webengine-examples/#load-tours)'}
      ]
    },
    'zoom': {implemented:true, documented:true, 'content': [{'text': 'zoom description'}]}
  },
  'privateMembers': {
    'fireAnnotationclicked': '_fireAnnotationclicked',
    'fireArrived': '_fireArrived',
    'fireClick': '_fireClick',
    'fireCollectionLoaded': '_fireCollectionLoaded',
    'fireImageryLoaded': '_fireImageryLoaded',
    'fireReady': '_fireReady',
    'fireSlideChanged': '_fireSlideChanged',
    'fireTourEnded': '_fireTourEnded',
    'fireTourError': '_fireTourError',
    'fireTourPaused': '_fireTourPaused',
    'fireTourReady': '_fireTourReady',
    'fireTourResume': '_fireTourResume',
    'imageFileLoaded': '_imageFileLoaded'
  },
  'events': {
    events: [
      {h: 'WWT Events'},
      {text: 'Events are subscribed to using add_eventName(callback). To unsubscribe from events, use remove_eventName(callback).'}
    ],
    'annotationClicked': {
      implemented:false, documented:true, 'content': [{'text': 'annotationClicked description'}]},
    'arrived': {
      implemented:true, documented:true,
      'content': [
        {'text': 'the **arrived** event is fired when the engine completes animating a `gotoRaDecZoom` animation, or a `wwtlib.WWTControl.singleton.gotoTarget` animation.'},
        {rem:`This event is not triggered if the _instant_ parameter is set to true.`},
        {example:`//This example will simulate a tour of sky coordinates by making use of
  //the arrived event
  const coords = [//array of ra/dec/zoom coords
    [270.9106555759995, -24.3793262667, 0.9],//lagoon nebula
    [308.76636435058344, 60.17092678682577, 0.55],//fireworks galaxy
    [210.7999999999995, 54.3486111111111, 1.875],//helix nebula
    [202.47083333333393, 47.1966666666667, 0.475],//whirlpool galaxy
    [189.99583333333334, -11.6197222222222, 0.354],//sombrero galaxy
    [10.624500000000019, 41.2844, 2.95]//andromeda
  ];
  //specify the coordinate 
  let coordIndex = 0;
  //navigate to next place
  const gotoNext = () => {
    wwt.wc.gotoRaDecZoom(...coords[coordIndex], false);
    coordIndex++; // move to next coordinate
    if (!coords[coordIndex]){
      coordIndex = 0;
    }
  };
  // subscribe to arrived events
  wwt.wc.add_arrived(()=>{
    // pause 2 seconds and go to next coordinate
    setTimeout(gotoNext, 2000);
  });
  
  gotoNext();
  `}

      ]
    },
    'clicked': {
      implemented:true,
      documented:true,
      'content': [
        {'text': 'The **clicked** event is fired when the left mouse button is clicked.'},
        {text:`This event is not fired for all mouse clicks, only those when the view is
stationary and the mouse click is not part of a zoom or drag procedure. In
other words, it is evident that the user is clicking on an object. The RA and
Dec provided in the eventArgs object are the location of the click, which will
not usually be the same as the RA and Dec for the current view. The obj
parameter is the wwt object that originated the click event and the eventArgs
object contains the click event arguments accessed by the methods get_RA() and
get_dec().`},
        {example:`wwt.wc.add_clicked((obj, eventArgs) => {
    console.log("Clicked on RA:" + eventArgs.get_RA().toString() + ", Dec:" + eventArgs.get_dec().toString());
})`},
        {xlink:'[click-event-demo](http://webhosted.wwt-forum.org/webengine-examples/#click-event-demo)'}
      ]
    },
    'collectionLoaded': {
      implemented:true,
      documented:true,
      'content': [
        {'text': 'The collectionLoaded event fires when a collection loaded with [**loadImageCollection**] is ready.'},
        {example:`wwt.wc.add_collectionLoaded(() => {
  wwt.wc.setForegroundImageByName('Lagoon Nebula');
  wwt.wc.gotoRaDecZoom(270.9106555759995, -24.3793262667, 0.08, true);
});
wwt.wc.loadImageCollection('http://worldwidetelescope.org/data/hubble.wtml');`}
      ]
    },
    'colorPickerDisplay': {implemented:true, documented:false, 'content': [{'text': 'colorPickerDisplay description'}]},
    'imageryLoaded': {implemented:true, documented:false, 'content': [{'text': 'imageryLoaded description'}]},
    'ready': {
      implemented:true, documented:true,
      'content': [
        {'text': 'The **ready** event is fired when the web client is initialized.'},
        {rem:`This event is fired only once, and should be responded to by all clients. Use
it to initialize internal variables appropriately, in particular the reference
to the View object, shown in the example code.`},
        {example:`// an alternate code style to initialize.
// full html and script example exists at the beginning of this document
let wwt_ctl;

// here is where you can put custom code that runs when the
// WWTControl is ready
const ready = () => {
    wwt_ctl.settings.set_showCrosshairs(true);
    wwt_ctl.settings.set_showConstellationFigures(false);
}
// Register the event to your ready function
wwt_ctl = wwtlib.WWTControl.initControl();
wwt_ctl.add_ready(ready);
`}
      ]
    },
    'refreshLayerManager': {implemented:true, documented:false, 'content': [{'text': 'refreshLayerManager description'}]},
    'slideChanged': {implemented:true, documented:false, 'content': [{'text': 'slideChanged description'}]},
    'timeScrubberHook': {implemented:true, documented:false, 'content': [{'text': 'timeScrubberHook description'}]},
    'tourEnded': {
      implemented:true, documented:true,
      'content': [
        {'text': 'The **tourEnded** event fires when a tours stops either because it has completed successfully or because it was stopped by calling `wwt_ctl.stopTour()`.'},
        {example:`//This example also exists in the stopTour method
wwt.wc.loadTour('http://worldwidetelescope.org/file/Download/46ed68e5-e0cb-4092-9bc8-07a05b518856/Universal%20Beauty/wtt');
//monitor playing state through events
let playing = false;
//log playing state and events  that fired
let log = (event) => console.log({event, playing});

//tour begins immediately after tourReady fires
wwt.wc.add_tourReady(() => {
  playing = true;
  log('ready');
});

//tourEnded fires if tour ends naturally or through our 
// stopTour click code below 
wwt.wc.add_tourEnded(() => {
  playing = false;
  log('ended');
});

//stop or restart tour based on playing state
wwt.wc.add_clicked(() => {
  if (playing){
    wwt.wc.stopTour();
    playing = false;
  }else{
    wwt.wc.playTour();
    playing = true;
  }  
  log('click');
});`}
      ]
    },
    'tourError': {
      implemented:true, documented:true,
      'content': [
        {'text': 'The **tourError** event fires when the engine either can not load a tour or encounters an error during playback.'},
        {example:`wwt.wc.add_tourError(errorDetail => {
  console.warn('Tour error!',errorDetail);
});
// trying to load a wtml file as a tour will cause a FileReader error
wwt.wc.loadTour('http://worldwidetelescope.org/data/hubble.wtml');
`}
      ]
    },
    'tourPaused': {implemented:true, documented:false, 'content': [{'text': 'tourPaused description'}]},
    'tourReady': {
      implemented:true, documented:true,
      'content': [
        {'text': 'The **tourReady** event fires once the tour is loaded. The tour plays immediately after this event fires.'},
        {example:`wwt.wc.loadTour('http://worldwidetelescope.org/file/Download/46ed68e5-e0cb-4092-9bc8-07a05b518856/Universal%20Beauty/wtt');
wwt.wc.add_tourReady(()=>console.log('tour loaded'));`}
      ]
    },
    'tourResumed': {implemented:true, documented:false, 'content': [{'text': 'tourResumed description'}]},
    'voTableDisplay': {implemented:true, documented:false, 'content': [{'text': 'voTableDisplay description'}]}
  },
  'getters': {
    getters: [
      {h: 'WWT Property Getters'},
      {text: 'The WWT WebGl library generates most property getters in the format ` get__propertyname_() `, so they are usually accessed via a function invocation.'}
    ],
    'get_fov': {
      desc: 'field of view in degrees (decimal)',
      implemented:true, documented:true,
      'content': [
        {'text': 'The get_fov() getter returns the current field of view (fov) in degrees.'},
        {
          rem: `The maximum (and initial) field of view is 60 degrees, the minimum is close to zero, at approximately 229 millionths of a degree (0.00022910934437488727 degrees). Field of view can be considered to be the inverse of the zoom factor — the smaller the field of view the greater the zoom factor.`
        },
        {example: `console.log('fov: ' + wwt_ctl.get_fov());//60`}
      ]
    },
    'getDec': {
      desc: 'Declination in degrees (decimal)',
      implemented:true, documented:true,
      'content': [
        {'text': 'The getDec() getter returns the current declination in degrees.'},
        {rem: `The declination of an object is how many degrees it is north or south of the celestial equator. It is used in conjunction with right ascension, which is measured eastward from a prime meridian on the sky. The prime meridian passes through the position of the Sun at the time of the vernal equinox, so its position changes slowly over the years, due to the precession of the equinoxes. The position of the celestial poles also changes with precession, so to locate an object from its right ascension and declination, you must also know the date for which those coordinates are valid; that date is called the epoch of the coordinates. WorldWide Telescope requires the epoch to be J2000.`},
        {example: `console.log('declination:', wwt.wc.getDec())`}
      ]
    },
    'getRA': {
      desc: 'Right ascension in hours',
      implemented:true,
      documented:true,
      'content': [
        {'text': 'The getRA() getter returns the current right ascension in hours as a decimal.'},
        {rem: `It is important to note that while the right ascension is returned in hours, you always _set_ in degrees. Which is simply \`hoursRA * 15\`. See the below example.`},
        {
          example: `const panByHours = hours => {
  const raHours = wwt_ctl.getRA() + hours;
  //1 hour = 15deg. Convert to deg to use gotoRaDecZoom
  const degreesRA = raHours * 15;
  const dec = wwt_ctl.getDec();
  const fov = 60;//max zoom out val;
  wwt_ctl.gotoRaDecZoom(degreesRA, dec, fov);
};
panByHours(2);`
        }
      ]
    },
    'get_hideTourFeedback': {'implemented': false, documented:true, 'content': []},
    'get_showCaptions': {'implemented': false, documented:true, 'content': []},
    'get_smoothAnimation': {'implemented': false, documented:true, 'content': []}
  },
  'setters': {
    setters: [
      {h: 'WWT Property Setters'},
      {text: 'The WWT WebGl library generates most property setters in the format ` set_[propertyname](value) `, so they are accessed via a function invocation.'}
    ],
    'set_hideTourFeedback': {'implemented': false, documented:true, 'content': []},
    'set_showCaptions': {'implemented': false,  documented:true, 'content': []},
    'set_smoothAnimation': {'implemented': false,  documented:true, 'content': []}
  }
};
