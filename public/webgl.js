/**
 * RecorridoVirtual - webgl.js
 *
 * @author Angel Sierra Vega <angel.grupoindie.com>
 * @copyright (C) 2020 Angel Sierra Vega. Grupo INDIE.
 *
 * @package UNAM\RecorridoVirtual
 *
 * @version 00.50
 * @since 20-04-27
 */

/**
 * 
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

import * as THREE from '/UNAM/RecorridoVirtual/build/three.module.js';
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

var camera, scene, renderer;

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
 * @type array
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
 */
var orbitControls;
var paramsSky = {
    turbidity: 10,
    rayleigh: 2,
    mieCoefficient: 0.005,
    mieDirectionalG: 0.8,
    luminance: 1,
    inclination: 0, // elevation / inclination
    azimuth: 0.1, // Facing front (0.25)
    sun: !true
};

/**
 * Lights
 * @returns {undefined}
 */
var LuzPrimariaFocal;

/**
 * Camera target
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


/**
 * 
 * @type type
 * @since 20-08-19
 */
var paramsLuzPrimariaFocal = {
    'intensity': 0.6
    , 'ShadowBias': 0
    , 'ShadowMapSize': 4096
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
    //camaraDesarrollo();¿
    /**
     * Mundo
     */
    objPuntosSeleccion();
    if (CONFIG_HELPERS) {
        objMalla();
    }
    initDummies();
//    initModeloFinal();
    /**
     * Fondo
     */
    ambientSky();
    /**
     * Iluminación
     */
    luzPrimariaFocal();
    luzAmbiental();
//    createPanel();
    /**
     * Eventos
     */
    window.addEventListener('resize', onWindowResize, false);
    // raycaster
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();
    window.addEventListener('click', onDocumentMouseDown, false);
}



/**
 * 
 * @returns {undefined}
 * @since 19-08-20
 */
function createPanel() {
    panel = new GUI({width: 310});
//    var folder1 = panel.addFolder('Visibilidad(DEMO)');
    var folder2 = panel.addFolder('Cámara');
    var folder3 = panel.addFolder('Luz Primaria Focal')
    folder2.add(paramsCamara, 'TargetX').listen();
    folder2.add(paramsCamara, 'TargetY').listen();
    folder2.add(paramsCamara, 'TargetZ').listen();
    folder2.add(paramsCamara, 'CamaraX').listen();
    folder2.add(paramsCamara, 'CamaraY').listen();
    folder2.add(paramsCamara, 'CamaraZ').listen();
    folder2.add(paramsCamara, 'FOV', 10, 90).listen().onChange(function (value) {
        camera.fov = value;
        camera.updateProjectionMatrix();
    });
    folder3.add(paramsLuzPrimariaFocal, 'intensity', 0, 1, 0.1).listen().onChange(function (value) {
        LuzPrimariaFocal.intensity = value;
    });
    folder3.add(paramsLuzPrimariaFocal, 'ShadowBias', -0.00001, 0.00002, 0.000001).listen().onChange(function (value) {
        LuzPrimariaFocal.shadow.bias = value;
    });
    folder3.add(paramsLuzPrimariaFocal, 'ShadowMapSize', 512, 1024 * 4, 512).listen().onChange(function (value) {
        LuzPrimariaFocal.shadow.mapSize.width = value;
        LuzPrimariaFocal.shadow.mapSize.height = value;
    });
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
    orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.addEventListener('change', render); // call this only in static scenes (i.e., if there is no animation loop)

    orbitControls.enableDamping = false; // an animation loop is required when either damping or auto-rotation are enabled
    orbitControls.dampingFactor = 0.05;
    orbitControls.screenSpacePanning = true;

    orbitControls.minDistance = 10;
    orbitControls.maxDistance = 200;

    orbitControls.maxPolarAngle = Math.PI / 1.6;

    orbitControls.target.x = paramsCamara.TargetX;
    orbitControls.target.y = paramsCamara.TargetY;
    orbitControls.target.z = paramsCamara.TargetZ;
}

/**
 * @since 20-06-20
 */
function camaraDesarrollo() {
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight);
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
    orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.addEventListener('change', render); // call this only in static scenes (i.e., if there is no animation loop)

    orbitControls.target.x = coordCentro.x;
    orbitControls.target.y = coordCentro.y;
    orbitControls.target.z = coordCentro.z;

    orbitControls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    orbitControls.dampingFactor = 0.05;

    orbitControls.screenSpacePanning = false;

    orbitControls.minDistance = 1;
    orbitControls.maxDistance = 400;

    orbitControls.maxPolarAngle = Math.PI;
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
        });
        object3d.position.y=-3;
        scene.add(object3d);
//        console.log('Loading complete: ' + modelName);
    };

    let onLoadMtl = function (mtlParseResult) {
        objLoader2.setModelName(modelName);
        objLoader2.setLogging(CONFIG_DEBUG, CONFIG_DEBUG);
        objLoader2.addMaterials(MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult), true);
        objLoader2.load("assets/3dmodel/" + modelName + '.obj', callbackOnLoad, null, null, null);
    };
    let mtlLoader = new MTLLoader();
    mtlLoader.load("assets/3dmodel/" + modelName + '.mtl', onLoadMtl);
}


/**
 * @since 20-07-26
 * @edit 20-07-26
 * @edit 20-08-19
 */
function luzPrimariaFocal() {
    LuzPrimariaFocal = new THREE.SpotLight(COLOR_LUZCIELO, paramsLuzPrimariaFocal.intensity);
    scene.add(LuzPrimariaFocal);
    if (CONFIG_HELPERS) {
        var LightHeper = new THREE.SpotLightHelper(LuzPrimariaFocal, 3);
        scene.add(LightHeper);
    }
    if (CONFIG_SOMBRAS) {
        LuzPrimariaFocal.castShadow = true;
        LuzPrimariaFocal.shadow.mapSize.width = paramsLuzPrimariaFocal.ShadowMapSize;
        LuzPrimariaFocal.shadow.mapSize.height = paramsLuzPrimariaFocal.ShadowMapSize;
        LuzPrimariaFocal.shadow.bias = -0.0000032;//The default is 0
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
function addPuntoInteres(puntoInteres) {
    var map = new THREE.TextureLoader().load("assets/icons/" + puntoInteres.icono);
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
    addPuntoInteres(puntosInteresEC.MUAC);
    addPuntoInteres(puntosInteresEC.ExplanadaEspiga);
    addPuntoInteres(puntosInteresEC.Cines);
    addPuntoInteres(puntosInteresEC.SalaCarlosChaves);
    addPuntoInteres(puntosInteresEC.SalaMiguelCovarrubias);
    addPuntoInteres(puntosInteresEC.SalonDanza);
    addPuntoInteres(puntosInteresEC.TeatroJuanRuiz);
    addPuntoInteres(puntosInteresEC.ForoSorJuana);
    addPuntoInteres(puntosInteresEC.SalaNeza);//
    addPuntoInteres(puntosInteresEC.CentroUniversitarioTeatro);//CentroUniversitarioTeatro
}

/**
 * @since 19-07-25
 */
function initDummies() {

    var geometry = new THREE.PlaneBufferGeometry(300, 300);
    //var material = new THREE.MeshStandardMaterial( {color: "darkolivegreen", side: THREE.DoubleSide} );
    var material = new THREE.MeshStandardMaterial({color: "darkolivegreen"});
    var circle = new THREE.Mesh(geometry, material);
    circle.position.set(0, -5, 0);
    circle.rotateX(Math.PI / -2);
    circle.receiveShadow = true;
    scene.add(circle);

    var sphereGeometry = new THREE.SphereBufferGeometry(5, 32, 32);
    var sphere = new THREE.Mesh(sphereGeometry, material);
    sphere.castShadow = true; //default is false
    sphere.receiveShadow = true; //default
    scene.add(sphere);

    var sphereGeometry = new THREE.SphereBufferGeometry(5, 32, 32);
    var sphere = new THREE.Mesh(sphereGeometry, material);
    sphere.castShadow = true; //default is false
    sphere.receiveShadow = true; //default
    sphere.position.set(0, 20, 3);
    //scene.add( sphere );


    /**
     * @edit 20-07-24
     * Dummie muac
     */
    var geometry = new THREE.BoxBufferGeometry(100, 20, 80, 4, 4, 4);
    var dummie_muac = new THREE.Mesh(geometry, material);
    dummie_muac.position.set(-80, 0, -90);
    dummie_muac.receiveShadow = true;
    dummie_muac.castShadow = true;
    scene.add(dummie_muac);

    /**
     * @edit 20-07-25
     * Dummie Cines
     */
    var geometry = new THREE.BoxBufferGeometry(44, 13, 20, 4, 4, 4);
    var dummie = new THREE.Mesh(geometry, material);
    dummie.position.set(-65, 0, 10);
    dummie.receiveShadow = true;
    dummie.castShadow = true;
    scene.add(dummie);


    /**
     * @edit 20-07-24
     * Dummie Sor Juana
     */
    var geometry = new THREE.BoxBufferGeometry(30, 10, 44, 4, 4, 4);
    var dummie_sj01 = new THREE.Mesh(geometry, material);
    dummie_sj01.position.set(10, 0, 30);
    dummie_sj01.receiveShadow = true;
    dummie_sj01.castShadow = true;
    scene.add(dummie_sj01);
    var geometry = new THREE.BoxBufferGeometry(20, 25, 10, 4, 4, 4);
    var dummie_sj02 = new THREE.Mesh(geometry, material);
    dummie_sj02.position.set(12, 0, 50);
    dummie_sj02.receiveShadow = true;
    dummie_sj02.castShadow = true;
    scene.add(dummie_sj02);
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
    orbitControls.update(); // only required if orbitControls.enableDamping = true, or if orbitControls.autoRotate = true
    animCameraTarget();
    animPlacas();
//    animPanel();
    animCameraLimits();
    animSky()
    requestAnimationFrame(animate);
    render();
}


/**
 * 
 * @returns {undefined}
 * @since 20-08-19
 */
function animPanel() {
    var folder = panel.__folders[Object.keys(panel.__folders)[1]];
    var controlador = folder.__controllers[Object.keys(folder.__controllers)[0]];
    controlador.object.TargetX = orbitControls.target.x;
    controlador.object.TargetY = orbitControls.target.y;
    controlador.object.TargetZ = orbitControls.target.z;

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
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
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
        }
    }
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
            window.parent.postMessage(this.name, "*");
//            moveCameraTo(intersects[0].object);
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
    var distanciaX = (object.position.x - orbitControls.target.x);
    var distanciaY = (object.position.y - orbitControls.target.y);
    var distanciaZ = (object.position.z - orbitControls.target.z);
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
    if (orbitControls.target.x > LimitesCamara.xMax - 50) {
        orbitControls.target.x = LimitesCamara.xMax - 50;
    }
    if (orbitControls.target.x < LimitesCamara.xMin + 50) {
        orbitControls.target.x = LimitesCamara.xMin + 50;
    }
    if (orbitControls.target.y > LimitesCamara.yMax) {
        orbitControls.target.y = LimitesCamara.yMax;
    }
    if (orbitControls.target.y < LimitesCamara.yMin) {
        orbitControls.target.y = LimitesCamara.yMin;
    }
    if (orbitControls.target.z > LimitesCamara.zMax - 50) {
        orbitControls.target.z = LimitesCamara.zMax - 50;
    }
    if (orbitControls.target.z < LimitesCamara.zMin + 50) {
        orbitControls.target.z = LimitesCamara.zMin + 50;
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
        if (CustomTarget.x > orbitControls.target.x) {
//            changed = true;
            orbitControls.target.x += CustomTarget.stepX;
            if (orbitControls.target.x > CustomTarget.x) {
                orbitControls.target.x = CustomTarget.x;
                CustomTarget.x = null;
                changed = false;
            }
        } else if (CustomTarget.x < orbitControls.target.x) {
//            changed = true;
            orbitControls.target.x -= CustomTarget.stepX;
            if (orbitControls.target.x < CustomTarget.x) {
                orbitControls.target.x = CustomTarget.x;
                CustomTarget.x = null;
                changed = false;
            }
        }
    }
//    if(CustomTarget.x != orbitControls.target.x){
//        orbitControls.target.x = CustomTarget.x;
//    }
    if (CustomTarget.y != null) {
        changed = true;
        if (CustomTarget.y > orbitControls.target.y) {
            orbitControls.target.y += CustomTarget.stepY;
            if (orbitControls.target.y > CustomTarget.y) {
                orbitControls.target.y = CustomTarget.y;
                CustomTarget.y = null;
                changed = false;
            }
        } else if (CustomTarget.y < orbitControls.target.y) {
            //changed = true;
            orbitControls.target.y -= CustomTarget.stepY;
            if (orbitControls.target.y < CustomTarget.y) {
                orbitControls.target.y = CustomTarget.y;
                CustomTarget.y = null;
                changed = false;
            }
        }
    }
//    if(CustomTarget.y != orbitControls.target.y){
//        changed = true;
//        orbitControls.target.y = CustomTarget.y;
//    }
    if (CustomTarget.z != null) {
        changed = true;
        if (CustomTarget.z > orbitControls.target.z) {
//            changed = true;
            orbitControls.target.z += CustomTarget.stepZ;
            if (orbitControls.target.z > CustomTarget.z) {
                orbitControls.target.z = CustomTarget.z;
                CustomTarget.z = null;
                changed = false;
            }
        } else if (CustomTarget.z < orbitControls.target.z) {
//            changed = true;
            orbitControls.target.z -= CustomTarget.stepZ;
            if (orbitControls.target.z < CustomTarget.z) {
                orbitControls.target.z = CustomTarget.z;
                CustomTarget.z = null;
                changed = false;
            }
        }
    }
//    if(CustomTarget.z != orbitControls.target.z){
//        changed = true;
//        orbitControls.target.z = CustomTarget.z;
//    }
    if (changed == true) {
        orbitControls.maxDistance = 10;
    } else {
        orbitControls.maxDistance = 200;
        camera.updateProjectionMatrix();
    }

}

/**
 * 
 * @returns {undefined}
 */
function ambientSky() {
    // Add Sky
    sky = new Sky();
    sky.scale.setScalar(4500);
    scene.add(sky);

    // Add Sun Helper
    sunSphere = new THREE.Mesh(
            new THREE.SphereBufferGeometry(20, 16, 8),
            new THREE.MeshBasicMaterial({color: 0xffffff})
            );
    sunSphere.position.y = -700000;
    sunSphere.visible = false;
    scene.add(sunSphere);
}

/**
 * 
 * @since 20-09-27
 */
function animSky() {
    var distance = 250;
    var uniforms = sky.material.uniforms;

    paramsSky.azimuth = paramsSky.azimuth + 0.0001;

    if (paramsSky.azimuth > 1) {
        paramsSky.azimuth = 0;
    }

    var theta = Math.PI * (paramsSky.inclination - 0.5);
    var phi = 2 * Math.PI * (paramsSky.azimuth - 0.5);

    sunSphere.position.x = distance * Math.cos(phi);
    sunSphere.position.y = distance * Math.sin(phi) * Math.sin(theta);
    sunSphere.position.z = distance * Math.sin(phi) * Math.cos(theta);

    uniforms[ "sunPosition" ].value.copy(sunSphere.position);
    LuzPrimariaFocal.position.copy(sunSphere.position);

    if (LuzPrimariaFocal.position.z > 0) {
        if (LuzPrimariaFocal.intensity != 0) {
            LuzPrimariaFocal.intensity = 0;
        }
    }
    if (LuzPrimariaFocal.position.z < 0) {
        if (LuzPrimariaFocal.intensity != 1) {
            LuzPrimariaFocal.intensity = 1;
        }
    }
}

/**
 * 
 * @returns {undefined}
 * @since 20-08-20
 */
function luzAmbiental() {
    var light = new THREE.AmbientLight(COLOR_LUZFONDO, paramsLuzAmbiental.intensity);
    scene.add(light);
//    var gui = new GUI();
//    var folder = gui.addFolder('Luz ambiental (DEMO)');
//    folder.add(paramsLuzAmbiental, "intensity", 0, 1, 0.1).onChange(function (value) {
//        light.intensity = value;
//    });
}
