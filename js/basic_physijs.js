/**
 * PhisiJs demo for "Let's Get Physical (with WebGL)" - 30 September 2015
 * (c) 2015 www.3dweb.cc
 * @author Pietro Grandi
 */

// put the variables you want to access from the console here
var container, renderer, scene, camera, letters;

function startScene() {
    'use strict';

    Physijs.scripts.worker = '/js/lib/physijs_worker.js';
    Physijs.scripts.ammo = '/js/lib/ammo.js';

    // boilerplate
    container = document.getElementById('theContainer');

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xaabbff);
    renderer.setSize(640, 480);

    scene = new Physijs.Scene();
    scene.setGravity(new THREE.Vector3( 0, -30, 0 ));

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
   
    var material = new THREE.MeshLambertMaterial(
        {
            color: 0xff5555
        }
    );
          
    var cubeGeometry = new THREE.BoxGeometry(6,6,6);

    var cubeMesh = new Physijs.BoxMesh(
        cubeGeometry,
        Physijs.createMaterial(
            material,
            1.2, // high friction
            0.3 // low restitution
        )
    );

    scene.add( cubeMesh );

    function animate()
    {
        
        scene.simulate();
        
        renderer.render(scene, camera);

        requestAnimationFrame(animate);

    }

    animate();

}
