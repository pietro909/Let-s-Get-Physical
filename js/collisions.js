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

    var size = 4;
    letters = buildText('3DWeb.cc');

    var posX = -size * (letters.length / 2);
    
    letters.map(function(letter, index) {
        scene.add(letter);/*
        letter.position.set(
            posX + (size * index) + 10,
            0,
            0
        );*/
    });
    
    scene.simulate();

    function random()
    {
        var result = '';

        while (result.length < 2)
        {
            result = (Math.round(Math.random()*1000).toString().slice(0,2))
        }

        return result; 
    }

    function buildText(text)
    {
        var letters = text.split('').map(function(letter, index) {
            var material = new THREE.MeshLambertMaterial(
                {
                    color: ('#FF' + random() + random() )
                }
            );
            
            var physijsMaterial = Physijs.createMaterial(
                material,
                0.6, // high friction
                0.3 // low restitution
            );
                
            var letterGeometry = new THREE.BoxGeometry(
                size, size, size
            ); /*.TextGeometry(
                letter,
                {
                    size : 2,
                    height: 1
                }
            );*/

            var letterMesh = new Physijs.BoxMesh( letterGeometry, physijsMaterial );

            return letterMesh;
        });

        return letters;
    }

    function animate()
    {

        scene.simulate();
        
        renderer.render(scene, camera);

        requestAnimationFrame(animate);

    }

    animate();

}
