var RENDER = RENDER || {};

RENDER.normal = function () { 

	var attr = {
		height : CONFIG.height,
		width : CONFIG.width
	};

	DOM.$canvas.attr(attr);
	DOM.context.drawImage(CONFIG.$image.get(0), 0, 0)

}

