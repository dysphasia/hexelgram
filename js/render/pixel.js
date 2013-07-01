var RENDER = RENDER || {};

RENDER.pixel = function () {
	
	var getPixelAverage = function (ctx, data, size) {
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
		
		var imgData=ctx.createImageData(size, size);

		for (var i=0; i<imgData.data.length; i+=4) {
			imgData.data[i+0]=pixel.r;
			imgData.data[i+1]=pixel.g;
			imgData.data[i+2]=pixel.b;
			imgData.data[i+3]=255;
		}

		return imgData; 
	};

	var init = (function () {

		var size = CONFIG.pixelSize;
		var row, col, pixelData;

		var cTemp = document.createElement('canvas');
			cTemp.height = CONFIG.height;
			cTemp.width = CONFIG.width;
		var ctxTemp = cTemp.getContext('2d');

		for (var row=0; row<canvas.height; row+=size) {
			for (var col=0; col<canvas.width; col+=size) {
				var img = CONFIG.cache.ctx.getImageData(col, row, size, size);
				var data = img.data;
				var pixel = getPixelAverage(ctxTemp, data, size);
				ctxTemp.putImageData(pixel, col, row);
				console.log(pixel)
			}
		};

		var imgData = ctxTemp.getImageData(0, 0, CONFIG.width, CONFIG.height)
		DOM.$canvas.attr('height', CONFIG.height).attr('width', CONFIG.width);;
		DOM.context.putImageData(imgData, 0, 0);

	}());

};

