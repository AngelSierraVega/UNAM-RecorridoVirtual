/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */




/**
 * ModeloCentrado_SF
 * ModeloCentrado_SFI
 * ModeloCentrado_DF
 */
const modelName = 'ModeloCentrado_DF';

const CONFIG_SOMBRAS = false;
const CONFIG_SOMBRAS_CALIDAD_BAJA = false;
const CONFIG_HELPERS = false;
const CONFIG_DEBUG = false;

const COLOR_TIERRA = "darkolivegreen";
const COLOR_CIELO = "lightcyan";//lightskyblue
const COLOR_LUZCIELO = "azure";//Light Cyan

//import default from '/UNAM/RecorridoVirtual/public/modules/luces.js';


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

/**
 * Code for HDRI
 * @edit 20-07-26
 */
//import { GUI } from '/UNAM/RecorridoVirtual/jsm/libs/dat.gui.module.js';
import { RGBELoader } from '/UNAM/RecorridoVirtual/jsm/loaders/RGBELoader.js';

var camera, controls, scene, renderer;
var CamaraDesarrollo;


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
var meshPlacaEspacioCultural = [];
//var INTERSECTED;
//var radius = 100, theta = 0;

var ifrm = window.frameElement; // reference to iframe element container
var doc = ifrm.ownerDocument;// reference to container's document

init();
//render(); // remove when using next line for animation loop (requestAnimationFrame)
animate();



/**
 * @since 20-05-20
 */
function init() {
    initEscena();
    /**
     * Camara
     */
    //initCamaraTop();
    initCamaraDefault();
    //initCamaraDesarrollo();
    //initCamaraToma01();
    //camera = CamaraDesarrollo;
    /**
     * Controles
     */
    //initControlesOrbitalesDesarrollo();
    //initControlesOrbitalesTomaFija();
    /**
     * Mundo
     */
    initPisoCircular();
    initPlacasEspaciosCulturales();
    if (CONFIG_HELPERS) {
        initMalla();
    }
    //initDummies();
    initModeloFinal();
    /**
     * Fondo
     */
    //initFondoCieloSimulado();
    //initFondoHdri();
    /**
     * Iluminación
     */
    initIluminacionSimple();
    //initLuzDireccionalPrimaria();
    //initLuzPuntualPrimaria();
    //initLuzFocalPrimaria();
    /**
     * Eventos
     */
    window.addEventListener('resize', onWindowResize, false);

    // raycaster

    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    document.addEventListener('mousedown', onDocumentMouseDown, false);
}

/**
 * @since 20-06-20
 */
function initCamaraDesarrollo() {
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight);
    if (CONFIG_HELPERS) {
        var cameraHelper = new THREE.CameraHelper(camera);
        scene.add(cameraHelper);
    }
}

/**
 * @since 20-06-20
 */
function initCamaraToma01() {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 400);
    if (CONFIG_HELPERS) {
        var cameraHelper = new THREE.CameraHelper(CamaraDesarrollo);
        scene.add(cameraHelper);
    }
}

/**
 * @since 20-06-20
 * @edit 20-07-27
 */
function initCamaraDefault() {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(10, 0, 5);
    //camera.zoom = 50;
    if (CONFIG_HELPERS) {
        var cameraHelper = new THREE.CameraHelper(camera);
        scene.add(cameraHelper);
    }
    controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', render); // call this only in static scenes (i.e., if there is no animation loop)

    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    //controls.dampingFactor = 0.05;
    controls.dampingFactor = 0.1;
    //controls.zoom0
    controls.screenSpacePanning = false;

    controls.minDistance = 1;
    controls.maxDistance = 400;

    controls.maxPolarAngle = Math.PI / 2;
}

/**
 * @since 20-06-18
 * @edit 20-07-26
 */
function initFondoCieloSimulado() {
    scene.background = new THREE.Color(COLOR_CIELO);//https://en.wikipedia.org/wiki/X11_color_names
    //scene.fog = new THREE.Fog( scene.background, 1, 5000 );
    hemiLight = new THREE.HemisphereLight(COLOR_CIELO, COLOR_TIERRA, 0.8);
    //hemiLight.color.setHSL( 0.6, 1, 0.6 );
    //hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);
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
                child.material.shininess = 1; //Default is 30
                child.material.side = THREE.SingleSide;
                //child.material.wireframe = true;
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
        objLoader2.load(modelName + '.obj', callbackOnLoad, null, null, null);
//                                        scene.traverse(function(children){
//                                                objects.push(children);
//                                        });

    };
    let mtlLoader = new MTLLoader();
    //mtlLoader.setMaterialOptions({side: THREE.SingleSide});
    mtlLoader.load(modelName + '.mtl', onLoadMtl);
}


/**
 * @since 20-07-26
 * @edit 20-07-26
 */
function initLuzFocalPrimaria() {
    var light = new THREE.SpotLight(COLOR_LUZCIELO, 0.7);
    light.position.set(-10, 120, -10);
    scene.add(light);
    light.angle = Math.PI / 2.6;
    light.penumbra = 0.5;
    if (CONFIG_HELPERS) {
        var LightHeper = new THREE.SpotLightHelper(light, 3);
        scene.add(LightHeper);
    }
    if (CONFIG_SOMBRAS) {
        light.castShadow = true;
        light.shadow.mapSize.width = 512 * 2 * 2;
        light.shadow.mapSize.height = 512 * 2 * 2;
        light.shadow.camera.near = 30;
        light.shadow.camera.far = 300;
        //light.shadow.camera.fov = 10;
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
    if (CONFIG_HELPERS) {
        var dirLightHeper = new THREE.AmbientLightHelper(light, 3);
        scene.add(dirLightHeper);
    }
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
        light.shadow.camera.near = 10;    // default
        light.shadow.camera.far = 200;     // default
    }
}



/**
 * @since 19-07-25
 * @link https://threejs.org/docs/#api/en/geometries/CircleBufferGeometry
 */
function initPlacasEspaciosCulturales() {
    var geometry = new THREE.CircleBufferGeometry(5, 32);
    //var material = new THREE.MeshStandardMaterial( {color: "gold", side: THREE.DoubleSide} );
    //var material = new THREE.MeshBasicMaterial( {color: "gold"} );
    var map = new THREE.TextureLoader().load('LOGO_InnovaINDIE_SQ.png');
    //map.wrapS = map.wrapT = THREE.RepeatWrapping;
    /**
     * The number of samples taken along the axis through the 
     * pixel that has the highest density of texels. By default, 
     * this value is 1. A higher value gives a less blurry 
     * result than a basic mipmap, at the cost of more texture 
     * samples being used. Use renderer.getMaxAnisotropy() to 
     * find the maximum valid anisotropy value for the GPU; this 
     * value is usually a power of 2. 
     */
    map.anisotropy = renderer.getMaxAnisotropy();
    var material = new THREE.MeshBasicMaterial({map: map, side: THREE.SingleSide});
    var alturaExtra = 18;
    /**
     * Placa MUAC
     */
    var circle = new THREE.Mesh(geometry, material);
    circle.position.set(-80, alturaExtra, -90);
    circle.rotateX(Math.PI / 2);
    circle.receiveShadow = false;
    circle.name = "MUAC";
    scene.add(circle);
    meshPlacaEspacioCultural.push(circle);

    /**
     * Placa Explanada
     */
    var circle = new THREE.Mesh(geometry, material);
    circle.position.set(-80, alturaExtra, -35);
    circle.rotateX(Math.PI / 2);
    circle.receiveShadow = false;
    circle.castShadow = false;
    circle.name = "ExplanadaEspiga";
    scene.add(circle);
    meshPlacaEspacioCultural.push(circle);

    /**
     * Placa Cines
     */
    var circle = new THREE.Mesh(geometry, material);
    circle.position.set(-75, alturaExtra, 18);
    circle.rotateX(Math.PI / 2);
    circle.receiveShadow = false;
    scene.add(circle);
    meshPlacaEspacioCultural.push(circle);

    /**
     * Sala Carlos Chaves
     */
    var circle = new THREE.Mesh(geometry, material);
    circle.position.set(-30, alturaExtra, 43);
    circle.rotateX(Math.PI / 2);
    circle.receiveShadow = false;
    scene.add(circle);
    meshPlacaEspacioCultural.push(circle);

    /**
     * Sala Miguel Covarruvias
     */
    var circle = new THREE.Mesh(geometry, material);
    circle.position.set(-53, alturaExtra, 78);
    circle.rotateX(Math.PI / 2);
    circle.receiveShadow = false;
    scene.add(circle);
    meshPlacaEspacioCultural.push(circle);

    /**
     * Salón de danza
     */
    var circle = new THREE.Mesh(geometry, material);
    circle.position.set(-47, alturaExtra, 104);
    circle.rotateX(Math.PI / 2);
    circle.receiveShadow = false;
    scene.add(circle);
    meshPlacaEspacioCultural.push(circle);

    /**
     * Sala neza
     */
    var circle = new THREE.Mesh(geometry, material);
    circle.position.set(10, alturaExtra, -40);
    circle.rotateX(Math.PI / 2);
    circle.receiveShadow = false;
    scene.add(circle);
    meshPlacaEspacioCultural.push(circle);

    /**
     * Foro sor juana
     */
    var circle = new THREE.Mesh(geometry, material);
    circle.position.set(13, alturaExtra, 15);
    circle.rotateX(Math.PI / 2);
    circle.receiveShadow = false;
    scene.add(circle);
    meshPlacaEspacioCultural.push(circle);

    /**
     * Teatro Juan Ruiz
     */
    var circle = new THREE.Mesh(geometry, material);
    circle.position.set(12, alturaExtra, 50);
    circle.rotateX(Math.PI / 2);
    circle.receiveShadow = false;
    scene.add(circle);
    meshPlacaEspacioCultural.push(circle);
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
    var map = new THREE.TextureLoader().load(modelName + '/Concrete_Scored_Jointless.jpg');
    map.wrapS = map.wrapT = THREE.RepeatWrapping;
    map.anisotropy = 16;
    var matConcreto = new THREE.MeshStandardMaterial({map: map, side: THREE.SingleSide});

    /**
     * @edit 20-07-24
     * Textura
     */
    var map = new THREE.TextureLoader().load(modelName + '/Polished_Concrete_New.jpg');
    map.wrapS = map.wrapT = THREE.RepeatWrapping;
    map.anisotropy = 16;
    var matConcretoPulido = new THREE.MeshStandardMaterial({map: map, side: THREE.SingleSide});

    /**
     * @edit 20-07-24
     * Textura Cladding_Stucco_White
     */
    var map = new THREE.TextureLoader().load(modelName + '/Cladding_Stucco_White.jpg');
    map.wrapS = map.wrapT = THREE.RepeatWrapping;
    map.anisotropy = 16;
    var matStucco = new THREE.MeshStandardMaterial({map: map, side: THREE.SingleSide});


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
    var geometry = new THREE.BoxBufferGeometry(44, 13, alturaExtra, 4, 4, 4);
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

function animate() {

    requestAnimationFrame(animate);

    controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true
    animPlacas();
    render();

}

/**
 * Animar las placas de seleccion
 * @since 20-07-25
 */
function animPlacas() {
    meshPlacaEspacioCultural.forEach(function myFunction(value, index, array) {
        value.lookAt(camera.position);
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
    //renderer = new THREE.WebGLRenderer();
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


    //renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

    document.body.appendChild(renderer.domElement);
}

/**
 * @since 20-07-12
 */
function initControlesOrbitalesDesarrollo() {
    controls = new OrbitControls(camera, renderer.domElement);

    controls.addEventListener('change', render); // call this only in static scenes (i.e., if there is no animation loop)

    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.05;

    controls.screenSpacePanning = false;

    controls.minDistance = 1;
    controls.maxDistance = 400;

    controls.maxPolarAngle = Math.PI;
}


/**
 * @since 20-07-24
 * Malla
 */
function initMalla() {
    var helper = new THREE.GridHelper(286, 286);
    helper.material.opacity = 0.25;
    helper.material.transparent = true;
    scene.add(helper);
}

/**
 * @edit 20-07-25
 * Círuclo simple
 */
function initPisoCircular() {

    var geometry = new THREE.CircleBufferGeometry(300, 20);
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
    //console.log("click");

    event.preventDefault();
    //mouse.x = (event.clientX / renderer.domElement.width) * 2 - 1;
    //mouse.y = (event.clientY / renderer.domElement.height) * 2 - 1;
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObjects(meshPlacaEspacioCultural);
    //console.log("intersects.length:"+intersects.length);
    //var color = Math.random() * 0xffffff;
    if (intersects.length > 0) {
        if (intersects[0].object.name) {
            this.name = intersects[0].object.name;
            window.parent.postMessage(this.name, 'http://dvlp.d');
        }
        switch (intersects[0].object.name) {
            case "Piso":
                break;
            case "ExplanadaEspiga":
                this.name = intersects[0].object.name;
                //window.parent.postMessage(this.name, 'http://dvlp.d');
                break;
            default:
                //intersects[0].object.material.color.setHex(color);
                //this.temp = intersects[0].object.material.color.getHexString();
                this.name = intersects[0].object.name;
                console.log(this.name);

                //doc.functionTest(intersects[0].object.name);
                //var modalBody = doc.getElementsByClassName("modal-body"); 
                //modalBody.innerHTML = "<p>"+intersects[0].object.name+"</p>";
                //window.parent.postMessage(this.name, 'http://dvlp.d');
                //$("#SingleModal .modal-body").html("<p>"+intersects[0].object.name+"</p>");
                //$('#SingleModal').modal('show');
                //var modalById = doc.getElementById("SingleModal");
                //modalById.modal('show');
                break;
        }
    }
}