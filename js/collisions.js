/**
 * PhisiJs demo for "Let's Get Physical (with WebGL)" - 30 September 2015
 * (c) 2015 www.3dweb.cc
 * @author Pietro Grandi
 */

// put the variables you want to access from the console here
var container, renderer, scene, camera;

function startScene() {
    'use strict';

    Physijs.scripts.worker = '/js/lib/physis_worker.js';
    Physijs.scripts.ammo = '/js/lib/ammo.js';

    // boilerplate
    container = document.getElementById('theContainer');

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xaabbff);
    renderer.setSize(640, 480);

    scene = new Physijs.Scene();
    scene.setGravity(new THREE.Vector3( 0, -30, 0 ));
    scene.addEventListener(
		'update',
		function()
        {
			scene.simulate( undefined, 1 );
console.log('funzionooo');
			physics_stats.update();
		}
	);

    camera = new THREE.PerspectiveCamera(50, 640 / 480, 0.1, 8000);
    camera.position.set(0, 0, 40);

    container.appendChild(renderer.domElement);
        
    // warmer light from upper right
    var theLight1 = new THREE.DirectionalLight(0xffdddd, 1);
    theLight1.position.set(10, 10, 20);
    scene.add(theLight1);
    
    // colder light from upper left
    var theLight2 = new THREE.DirectionalLight(0xddddff, 0.7);
    theLight2.position.set(10, 10, -20);
    scene.add(theLight2);

    var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
    var material = new THREE.MeshLambertMaterial(
        {
            color: 0xff4488
        }
    );
    var physijsMaterial = Physijs.createMaterial(
        material,
        0.6, // high friction
        0.3 // low restitution
    );

    var mesh = new Physijs.BoxMesh( cubeGeometry, physijsMaterial );

    scene.add(mesh);

    scene.simulate();

    function animate()
    {

        renderer.render(scene, camera);

        requestAnimationFrame(animate);

    }

    animate();

}