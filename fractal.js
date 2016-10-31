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

function mandelbrot(canvas, xmin, xmax, ymin, ymax, iterations) {
  var width = canvas.width;
  var height = canvas.height;

  var ctx = canvas.getContext('2d');
  var img = ctx.getImageData(0, 0, width, height);
  var pix = img.data;
  tcol=250
  for (var ix = 0; ix < width; ++ix) {
    for (var iy = 0; iy < height; ++iy) {
      var x = xmin + (xmax - xmin) * ix / (width - 1);
      var y = ymin + (ymax - ymin) * iy / (height - 1);
      var i = mandelIter(x, y, iterations);
      var ppos = 4 * (width * iy + ix);

      if (i > iterations) {
        pix[ppos] = 0;
        pix[ppos + 1] = 0;
        pix[ppos + 2] = 0;
      } else {
        var c = 3 * Math.log(i) / Math.log(iterations - 1.0);
        //var c = Math.log(Math.log(i)/Math.log(2));

        if (c < 1) {
          pix[ppos] = tcol * c;
          pix[ppos + 1] = 0;
          pix[ppos + 2] = 0;
        }
        else if ( c < 2 ) {
          pix[ppos] = tcol;
          pix[ppos + 1] = tcol * (c - 1);
          pix[ppos + 2] = 0;
        } else {
          pix[ppos] = tcol;
          pix[ppos + 1] = tcol;
          pix[ppos + 2] = tcol * (c - 2);
        }
      }
      pix[ppos + 3] = tcol;
    }
  }

  ctx.putImageData(img, 0, 0);
}

///////////////////////////
/////parameters////////////
///////////////////////////

//define the canvas
var canvas = document.createElement('canvas');
canvas.width = 1440;
canvas.height = 660;
//document.body.insertBefore(canvas, document.body.childNodes[0]);
var main = document.getElementById('main');
console.log(main);
main.appendChild(canvas);
// posx=0.0
// posx=0.0

mag=7000.0 //zoom
scale=canvas.width/canvas.height
dx=(1/mag)*scale //half distance of the zoom on the horizontal axis (real numbers)
dy=1/mag //half distance of the zoom on the vertical axis (imaginary numbers)

step=0.25

movx=step*dx //
movy=scale*step*dy

posx=-0.088-4*movx
posy=0.654+5*movy


///posx=0.432579967562512 // horizontal position of the image center
//posy=0.226118675951765 // horizontal position of the image center


niter=20000 // number of iterations

//////////////////////////////////////////////////////
//call the mandelbrot function using the parameters///
//////////////////////////////////////////////////////
mandelbrot(canvas, posx-dx, posx+dx, posy-dy, posy+dy, niter);
//mandelbrot(canvas, -2, 1, -1, 1, 1000);
