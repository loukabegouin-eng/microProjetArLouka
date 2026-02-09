// aframe component "draw-canvas2" is used in our scene
AFRAME.registerComponent("draw-canvas2", {
    init() {
      setTimeout(() => {
        this.el.setAttribute("material", {src: "#test2"});
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

// p5js sketch for a simple animated line grid
let sketch2 = function (p) {
    p.setup = function () {
        let cnv = p.createCanvas(512, 512);
        cnv.id("test2");
        cnv.hide();
        p.background(0);
        p.stroke(255);
        p.frameRate(30);
    };

    p.draw = function () {
        p.background(0);
        let spacing = 20;
        // Animate the grid by offsetting the lines based on the frame count
        let offset = p.frameCount % spacing;

        // Draw vertical lines
        for (let x = offset; x < p.width; x += spacing) {
            p.line(x, 0, x, p.height);
        }

        // Draw horizontal lines
        for (let y = offset; y < p.height; y += spacing) {
            p.line(0, y, p.width, y);
        }
    };
};
new p5(sketch2, "container2");
