var nesty = function (func) {
    var args = Array.prototype.slice.call(arguments,1);
    
    if (args.length==0 || typeof func != "function") {
         return;   
    }
    
    var combine = function (func, arrs, v) {    
        if (arrs.length==0) { 
            return func.apply(this, v);       
        }
    
        var curr = arrs.slice(0,1);
        for (var i=0; i<curr.length; i+=1) {
            for (var j=0; j<curr[i].length; j+=1) {       
                var u = v.slice(0); 
                u.push(curr[i][j])
                combine(func, arrs.slice(1), u)   
            }
        }
    };
    
    combine(func, args, []);
};


var foo = [0,1];
var bar = [0,1];
var baz = [0,1];

var func = function (a,b,c) { console.log(a + ", " + b + ', ' + c); };


nesty(func, foo, bar, baz);