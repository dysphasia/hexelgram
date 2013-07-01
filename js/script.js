$(function () {

	/*** EVENTS ***/

	var onImageUpload = function (e) {
		var file = document.getElementById('input-image').files[0];
		var reader = new FileReader();
			reader.onload = fileReaderLoad;
			reader.readAsDataURL(file);
	};

	var fileReaderLoad = function (e) { 
 		var dataUri = e.target.result;
 		var $img = $("<img />").attr("src", dataUri);

       	CONFIG.$image = $img; 
       	CONFIG.height = $img.get(0).height;
      	CONFIG.width = $img.get(0).width;

      	renderCanvas();
	};
	
	var onDisplaySelectChange = function (e) {
		var val = $(this).val();
		CONFIG.render = val;

      	renderCanvas();		
	};

	var onPixelSizeChange = function (e) {
		var val = $(this).val();
		CONFIG.pixelSize = parseInt(val, 10);

      	renderCanvas();
	};


	/*** RENDERING ***/

	var renderCanvas = function () {
		var type = CONFIG.render;
		var func = RENDER[type];
		
		if (!func) { 
			return;
		}

		func();
	}


	/*** INIT ***/

	var init = (function () {

		DOM.$inputImage.change(onImageUpload);
		DOM.$displaySelect.change(onDisplaySelectChange);
		DOM.$inputPixelSize.change(onPixelSizeChange);

	}());

});