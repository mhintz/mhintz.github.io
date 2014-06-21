var APP = {};
var SKY_SIZE = 1000;
var CUBE_SIZE = 25;

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, SKY_SIZE * 1.25);
var renderer = new THREE.WebGLRenderer();

var centerX, centerY;
var mouseX, mouseY;

document.addEventListener("DOMContentLoaded", init);

function init() {
	renderer.sortObjects = false;
	renderer.autoClear = false;
	renderer.setSize(window.innerWidth, window.innerHeight);
//	renderer.setFaceCulling(THREE.CullFaceFront, THREE.FrontFaceDirectionCW);

	document.body.appendChild(renderer.domElement);

	centerX = window.innerWidth / 2;
	centerY = window.innerHeight / 2;

	mouseX = centerX;
	mouseY = centerY;

	APP.cubes = [];

	var material, cube;
	for (var i = 0, l = 100; i < l; i++) {
		material = basicMaterial(randColor());
		cube = createCube(CUBE_SIZE, CUBE_SIZE, CUBE_SIZE, material);
		cube.position.x = rand(SKY_SIZE) - SKY_SIZE / 2;
		cube.position.y = rand(SKY_SIZE) - SKY_SIZE / 2;
		cube.position.z = rand(SKY_SIZE) - SKY_SIZE / 2;
		APP.cubes.push(cube);
	}

	setupSkyBox();

	camera.position.z = SKY_SIZE / 2 - 100;

	document.addEventListener("mousemove", onDocumentMouseMove, false);
	window.addEventListener("resize", onWindowResize, false);

	render();
}

function update() {
	var cube;
	for (var i = 0, l = APP.cubes.length; i < l; i++) {
		cube = APP.cubes[i];
		cube.rotation.x += 0.1;
		cube.rotation.y += 0.1;
		cube.rotation.z += 0.1;
	}

	camera.rotation.y = -(mouseX / centerX) * Math.PI;
	camera.rotation.x = -(mouseY / centerY) * Math.PI;
}

function render() {
	requestAnimationFrame(render);
	update();
	renderer.render(scene, camera);
}

function createCube(w, h, d, material) {
	var geom = new THREE.CubeGeometry(w, h, d),
		cube = new THREE.Mesh(geom, material);
	scene.add(cube);
	return cube;
}

function basicMaterial(color) {
	var material = new THREE.MeshBasicMaterial({
		color: color
	});
	return material;
}

function randColor() {
	var r = Math.round(Math.random() * 255),
		g = Math.round(Math.random() * 255),
		b = Math.round(Math.random() * 255);
	return new THREE.Color("rgb("+r+","+g+","+b+")");
}

function setupSkyBox() {
	var textureCube = THREE.ImageUtils.loadTextureCube(SKYBOX_URLS);
	var shader = THREE.ShaderLib["cube"];

	shader.uniforms["tCube"].value = textureCube;

	var material = new THREE.ShaderMaterial({
		fragmentShader: shader.fragmentShader,
		vertexShader: shader.vertexShader,
		uniforms: shader.uniforms,
		depthWrite: false,
		side: THREE.BackSide
	});

	var skyboxGeom = new THREE.CubeGeometry(SKY_SIZE, SKY_SIZE, SKY_SIZE);
	APP.skyBox = new THREE.Mesh(skyboxGeom, material);
	scene.add(APP.skyBox);
}

function rand(num) {
	return Math.random() * num;
}

function onWindowResize() {
	centerX = window.innerWidth / 2,
	centerY = window.innerHeight / 2,

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove( event ) {
	mouseX = event.clientX - centerX;
	mouseY = event.clientY - centerY;
}

var SKYBOX_URL_ROOT = "lib/img/",
	SKYBOX_URL_MIDS = ["xpos", "xneg", "ypos", "yneg", "zpos", "zneg"],
	SKYBOX_URL_END = ".jpg",
	SKYBOX_URLS = SKYBOX_URL_MIDS.map(function(name) {
		return SKYBOX_URL_ROOT+name+SKYBOX_URL_END;
	});

