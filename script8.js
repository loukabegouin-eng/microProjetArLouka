// aframe component "draw-canvas8" is used in our scene
AFRAME.registerComponent("draw-canvas8", {
    init() {
      setTimeout(() => {
        this.el.setAttribute("material", {src: "#test8"});
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

// p5js sketch for an experimental data field
let sketch8 = function (p) {
    let noiseOffset = 0.0;

    p.setup = function () {
        p.noCanvas();
        let cnv = p.createCanvas(512, 512);
        cnv.id("test8");
        cnv.hide();
        p.background(0);
        p.stroke(255);
        p.frameRate(30);
    };

    p.draw = function () {
        p.background(0);
        p.stroke(255);
        let gridSize = 25;

        for (let x = gridSize / 2; x < p.width; x += gridSize) {
            for (let y = gridSize / 2; y < p.height; y += gridSize) {
                // Use noise to get a rotation angle
                let noiseVal = p.noise(x * 0.01, y * 0.01, noiseOffset);
                let angle = p.map(noiseVal, 0, 1, 0, p.TWO_PI * 2);

                p.push();
                p.translate(x, y);
                p.rotate(angle);
                p.strokeWeight(1.5);
                p.line(-gridSize / 4, 0, gridSize / 4, 0); // Horizontal line of the cross
                p.line(0, -gridSize / 4, 0, gridSize / 4); // Vertical line of the cross
                p.pop();
            }
        }

        noiseOffset += 0.01; // Animate the noise field over time

        // Add some random 'scan lines' for a glitchy effect
        if (p.random(1) > 0.9) {
            let y = p.random(p.height);
            p.strokeWeight(p.random(0.5, 2));
            p.line(0, y, p.width, y);
        }
    };
};
new p5(sketch8, "container8");
