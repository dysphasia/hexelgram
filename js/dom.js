var DOM = { };

$(function () { 

	DOM.$inputImage = $("#input-image");
	DOM.$displaySelect = $("#select-display");
	DOM.$inputPixelSize = $("#pixel-size");
	DOM.$container = $("#container");
	DOM.$canvas = $("#canvas");
	DOM.canvas = document.getElementById('canvas');
	DOM.context = DOM.canvas.getContext("2d");
	DOM.$save = $("#save-png");

});