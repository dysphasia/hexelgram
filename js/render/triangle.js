RENDER.triangle = function () {


	/*** HELPERS ***/
 
	var initMask = function (ctx, x, y, s, isEven) {
		ctx.moveTo(x,y);

		if (isEven) {
			ctx.lineTo(x+s,y);
		} else {
			ctx.lineTo(x,y+s);			
		}

		ctx.lineTo(x+s,y+s);
		ctx.lineTo(x,y);
 	};

	var drawMask = function (ctx, img) {
		ctx.save();
		ctx.globalCompositeOperation = 'destination-atop';
		ctx.putImageData(img, 0, 0);
		ctx.fill();
		ctx.restore();
	};

	var getAverage = function (data, width, height) {
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

 	var drawPixel = function (ctx, x, y, s, color, isEven) {
		ctx.beginPath();

		ctx.moveTo(x,y);
		
		if (isEven) {
			ctx.lineTo(x+s,y);
		} else {
			ctx.lineTo(x,y+s);			
		}
		
		ctx.lineTo(x+s,y+s);
		ctx.lineTo(x,y);

		ctx.closePath();

	    ctx.fillStyle = "rgba(" + color.r + "," + color.g + "," + color.b + ", 1)";
		ctx.lineHeight = 0;	
		ctx.fill();
 	};	



 	/*** RENDER **/

	var renderHalfScreen = function (isEven, size) {

		// init hex mask
		var canvas = document.createElement("canvas");
			canvas.height = CONFIG.cache.canvas.height;
			canvas.width = CONFIG.cache.canvas.width;
		var ctx = canvas.getContext('2d');

		// loop through rows and columns		
		ctx.beginPath();		

		for (var x=0; x<canvas.width; x+=size) {
			for (var y=0; y<canvas.height; y+=size) {
				initMask(ctx, x, y, size, isEven);
			}
		}

		ctx.closePath();
		ctx.fillStyle = "#FFFFFF";
		ctx.lineHeight = 0;		
		ctx.fill();		
		
		drawMask(ctx, CONFIG.cache.img);
		
		var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

		for (var x=0; x<canvas.width; x+=size) {
			for (var y=0; y<canvas.height; y+=size) {
				var data = RENDER.getImageData(x, y, size, size, canvas.width, canvas.height, imgData);
				var color = getAverage(data, size, size);
				drawPixel(DOM.context, x, y, size, color, isEven);
			}
		}
	}



	/*** INIT ***/

	var init = (function() {

		var size = CONFIG.pixelSize;

		// render half of the image using
		// alternating columns
		renderHalfScreen(true, size);
		renderHalfScreen(false, size);

	}());



};