RENDER.hexel = function () {

	var hexel;

	/*** HELPERS ***/

	var initCanvas = function() {
		DOM.context.putImageData(CONFIG.cache.img, 0, 0)
	}

	var initHexelProperties = function (side) {

		var sqrt3 = Math.sqrt(3);
		var rad = Math.PI/180;
		var thirdpi = Math.PI / 3;

		hexel = {};
		hexel.side = side;
		hexel.radius = side;
		hexel.apothem = Math.floor(Math.cos(30 * rad) * hexel.side);		
		hexel.height = 2 * hexel.apothem;
		hexel.width = 2 * hexel.radius;
		hexel.edge = Math.ceil(Math.sin(30 * rad) * hexel.side);
		hexel.period = hexel.width - hexel.edge;
		hexel.double = hexel.period * 2;
		hexel.sin = [];
		hexel.cos = [];

		for (var i=0; i<7; ++i) {
			var ipi = i * thirdpi;
			hexel.cos[i] = hexel.side * Math.cos(ipi);
			hexel.sin[i] = hexel.side * Math.sin(ipi);
		}
	};
 
 	var drawHexagonPixel = function (ctx, center, color) {
		ctx.beginPath();
		ctx.moveTo(center.x + hexel.cos[0], center.y + hexel.sin[0]);
		for (var i=1; i<=6; i+=1) {
		    ctx.lineTo(center.x + hexel.cos[i], center.y + hexel.sin[i]);
		}

		ctx.closePath();

	    ctx.fillStyle = "rgba(" + color.r + "," + color.g + "," + color.b + ", 1)";
		ctx.lineHeight = 0;	
		ctx.fill();
 	};

 	var initHexagonMask = function (ctx, center) {
		ctx.moveTo(center.x + hexel.cos[0], center.y + hexel.sin[0]);
		for (var i=1; i<=6; i+=1) {
		    ctx.lineTo(center.x + hexel.cos[i], center.y + hexel.sin[i]);
		}
 	};

	var drawHexagonMask = function (ctx, img) {
		ctx.save();
		ctx.globalCompositeOperation = 'destination-atop';
		ctx.putImageData(img, 0, 0);
		ctx.fill();
		ctx.restore();
	};

	var getHexelAverage = function (data, width, height) {
		var total = 0;
		var color = { r:0, g:0, b:0, a:0 };

		for (var i=0; i<data.length; i+=4) {
			if (data[i+4]==0) {
				continue;
			}
			color.r += data[i+0];
			color.g += data[i+1];
			color.b += data[i+2];
			total += 1;
		}

		color.r = Math.floor(color.r/total);
		color.g = Math.floor(color.g/total);
		color.b = Math.floor(color.b/total);

		return color;	
	};

	var renderHalfScreen = function (isEven) {
		var startX, startY;

		if (isEven) {
			startX = -hexel.edge;
			startY = 0;
		} else {
			startX = -hexel.width;
			startY = -hexel.apothem;
		}

		// init hex mask
		var canvas = document.createElement("canvas");
			canvas.height = CONFIG.cache.canvas.height;
			canvas.width = CONFIG.cache.canvas.width;
		var ctx = canvas.getContext('2d');

		// loop through rows and columns		
		ctx.beginPath();		
		for (var x=startX; x<canvas.width; x+=hexel.double) {
			for (var y=startY; y<canvas.height; y+=hexel.height) {
				initHexagonMask(ctx, { x:hexel.radius+x, y:hexel.apothem+y });
			}
		}

		ctx.closePath();
		ctx.fillStyle = "#FFFFFF";
		ctx.lineHeight = 0;		
		ctx.fill();		
		
		drawHexagonMask(ctx, CONFIG.cache.img);
		
		var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

		for (var x=startX; x<canvas.width; x+=hexel.double) {
			for (var y=startY; y<canvas.height; y+=hexel.height) {
				var data = RENDER.getImageData(x, y, hexel.width, hexel.height, canvas.width, canvas.height, imgData);
				var color = getHexelAverage(data, hexel.width, hexel.height);				
				var centerGrid = { x:x+hexel.radius, y:y+hexel.apothem};
				drawHexagonPixel(DOM.context, centerGrid, color);
			}
		}
	}



	/*** INIT ***/

	var init = (function() {
		// init hexel properties
		initHexelProperties(CONFIG.pixelSize);

		initCanvas();
	
		// render half of the image using
		// alternating columns
		renderHalfScreen(true);
		renderHalfScreen(false);

		var omega = Date.now();
	}());



};