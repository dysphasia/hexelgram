var DOM = { };

$(function () { 

	DOM.$inputImage = $("#input-image");
	DOM.$displaySelect = $("#select-display");
	DOM.$inputPixelSize = $("#pixel-size");
	DOM.$container = $("#container");
	DOM.$canvas = $("#canvas");
	DOM.context = DOM.$canvas[0].getContext("2d");

});