function mandelIter(cx, cy, maxIter) {
  var x = 0.0;
  var y = 0.0;
  var xx = 0;
  var yy = 0;
  var xy = 0;

  var i = maxIter;
  while (i-- && xx + yy <= 4) {
    xy = x * y;
    xx = x * x;
    yy = y * y;
    x = xx - yy + cx;
    y = xy + xy + cy;
  }
  return maxIter - i;
}

function mandelbrot(canvas, xmin, xmax, ymin, ymax, iterations, color) {
  var width = canvas.width;
  var height = canvas.height;

  var ctx = canvas.getContext('2d');
  var img = ctx.getImageData(0, 0, width, height);
  var pix = img.data;
  tcol=255
  var i_arr=[]
  var ppos_arr=[]
  var imax=1
  var imin=iterations
  for (var ix = 0; ix < width; ++ix) {
    for (var iy = 0; iy < height; ++iy) {
      var x = xmin + (xmax - xmin) * ix / (width - 1);
      var y = ymin + (ymax - ymin) * iy / (height - 1);
      var i = mandelIter(x, y, iterations);
      i_arr.push(i)
      var ppos = 4 * (width * iy + ix);
      ppos_arr.push(ppos)
      if (i > imax) { imax=i; }
      if (i < imin) { imin=i; }
    }
  }

 for (var n = 0; n < i_arr.length; ++n){
   i=i_arr[n]
  //imax=Math.max.apply(i_arr)
  //imin=Math.min.apply(i_arr)
   ppos=ppos_arr[n]
   if (i > iterations) {
     pix[ppos] = 0;
     pix[ppos + 1] = 0;
     pix[ppos + 2] = 0;
     pix[ppos + 3] = tcol;
   } else {
     var c = 3*Math.log(i) / Math.log(iterations - 1.0);
     //var c =  Math.log(Math.log(i)/Math.log(2));
     //var c =  3*(i)/(imax);
     //else {var c =  3*(i);}
    //c =i/iterations

    if (color == "reds"){
       pix[ppos] = tcol * Math.cos(c*5);
       pix[ppos + 1] = 0;
       pix[ppos + 2] = 0;
       pix[ppos + 3] = tcol- tcol* Math.sin(c*5);
     }
     if (color == "blues"){
        pix[ppos] = 0;
        pix[ppos + 1] = 0;
        pix[ppos + 2] = tcol * Math.cos(c*5);
        pix[ppos + 3] = tcol- tcol* Math.sin(c*5);
      }
      if (color == "greens"){
         pix[ppos] = 0;
         pix[ppos + 1] = tcol * Math.cos(c*5);
         pix[ppos + 2] = 0;
         pix[ppos + 3] = tcol- tcol* Math.sin(c*5);
       }


   }
   //pix[ppos + 3] = tcol;
 }

  ctx.putImageData(img, 0, 0);
}


//define the canvas
function create_canvas(){
var canvas = document.createElement('canvas');

canvas.width = 1200;
canvas.height = 500; //500;
//document.body.insertBefore(canvas, document.body.childNodes[0]);
var main = document.getElementById('main');
console.log(main);
main.appendChild(canvas);
// posx=0.0
// posx=0.0
return canvas
}

function origin(canvas){
mag=0.5 //zoom
scale=canvas.width/canvas.height
dx=(1/mag)*scale //half distance of the zoom on the horizontal axis (real numbers)
dy=1/mag //half distance of the zoom on the vertical axis (imaginary numbers)
posx=0.0
posy=0.0
niter=200
color="blues"
mandelbrot(canvas, posx-dx, posx+dx, posy-dy, posy+dy, niter,color);
var vals=[mag,scale,posx,posy,dx,dy,niter,color]
return vals
}

function up(canvas,vals){
var mag=vals[0]
var scale=vals[1]
var posx=vals[2]
var posy=vals[3]
var dx=vals[4]
var dy=vals[5]
var niter=vals[6]
var color=vals[7]
posy=posy - dy/3
mandelbrot(canvas, posx-dx, posx+dx, posy-dy, posy+dy, niter,color);
var vals=[mag,scale,posx,posy,dx,dy,niter,color]
return vals
}


function down(canvas,vals){
var mag=vals[0]
var scale=vals[1]
var posx=vals[2]
var posy=vals[3]
var dx=vals[4]
var dy=vals[5]
var niter=vals[6]
var color=vals[7]
posy=posy + dy/3
mandelbrot(canvas, posx-dx, posx+dx, posy-dy, posy+dy, niter,color);
var vals=[mag,scale,posx,posy,dx,dy,niter,color]
return vals
}

function left(canvas,vals){
var mag=vals[0]
var scale=vals[1]
var posx=vals[2]
var posy=vals[3]
var dx=vals[4]
var dy=vals[5]
var niter=vals[6]
var color=vals[7]
posx=posx - dx/3
mandelbrot(canvas, posx-dx, posx+dx, posy-dy, posy+dy, niter,color);
var vals=[mag,scale,posx,posy,dx,dy,niter,color]
return vals
}

function right(canvas,vals){
var mag=vals[0]
var scale=vals[1]
var posx=vals[2]
var posy=vals[3]
var dx=vals[4]
var dy=vals[5]
var niter=vals[6]
var color=vals[7]
posx=posx + dx/3
mandelbrot(canvas, posx-dx, posx+dx, posy-dy, posy+dy, niter,color);
var vals=[mag,scale,posx,posy,dx,dy,niter,color]
return vals
}

function zoomin(canvas,vals){
var mag=vals[0]
var scale=vals[1]
var posx=vals[2]
var posy=vals[3]
var dx=vals[4]
var dy=vals[5]
var niter=vals[6]
var color=vals[7]
mag=mag*2.0
dx=(1/mag)*scale //half distance of the zoom on the horizontal axis (real numbers)
dy=1/mag
mandelbrot(canvas, posx-dx, posx+dx, posy-dy, posy+dy, niter,color);
var vals=[mag,scale,posx,posy,dx,dy,niter,color]
return vals
}

function zoomout(canvas,vals){
var mag=vals[0]
var scale=vals[1]
var posx=vals[2]
var posy=vals[3]
var dx=vals[4]
var dy=vals[5]
var niter=vals[6]
var color=vals[7]
mag=mag/2.0
dx=(1/mag)*scale //half distance of the zoom on the horizontal axis (real numbers)
dy=1/mag
mandelbrot(canvas, posx-dx, posx+dx, posy-dy, posy+dy, niter,color);
var vals=[mag,scale,posx,posy,dx,dy,niter,color]
return vals
}

function moreiter(canvas,vals){
var mag=vals[0]
var scale=vals[1]
var posx=vals[2]
var posy=vals[3]
var dx=vals[4]
var dy=vals[5]
var niter=vals[6]
var color=vals[7]
niter=2*niter
mandelbrot(canvas, posx-dx, posx+dx, posy-dy, posy+dy, niter,color);
var vals=[mag,scale,posx,posy,dx,dy,niter,color]
return vals
}


function lessiter(canvas,vals){
var mag=vals[0]
var scale=vals[1]
var posx=vals[2]
var posy=vals[3]
var dx=vals[4]
var dy=vals[5]
var niter=vals[6]
var color=vals[7]
niter=niter/2
mandelbrot(canvas, posx-dx, posx+dx, posy-dy, posy+dy, niter,color);
var vals=[mag,scale,posx,posy,dx,dy,niter,color]
return vals
}

function red(canvas,vals){
var mag=vals[0]
var scale=vals[1]
var posx=vals[2]
var posy=vals[3]
var dx=vals[4]
var dy=vals[5]
var niter=vals[6]
var color=vals[7]
color="reds"
mandelbrot(canvas, posx-dx, posx+dx, posy-dy, posy+dy, niter,color);
var vals=[mag,scale,posx,posy,dx,dy,niter,color]
return vals
}

function blue(canvas,vals){
var mag=vals[0]
var scale=vals[1]
var posx=vals[2]
var posy=vals[3]
var dx=vals[4]
var dy=vals[5]
var niter=vals[6]
var color=vals[7]
color="blues"
mandelbrot(canvas, posx-dx, posx+dx, posy-dy, posy+dy, niter,color);
var vals=[mag,scale,posx,posy,dx,dy,niter,color]
return vals
}

function green(canvas,vals){
var mag=vals[0]
var scale=vals[1]
var posx=vals[2]
var posy=vals[3]
var dx=vals[4]
var dy=vals[5]
var niter=vals[6]
var color=vals[7]
color="greens"
mandelbrot(canvas, posx-dx, posx+dx, posy-dy, posy+dy, niter,color);
var vals=[mag,scale,posx,posy,dx,dy,niter,color]
return vals
}
