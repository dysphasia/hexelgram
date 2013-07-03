RENDER.hexelold = function () {

	var hexel;

	/*** HELPERS ***/

	var initHexelProperties = function (side) {

		var sqrt3 = Math.sqrt(3);
		var rad = Math.PI/180;
		var thirdpi = Math.PI / 3;

		hexel = {};
		hexel.side = side;
		hexel.radius = side;
		hexel.apothem = Math.cos(30 * rad) * hexel.side;		
		hexel.height = 2 * hexel.apothem;
		hexel.width = 2 * hexel.radius;
		hexel.edge = Math.sin(30 * rad) * hexel.side;
		hexel.period = hexel.width - hexel.edge;
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
		ctx.beginPath();
		ctx.moveTo(center.x + hexel.cos[0], center.y + hexel.sin[0]);
		for (var i=1; i<=6; i+=1) {
		    ctx.lineTo(center.x + hexel.cos[i], center.y + hexel.sin[i]);
		}
		ctx.closePath();
		ctx.fillStyle = "#FFFFFF";
		ctx.lineHeight = 0;
		ctx.fill();
 	};

	var drawHexagonMask = function (ctx, img) {
		ctx.save();
		ctx.globalCompositeOperation = 'destination-atop';
		ctx.putImageData(img, 0, 0);
		ctx.fill();
		ctx.restore();
	};

	var getHexelAverage = function (ctx, width, height) {
		var data = ctx.getImageData(0, 0, width, height).data;
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

	/*** INIT ***/

	var init = (function() {
		var alpha = Date.now();

		// init data for operation
		var size = CONFIG.pixelSize;
		var ctx = DOM.context;
		var row, col, pixelData;
		var i = 0;
		var centerGrid;
	
		// init hexel properties
		initHexelProperties(size);
	
		// init hex mask canvas
		var c2 = document.createElement("canvas");
			c2.height=Math.ceil(hexel.height);
			c2.width=Math.ceil(hexel.width);
		var ctx2 = c2.getContext("2d");
		
		// init hex mask
		initHexagonMask(ctx2, { x:hexel.radius, y:hexel.apothem });

		// loop through rows and columns
		for (var col=-hexel.width; col<canvas.width; col+=hexel.period) {
			var hexcol = col/size;
			var isEven = (i%2==0);
			var offset = (isEven) ? 0 : -hexel.apothem;
			i++;
			
			for (var row=offset; row<canvas.height; row+=hexel.height) {

				// get the box containing each hexel
				var img = CONFIG.cache.ctx.getImageData(col, row, c2.width, c2.height);

				// mask the current image section with a hexagon
				drawHexagonMask(ctx2, img);

				// get average of pixels with 0 alpha
				var color = getHexelAverage(ctx2, hexel.width, hexel.height);

				// draw hexel to main canvas
				centerGrid = { x:col+hexel.radius, y:row+hexel.apothem};
				drawHexagonPixel(ctx, centerGrid, color);
			};
		};

		var omega = Date.now();
		console.log(omega-alpha);
	}());



};