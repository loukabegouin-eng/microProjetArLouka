// aframe component "draw-canvas6" is used in our scene
AFRAME.registerComponent("draw-canvas6", {
    init() {
      setTimeout(() => {
        this.el.setAttribute("material", {src: "#test6"});
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

// p5js sketch for volatile particles
let sketch6 = function (p) {
    let particles = [];

    class Particle {
        constructor() {
            this.pos = p.createVector(p.random(p.width), p.random(p.height));
            this.vel = p5.Vector.random2D().mult(p.random(0.5, 2));
            this.lifespan = p.random(50, 150); // Short lifespan
        }

        update() {
            this.pos.add(this.vel);
            this.lifespan -= 5; // Fade quickly
        }

        display() {
            p.noStroke();
            p.fill(255, this.lifespan);
            // Draw small squares or points
            p.square(this.pos.x, this.pos.y, 2);
        }

        isDead() {
            return this.lifespan < 0;
        }
    }

    p.setup = function () {
        p.noCanvas();
        let cnv = p.createCanvas(512, 512);
        cnv.id("test6");
        cnv.hide();
        p.background(0);
    };

    p.draw = function () {
        p.background(0);

        // Add a burst of new particles
        for (let i = 0; i < 10; i++) {
            particles.push(new Particle());
        }

        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            particles[i].display();
            if (particles[i].isDead()) {
                particles.splice(i, 1);
            }
        }
    };
};
new p5(sketch6, "container6");