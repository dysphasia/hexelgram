var RENDER = {

	getImageData : function (x, y, w, h, W, H, d) {
		var arr = new Uint8ClampedArray(w*h*4);

		for (var r=y; r<h+y; r+=1) {
			for (var c=x; c<w+x; c+=1) {
				var O = (r*W*4) + (c * 4);
				var o = ((r-y)*w*4) + ((c-x) * 4);
				if (c<0 || c>W || r<0 || r>H) {
					arr[o+0] = 0;
					arr[o+1] = 0;
					arr[o+2] = 0;
					arr[o+3] = 0;
				} else {
					arr[o+0] = d[O+0];
					arr[o+1] = d[O+1];
					arr[o+2] = d[O+2];
					arr[o+3] = d[O+3];		
				}
			}
		}
		return arr;
	}

};