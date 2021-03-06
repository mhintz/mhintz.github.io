VIS.install();
setCanvas(document.getElementById("testCanvas"));
size(document.width - 16, document.height - 16);

strokeWidth(2);
lineCap("round");
stroke(255);

var maxN = 50;
var maxP = 25;

function move() {
	var on = n;
	n = Math.round((mouseX / width) * maxN);
	var op = p;
	p = Math.round((mouseY / height) * maxP);
	//if (n !== on || p !== op) console.log("sides: ", n, "adjacents: ", p);
	setup();
}

var cx = width / 2;
var cy = height / 2;
var r = height / 2;
var n = 2;
var p = 0;

function setup() {
	background(0);

	var poly = new Polygon();

	var inc = TWO_PI / n;
	var x, y, a = 0;
	for (var i = 0; i <= n; ++i) {
		a += inc;
		x = cx + Math.cos(a) * r;
		y = cy + Math.sin(a) * r;
		poly.vertex(x, y);
	}
	poly.draw();

	var e = Math.floor(p / 2);
	var v0, v1, m;
	for (var i = 0, l = poly.vertices.length; i < l; ++i) {
		v0 = poly.vertices[i];
		for (var j = 1; j <= e; ++j) {
			m = boundedAdd(i, j, 0, poly.vertices.length - 1);
			v1 = poly.vertices[m];
			line(v0.x, v0.y, v1.x, v1.y);
			m = boundedAdd(i, -j, 0, poly.vertices.length - 1);
			v1 = poly.vertices[m];
			line(v0.x, v0.y, v1.x, v1.y);
		}
	}
}

function boundedAdd(a0, a1, b0, b1) {
	var sum = a0 + a1;
	var rng = b1 - b0;
	if (b0 <= sum && sum <= b1) {
		return sum;
	} else if (sum < b0) {
		return b1 - ((b0 - sum) % rng);
	} else if (b1 < sum) {
		return b0 + ((sum - b1) % rng);
	}
}