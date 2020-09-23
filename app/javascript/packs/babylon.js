import * as BABYLON from 'babylonjs';
import * as BABYLON_LOADERS from 'babylonjs-loaders';

export function setupBabylon() {

    var canvas = document.getElementById("renderCanvas"); // Get the canvas element

    if (canvas != null) {
        var engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

        /******* Add the create scene function ******/
        var createScene = function () {

            // Create the scene space
            var scene = new BABYLON.Scene(engine);

            // Add a camera to the scene and attach it to the canvas
            var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 4, Math.PI / 3.0, 65, new BABYLON.Vector3(0, -10, 0), scene);
            camera.wheelPrecision = 100000; //Camera scroll speed (lower=faster)
            camera.lowerRadiusLimit = 1;
            camera.allowupsidedown = false;
            camera.attachControl(canvas, true);

            // Add lights to the scene
            var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
            var light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), scene);

            var car;

            function updateTexture(path, mesh) {
              var carMtl = mesh.material;
              var t = new BABYLON.Texture(path, scene)
              t.uScale = 1;
              t.vScale = -1;
              carMtl.albedoTexture = t;
            }

            let skinSelectors = document.querySelectorAll(".skinSelector");
            skinSelectors.forEach(function(skinSelector) {
                skinSelector.ontouchstart =
                skinSelector.onclick = function (event) {
                    console.log(event.target.parentElement);
                    updateTexture(event.target.parentElement.dataset.filepath, car);
                    return false;
                }
            });


            BABYLON.SceneLoader.ImportMesh("", "/glb/", "gp3-1998.glb", scene, function (newMeshes) {
                scene.createDefaultCameraOrLight(true);
                scene.activeCamera.attachControl(canvas, false);
                scene.activeCamera.alpha += Math.PI; // camera +180°

                car = newMeshes[1];

                updateTexture("<%= url_for(@car.car_skin) %>", car);
            });

            return scene;
        };
        /******* End of the create scene function ******/

        var scene = createScene(); //Call the createScene function

        // Register a render loop to repeatedly render the scene
        engine.runRenderLoop(function () {
            scene.render();
        });

        // Watch for browser/canvas resize events
        window.addEventListener("resize", function () {
            engine.resize();
        });

    }
}

window.onload = setupBabylon;