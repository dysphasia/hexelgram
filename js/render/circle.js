RENDER.circle = function () {

	var initCanvas = function (data) {

	};

	var getColorAverage = function (data) {
		var color = { r:0, g:0, b:0};
		var total = 0; 

		for (var i=0; i<data.length; i+=4) {
			if (data[i+3]==0) {
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

	var drawRect = function (ctx, color, x, y, s, r) {
		ctx.beginPath();
	    ctx.fillStyle = "rgba(" + color.r + "," + color.g + "," + color.b + ", 1)";
      	ctx.arc(x, y, r, 0, 2 * Math.PI, false);
      	ctx.fill();
	};

	var init = (function () {

		var canvas = DOM.$canvas.get(0);
		var ctx = DOM.context;
		var imgData = CONFIG.cache.imgData;
		var pixelSize = CONFIG.pixelSize;
		var radius = pixelSize * .5;

	    ctx.fillStyle = "#ffffff";
	    ctx.fillRect(0, 0, canvas.width, canvas.height);

		for (var y=0; y<canvas.height; y+=pixelSize) {
			for (var x=0; x<canvas.width; x+=pixelSize) {			
				var data = RENDER.getImageData(x, y, pixelSize, pixelSize, canvas.width, canvas.height, imgData.data);
				var color = getColorAverage(data);
				drawRect(ctx, color, x, y, pixelSize, radius);
			}
		}

	}());

};

