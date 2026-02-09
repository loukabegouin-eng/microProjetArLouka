// aframe component "draw-canvas7" is used in our scene
AFRAME.registerComponent("draw-canvas7", {
    init() {
      setTimeout(() => {
        this.el.setAttribute("material", {src: "#test7"});
      }, 500);
    },
    // The tick is still necessary to tell the material to update every frame
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

// p5js sketch for a simple, robust generative particle trail
let sketch7 = function (p) {
    let particles = [];
    
    // The "walker" that creates the trail
    let walker = {
        x: 0, y: 0,
        tx: 0,      // Perlin noise time offset for x
        ty: 10000   // Perlin noise time offset for y
    };

    p.setup = function () {
        let cnv = p.createCanvas(512, 512);
        cnv.id("test7");
        cnv.hide();
        p.colorMode(p.HSB);
        
        // Start the walker in the center
        walker.x = p.width / 2;
        walker.y = p.height / 2;
    };

    p.draw = function () {
        // A semi-transparent background creates the fading trail effect
        p.background(0, 0.1);

        // Update walker's position using Perlin noise for a smooth, organic path
        walker.x = p.map(p.noise(walker.tx), 0, 1, 0, p.width);
        walker.y = p.map(p.noise(walker.ty), 0, 1, 0, p.height);

        // Move through the Perlin noise space
        walker.tx += 0.01;
        walker.ty += 0.01;

        // Add a new particle at the walker's current position
        let hue = p.frameCount % 360; // Color cycles through the spectrum
        particles.push({x: walker.x, y: walker.y, hue: hue, lifespan: 255});

        // Update and display all particles
        // We loop backwards to be able to remove particles safely
        for (let i = particles.length - 1; i >= 0; i--) {
            let particle = particles[i];
            
            // Decrease lifespan
            particle.lifespan -= 2;

            // If particle is dead, remove it
            if (particle.lifespan <= 0) {
                particles.splice(i, 1);
            } else {
                // Otherwise, draw it
                p.noStroke();
                p.fill(particle.hue, 200, 255, particle.lifespan / 255);
                p.ellipse(particle.x, particle.y, 10, 10);
            }
        }
    };
};

new p5(sketch7, "container7");