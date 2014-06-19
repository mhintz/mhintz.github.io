var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
var APP = {};

document.addEventListener("DOMContentLoaded", init);

function init() {
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setFaceCulling(THREE.CullFaceFront, THREE.FrontFaceDirectionCW);

	document.body.appendChild(renderer.domElement);

	APP.skyBox = createCube(100, 100, 100, basicMaterial(randColor()));

	APP.newCube = createCube(1, 1, 1, basicMaterial(randColor()));

	camera.position.z = 5;

	render();
}

function update() {
	APP.newCube.rotation.x += 0.1;
	APP.newCube.rotation.y += 0.1;
	APP.newCube.rotation.z += 0.1;
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