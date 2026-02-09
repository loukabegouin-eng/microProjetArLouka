// aframe component "draw-canvas1" is used in our scene
AFRAME.registerComponent("draw-canvas1", {
    init() {
      setTimeout(() => {
        this.el.setAttribute("material", {src: "#test1"}); // every element of the scene that has this component will use the canvas ided as "test1" for its texture
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

   // p5js sketch for an expanding generative fire in Ryoji Ikeda's style
   let sketch1 = function (p) {
    let particles = [];

    // A simple particle class
    class Particle {
        constructor(x, y) {
            this.pos = p.createVector(x, y);
            // Particles fly outwards from the center
            this.vel = p5.Vector.random2D().mult(p.random(1, 5));
            this.lifespan = 255;
            this.size = p.random(5, 15); // Width of the line
        }

        update() {
            this.pos.add(this.vel);
            this.lifespan -= 2.5;
        }

        display() {
            p.stroke(255, this.lifespan); // Fade out
            p.strokeWeight(2);
            p.line(this.pos.x, this.pos.y, this.pos.x - this.vel.x * this.size, this.pos.y - this.vel.y * this.size);
        }

        isDead() {
            // Disappear when faded
            return this.lifespan < 0;
        }
    }

    p.setup = function () {
      p.noCanvas();
      let cnv = p.createCanvas(512, 512); // A square canvas is good for this
      cnv.id("test1"); // you need to set this because you'll use it in the a-frame component
      cnv.hide();
    };

    p.draw = function () {
        p.background(0);

        // Continuously add new particles from the center
        for (let i = 0; i < 5; i++) {
            particles.push(new Particle(p.width / 2, p.height / 2));
        }

        // Update and display all particles
        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            particles[i].display();
            if (particles[i].isDead()) {
                particles.splice(i, 1); // Remove dead particles
            }
        }
    };
  };
  new p5(sketch1, "container1");