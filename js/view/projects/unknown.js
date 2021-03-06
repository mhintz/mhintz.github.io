VIS.install();
setCanvas(document.getElementById("testCanvas"));

size(500, 620);

lineCap("round");
lineJoin("round");

stroke(255);
fill(0);

var margin = {
	top: 50,
	side: 165
};
var rows = 75;
var overlap = 3.5;
var strWid = 3;
strokeWidth(strWid);
var spaceHeight = (height - margin.top) / rows;
var maxPolyHeight = spaceHeight * overlap;
var polySubdivisions = 150;
var pointData;

function setup() {
	pointData = [];
	for (var i = 0; i < rows; ++i) {
		var polyY = i * spaceHeight + margin.top;

		// peaks of polygon
		var peaks = [];
		var peakNum = 10 + Math.round(random(15));
		var peakX = 0;
		var peakInc = width / peakNum;
		for (var peakCount = 0; peakCount <= peakNum; ++peakCount) {
			peakX = peakCount * peakInc;
			if (peakX < margin.side || peakX > width - margin.side) {
				peaks.push({
					x: peakX,
					y: polyY
				});
			} else {
				peaks.push({
					x: peakX,
					y: polyY - (random() * 45)
				});
			}
		}
		pointData.push(peaks);
	}
}

var iterations = 0;
function draw() {
	clear();

	var subDivWidth = width / polySubdivisions;
	for (var i = 0, l = pointData.length; i < l; ++i) {
		var poly = new Polygon();
		// bottom and left of polygon
		poly.vertex(-10, height + 10);
		var polyY = i * spaceHeight + margin.top;
		poly.vertex(-10, polyY);

		// main points of polygon
		var peaks = pointData[i];
		var polyX, yPos, rand, peakRand = 0, counter = 0, lastPeak = peaks[counter];
		++counter;
		var curPeak = peaks[counter];
		for (var j = 1; j < polySubdivisions; ++j) {
			polyX = j * subDivWidth;
			interp = (polyX - lastPeak.x) / (curPeak.x - lastPeak.x);
			yPos = interpolateCos(lastPeak.y + peakRand, curPeak.y + peakRand, interp);
			rand = random(-1, 1) / 0.85;

			poly.vertex(polyX, yPos + rand);

			if (polyX >= curPeak.x) {
				peakRand = (polyX < margin.side || polyX > width - margin.side) ? 0 : random(-1, 1) * 2;
				lastPeak = curPeak;
				++counter;
				curPeak = peaks[counter];
			}
		}

		// right and bottom of polygon
		poly.vertex(width + 10, polyY);
		poly.vertex(width + 10, height + 10);

		// draw the polygon
		poly.draw();
	}

	iterations++;
}

function scaleFactor(x) {
	var frac = x / width;
	if (frac < 0.25) return 5;
	else if (frac < 0.45) return 15;
	else if (frac < 0.55) return 35;
	else if (frac < 0.75) return 15;
	else return 5;
}

function click(e) {
	draw();
}

// does cosine interpolation between a and b based on parameter t1
function interpolateCos(a, b, t1) {
	var t2 = (1 - Math.cos(t1 * PI)) / 2;
	return a * (1-t2) + b * (t2);
}