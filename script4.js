// aframe component "draw-canvas4" is used in our scene
AFRAME.registerComponent("draw-canvas4", {
    init() {
      setTimeout(() => {
        this.el.setAttribute("material", {src: "#test4"});
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

// p5js sketch for an experimental black and white data field
let sketch4 = function (p) {
    let noiseOffset = 0.0;

    p.setup = function () {
        p.noCanvas();
        let cnv = p.createCanvas(512, 512);
        cnv.id("test4");
        cnv.hide();
        p.background(0);
        p.frameRate(30);
    };

    p.draw = function () {
        p.background(0, 50); // Semi-transparent background for a trail effect
        p.noStroke();
        let gridSize = 30;

        for (let x = gridSize / 2; x < p.width; x += gridSize) {
            for (let y = gridSize / 2; y < p.height; y += gridSize) {
                // Use noise to get a value
                let noiseVal = p.noise(x * 0.005, y * 0.005, noiseOffset);

                // Map noise to size
                let size = p.map(noiseVal, 0, 1, 2, gridSize);
                
                // Map noise to grayscale color
                let gray = p.map(noiseVal, 0, 1, 100, 255);

                p.fill(gray);
                p.ellipse(x, y, size, size);
            }
        }

        noiseOffset += 0.02; // Animate the noise field over time

        // Occasional white glitch lines
        if (p.random(1) > 0.95) {
            let y = p.random(p.height);
            p.stroke(255);
            p.strokeWeight(p.random(1, 3));
            p.line(0, y, p.width, y);
        }
    };
};
new p5(sketch4, "container4");
