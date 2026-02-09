// aframe component "draw-canvas10" is used in our scene
AFRAME.registerComponent("draw-canvas10", {
    init() {
      setTimeout(() => {
        this.el.setAttribute("material", {src: "#test10"});
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
let sketch10 = function (p) {
    p.setup = function () {
        p.noCanvas();
        let cnv = p.createCanvas(512, 512); // High-res, wide aspect ratio
        cnv.id("test10");
        cnv.hide();
        p.background(0);
        p.frameRate(20); // A slightly lower framerate can enhance the glitchy feel
    };

    p.draw = function () {
        p.background(0);
        p.noStroke();
        let gridSize = 16; // smaller grid size for more detail
        for (let x = 0; x < p.width; x += gridSize) {
            for (let y = 0; y < p.height; y += gridSize) {
                if (p.random(1) > 0.7) { // adjust threshold for density
                    p.fill(255);
                    p.rect(x, y, gridSize, gridSize);
                }
            }
        }
    };
};
new p5(sketch10, "container10");
