var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer;
var APP = {};
var SKY_SIZE = 1000;

document.addEventListener("DOMContentLoaded", init);

function init() {
	renderer = new THREE.WebGLRenderer();
	renderer.sortObjects = false;
	renderer.autoClear = false;
	renderer.setSize(window.innerWidth, window.innerHeight);
//	renderer.setFaceCulling(THREE.CullFaceFront, THREE.FrontFaceDirectionCW);

	document.body.appendChild(renderer.domElement);

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

function setupSkyBox() {
	var textureCube = THREE.ImageUtils.loadTextureCube(SKYBOX_URLS, new THREE.UVMapping()),
		shader = THREE.ShaderUtils.lib.cube,
		uniforms = THREE.UniformsUtils.clone(shader.uniforms);

	uniforms.tCube.texture = textureCube;

	var material = new THREE.MeshShaderMaterial({
		fragmentShader: shader.fragmentShader,
		vertexShader: shader.vertexShader,
		uniforms: uniforms
	}),
	skyboxGeom = new THREE.CubeGeometry(SKY_SIZE, SKY_SIZE, SKY_SIZE);
	APP.skyBox = new THREE.Mesh(skyboxGeom, material);
	scene.addObject(APP.skyBox);
}

var SKYBOX_URL_ROOT = "lib/img/",
	SKYBOX_URL_MIDS = ["posx", "negx", "posy", "negy", "posz", "negz"],
	SKYBOX_URL_END = ".jpg",
	SKYBOX_URLS = SKYBOX_URL_MIDS.map(function(name) {
		return SKYBOX_URL_ROOT+name+SKYBOX_URL_END;
	});

