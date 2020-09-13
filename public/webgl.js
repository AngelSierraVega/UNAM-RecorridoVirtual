/** 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * ModeloCentrado_SF
 * ModeloCentrado_SFI
 * ModeloCentrado_DF
 * CCU_0608_8
 * CCU version 1408
 * 
 * CCU triangular 1708
 * CCU mapas 2 lados 1708
 */
const modelName = 'CCU3d';

const CONFIG_SOMBRAS = true;
const CONFIG_SOMBRAS_CALIDAD_BAJA = false;
const CONFIG_HELPERS = false;
const CONFIG_DEBUG = false;
const CONFIG_DOBLE_CARA = true;

const COLOR_TIERRA = "darkolivegreen";
const COLOR_CIELO = "lightcyan";//lightskyblue
const COLOR_LUZCIELO = "azure";//Light Cyan
const COLOR_LUZFONDO = "lightblue";//"aliceblue"

//import default from '/UNAM/RecorridoVirtual/public/modules/luces.js';
import * as THREE from '/UNAM/RecorridoVirtual/build/three.module.js';
//import * as CameraControls from '/UNAM/RecorridoVirtual/build/camera-controls.js';
//CameraControls.install( { THREE: THREE } );
/**
 * Code for hemispheric light
 * @edit 20-07-15
 */
import Stats from '/UNAM/RecorridoVirtual/jsm/libs/stats.module.js';

import { OrbitControls } from '/UNAM/RecorridoVirtual/jsm/controls/OrbitControls.js';

import { MTLLoader } from "/UNAM/RecorridoVirtual/jsm/loaders/MTLLoader.js";
import { OBJLoader2 } from "/UNAM/RecorridoVirtual/jsm/loaders/OBJLoader2.js";
import { MtlObjBridge } from "/UNAM/RecorridoVirtual/jsm/loaders/obj2/bridge/MtlObjBridge.js";
import { Sky } from '/UNAM/RecorridoVirtual/jsm/objects/Sky.js';

import { CSS3DRenderer, CSS3DObject } from '/UNAM/RecorridoVirtual/jsm/renderers/CSS3DRenderer.js';


import { GUI } from '/UNAM/RecorridoVirtual/jsm/libs/dat.gui.module.js';

/**
 * Code for HDRI
 * @edit 20-07-26
 */
//import { RGBELoader } from '/UNAM/RecorridoVirtual/jsm/loaders/RGBELoader.js';

var camera;
var ControlesOrbitales, scene, renderer;




/**
 * Code for hemispheric light
 * @edit 20-07-15
 */
var hemiLight, hemiLightHelper;
var mixers = [];
var stats;

var mouse, raycaster;
var objects = [];
/**
 * Arreglo que almacena las placas de selección de los EC's
 * @edit 20-07-25
 */
var geometriaPuntoInteresSecundario;
var meshPlacaEspacioCultural = [];
//var INTERSECTED;
//var radius = 100, theta = 0;

var ifrm = window.frameElement; // reference to iframe element container
var doc = ifrm.ownerDocument;// reference to container's document

var CustomTarget = {
    "x": null
    , "y": null
    , "z": null
    , "stepX": null
    , "stepY": null
    , "stepZ": null
};

/**
 * 
 * @type type
 * @since 20-08-27
 */
var LimitesCamara = {
    xMin: -120 - 40,
    xMax: 200 + 40,
    yMax: 25,
    yMin: 12,
    zMax: 160 + 40,
    zMin: -180 - 40
}

/**
 * 
 * @type type
 * @since 20-08-27
 * @edit 20-09-10
 */
var paramsCamara = {
    'TargetX': -35,
    'TargetY': 13,
    'TargetZ': -46
    , 'FOV': 55
    , 'CamaraX': -215
    , 'CamaraY': 93
    , 'CamaraZ': -75
};

/**
 * 
 * @type type
 * @since 20-08-26
 */
var coordCentro = {
    "x": 5
    , "y": -50
    , "z": 15
};

var spinLoader;

/**
 * 
 * @type type
 * @since 20-08-18
 */
var puntosInteresEC = {
    "MUAC": {x: -80, y: 18, z: -90, "icono": "IC_MUAC.png", "xIdEC": "MUAC"}
    , "ExplanadaEspiga": {x: -70, y: 12, z: -50, "icono": "IC_ExplanadaEspiga.png", "xIdEC": "ExplanadaEspiga"}
    , "Cines": {x: -65, y: 18, z: 3, "icono": "IC_Cines.png", "xIdEC": "Cines"}
    , "SalaCarlosChaves": {x: -20, y: 18, z: 28, "icono": "IC_SalaCarlosChaves.png", "xIdEC": "SalaCarlosChaves"}
    , "SalaMiguelCovarrubias": {x: -43, y: 21, z: 63, "icono": "IC_SalaMiguelCovarrubias.png", "xIdEC": "SalaMiguelCovarrubias"}
    , "SalonDanza": {x: -37, y: 18, z: 89, "icono": "IC_SalonDanza.png", "xIdEC": "SalonDanza"}
    , "TeatroJuanRuiz": {x: 22, y: 21, z: 35, "icono": "IC_TeatroJuanRuiz.png", "xIdEC": "TeatroJuanRuiz"}
    , "ForoSorJuana": {x: 23, y: 15, z: 0, "icono": "IC_ForoSorJuana.png", "xIdEC": "ForoSorJuana"}
    , "SalaNeza": {x: 20, y: 18, z: -55, "icono": "IC_SalaNeza.png", "xIdEC": "SalaNeza"}
    , "CentroUniversitarioTeatro": {x: 120, y: 15, z: -40, "icono": "IC_CentroUniversitarioTeatro.png", "xIdEC": "CentroUniversitarioTeatro"}    
};

var puntosInteresECsec = {
    "MUAC": {x: -45, y: 7, z: -65, "icono": "IC_MUAC.png", "xIdEC": "MUAC"}
    , "ExplanadaEspiga": {x: -70, y: 18, z: -50, "icono": "IC_ExplanadaEspiga.png", "xIdEC": "ExplanadaEspiga"}
    , "Cines": {x: -54, y: 3, z: 16, "icono": "IC_Cines.png", "xIdEC": "Cines"}
    , "SalaCarlosChaves": {x: -20, y: 18, z: 28, "icono": "IC_SalaCarlosChaves.png", "xIdEC": "SalaCarlosChaves"}
    , "SalaMiguelCovarrubias": {x: -43, y: 18, z: 63, "icono": "IC_SalaMiguelCovarrubias.png", "xIdEC": "SalaMiguelCovarrubias"}
    , "SalonDanza": {x: -37, y: 18, z: 89, "icono": "IC_SalonDanza.png", "xIdEC": "SalonDanza"}
    , "TeatroJuanRuiz": {x: 20, y: 18, z: -55, "icono": "IC_TeatroJuanRuiz.png", "xIdEC": "TeatroJuanRuiz"}
    , "ForoSorJuana": {x: 23, y: 18, z: 0, "icono": "IC_ForoSorJuana.png", "xIdEC": "ForoSorJuana"}
    , "SalaNeza": {x: 22, y: 18, z: 35, "icono": "IC_SalaNeza.png", "xIdEC": "SalaNeza"}
    , "CentroUniversitarioTeatro": {x: 0, y: 0, z: 0, "icono": "IC_CentroUniversitarioTeatro.png", "xIdEC": "CentroUniversitarioTeatro"}  
};

/**
 * 
 * @type type
 * @since 20-08-19
 */
var paramsLuzPrimariaFocal = {
    'intensity': 0.5
    , 'ShadowBias': -0.000015
    , 'ShadowMapSize': 512
};

/**
 * 
 * @type type
 * @since 20-08-20
 */
var paramsEscena = {
    'intensity': 0.5
    , 'ShadowBias': -0.000015
    , 'ShadowMapSize': 512
};

/**
 * 
 * @type type
 * @since 20-08-19
 */
var paramsLuzAmbiental = {
    'intensity': 0.6
};

/**
 * 
 * @type type
 * @since 20-08-18
 */
var panel;

var LuzPrimariaFocal;
var LuzAmbiental;
var Fondo;

var sky, sunSphere;

var valueSunsphere = 0.03;//
var directionNegative = true;

init();
animate();


/**
 * @since 20-05-20
 */
function init() {
    
    initEscena();
    
    /**
     * Camara
     */
    camaraFinal();
    //camaraDesarrollo();

    /**
     * Mundo
     */
    //objPisoCircular();
    objPuntosSeleccion();
    if (CONFIG_HELPERS) {
        objMalla();
    }
    //initDummies();
    initModeloFinal();
    /**
     * Fondo
     */
    //initFondoCieloSimulado();
    //initFondoHdri();
    initSky();
    /**
     * Iluminación
     */
    //initIluminacionSimple();
    //initLuzDireccionalPrimaria();
    //initLuzPuntualPrimaria();
    luzPrimariaFocal();
    luzAmbiental();
    createPanel();

//    console.log(panel);
//    var folder = panel.__folders[Object.keys(panel.__folders)[1]];
//    console.log(folder);
//    var controlador = folder.__controllers[Object.keys(folder.__controllers)[0]]
//    console.log(controlador);

    /**
     * Eventos
     */
    window.addEventListener('resize', onWindowResize, false);

    // raycaster

    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();


    //gui.

//    window.addEventListener('click', onDocumentMouseDown, false);




    //window.addEventListener("touch", onDocumentMouseDown, false);

//    $(document).on('touchstart', function () {
//        documentClick = true;
//    });
//    $(document).on('touchmove', function () {
//        documentClick = false;
//    });
//    $(document).on('click touchend', function (event) {
//        if (event.type == "click")
//            documentClick = true;
//        if (documentClick) {
//            onDocumentMouseDown(event);
//        }
//    });
}



/**
 * 
 * @returns {undefined}
 * @since 19-08-20
 */
function createPanel() {

    //var panel = new GUI();
    panel = new GUI({width: 310});

    var folder1 = panel.addFolder('Visibilidad(DEMO)');
    var folder2 = panel.addFolder('Cámara');
    var folder3 = panel.addFolder('Luz Primaria Focal')

    folder2.add(paramsCamara, 'TargetX').listen();
    folder2.add(paramsCamara, 'TargetY').listen();
    folder2.add(paramsCamara, 'TargetZ').listen();
    folder2.add(paramsCamara, 'CamaraX').listen();
    folder2.add(paramsCamara, 'CamaraY').listen();
    folder2.add(paramsCamara, 'CamaraZ').listen();
    folder2.add(paramsCamara, 'FOV', 10, 90).listen().onChange(function (value) {
        //render();
        camera.fov = value;
        camera.updateProjectionMatrix();
    });
    folder3.add(paramsLuzPrimariaFocal, 'intensity', 0, 1, 0.1).listen().onChange(function (value) {
        LuzPrimariaFocal.intensity = value;
        //camera.updateProjectionMatrix();
    });

    //0.0001
    //0.000001
    folder3.add(paramsLuzPrimariaFocal, 'ShadowBias', -0.00003, 0.00003, 0.000001).listen().onChange(function (value) {
        LuzPrimariaFocal.shadow.bias = value;
        //camera.updateProjectionMatrix();
    });
    folder3.add(paramsLuzPrimariaFocal, 'ShadowMapSize', 512, 1024 * 4, 512).listen().onChange(function (value) {
        LuzPrimariaFocal.shadow.mapSize.width = value;
        LuzPrimariaFocal.shadow.mapSize.height = value;
    });

    //LuzPrimariaFocal.shadow.camera.near = 30; 0.5
    //LuzPrimariaFocal.shadow.camera.far = 300; 500

//    folder2.add(paramsGui, 'FOV').onChange(function (value) {
//        console.log(value);
//        camera.fov = value;
//    });

    //folder2.open();
}

/**
 * @since 20-06-20
 */
function camaraFinal() {
    camera = new THREE.PerspectiveCamera(paramsCamara.FOV, window.innerWidth / window.innerHeight);
    camera.position.x = paramsCamara.CamaraX;
    camera.position.y = paramsCamara.CamaraY;
    camera.position.z = paramsCamara.CamaraZ;
    //x: , y: 18, z: -50
    if (CONFIG_HELPERS) {
        var cameraHelper = new THREE.CameraHelper(camera);
        scene.add(cameraHelper);
    }
    camaraControlesOrbitales();
}

/**
 * @since 20-07-12
 */
function camaraControlesOrbitales() {
    ControlesOrbitales = new OrbitControls(camera, renderer.domElement);

    ControlesOrbitales.addEventListener('change', render); // call this only in static scenes (i.e., if there is no animation loop)

    ControlesOrbitales.enableDamping = false; // an animation loop is required when either damping or auto-rotation are enabled
    ControlesOrbitales.dampingFactor = 0.05;

    ControlesOrbitales.screenSpacePanning = true;

    ControlesOrbitales.minDistance = 10;
    ControlesOrbitales.maxDistance = 200;

    ControlesOrbitales.maxPolarAngle = Math.PI / 1.6;


    ControlesOrbitales.target.x = paramsCamara.TargetX;
    ControlesOrbitales.target.y = paramsCamara.TargetY;
    ControlesOrbitales.target.z = paramsCamara.TargetZ;
}

/**
 * @since 20-06-20
 */
function camaraDesarrollo() {
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight);
//    camera.position.x = -120 - 10 - 20;
//    camera.position.y = 35 + 10 + 20 + 20;
//    camera.position.z = -10 - 10;
    camera.position.x = coordCentro.x;
    camera.position.y = coordCentro.y;
    camera.position.z = coordCentro.z + 200;
    if (CONFIG_HELPERS) {
        var cameraHelper = new THREE.CameraHelper(camera);
        scene.add(cameraHelper);
    }
    camaraControlesOrbitalesDesarrollo();
}


/**
 * @since 20-07-12
 */
function camaraControlesOrbitalesDesarrollo() {
    ControlesOrbitales = new OrbitControls(camera, renderer.domElement);

    ControlesOrbitales.addEventListener('change', render); // call this only in static scenes (i.e., if there is no animation loop)

    ControlesOrbitales.target.x = coordCentro.x;
    ControlesOrbitales.target.y = coordCentro.y;
    ControlesOrbitales.target.z = coordCentro.z;

    ControlesOrbitales.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    ControlesOrbitales.dampingFactor = 0.05;

    ControlesOrbitales.screenSpacePanning = false;

    ControlesOrbitales.minDistance = 1;
    ControlesOrbitales.maxDistance = 400;

    ControlesOrbitales.maxPolarAngle = Math.PI;
}

/**
 * @since 20-06-18
 * @edit 20-07-26
 */
function initFondoCieloSimulado() {
    scene.background = new THREE.Color(COLOR_CIELO);//https://en.wikipedia.org/wiki/X11_color_names
    //scene.fog = new THREE.Fog( scene.background, 1, 5000 );
    hemiLight = new THREE.HemisphereLight(COLOR_LUZFONDO, COLOR_TIERRA, 0.8);
    //hemiLight.color.setHSL( 0.6, 1, 0.6 );
    //hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
    hemiLight.position.set(0, 20, 0);
    //scene.add(hemiLight);
    if (CONFIG_HELPERS) {
        hemiLightHelper = new THREE.HemisphereLightHelper(hemiLight, 3);
        scene.add(hemiLightHelper);
    }

}

/**
 *
 * @since 20-07-26
 */
function initFondoHdri() {

    var light = new THREE.AmbientLight(0x404040, 0.9); // soft white light
    light.position.set(0, 15, 0);
    scene.add(light);
    if (CONFIG_HELPERS) {
        var lightHelper = new THREE.AmbientLightHelper(light, 3);
        scene.add(lightHelper);
    }
    new RGBELoader()
            .setDataType(THREE.UnsignedByteType) // alt: FloatType, HalfFloatType
            .load('urban_sky.hdr', function (texture, textureData) {

                //console.log( textureData );
                //console.log( texture );


                //scene.background = texture;
                scene.environment = texture;
                //var quad = new THREE.PlaneBufferGeometry( 1.5 * textureData.width / textureData.height, 1.5 );

                //var mesh = new THREE.Mesh( quad, material );

                //scene.add( mesh );

                //render();
                var geometry = new THREE.SphereBufferGeometry(290, 60, 40);
                geometry.phiLength = Math.PI;
                // invert the geometry on the x-axis so that all of the faces point inward
                //geometry.scale( - 1, 1, 1 );

                var textureJPG = new THREE.TextureLoader().load('urban_sky.jpg');
                //var material = new THREE.MeshBasicMaterial( { map: textureJPG } );
                var material = new THREE.MeshBasicMaterial({
                    map: textureJPG
                    , side: THREE.BackSide
                });
                //var material = new THREE.MeshStandardMaterial( { map: texture } );
                //material.emissiveMap = texture;
                //material.emissiveIntensity = 100;
                var mesh = new THREE.Mesh(geometry, material);

                scene.add(mesh);

            });

    //

    //var gui = new GUI();

    //gui.add( params, 'exposure', 0, 4, 0.01 ).onChange( render );
    //gui.open();


}

/**
 * @since 20-06-18
 */
function initModeloFinal() {
    let objLoader2 = new OBJLoader2();
    let callbackOnLoad = function (object3d) {
        object3d.traverse(child => {
            if (child.material) {
                child.material.reflectivity = 0; //The default value is 1
                child.material.shininess = 0; //Default is 30
                child.material.wireframe = false;
                child.material.vertexColors = false;
                if (CONFIG_DOBLE_CARA) {
                    child.material.side = THREE.DoubleSide;
                } else {
                    child.material.side = THREE.SingleSide;
                }
                if (CONFIG_SOMBRAS) {
                    child.receiveShadow = true;
                    child.castShadow = true;
                }
            }
            //if ( child.material ) child.material = new THREE.MeshStandardMaterial();
        });
        scene.add(object3d);
        console.log('Loading complete: ' + modelName);
        //scope._reportProgress( { detail: { text: '' } } );
    };

    let onLoadMtl = function (mtlParseResult) {
        objLoader2.setModelName(modelName);
        objLoader2.setLogging(CONFIG_DEBUG, CONFIG_DEBUG);
        objLoader2.addMaterials(MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult), true);
        //console.log(mtlParseResult);
        objLoader2.load("assets/3dmodel/" + modelName + '.obj', callbackOnLoad, null, null, null);
//                                        scene.traverse(function(children){
//                                                objects.push(children);
//                                        });

    };
    let mtlLoader = new MTLLoader();
    //mtlLoader.setMaterialOptions({side: THREE.SingleSide});
    mtlLoader.load("assets/3dmodel/" + modelName + '.mtl', onLoadMtl);
}


/**
 * @since 20-07-26
 * @edit 20-07-26
 * @edit 20-08-19
 */
function luzPrimariaFocal() {
    LuzPrimariaFocal = new THREE.SpotLight(COLOR_LUZCIELO, paramsLuzPrimariaFocal.intensity);
    //LuzPrimariaFocal.position.set(-10, 130, -10);
    LuzPrimariaFocal.position.set(0, 220, 0);
    scene.add(LuzPrimariaFocal);
    //LuzPrimariaFocal.
    //LuzPrimariaFocal.angle = Math.PI / 2.6;
    //LuzPrimariaFocal.penumbra = 1;
    //LuzPrimariaFocal.power = Math.PI / 1.3;//Default is 4Math.PI. 
    if (CONFIG_HELPERS) {
        var LightHeper = new THREE.SpotLightHelper(LuzPrimariaFocal, 3);
        scene.add(LightHeper);
    }
    if (CONFIG_SOMBRAS) {
        LuzPrimariaFocal.castShadow = true;

        //LuzPrimariaFocal.shadow.mapSize.width = 512 * 2 * 2;
        //LuzPrimariaFocal.shadow.mapSize.height = 512 * 2 * 2;
        //LuzPrimariaFocal.shadow.camera.near = 30;
        //LuzPrimariaFocal.shadow.camera.far = 300;
        //light.shadow.camera.fov = 10;
        LuzPrimariaFocal.shadow.mapSize.width = paramsLuzPrimariaFocal.ShadowMapSize;
        LuzPrimariaFocal.shadow.mapSize.height = paramsLuzPrimariaFocal.ShadowMapSize;
        LuzPrimariaFocal.shadow.bias = paramsLuzPrimariaFocal.ShadowBias;//The default is 0
    }
}

/**
 * @since 20-07-26
 * @edit 20-07-26
 */
function initLuzPuntualPrimaria() {
    var light = new THREE.PointLight(COLOR_LUZCIELO, 0.9);
    light.position.set(0, 100, 0);
    scene.add(light);
    if (CONFIG_HELPERS) {
        var dirLightHeper = new THREE.PointLightHelper(light, 3);
        scene.add(dirLightHeper);
    }
    if (CONFIG_SOMBRAS) {
        light.castShadow = true;
        light.shadow.mapSize.width = 512 * 2 * 2;  // default
        light.shadow.mapSize.height = 512 * 2 * 2; // default
        light.shadow.camera.near = 20;    // default
        light.shadow.camera.far = 300;     // default
    }
}

/**
 * 
 * @since 20-06-05
 * @edit 20-07-26
 */
function initIluminacionSimple() {
    var light = new THREE.AmbientLight(0xffffff);
    scene.add(light);
//    if (CONFIG_HELPERS) {
//        var dirLightHeper = new THREE.AmbientLightHelper(light, 3);
//        scene.add(dirLightHeper);
//    }
    scene.background = new THREE.Color(COLOR_CIELO);
}

/**
 * @since 20-07-11
 * @edit 20-07-26
 */
function initLuzDireccionalPrimaria() {
    //var light = new THREE.DirectionalLight( 0xffffff,1,100);
    var light = new THREE.DirectionalLight(COLOR_LUZCIELO, 0.9);
    light.position.set(-3, 50, -3);
    scene.add(light);
    if (CONFIG_HELPERS) {
        var dirLightHeper = new THREE.DirectionalLightHelper(light, 3);
        scene.add(dirLightHeper);
    }
    if (CONFIG_SOMBRAS) {
        light.castShadow = true;
        light.shadow.mapSize.width = 512;  // default
        light.shadow.mapSize.height = 512; // default
//        light.shadow.camera.near = 10;    // default
//        light.shadow.camera.far = 200;     // default
    }
}

/**
 * 
 * @type THREE.CircleBufferGeometry
 * @since 20-08-18
 */
var geometriaPuntoInteres;

/**
 * @since 20-08-21
 * @param Object puntoInteres
 * @returns {undefined}
 */
function addPuntoInteres(puntoInteres, secundario) {
    var map = new THREE.TextureLoader().load("assets/icons/" + puntoInteres.icono);
    /**
     * The number of samples taken along the axis through the 
     * pixel that has the highest density of texels. By default, 
     * this value is 1. A higher value gives a less blurry 
     * result than a basic mipmap, at the cost of more texture 
     * samples being used. Use renderer.getMaxAnisotropy() to 
     * find the maximum valid anisotropy value for the GPU; this 
     * value is usually a power of 2. 
     */
    //map.anisotropy = renderer.capabilities.getMaxAnisotropy();
    var material = new THREE.MeshBasicMaterial({map: map, side: THREE.SingleSide});
    var circle = new THREE.Mesh(geometriaPuntoInteres, material);
    circle.position.set(puntoInteres.x, puntoInteres.y, puntoInteres.z);
    circle.rotateX(Math.PI / 2);
    circle.receiveShadow = false;
    circle.name = puntoInteres.xIdEC;
    scene.add(circle);
    meshPlacaEspacioCultural.push(circle);

//    var circle2 = new THREE.Mesh(geometriaPuntoInteresSecundario, material);
//    circle2.position.set(secundario.x, secundario.y, secundario.z);
//    circle2.rotateX(Math.PI / 2);
//    circle2.receiveShadow = false;
//    //circle2.name = puntoInteres.xIdEC +"_SEC";
//    circle2.name = puntoInteres.xIdEC;
//    scene.add(circle2);
//    meshPlacaEspacioCultural.push(circle2);
}



/**
 * @since 20-07-25
 * @edit 20-08-08
 * @link https://threejs.org/docs/#api/en/geometries/CircleBufferGeometry
 * @edit 20-09-10
 */
function objPuntosSeleccion() {
    //puntosInteresECsec
    geometriaPuntoInteres = new THREE.CircleBufferGeometry(4, 32);
    //geometriaPuntoInteresSecundario = new THREE.CircleBufferGeometry(1, 32);
    addPuntoInteres(puntosInteresEC.MUAC, puntosInteresECsec.MUAC);
    addPuntoInteres(puntosInteresEC.ExplanadaEspiga, puntosInteresECsec.ExplanadaEspiga);
    addPuntoInteres(puntosInteresEC.Cines, puntosInteresECsec.Cines);
    addPuntoInteres(puntosInteresEC.SalaCarlosChaves, puntosInteresECsec.SalaCarlosChaves);
    addPuntoInteres(puntosInteresEC.SalaMiguelCovarrubias, puntosInteresECsec.SalaMiguelCovarrubias);
    addPuntoInteres(puntosInteresEC.SalonDanza, puntosInteresECsec.SalonDanza);
    addPuntoInteres(puntosInteresEC.TeatroJuanRuiz, puntosInteresECsec.TeatroJuanRuiz);
    addPuntoInteres(puntosInteresEC.ForoSorJuana, puntosInteresECsec.ForoSorJuana);
    addPuntoInteres(puntosInteresEC.SalaNeza, puntosInteresECsec.SalaNeza);//
    addPuntoInteres(puntosInteresEC.CentroUniversitarioTeatro, puntosInteresECsec.CentroUniversitarioTeatro);//CentroUniversitarioTeatro
}

/**
 * @since 19-07-25
 */
function initDummies() {

    var geometry = new THREE.PlaneBufferGeometry(300, 300);
    //var material = new THREE.MeshStandardMaterial( {color: "darkolivegreen", side: THREE.DoubleSide} );
    var material = new THREE.MeshStandardMaterial({color: "darkolivegreen"});
    //var material = new THREE.MeshStandardMaterial( { color: "darkolivegreen" } );
    var circle = new THREE.Mesh(geometry, material);
    circle.position.set(0, -5, 0);
    circle.rotateX(Math.PI / -2);
    //circle.castShadow = true;
    circle.receiveShadow = true;
    //circle.receiveShadow = false;
    scene.add(circle);

    /**
     * @edit 20-07-24
     * Textura
     */
    var map = new THREE.TextureLoader().load("assets/3dmodel/" + modelName + '/Concrete_Scored_Jointless.jpg');
    map.wrapS = map.wrapT = THREE.RepeatWrapping;
    map.anisotropy = 16;
    var matConcreto = new THREE.MeshPhongMaterial({map: map, side: THREE.SingleSide});
    matConcreto.reflectivity = 0; //The default value is 1
    matConcreto.shininess = 0;
    /**
     * @edit 20-07-24
     * Textura
     */
    var map = new THREE.TextureLoader().load("assets/3dmodel/" + modelName + '/Polished_Concrete_New.jpg');
    map.wrapS = map.wrapT = THREE.RepeatWrapping;
    map.anisotropy = 16;
    var matConcretoPulido = new THREE.MeshPhongMaterial({map: map, side: THREE.SingleSide});
    matConcretoPulido.reflectivity = 0; //The default value is 1
    matConcretoPulido.shininess = 0;

    /**
     * @edit 20-07-24
     * Textura Cladding_Stucco_White
     */
    var map = new THREE.TextureLoader().load("assets/3dmodel/" + modelName + '/Cladding_Stucco_White.jpg');
    map.wrapS = map.wrapT = THREE.RepeatWrapping;
    map.anisotropy = 16;
    var matStucco = new THREE.MeshPhongMaterial({map: map, side: THREE.SingleSide});
    matStucco.reflectivity = 0; //The default value is 1
    matStucco.shininess = 0;


    var sphereGeometry = new THREE.SphereBufferGeometry(5, 32, 32);
    var sphere = new THREE.Mesh(sphereGeometry, matStucco);
    sphere.castShadow = true; //default is false
    sphere.receiveShadow = true; //default
    scene.add(sphere);

    var sphereGeometry = new THREE.SphereBufferGeometry(5, 32, 32);
    var sphere = new THREE.Mesh(sphereGeometry, matConcretoPulido);
    sphere.castShadow = true; //default is false
    sphere.receiveShadow = true; //default
    sphere.position.set(0, 20, 3);
    //scene.add( sphere );


    /**
     * @edit 20-07-24
     * Dummie muac
     */
    var geometry = new THREE.BoxBufferGeometry(100, 20, 80, 4, 4, 4);
    var dummie_muac = new THREE.Mesh(geometry, matStucco);
    dummie_muac.position.set(-80, 0, -90);
    dummie_muac.receiveShadow = true;
    dummie_muac.castShadow = true;
    scene.add(dummie_muac);

    /**
     * @edit 20-07-25
     * Dummie Cines
     */
    var geometry = new THREE.BoxBufferGeometry(44, 13, 20, 4, 4, 4);
    var dummie = new THREE.Mesh(geometry, matConcreto);
    dummie.position.set(-65, 0, 10);
    dummie.receiveShadow = true;
    dummie.castShadow = true;
    scene.add(dummie);


    /**
     * @edit 20-07-24
     * Dummie Sor Juana
     */
    var geometry = new THREE.BoxBufferGeometry(30, 10, 44, 4, 4, 4);
    var dummie_sj01 = new THREE.Mesh(geometry, matConcreto);
    dummie_sj01.position.set(10, 0, 30);
    dummie_sj01.receiveShadow = true;
    dummie_sj01.castShadow = true;
    scene.add(dummie_sj01);
    var geometry = new THREE.BoxBufferGeometry(20, 25, 10, 4, 4, 4);
    var dummie_sj02 = new THREE.Mesh(geometry, matConcretoPulido);
    dummie_sj02.position.set(12, 0, 50);
    dummie_sj02.receiveShadow = true;
    dummie_sj02.castShadow = true;
    scene.add(dummie_sj02);
}

/**
 * @since 20-07-25
 */
function initCamaraTop() {
    camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1, 800);
    camera.position.set(0, 700, 0);
    //var cameraHelper = new THREE.CameraHelper(camera);
    //scene.add(cameraHelper);
}





function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
/**
 * 
 * @returns {undefined}
 * @since 20-06-01
 * @edit 20-08-19
 */
function animate() {
    ControlesOrbitales.update(); // only required if ControlesOrbitales.enableDamping = true, or if ControlesOrbitales.autoRotate = true
    animCameraTarget();
    animPlacas();
    animPanel();
    animCameraLimits();
    animSunsphere();
    requestAnimationFrame(animate);
    render();
}

/**
 * 
 * @returns {undefined}
 * @since 20-09-06
 */
function animSunsphere() {
    if (valueSunsphere < 0.03) {
        directionNegative = false;
    } else if (valueSunsphere > 0.48) {
        directionNegative = true;
    }
    if(directionNegative){
        valueSunsphere -= 0.05;
    }else{
        valueSunsphere += 0.05;
    }
    var theta = Math.PI * (0.12 - 0.5);
    var phi = 2 * Math.PI * (valueSunsphere - 0.5);//0.48
    sunSphere.position.x = 400000 * Math.cos(phi);
    sunSphere.position.y = 400000 * Math.sin(phi) * Math.sin(theta);
    sunSphere.position.z = 400000 * Math.sin(phi) * Math.cos(theta);
}

/**
 * 
 * @returns {undefined}
 * @since 20-08-19
 */
function animPanel() {
    var folder = panel.__folders[Object.keys(panel.__folders)[1]];
    var controlador = folder.__controllers[Object.keys(folder.__controllers)[0]];
    controlador.object.TargetX = ControlesOrbitales.target.x;
    controlador.object.TargetY = ControlesOrbitales.target.y;
    controlador.object.TargetZ = ControlesOrbitales.target.z;

    controlador.object.CamaraX = camera.position.x;
    controlador.object.CamaraY = camera.position.y;
    controlador.object.CamaraZ = camera.position.z;
}

/**
 * Animar las placas de seleccion
 * @since 20-07-25
 */
function animPlacas() {
    meshPlacaEspacioCultural.forEach(function myFunction(object) {
        object.lookAt(camera.position);
    });
}

function render() {
    renderer.render(scene, camera);

}

/**
 * @since 20-07-12
 */
function initEscena() {
    scene = new THREE.Scene();
    //scene.background = new THREE.Color( 0xcccccc );
    renderer = new THREE.WebGLRenderer({antialias: true});
//    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    //renderer.toneMapping = THREE.LinearToneMapping;
    // ReinhardToneMapping
    //CineonToneMapping
    /**
     * @edit 20-07-25
     * Sombras
     */
    if (CONFIG_SOMBRAS) {
        renderer.shadowMap.enabled = true;
        if (CONFIG_SOMBRAS_CALIDAD_BAJA) {
            renderer.shadowMap.type = THREE.PCFShadowMap;
        } else {
            renderer.shadowMap.type = THREE.PCFSoftShadowMap;
            //renderer.shadowMap.type = THREE.PCFShadowMap;
        }
    }


    //renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

    document.body.appendChild(renderer.domElement);
}

/**
 * @since 20-07-24
 * Malla
 */
function objMalla() {
    var helper = new THREE.GridHelper(286, 286);
    helper.material.opacity = 1;
    helper.material.transparent = false;
    scene.add(helper);
}

/**
 * @edit 20-07-25
 * Círuclo simple
 */
function objPisoCircular() {
    var geometry = new THREE.CircleBufferGeometry(350, 60);
    //var material = new THREE.MeshStandardMaterial( {color: "darkolivegreen", side: THREE.DoubleSide} );
    //var material = new THREE.MeshStandardMaterial( {COLOR_TIERRA );
    var material = new THREE.MeshStandardMaterial({color: COLOR_TIERRA});
    var circle = new THREE.Mesh(geometry, material);
    circle.position.set(0, -10, 0);
    circle.rotateX(Math.PI / -2);
    //circle.castShadow = true;
    circle.receiveShadow = false;
    //circle.receiveShadow = false;
    scene.add(circle);
}

/**
 * @since 20-06-08
 * @edit 20-07-27
 * @param {type} event
 * @returns {onDocumentMouseDown}
 */
function onDocumentMouseDown(event) {
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(meshPlacaEspacioCultural);
    if (intersects.length > 0) {
        if (intersects[0].object.name) {
            this.name = intersects[0].object.name;


            console.log(this.name);
            console.log(intersects[0].object.position);
            window.parent.postMessage(this.name, "*");
            moveCameraTo(intersects[0].object);
        }
    }
}
/**
 * @since 20-08-09
 * @param {type} object
 * @returns {undefined}
 */
function moveCameraTo(object) {
    CustomTarget.x = object.position.x;
    CustomTarget.y = object.position.y;
    CustomTarget.z = object.position.z;
    var distanciaX = (object.position.x - ControlesOrbitales.target.x);
    var distanciaY = (object.position.y - ControlesOrbitales.target.y);
    var distanciaZ = (object.position.z - ControlesOrbitales.target.z);
    CustomTarget.stepX = (Math.abs(distanciaX) / 24);
    CustomTarget.stepY = (Math.abs(distanciaY) / 24);
    CustomTarget.stepZ = (Math.abs(distanciaZ) / 24);
}

/**
 * 
 * @returns {undefined}
 * @since 20-08-27
 */
function animCameraLimits() {
    animCameraTargetLimits();
//    if (camera.position.x > LimitesCamara.xMax) {
//        camera.position.x = LimitesCamara.xMax;
//    }
//    if (camera.position.x < LimitesCamara.xMin) {
//        camera.position.x = LimitesCamara.xMin;
//    }

//    if (camera.position.y > LimitesCamara.yMax) {
//        camera.position.y = LimitesCamara.yMax;
//    }
    if (camera.position.y < 4) {
        camera.position.y = 4;
    }
//    if (camera.position.z > LimitesCamara.zMax) {
//        camera.position.z = LimitesCamara.zMax;
//    }
//    if (camera.position.z < LimitesCamara.zMin) {
//        camera.position.z = LimitesCamara.zMin;
//    }
}

/**
 * 
 * @returns {undefined}
 * @since 20-08-27
 */
function animCameraTargetLimits() {

    if (ControlesOrbitales.target.x > LimitesCamara.xMax - 50) {
        ControlesOrbitales.target.x = LimitesCamara.xMax - 50;
    }
    if (ControlesOrbitales.target.x < LimitesCamara.xMin + 50) {
        ControlesOrbitales.target.x = LimitesCamara.xMin + 50;
    }

    if (ControlesOrbitales.target.y > LimitesCamara.yMax) {
        ControlesOrbitales.target.y = LimitesCamara.yMax;
    }
    if (ControlesOrbitales.target.y < LimitesCamara.yMin) {
        ControlesOrbitales.target.y = LimitesCamara.yMin;
    }

    if (ControlesOrbitales.target.z > LimitesCamara.zMax - 50) {
        ControlesOrbitales.target.z = LimitesCamara.zMax - 50;
    }
    if (ControlesOrbitales.target.z < LimitesCamara.zMin + 50) {
        ControlesOrbitales.target.z = LimitesCamara.zMin + 50;
    }
    
    
}

/**
 * 
 * @returns {undefined}
 * @since 20-08-18
 * @edit 20-08-19
 */
function animCameraTarget() {
    var changed = false;
    if (CustomTarget.x != null) {
        changed = true;
        if (CustomTarget.x > ControlesOrbitales.target.x) {
//            changed = true;
            ControlesOrbitales.target.x += CustomTarget.stepX;
            if (ControlesOrbitales.target.x > CustomTarget.x) {
                ControlesOrbitales.target.x = CustomTarget.x;
                CustomTarget.x = null;
                changed = false;
            }
        } else if (CustomTarget.x < ControlesOrbitales.target.x) {
//            changed = true;
            ControlesOrbitales.target.x -= CustomTarget.stepX;
            if (ControlesOrbitales.target.x < CustomTarget.x) {
                ControlesOrbitales.target.x = CustomTarget.x;
                CustomTarget.x = null;
                changed = false;
            }
        }
    }
//    if(CustomTarget.x != ControlesOrbitales.target.x){
//        ControlesOrbitales.target.x = CustomTarget.x;
//    }
    if (CustomTarget.y != null) {
        changed = true;
        if (CustomTarget.y > ControlesOrbitales.target.y) {
            ControlesOrbitales.target.y += CustomTarget.stepY;
            if (ControlesOrbitales.target.y > CustomTarget.y) {
                ControlesOrbitales.target.y = CustomTarget.y;
                CustomTarget.y = null;
                changed = false;
            }
        } else if (CustomTarget.y < ControlesOrbitales.target.y) {
            //changed = true;
            ControlesOrbitales.target.y -= CustomTarget.stepY;
            if (ControlesOrbitales.target.y < CustomTarget.y) {
                ControlesOrbitales.target.y = CustomTarget.y;
                CustomTarget.y = null;
                changed = false;
            }
        }
    }
//    if(CustomTarget.y != ControlesOrbitales.target.y){
//        changed = true;
//        ControlesOrbitales.target.y = CustomTarget.y;
//    }
    if (CustomTarget.z != null) {
        changed = true;
        if (CustomTarget.z > ControlesOrbitales.target.z) {
//            changed = true;
            ControlesOrbitales.target.z += CustomTarget.stepZ;
            if (ControlesOrbitales.target.z > CustomTarget.z) {
                ControlesOrbitales.target.z = CustomTarget.z;
                CustomTarget.z = null;
                changed = false;
            }
        } else if (CustomTarget.z < ControlesOrbitales.target.z) {
//            changed = true;
            ControlesOrbitales.target.z -= CustomTarget.stepZ;
            if (ControlesOrbitales.target.z < CustomTarget.z) {
                ControlesOrbitales.target.z = CustomTarget.z;
                CustomTarget.z = null;
                changed = false;
            }
        }
    }
//    if(CustomTarget.z != ControlesOrbitales.target.z){
//        changed = true;
//        ControlesOrbitales.target.z = CustomTarget.z;
//    }
    if (changed == true) {
        ControlesOrbitales.maxDistance = 10;
//console.log(camera);
//console.log(ControlesOrbitales);

    } else {
        ControlesOrbitales.maxDistance = 200;
        camera.updateProjectionMatrix();
        console.log("TEST");
    }
    
}

function initSky() {

    // Add Sky
    sky = new Sky();
    sky.scale.setScalar(450000);
    scene.add(sky);

    // Add Sun Helper
    sunSphere = new THREE.Mesh(
            new THREE.SphereBufferGeometry(20000, 16, 8),
            new THREE.MeshBasicMaterial({color: 0xffffff})
            );
    sunSphere.position.y = -700000;
    sunSphere.visible = false;
    scene.add(sunSphere);

    /// GUI

    var effectController = {
        turbidity: 10,
        rayleigh: 2,
        mieCoefficient: 0.005,
        mieDirectionalG: 0.8,
        luminance: 1,
        inclination: 0.12, // elevation / inclination
        azimuth: 0.25, // Facing front (0.25)
        sun: !true
    };

    var distance = 400000;

    function guiChanged() {

        var uniforms = sky.material.uniforms;
        uniforms[ "turbidity" ].value = effectController.turbidity;
        uniforms[ "rayleigh" ].value = effectController.rayleigh;
        uniforms[ "mieCoefficient" ].value = effectController.mieCoefficient;
        uniforms[ "mieDirectionalG" ].value = effectController.mieDirectionalG;
        uniforms[ "luminance" ].value = effectController.luminance;

        var theta = Math.PI * (effectController.inclination - 0.5);
        var phi = 2 * Math.PI * (effectController.azimuth - 0.5);

        sunSphere.position.x = distance * Math.cos(phi);
        sunSphere.position.y = distance * Math.sin(phi) * Math.sin(theta);
        sunSphere.position.z = distance * Math.sin(phi) * Math.cos(theta);

        sunSphere.visible = effectController.sun;

        uniforms[ "sunPosition" ].value.copy(sunSphere.position);

        renderer.render(scene, camera);

    }

    var gui = new GUI();
    var folder = gui.addFolder('Cielo (DEMO)');
    folder.add(effectController, "turbidity", 1.0, 20.0, 0.1).onChange(guiChanged);
    folder.add(effectController, "rayleigh", 0.0, 4, 0.001).onChange(guiChanged);
    folder.add(effectController, "mieCoefficient", 0.0, 0.1, 0.001).onChange(guiChanged);
    folder.add(effectController, "mieDirectionalG", 0.0, 1, 0.001).onChange(guiChanged);
    folder.add(effectController, "luminance", 0.0, 2).onChange(guiChanged);
    folder.add(effectController, "inclination", 0, 1, 0.0001).onChange(guiChanged);
    folder.add(effectController, "azimuth", 0, 1, 0.0001).onChange(guiChanged);
    folder.add(effectController, "sun").onChange(guiChanged);

    guiChanged();

}

/**
 * 
 * @returns {undefined}
 * @since 20-08-20
 */
function luzAmbiental() {
    var light = new THREE.AmbientLight(COLOR_LUZFONDO, paramsLuzAmbiental.intensity);
    scene.add(light);
    var gui = new GUI();
    var folder = gui.addFolder('Luz ambiental (DEMO)');
    folder.add(paramsLuzAmbiental, "intensity", 0, 1, 0.1).onChange(function (value) {
        light.intensity = value;
    });
}
