var RENDER = {

	getImageData : function (x, y, w, h, W, H, d) {
		var arr = [];

		for (var r=y; r<h+y; r+=1) {
			for (var c=x; c<w+x; c+=1) {
				var o = (r*W*4) + (c * 4);
				if (c<0 || c>W || r<0 || r>H) {
					arr.push(0,0,0,0);					
				} else {
					arr.push(d[o+0], d[o+1], d[o+2], d[o+3]);					
				}
			}
		}
		return arr;
	}

};