RENDER.pixel = function () {

	var getPixelAverage = function (data) {
		var pixel = { r:0, g:0, b:0};
		var total = 0; 

		for (var i=0; i<data.length; i+=4) {
			if (data[i+3]==0) {
				continue;
			}
			pixel.r += data[i+0];
			pixel.g += data[i+1];
			pixel.b += data[i+2];
			total += 1;
		}

		pixel.r = Math.floor(pixel.r/total);
		pixel.g = Math.floor(pixel.g/total);
		pixel.b = Math.floor(pixel.b/total);
		
		return pixel; 
	};

	var drawRect = function (ctx, pixel, x, y, w, h) {
	    ctx.fillStyle = "rgba(" + pixel.r + "," + pixel.g + "," + pixel.b + ", 1)";
	    ctx.fillRect(x, y, w, h);
	};

	var init = (function () {

		var ctx = document.getElementById('canvas').getContext('2d');
		var imgData = CONFIG.cache.imgData;
		var pixelSize = CONFIG.pixelSize;

		for (var y=0; y<canvas.height; y+=pixelSize) {
			for (var x=0; x<canvas.width; x+=pixelSize) {			
				var data = RENDER.getImageData(x, y, pixelSize, pixelSize, canvas.width, canvas.height, imgData.data);
				var pixel = getPixelAverage(data);
				drawRect(ctx, pixel, x, y, pixelSize, pixelSize);
			}
		}

	}());

};

