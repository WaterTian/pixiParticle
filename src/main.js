var container, renderer, stage;
var emitter;
var FPS=30;

var images = ["images/smokeparticle.png", "images/HardRain.png", "images/Fire.png"];

var config = {
    "alpha": {
        "start": 1,
        "end": 0.04
    },
    "scale": {
        "start": 0.1,
        "end": 0.4,
        "minimumScaleMultiplier": 1
    },
    "color": {
        "start": "#ffffff",
        "end": "#007cf0"
    },
    "speed": {
        "start": 60,
        "end": 200,
        "minimumSpeedMultiplier": 1
    },
    "acceleration": {
        "x": 0,
        "y": 0
    },
    "maxSpeed": 0,
    "startRotation": {
        "min": 0,
        "max": 90
    },
    "noRotation": false,
    "rotationSpeed": {
        "min": 10,
        "max": 60
    },
    "lifetime": {
        "min": 2,
        "max": 6
    },
    "blendMode": "normal",
    "frequency": 0.001,
    "emitterLifetime": -1,
    "maxParticles": 500,
    "pos": {
        "x": 0,
        "y": 0
    },
    "addAtBack": true,
    "spawnType": "point"
}

init();

function init() {
    container = document.getElementById('canvasBox')

    //renderer
    renderer = PIXI.autoDetectRenderer(600, 800);
    container.appendChild(renderer.view);

    //stage
    stage = new PIXI.Container();


    //load particle images
    var loader = PIXI.loader;
    for (i in images) {
        loader.add("img" + i, images[i]);
    }

    //particles
    loader.load(function() {
        var Textures = [];
        for (i in images) {
            Textures.push(PIXI.Texture.fromImage(images[i]));
        }
        //////
        initEmitter(Textures);
    });

    // STATS
    stats = new Stats();
    container.appendChild(stats.dom);

    //Events
    stage.interactive = true;
    stage
        .on('mousemove', onDragMove)
        .on('touchmove', onDragMove);
}


function initEmitter(Textures) {

    //if useParticleContainer the particle image must be onlay one
    var useParticleContainer = true;
    if (Textures.length > 1) useParticleContainer = false;

    var emitterContainer;
    if (useParticleContainer) {
        emitterContainer = new PIXI.particles.ParticleContainer()
        emitterContainer.setProperties({
            scale: true,
            position: true,
            rotation: true,
            uvs: true,
            alpha: true
        });
    } else {
        emitterContainer = new PIXI.Container();
    }
    stage.addChild(emitterContainer);

    // Create a new emitter
    emitter = new PIXI.particles.Emitter(
        emitterContainer,
        Textures,
        config
    );

    // Start emitting
    emitter.updateOwnerPos(window.innerWidth / 2, window.innerHeight / 2);
    // emitter.emit = true;
}



function onDragMove(e) {
    var p = e.data.global;

    if (!emitter) return;
    emitter.emit = true;
    emitter.resetPositionTracking();

    emitter.updateOwnerPos(p.x, p.y);
}



var elapsed = Date.now();

function update() {
    // requestAnimationFrame(update);
    window.setTimeout(update, 1000 / FPS);

    var now = Date.now();
    if (emitter)
        emitter.update((now - elapsed) * 0.001);
    elapsed = now;

    renderer.render(stage);
    stats.update();
}




update();