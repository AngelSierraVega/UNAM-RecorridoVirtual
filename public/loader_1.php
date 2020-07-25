<?php
/**
 * Prueba de cámaras y modelo. Modelo a escala 1:1. Luz omnidireccional. 
 * @since 20-04-24
 * @edit 20-07-24
 * - 
 */
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <title>three.js webgl - orbit controls</title>
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
                //var INTERSECTED;
                //var radius = 100, theta = 0;

                var ifrm = window.frameElement; // reference to iframe element container
                var doc = ifrm.ownerDocument;// reference to container's document
                
                init();
                //render(); // remove when using next line for animation loop (requestAnimationFrame)
                animate();

                function init() {

                        scene = new THREE.Scene();
                        scene.background = new THREE.Color( 0xcccccc );
                        /**
                        * Code for hemispheric light
                        * @edit 20-07-15
                        * scene.background = new THREE.Color().setHSL( 0.6, 0, 1 );
                        scene.fog = new THREE.Fog( scene.background, 1, 5000 );
                        */
                        
                        //scene.fog = new THREE.FogExp2( 0xcccccc, 0.001 );

                        renderer = new THREE.WebGLRenderer( { antialias: true } );
                        renderer.setPixelRatio( window.devicePixelRatio );
                        renderer.setSize( window.innerWidth, window.innerHeight );
                        document.body.appendChild( renderer.domElement );

                        camera = new THREE.PerspectiveCamera( 65, window.innerWidth / window.innerHeight, 0.1, 800 );
                        //Camara 01
                        //camera.position.set( 0, 0, 0 );
                        //Camara 02
                       //camera.position.set( 400, 200, 200 );

                        // controls

                        controls = new OrbitControls( camera, renderer.domElement );

                        controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)

                        controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
                        controls.dampingFactor = 0.05;

                        controls.screenSpacePanning = false;

                        controls.minDistance = 1;
                        controls.maxDistance = 1;

                        controls.maxPolarAngle = Math.PI;
				
                                
                                
                                
                        
                        
                        
				

                        // world
                        /*
                        var geometry = new THREE.CylinderBufferGeometry( 0, 10, 30, 4, 1 );
                        var material = new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true } );

                        for ( var i = 0; i < 500; i ++ ) {

                                var mesh = new THREE.Mesh( geometry, material );
                                mesh.position.x = Math.random() * 1600 - 800;
                                mesh.position.y = 0;
                                mesh.position.z = Math.random() * 1600 - 800;
                                mesh.updateMatrix();
                                mesh.matrixAutoUpdate = false;
                                scene.add( mesh );

                        }
                        */
				
                                let modelName = 'ModeloCentrado_DF';
                                //this._reportProgress( { detail: { text: 'Loading: ' + modelName } } );


                                //let scope = this;
                                let objLoader2 = new OBJLoader2();
                                let callbackOnLoad = function ( object3d ) {
                                        object3d.receiveShadow = false;
                                        scene.add( object3d );
//                                         object3d.matrix.setPosition( 1000,1000,1000 );
                                        //NECESARIO PORQUE EL MODELO NO ESTA CENTRADO
                                        //object3d.scale.set(7,7,7);
                                         //object3d.position.set(-120*7,-10,225*7);
                                         
//                                         object3d.updateMatrix();
                                        console.log( 'Loading complete: ' + modelName );
                                        scene.traverse(function(children){
                                                objects.push(children);
                                                //console.log("children.name:"+children.name);
                                        });
                                        //scope._reportProgress( { detail: { text: '' } } );
                                };

                                let onLoadMtl = function ( mtlParseResult ) {
                                        objLoader2.setModelName( modelName );
                                        objLoader2.setLogging( true, true );
                                        objLoader2.addMaterials( MtlObjBridge.addMaterialsFromMtlLoader( mtlParseResult ), true );
                                        objLoader2.load( modelName+'.obj', callbackOnLoad, null, null, null );
                                       
                                };
                                let mtlLoader = new MTLLoader();
                                mtlLoader.load( modelName+'.mtl', onLoadMtl );
                                
                        
                        /**
                         * @edit 20-07-04
                         * Plano simple
                         */
                        var geometry = new THREE.PlaneBufferGeometry( 2050, 2100, 32, 32 );
                        var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
                        var plane = new THREE.Mesh( geometry, material );
                        plane.position.set( 225, 0, 50 );
                        plane.rotateX( Math.PI/2 );
                        //scene.add( plane );
                        
                        /**
                         * @edit 20-07-04
                         * Malla
                         */
                        var helper = new THREE.GridHelper( 286, 286 );
			//helper.position.z = 50;
                        //helper.position.set( 225, 100, 50 );
			helper.material.opacity = 0.25;
			helper.material.transparent = true;
			scene.add( helper );

                        //object = new THREE.Mesh( new THREE.PlaneBufferGeometry( 100, 100, 4, 4 ), material );
                        //object2 = new THREE.Mesh( new THREE.PlaneBufferGeometry( 100, 100, 4, 4 ));
			//object.position.set( - 300, 0, 0 );
			//scene.add( object );
					
					
                        // raycaster
                                
                        raycaster = new THREE.Raycaster();
                        mouse = new THREE.Vector2();
				
                        //document.addEventListener('mousedown',onDocumentMouseDown,false);	
                        //document.addEventListener( 'mousemove', onDocumentMouseMove, false );
                        
                        // lights
                        var light = new THREE.AmbientLight( 0xffffff );
                        scene.add( light );

                        window.addEventListener( 'resize', onWindowResize, false );

                }

                function onWindowResize() {

                        camera.aspect = window.innerWidth / window.innerHeight;
                        camera.updateProjectionMatrix();

                        renderer.setSize( window.innerWidth, window.innerHeight );

                }

                function animate() {

                        requestAnimationFrame( animate );

                        controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true

                        render();

                }

                function render() {

                        renderer.render( scene, camera );

                }
			
                function onDocumentMouseDown(event){
                        //console.log("click");
                                
                        event.preventDefault();
                        //mouse.x = (event.clientX / renderer.domElement.width) * 2 - 1;
                        //mouse.y = (event.clientY / renderer.domElement.height) * 2 - 1;
                        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
                        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
				
                        raycaster.setFromCamera(mouse,camera);
				
                        var intersects = raycaster.intersectObjects(objects);
                        //console.log("intersects.length:"+intersects.length);
                        var color = Math.random() * 0xffffff;
                        if(intersects.length > 0){
                                switch(intersects[0].object.name){
                                    case "Piso":break;
                                    default: 
                                        intersects[0].object.material.color.setHex(color);
                                        this.temp = intersects[0].object.material.color.getHexString();
                                        this.name = intersects[0].object.name;
                                        //console.log(this.name);
                                        //doc.functionTest(intersects[0].object.name);
                                        //var modalBody = doc.getElementsByClassName("modal-body"); 
                                        //modalBody.innerHTML = "<p>"+intersects[0].object.name+"</p>";
                                        window.parent.postMessage(this.name, 'http://dvlp.d');
                                        //$("#SingleModal .modal-body").html("<p>"+intersects[0].object.name+"</p>");
                                        //$('#SingleModal').modal('show');
                                        //var modalById = doc.getElementById("SingleModal");
                                        //modalById.modal('show');
                                        break;
                                }	
                        }
                }
                        
                function onDocumentMouseMoveDPR( event ) {

                        event.preventDefault();

                        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
                        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

                }

                

        </script>

    </body>
</html>