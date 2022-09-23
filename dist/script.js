var canvas, stage;

function init() {
  canvas = document.getElementById("testCanvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;  
  
  stage = new createjs.Stage(canvas);
  
  var total = 25;
  var w = h = Math.min(window.innerWidth, window.innerHeight);
  var shapes = [];
  var randColor = Math.random()*360|0;
  for(var i=0;i<total;i++) {
    var s = new createjs.Shape();
    var _w = w - w/total*i;
    var color = createjs.Graphics.getHSL(randColor, 100, i/total*100|0);
    s.fillCmd = s.graphics.f(color).command
    s.graphics.dr(0, 0, _w, _w);
    s.regX = _w/2;
    s.regY = _w/2;
    s.x = canvas.width >> 1;
    s.y = canvas.height >> 1;
    shapes.push(s);
    stage.addChild(s);
  }
  
  var duration = 2500 + 1000/shapes.length;
  for(i=shapes.length-1;i>=0;i--) {
    (function(shape, delay){
      setTimeout(function() {
        createjs.Tween.get(shape, {loop:true})
          .to({rotation:270}, duration, createjs.Ease.quadInOut)
          .to({rotation:0}, duration*0.75, createjs.Ease.quadInOut);
      }, delay);
    })(shapes[i], i*500/shapes.length);
  }
  
  createjs.ColorPlugin.install()
  setInterval(function() {
    var randColor = Math.random()*360|0;
    for (var i=shapes.length-1; i>=0; i--) {
      var s = shapes[i];
      var color = createjs.Graphics.getHSL(randColor, 100, i/total*100|0);
      createjs.Tween.get(s.fillCmd).wait(i*1000/shapes.length).to({style:color}, 1000, createjs.Ease.quadOut);
    }
  },3000);
  
  createjs.Ticker.on("tick", stage);
  createjs.Ticker.timingMode = "raf";
}

init();
LabTemplate.loadComplete();