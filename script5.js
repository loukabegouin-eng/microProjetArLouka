// aframe component "draw-canvas5" is used in our scene
AFRAME.registerComponent("draw-canvas5", {
    init() {
      setTimeout(() => {
        this.el.setAttribute("material", {src: "#test5"});
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

// p5js sketch for a seismic oscilloscope animation
let sketch5 = function (p) {
    let noiseOffset = 0.0;

    p.setup = function () {
        p.noCanvas();
        let cnv = p.createCanvas(512, 512);
        cnv.id("test5");
        cnv.hide();
        p.background(0);
    };

    p.draw = function () {
        p.background(0);
        p.stroke(255);
        p.noFill();
        p.strokeWeight(2);

        p.beginShape();
        let xoff = noiseOffset;
        for (let x = 0; x < p.width; x++) {
            let y = p.height / 2 + p.noise(xoff) * p.random(-100, 100);
            p.vertex(x, y);
            xoff += 0.02;
        }
        p.endShape();

        // Add some sharp, glitchy vertical lines
        if (p.random(1) > 0.95) {
            let x = p.random(p.width);
            p.strokeWeight(p.random(1, 3));
            p.line(x, 0, x, p.height);
        }

        noiseOffset += 0.05;
    };
};
new p5(sketch5, "container5");