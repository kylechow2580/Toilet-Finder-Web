function init()
{
  var c = document.getElementById("c");
  var ctx = c.getContext("2d");
  var cw = c.width = 300;
  var ch = c.height = 300;
  var cx = 0,
    cy = 0;
  var rad = Math.PI / 180;
  var frames = 0;
  var flag = true;
  var requestId = null;

  var R = 150,
    r = 70,
    radius;
  var speed = 100;
  var timeout = 1000;

  var verticesRy = [];
  var num = 0;
  for (var i = -18; i < 360 - 18; i += 36) {
    num++;
    if (num % 2 == 0) {
      radius = r
    } else {
      radius = R
    }
    var o = {}
    o.x = cx + radius * Math.cos(i * rad);
    o.y = cy + radius * Math.sin(i * rad);
    verticesRy.push(o);
  }

  var starRy = [];
  for (var i = 1; i < verticesRy.length; i++) {
    interpolate(verticesRy[i - 1], verticesRy[i - 1], 36, starRy)
  }
  interpolate(verticesRy[verticesRy.length - 1], verticesRy[0], 36, starRy);

  var heartRy = [];
  var hr = R *.059;
  ctx.beginPath();
  for (var t = 36 + 18; t < 360 + 36 + 18; t++) {
    var o = {}
    o.x = cx + 16 * hr * (Math.sin(t * rad) * Math.sin(t * rad) * Math.sin(t * rad));
    o.y = cy - 13 * hr * Math.cos(t * rad) +
      5 * hr * Math.cos(2 * t * rad) +
      2 * hr * Math.cos(3 * t * rad) +
      hr * Math.cos(4 * t * rad);
    heartRy.push(o);
  }

  var animatedRy = [];
  for (var i = 0; i < 360; i++) {
    var ry = [];
    interpolate(starRy[i], heartRy[i], speed, ry);
    animatedRy.push(ry);
  }

  ctx.translate(cw / 2, ch / 2);

  function Draw() {
    requestId = window.requestAnimationFrame(Draw);
    ctx.rotate((360 / (speed - 1)) * rad);

    if (flag == true) {
      frames++;
    } else {
      frames--;
    }
    if (frames == speed - 1) {
      window.cancelAnimationFrame(requestId);
      setTimeout(function() {
        flag = false;
        requestId = window.requestAnimationFrame(Draw);
      }, timeout);

    } else if (frames == 0) {
      window.cancelAnimationFrame(requestId);
      setTimeout(function() {
        flag = true;
        requestId = window.requestAnimationFrame(Draw);
      }, timeout);
    }

    ctx.fillStyle = "hsl(" + (50 - frames / 2) + ", 90%,50%)";

    ctx.clearRect(-cw, -ch, 2 * cw, 2 * ch)
    ctx.beginPath();
    for (var i = 0; i < animatedRy.length; i++) {
      ctx.lineTo(animatedRy[i][frames].x, animatedRy[i][frames].y);
    }
    ctx.closePath();
    ctx.fill();
  }

  requestId = window.requestAnimationFrame(Draw);

  function interpolate(a, b, n, ry) {
    for (var i = 1; i <= n; i++) {
      var o = {}
      o.x = ((b.x - a.x) * i / n) + a.x,
        o.y = ((b.y - a.y) * i / n) + a.y
      ry.push(o);
    }
  }  
}

document.addEventListener("DOMContentLoaded", init, false);