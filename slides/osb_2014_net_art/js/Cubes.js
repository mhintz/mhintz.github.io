var APP = APP || {};

APP.Cubes = function(options) {
	var scene = options.scene;

	var cubes = [];

	this.basicMaterial = function(color) {
		var material = new THREE.MeshBasicMaterial({
			color: color
		});
		return material;
	};

	this.createCube = function(w, h, d, material) {
		var geom = new THREE.BoxGeometry(w, h, d),
			cube = new THREE.Mesh(geom, material);
		cubes.push(cube);
		scene.add(cube);
		return cube;
	};

	this.removeCube = function(cube) {
		var i = cubes.length;
		while (i--) {
			if (cubes[i] === cube) {
				cubes.splice(i, 1);
				scene.remove(cube);
				break;
			}
		}
	};

	this.removeCubeAt = function(i) {
		scene.remove(cubes[i]);
		cubes.splice(i, 1);
	};

	this.clearCubes = function() {
		var cube;
		while (cubes.length) {
			scene.remove(cubes.pop());
		}
	};

	this.applyCubeMaterial = function(material) {
		var i = cubes.length, cube;
		while (i--) {
			cube = new THREE.Mesh(cubes[i].geometry.clone(), material.clone());
			var pos = cubes[i].position.clone();
			cube.rotation.copy(cubes[i].rotation);
			scene.remove(cubes[i]);
			scene.add(cube);
			cube.position = pos;
			cubes[i] = cube;
		}
	};
};