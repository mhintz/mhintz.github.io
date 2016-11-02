var PI = Math.PI;
var TWO_PI = 2 * Math.PI;

var Const = {
	SKY_SIZE: 1000,
	CUBE_SIZE: 40,
	NUM_CUBES: 100,
	SBX_ROOT: "lib/img/",
	SBX_MIDS: ["xneg", "xpos", "ypos", "yneg", "zpos", "zneg"],
	SBX_END: ".jpg",
	NEBULA_URL: "lib/hubble_el_gordo.jpg"
};

Const.SKYBOX_TEXTURES = Const.SBX_MIDS.map(function(name) {
	return Const.SBX_ROOT+name+Const.SBX_END;
});

var shouldRender = true;

var APP = APP || {};

APP.main = (function() {
	document.addEventListener("DOMContentLoaded", setup);

	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, Const.SKY_SIZE * 3);
	var renderer = new THREE.WebGLRenderer();

	var webCamTexture;

	function setup() {
		renderer.sortObjects = false;
		renderer.autoClear = false;
		renderer.setSize(window.innerWidth, window.innerHeight);

		$(".canvasContainer").appendChild(renderer.domElement);

		camera.position.z = Const.SKY_SIZE / 2 - 50;
		camera.rotation.order = "YXZ";

		APP.controls = new APP.Controls();

		APP.cubes = new APP.Cubes({
			scene: scene
		});

		var material, cube;
		for (var i = 0, l = Const.NUM_CUBES; i < l; i++) {
			material = APP.cubes.basicMaterial(randColor());
			cube = APP.cubes.createCube(Const.CUBE_SIZE, Const.CUBE_SIZE, Const.CUBE_SIZE, material);
			positionCube(cube);
		}

		setupSkyBox();

		window.addEventListener("resize", onWindowResize, false);

		$(".toggleCamera").addEventListener("click", onCameraToggle, false);
		$("#fileInput").addEventListener("change", onLoadFile, false);

		requestAnimationFrame(draw);
	}

	var lastMSec = null;
	function update(nowMSec) {
		// y > x and x > y not a typo
		camera.rotation.y = APP.controls.rotationX();
		camera.rotation.x = APP.controls.rotationY();

		if (webCamTexture) {
			lastMSec = lastMSec || nowMSec - 1000 / 60;
			var deltaMsec = Math.min(200, nowMSec - lastMSec);
			lastMSec = nowMSec;
			webCamTexture.update(deltaMsec/1000, nowMSec/1000);
		}
	}

	function draw(nowMSec) {
		if (shouldRender) requestAnimationFrame(draw);

		update(nowMSec);
		renderer.render(scene, camera);
	}

	function setupSkyBox() {
// create a skybox (using a sphere) and add it to the scene

// in comments is an alternate version that uses an actual cube for the skybox
/*		var textureCube = THREE.ImageUtils.loadTextureCube(Const.SKYBOX_TEXTURES);
		var shader = THREE.ShaderLib["cube"];

		shader.uniforms["tCube"].value = textureCube;

		var material = new THREE.ShaderMaterial({
			fragmentShader: shader.fragmentShader,
			vertexShader: shader.vertexShader,
			uniforms: shader.uniforms,
			depthWrite: false,
			side: THREE.BackSide
		});

		var skyboxGeom = new THREE.BoxGeometry(Const.SKY_SIZE, Const.SKY_SIZE, Const.SKY_SIZE);
*/
		
		var texture = THREE.ImageUtils.loadTexture(Const.NEBULA_URL);
		var material = new THREE.MeshBasicMaterial({
			map: texture,
			side: THREE.BackSide
		});
		var skyboxGeom = new THREE.SphereGeometry(Const.SKY_SIZE, 32, 32);

		APP.SKY_BOX = new THREE.Mesh(skyboxGeom, material);
		scene.add(APP.SKY_BOX);
	}

	function onWindowResize() {
		APP.controls.updateCenter();

		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize(window.innerWidth, window.innerHeight);
	}

	function onCameraToggle() {
		webCamTexture = new THREEx.WebcamTexture();
		var material = new THREE.MeshBasicMaterial({
			map: webCamTexture.texture
		});
		APP.cubes.applyCubeMaterial(material);
	}

	function onLoadFile() {
		var file = $("#fileInput").files[0],
			url = URL.createObjectURL(file),
			material = new THREE.MeshBasicMaterial({
				map: THREE.ImageUtils.loadTexture(url)
			});
		APP.cubes.applyCubeMaterial(material);
	}

	function positionCube(cube) {
		var cubeRad = rand(0, Const.SKY_SIZE);
		cube.position.x = Math.cos(rand(0, TWO_PI)) * cubeRad;
		cube.position.y = Math.cos(rand(0, TWO_PI)) * cubeRad;
		cube.position.z = Math.cos(rand(0, TWO_PI)) * cubeRad;
		cube.rotation.x = rand(-PI, PI);
		cube.rotation.y = rand(-PI, PI);
		cube.rotation.z = rand(-PI, PI);
	}

	return self;
})();

function play() {
	shouldRender = true;
}

function stop() {
	shouldRender = false;
}

function $(selector) {
	return document.querySelectorAll(selector)[0];
}

function randColor() {
	var r = Math.round(Math.random() * 255),
		g = Math.round(Math.random() * 255),
		b = Math.round(Math.random() * 255);
	return new THREE.Color("rgb("+r+","+g+","+b+")");
}

function rand(min, max) {
	return min + (Math.random() * (max - min));
}

