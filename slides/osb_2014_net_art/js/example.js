var PI = Math.PI;
var TWO_PI = 2 * Math.PI;

var Const = {
	SKY_SIZE: 1000,
	CUBE_SIZE: 40,
	NUM_CUBES: 100,
	SBX_ROOT: "lib/img/",
	SBX_MIDS: ["xneg", "xpos", "ypos", "yneg", "zpos", "zneg"],
	SBX_END: ".jpg"
};

Const.SKYBOX_TEXTURES = Const.SBX_MIDS.map(function(name) {
	return Const.SBX_ROOT+name+Const.SBX_END;
});

var APP = APP || {};

APP.main = (function() {
	document.addEventListener("DOMContentLoaded", setup);

	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, Const.SKY_SIZE * 1.25);
	var renderer = new THREE.WebGLRenderer();

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
		$(".loadFile").addEventListener("click", onLoadFile, false);

		draw();
	}

	function update() {
		// y > x and x > y not a typo
		camera.rotation.y = APP.controls.rotationX();
		camera.rotation.x = APP.controls.rotationY();
	}

	function draw() {
		requestAnimationFrame(draw);

		update();
		renderer.render(scene, camera);
	}

	function setupSkyBox() {
		var textureCube = THREE.ImageUtils.loadTextureCube(Const.SKYBOX_TEXTURES);
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
		console.log("camera toggle");
	}
	function onLoadFile() {
		console.log("load file");
	}

	function positionCube(cube) {
		cube.position.x = rand(-Const.SKY_SIZE / 2, Const.SKY_SIZE / 2);
		cube.position.y = rand(-Const.SKY_SIZE / 2, Const.SKY_SIZE / 2);
		cube.position.z = rand(-Const.SKY_SIZE / 2, Const.SKY_SIZE / 2);
		cube.rotation.x = rand(-PI, PI);
		cube.rotation.y = rand(-PI, PI);
		cube.rotation.z = rand(-PI, PI);
	}

	return self;
})();

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
	return min + Math.random() * (max - min);
}

