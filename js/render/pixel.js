var RENDER = RENDER || {};

RENDER.pixel = function () {
	
	var getPixelAverage = function (data, size) {
		var pixel = { r:0, g:0, b:0};
		var total = data.length/4;

		for (var i=0; i<data.length; i+=4) {
			pixel.r += data[i+0];
			pixel.g += data[i+1];
			pixel.b += data[i+2];
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

	var renderFinalImage = function (ctx) {
		var imgData = ctx.getImageData(0, 0, CONFIG.width, CONFIG.height)
		DOM.$canvas.attr('height', CONFIG.height).attr('width', CONFIG.width);;
		DOM.context.putImageData(imgData, 0, 0);
	};

	var init = (function () {

		var size = CONFIG.pixelSize;
		var pixelArray = [];

		var cTemp = document.createElement('canvas');
			cTemp.height = CONFIG.height;
			cTemp.width = CONFIG.width;
		var ctxTemp = cTemp.getContext('2d');

		for (var y=0; y<canvas.height; y+=size) {
			for (var x=0; x<canvas.width; x+=size) {
				var pixel = { 
					img: CONFIG.cache.ctx.getImageData(x, y, size, size), 
					x:x, 
					y:y, 
					w:size, 
					h:size 
				};
				pixelArray.push(pixel);
			};
		};

		for (var i=0; i<pixelArray.length; ++i) {
			var pixel = pixelArray[i];
			var data = pixel.img.data;
			var avg = getPixelAverage(data, size);
			drawRect(ctxTemp, avg, pixel.x, pixel.y, pixel.w, pixel.h);
		}	

		renderFinalImage(ctxTemp);

	}());

};

