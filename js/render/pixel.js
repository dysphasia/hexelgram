var RENDER = RENDER || {};

RENDER.pixel = function () {
	
	var size = CONFIG.pixelSize;
	var ctx = DOM.context;
	var row, col, pixelData;

	var attr = {
		height : Math.floor(CONFIG.height / size) * size,
		width : Math.floor(CONFIG.width / size) * size
	};

	DOM.$canvas.attr(attr);
	DOM.context.drawImage(CONFIG.$image.get(0), 0, 0);

	var getPixelAverage = function (data) {
		var pixel = { r:0, g:0, b:0, a:0 };
		var total = data.length/4;

		for (var i=0; i<data.length; i+=4) {
			pixel.r += data[i+0];
			pixel.g += data[i+1];
			pixel.b += data[i+2];
			pixel.a += data[i+3];
		}
		pixel.r = Math.floor(pixel.r/total);
		pixel.g = Math.floor(pixel.g/total);
		pixel.b = Math.floor(pixel.b/total);
		pixel.a = Math.floor(pixel.a/total);
		
		return pixel;
	};

	var placePixel = function (pixel, col, row) {

		var imgData=ctx.createImageData(size,size);

		for (var i=0; i<imgData.data.length; i+=4) {
			imgData.data[i+0]=pixel.r;
			imgData.data[i+1]=pixel.g;
			imgData.data[i+2]=pixel.b;
			imgData.data[i+3]=pixel.a;
  		}

		ctx.putImageData(imgData, col, row);
	};

	for (var row=0; row<canvas.height; row+=size) {
		for (var col=0; col<canvas.width; col+=size) {

			var data = ctx.getImageData(col, row, size, size).data;
			var pixel = getPixelAverage(data);
			placePixel(pixel, col, row);
		}
	};

};

