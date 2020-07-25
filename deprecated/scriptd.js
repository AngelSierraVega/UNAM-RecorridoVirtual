/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */




                var camera, controls, scene, renderer;
			
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
                        //scene.fog = new THREE.FogExp2( 0xcccccc, 0.001 );

                        renderer = new THREE.WebGLRenderer( { antialias: true } );
                        renderer.setPixelRatio( window.devicePixelRatio );
                        renderer.setSize( window.innerWidth, window.innerHeight );
                        document.body.appendChild( renderer.domElement );

                        camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 2000 );
                        camera.position.set( 400, 200, 0 );

                        // controls

                        controls = new OrbitControls( camera, renderer.domElement );

                        controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)

                        controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
                        controls.dampingFactor = 0.05;

                        controls.screenSpacePanning = false;

                        controls.minDistance = 100;
                        controls.maxDistance = 1500;

                        controls.maxPolarAngle = Math.PI / 2;
				
				

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
				
                                let modelName = 'FINAL';
                                //this._reportProgress( { detail: { text: 'Loading: ' + modelName } } );


                                //let scope = this;
                                let objLoader2 = new OBJLoader2();
                                let callbackOnLoad = function ( object3d ) {
                                        scene.add( object3d );
//                                         object3d.matrix.setPosition( 1000,1000,1000 );
                                        object3d.scale.set(7,7,7);
                                         object3d.position.set(-120*7,-10,225*7);
                                         
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
					
					
                        // raycaster
                                
                        raycaster = new THREE.Raycaster();
                        mouse = new THREE.Vector2();
				
                        //document.addEventListener('mousedown',onDocumentMouseDown,false);	
                        //document.addEventListener( 'mousemove', onDocumentMouseMove, false );
                        
                        // lights

                        var light = new THREE.DirectionalLight( 0xffffff,0.9 );
                        light.position.set( 0, 100, 0 );
                        scene.add( light );

                        //var light = new THREE.DirectionalLight( 0xffffff );
                        //light.position.set( 200, 200, 200 );
                        //scene.add( light );

                        //var light = new THREE.AmbientLight( 0x222222 );
                        //scene.add( light );
                        
                        //var light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
                        //scene.add( light );

                        //

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