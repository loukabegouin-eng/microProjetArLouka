// aframe component "draw-canvas9" is used in our scene
AFRAME.registerComponent("draw-canvas9", {
    init() {
      setTimeout(() => {
        this.el.setAttribute("material", {src: "#test9"});
      }, 500);
    },
    tick() {
      var el = this.el;
      var material;
      material = el.getObject3D("mesh").material;
      if (!material.map) {
        return;
      }
      material.map.needsUpdate = true;
    }
  });

// p5js sketch for Ryoji Ikeda inspired datamatics
let sketch9 = function (p) {
    let lastStrobe = 0;

    p.setup = function () {
        p.noCanvas();
        let cnv = p.createCanvas(512, 512); // High-res, wide aspect ratio
        cnv.id("test9");
        cnv.hide();
        p.background(0);
        p.frameRate(60); // Higher framerate for smoother lines
    };

    p.draw = function () {
        p.background(0);
        p.stroke(255);

        // Rapid horizontal lines
        for (let i = 0; i < 20; i++) {
            let y = p.random(p.height);
            p.strokeWeight(p.random(0.5, 2));
            p.line(0, y, p.width, y);
        }

        // Strobing effect
        if (p.millis() - lastStrobe > p.random(200, 1000)) {
            p.background(255);
            lastStrobe = p.millis();
        }
    };
};
new p5(sketch9, "container9");
