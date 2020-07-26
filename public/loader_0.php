<?php
/**
 * Modelo dummie. Luz omnidireccional. 
 * @since 20-04-24
 * @edit 20-07-24
 * - 
 */

?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Modelo dummie. Luz omnidireccional. </title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
        <link type="text/css" rel="stylesheet" href="main.css">
        <style>
            body {
                background-color: #ccc;
                color: #000;
            }
            a {
                color: #f00;
            }
        </style>
    </head>

    <body>
        <div id="info">
            <a href="https://facebook.com/InnovaINDIE" target="_blank" rel="noopener">Innova INDIE</a> - demo recorrido virtual
        </div>

        <script type="module">
            
                const modelName = 'ModeloCentrado_SF';
                
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

                var camera, controls, scene, renderer;
                
                
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
                
                
                

                function init() {
                        initEscena();
                        /**
                         * Camara
                         */
                        //initCamaraTop();
                        initCamaraDefault();
                        /**
                         * Controles
                         */
                        initControlesOrbitales();
                        /**
                         * Mundo
                         */
                        //initPisoCircular();
                        //initPlacasEspaciosCulturales();
                        //initMalla()
                        initDummies();
                        //initModeloFinal();
                        /**
                         * Iluminación
                         */
                        //initIluminacionSimple();
                        //initLuzDireccionalPrimaria();
                        //initLuzPuntualPrimaria();
                        initLuzFocalPrimaria();
                        window.addEventListener( 'resize', onWindowResize, false );

                }
                
                /**
                 * @since 20-06-18
                 */
                function initModeloFinal(){
                    let objLoader2 = new OBJLoader2();
                                let callbackOnLoad = function ( object3d ) {
                                   // if ( object3d.material ) object3d.material = new THREE.MeshBasicMaterial();
                                        //object3d.receiveShadow = true;
                                        //object3d.castShadow = true;
                                        
                                        object3d.traverse( child => {

                                            //if ( child.material ) child.material = new THREE.MeshStandardMaterial();
                                            child.receiveShadow = true;
                                            child.castShadow = true;
                                        } );
                                        
                                        scene.add( object3d );
                                        //NECESARIO PORQUE EL MODELO NO ESTA CENTRADO
                                        //object3d.scale.set(7,7,7);
                                         //object3d.position.set(-120*7,-10,225*7);
                                         
//                                         object3d.updateMatrix();
                                        console.log( 'Loading complete: ' + modelName );
                                        
                                        //scope._reportProgress( { detail: { text: '' } } );
                                };

                                let onLoadMtl = function ( mtlParseResult ) {
                                        objLoader2.setModelName( modelName );
                                        objLoader2.setLogging( false, false );
                                        objLoader2.addMaterials( MtlObjBridge.addMaterialsFromMtlLoader( mtlParseResult ), true );
                                        objLoader2.load( modelName+'.obj', callbackOnLoad, null, null, null );
//                                        scene.traverse(function(children){
//                                                objects.push(children);
//                                        });
                                       
                                };
                                let mtlLoader = new MTLLoader();
                                mtlLoader.setMaterialOptions({side: THREE.DoubleSide});
                                mtlLoader.load( modelName+'.mtl', onLoadMtl );
                }
                
                
                /**
                 * @since 20-07-26
                 */
                function initLuzFocalPrimaria(){
                    var light = new THREE.SpotLight( 0xffffff );
                    light.position.set( 0, 100, 0 );
                    scene.add( light );
                    light.castShadow = true;
                    light.angle = Math.PI/2.6;
                    light.penumbra = 0.5;
                    var dirLightHeper = new THREE.SpotLightHelper( light, 3 );
                    scene.add( dirLightHeper );
                      
                    //Set up shadow properties for the light
                    light.shadow.mapSize.width = 512*2;  // default
                    light.shadow.mapSize.height = 512*2; // default
                    light.shadow.camera.near = 30;    // default
                    light.shadow.camera.far = 300;     // default
                    //light.shadow.camera.fov = 10;
                }
                
                /**
                 * @since 20-07-26
                 */
                function initLuzPuntualPrimaria(){
                    //var light = new THREE.PointLight( 0xffffff, 1, 100 );
                    var light = new THREE.PointLight( 0xffffff,1);
                    light.position.set( 0, 100, 0 );
                        scene.add( light );
                        light.castShadow = true;
                        var dirLightHeper = new THREE.PointLightHelper( light, 3 );
                        scene.add( dirLightHeper );
                        
                        //Set up shadow properties for the light
                        light.shadow.mapSize.width = 512*2;  // default
                        light.shadow.mapSize.height = 512*2; // default
                        light.shadow.camera.near = 20;    // default
                        light.shadow.camera.far = 300;     // default
                }
                
                /**
                 * @since 20-07-11
                 */
                function initLuzDireccionalPrimaria(){
                   //var light = new THREE.DirectionalLight( 0xffffff,1,100);
                   var light = new THREE.DirectionalLight( 0xffffff,1);
                        light.position.set(1, 30, 1);
                        scene.add( light );
                        light.castShadow = true;
                        var dirLightHeper = new THREE.DirectionalLightHelper( light, 3 );
                        scene.add( dirLightHeper );
                        
                        //Set up shadow properties for the light
                        light.shadow.mapSize.width = 512;  // default
                        light.shadow.mapSize.height = 512; // default
                        light.shadow.camera.near = 10;    // default
                        light.shadow.camera.far = 50;     // default
                }
                
                /**
                 * 
                 * @since 20-06-05
                 */
                function initIluminacionSimple(){
                    // lights
                    var light = new THREE.AmbientLight( 0xffffff );
                    scene.add( light );
                }
                
                /**
                 * @since 19-07-25
                 * @link https://threejs.org/docs/#api/en/geometries/CircleBufferGeometry
                 */
                function initPlacasEspaciosCulturales(){
                    
                    var geometry = new THREE.CircleBufferGeometry( 8, 16);
                    //var material = new THREE.MeshStandardMaterial( {color: "gold", side: THREE.DoubleSide} );
                    var material = new THREE.MeshStandardMaterial( {color: "gold"} );
                   /**
                    * Placa MUAC
                    */
                    var circle = new THREE.Mesh( geometry, material );
                    circle.position.set( -80, 30, -90 );
                    circle.rotateX( Math.PI/2 );
                    circle.receiveShadow = false;
                    scene.add( circle );
                    meshPlacaEspacioCultural.push(circle);
                    
                    /**
                    * Placa Explanada
                    */
                    var circle = new THREE.Mesh( geometry, material );
                    circle.position.set( -80, 30, -35 );
                    circle.rotateX( Math.PI/2 );
                    circle.receiveShadow = false;
                    circle.castShadow = false;
                    scene.add( circle );
                    meshPlacaEspacioCultural.push(circle);
                    
                    /**
                    * Placa Cines
                    */
                    var circle = new THREE.Mesh( geometry, material );
                    circle.position.set( -75, 30, 18 );
                    circle.rotateX( Math.PI/2 );
                    circle.receiveShadow = false;
                    scene.add( circle );
                    meshPlacaEspacioCultural.push(circle);
                    
                    /**
                    * Sala Carlos Chaves
                    */
                    var circle = new THREE.Mesh( geometry, material );
                    circle.position.set( -30, 30, 43 );
                    circle.rotateX( Math.PI/2 );
                    circle.receiveShadow = false;
                    scene.add( circle );
                    meshPlacaEspacioCultural.push(circle);
                    
                    /**
                    * Sala Miguel Covarruvias
                    */
                    var circle = new THREE.Mesh( geometry, material );
                    circle.position.set( -53, 30, 78 );
                    circle.rotateX( Math.PI/2 );
                    circle.receiveShadow = false;
                    scene.add( circle );
                    meshPlacaEspacioCultural.push(circle);
                    
                    /**
                    * Salón de danza
                    */
                    var circle = new THREE.Mesh( geometry, material );
                    circle.position.set( -47, 30, 104 );
                    circle.rotateX( Math.PI/2 );
                    circle.receiveShadow = false;
                    scene.add( circle );
                    meshPlacaEspacioCultural.push(circle);
                    
                    /**
                    * Sala neza
                    */
                    var circle = new THREE.Mesh( geometry, material );
                    circle.position.set( 10, 30, -40 );
                    circle.rotateX( Math.PI/2 );
                    circle.receiveShadow = false;
                    scene.add( circle );
                    meshPlacaEspacioCultural.push(circle);
                    
                    /**
                    * Foro sor juana
                    */
                    var circle = new THREE.Mesh( geometry, material );
                    circle.position.set( 13, 30, 15 );
                    circle.rotateX( Math.PI/2 );
                    circle.receiveShadow = false;
                    scene.add( circle );
                    meshPlacaEspacioCultural.push(circle);
                    
                    /**
                    * Teatro Juan Ruiz
                    */
                    var circle = new THREE.Mesh( geometry, material );
                    circle.position.set( 12, 30, 50 );
                    circle.rotateX( Math.PI/2 );
                    circle.receiveShadow = false;
                    scene.add( circle );
                    meshPlacaEspacioCultural.push(circle);
                }
                
                /**
                 * @since 19-07-25
                 */
                function initDummies(){
                    
                    var geometry = new THREE.PlaneBufferGeometry( 300, 300);
                        //var material = new THREE.MeshStandardMaterial( {color: "darkolivegreen", side: THREE.DoubleSide} );
                        var material = new THREE.MeshStandardMaterial( {color: "darkolivegreen"} );
                        //var material = new THREE.MeshStandardMaterial( { color: "darkolivegreen" } );
                        var circle = new THREE.Mesh( geometry, material );
                        circle.position.set( 0, -5, 0 );
                        circle.rotateX( Math.PI/-2 );
                        //circle.castShadow = true;
                        circle.receiveShadow = true;
                        //circle.receiveShadow = false;
                        scene.add( circle );
                        
                    /**
                         * @edit 20-07-24
                         * Textura
                         */
                        var map = new THREE.TextureLoader().load( modelName+'/Concrete_Scored_Jointless.jpg' );
                        map.wrapS = map.wrapT = THREE.RepeatWrapping;
                        map.anisotropy = 16;
                        var matConcreto = new THREE.MeshStandardMaterial( { map: map, side: THREE.SingleSide } );
                        
                        /**
                         * @edit 20-07-24
                         * Textura
                         */
                        var map = new THREE.TextureLoader().load( modelName+'/Polished_Concrete_New.jpg' );
                        map.wrapS = map.wrapT = THREE.RepeatWrapping;
                        map.anisotropy = 16;
                        var matConcretoPulido = new THREE.MeshStandardMaterial( { map: map, side: THREE.SingleSide } );
                        
                        /**
                         * @edit 20-07-24
                         * Textura Cladding_Stucco_White
                         */
                        var map = new THREE.TextureLoader().load( modelName+'/Cladding_Stucco_White.jpg' );
                        map.wrapS = map.wrapT = THREE.RepeatWrapping;
                        map.anisotropy = 16;
                        var matStucco = new THREE.MeshStandardMaterial( { map: map, side: THREE.SingleSide } );
                        
                        
                        var sphereGeometry = new THREE.SphereBufferGeometry( 5, 32, 32 );
                    var sphere = new THREE.Mesh( sphereGeometry, matConcreto );
                    sphere.castShadow = true; //default is false
                    sphere.receiveShadow = true; //default
                    scene.add( sphere );

                    var sphereGeometry = new THREE.SphereBufferGeometry( 5, 32, 32 );
                    var sphere = new THREE.Mesh( sphereGeometry, matConcretoPulido );
                    sphere.castShadow = true; //default is false
                    sphere.receiveShadow = true; //default
                    sphere.position.set(0,20,3);
                    //scene.add( sphere );
                    

                        /**
                         * @edit 20-07-24
                         * Dummie muac
                         */
                        var geometry = new THREE.BoxBufferGeometry( 100, 20, 80, 4, 4, 4 );
                        var dummie_muac = new THREE.Mesh( geometry, matStucco );
                        dummie_muac.position.set( -80, 0, -90 );
                        dummie_muac.receiveShadow = true;
                        dummie_muac.castShadow = true;
                        scene.add( dummie_muac );    
                        
                        /**
                         * @edit 20-07-25
                         * Dummie Cines
                         */
                        var geometry = new THREE.BoxBufferGeometry( 44, 13, 30, 4, 4, 4 );
                        var dummie = new THREE.Mesh( geometry, matConcreto );
                        dummie.position.set( -65, 0, 10 );
                        dummie.receiveShadow = true;
                        dummie.castShadow = true;
                        scene.add( dummie );   
                        
                        
                        /**
                         * @edit 20-07-24
                         * Dummie Sor Juana
                         */
                        var geometry = new THREE.BoxBufferGeometry( 30, 10, 44, 4, 4, 4 );
                        var dummie_sj01 = new THREE.Mesh( geometry, matConcreto );
                        dummie_sj01.position.set( 10, 0, 30 );
                        dummie_sj01.receiveShadow = true;
                        dummie_sj01.castShadow = true;
                        scene.add( dummie_sj01 );   
                        var geometry = new THREE.BoxBufferGeometry( 20, 25, 10, 4, 4, 4 );
                        var dummie_sj02 = new THREE.Mesh( geometry, matConcretoPulido );
                        dummie_sj02.position.set( 12, 0, 50 );
                        dummie_sj02.receiveShadow = true;
                        dummie_sj02.castShadow = true;
                        scene.add( dummie_sj02 );  
                }
                
                /**
                 * @since 20-07-25
                 */
                function initCamaraTop(){
                    camera = new THREE.PerspectiveCamera( 25, window.innerWidth / window.innerHeight, 0.1, 800 );
                    camera.position.set( 0, 700, 0 );
                    //var cameraHelper = new THREE.CameraHelper(camera);
                    //scene.add(cameraHelper);
                }
                
                /**
                 * @since 20-06-20
                 */
                function initCamaraDefault(){
                    camera = new THREE.PerspectiveCamera( 65, window.innerWidth / window.innerHeight, 0.1, 800 );
                    //var cameraHelper = new THREE.CameraHelper(camera);
                    //scene.add(cameraHelper);
                }

                function onWindowResize() {

                        camera.aspect = window.innerWidth / window.innerHeight;
                        camera.updateProjectionMatrix();

                        renderer.setSize( window.innerWidth, window.innerHeight );

                }

                function animate() {
 
                        requestAnimationFrame( animate );
                        
                        controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true
                        animPlacas();
                        render();

                }
                
                /**
                 * Animar las placas de seleccion
                 * @since 20-07-25
                 */
                function animPlacas(){
                    meshPlacaEspacioCultural.forEach(function myFunction(value, index, array) {
                        value.lookAt(camera.position);
                      });
                }

                function render() {

                        renderer.render( scene, camera );

                }   
                
                /**
                 * @since 20-07-12
                 */
                function initEscena(){
                    scene = new THREE.Scene();
                        //scene.background = new THREE.Color( 0xcccccc );
                        renderer = new THREE.WebGLRenderer( { antialias: true } );
                        //renderer = new THREE.WebGLRenderer();
                        renderer.setPixelRatio( window.devicePixelRatio );
                        renderer.setSize( window.innerWidth, window.innerHeight );
                        /**
                         * @edit 20-07-25
                         * Sombras
                         */
                        renderer.shadowMap.enabled = true;
                        //renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
                        
                        document.body.appendChild( renderer.domElement );
                }
                
                /**
                 * @since 20-07-12
                 */
                function initControlesOrbitales(){
                    controls = new OrbitControls( camera, renderer.domElement );

                        controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)

                        controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
                        controls.dampingFactor = 0.05;

                        controls.screenSpacePanning = false;

                        controls.minDistance = 10;
                        controls.maxDistance = 800;

                        controls.maxPolarAngle = Math.PI;
                }
                
                /**
                         * @since 20-07-24
                         * Malla
                         */
                function initMalla(){
                        var helper = new THREE.GridHelper( 286, 286 );
                        helper.material.opacity = 0.25;
                        helper.material.transparent = true;
                        scene.add( helper );
                }
                
                /**
                         * @edit 20-07-25
                         * Círuclo simple
                         */
                function initPisoCircular(){
                    
                        var geometry = new THREE.CircleBufferGeometry( 300, 20);
                        //var material = new THREE.MeshStandardMaterial( {color: "darkolivegreen", side: THREE.DoubleSide} );
                        var material = new THREE.MeshStandardMaterial( {color: "darkolivegreen"} );
                        //var material = new THREE.MeshStandardMaterial( { color: "darkolivegreen" } );
                        var circle = new THREE.Mesh( geometry, material );
                        circle.position.set( 0, -5, 0 );
                        circle.rotateX( Math.PI/-2 );
                        //circle.castShadow = true;
                        circle.receiveShadow = true;
                        //circle.receiveShadow = false;
                        scene.add( circle );
                }

        </script>

    </body>
</html>
