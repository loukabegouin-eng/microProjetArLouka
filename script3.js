// aframe component "draw-canvas3" is used in our scene
AFRAME.registerComponent("draw-canvas3", {
    init() {
      setTimeout(() => {
        this.el.setAttribute("material", {src: "#test3"});
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
let sketch3 = function (p) {
    let lastSwitch = 0;

    p.setup = function () {
        p.noCanvas();
        let cnv = p.createCanvas(512, 512); // High-res, square aspect ratio
        cnv.id("test3");
        cnv.hide();
        p.background(0);
        p.textFont("monospace");
        p.textSize(16);
        p.frameRate(30);
    };

    p.draw = function () {
        p.background(0);
        p.fill(255);

        // Grid of scrolling binary
        let spacing = 20;
        for (let y = 0; y < p.height; y += spacing) {
            for (let x = 0; x < p.width; x += spacing) {
                let char = p.random(1) > 0.5 ? "1" : "0";
                p.text(char, x, y + (p.frameCount % spacing));
            }
        }

        // Horizontal glitch lines
        if (p.millis() - lastSwitch > p.random(50, 250)) {
            let y = p.random(p.height);
            p.stroke(255);
            p.strokeWeight(p.random(1, 3));
            p.line(0, y, p.width, y);
            lastSwitch = p.millis();
        }
    };
};
new p5(sketch3, "container3");
