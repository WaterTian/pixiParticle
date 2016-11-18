// namespace:
this.TY = this.TY || {};


(function() {
	"use strict";

	function ParticleConfig(imagePaths, config) {
		// Object.defineProperty( this, 'name', { value: "ParticleConfig" } );
		//
		this.emitterContainer;
		this.emitter;

		/* is anim*/
		this.isAnim = false;

		this.imagePaths = imagePaths;
		this.config = config;


		/*load Textures Data*/
		this.imageUrls;
		if (this.imagePaths.spritesheet) {
			/* spritesheet animation images */
			this.isAnim = true;
			this.imagePaths = [imagePaths.spritesheet];
		} else {
			/* only images */
			this.isAnim = false;
			if (this.imagePaths.textures) this.imagePaths = this.imagePaths.textures.slice();
			else this.imagePaths = this.imagePaths.slice();
		}
	}
	Object.assign(ParticleConfig.prototype, TY.EventDispatcher.prototype, {
		constructor: ParticleConfig,
		loadImages: function() {
			//load images
			var loader = PIXI.loader;
			for (i in this.imageUrls) {
				loader.add("img" + i, 'images/'+this.imageUrls[i]);
			}
			loader.load(this.initEmitter());
		},

		initEmitter: function() {
			//collect the textures, now that they are all loaded
			var art;
			if (this.isAnim) {
				art = this.imagePaths.art;
			} else {
				art = [];
				for (var i = 0; i < this.imagePaths.length; ++i)
					art.push(PIXI.Texture.fromImage(this.imagePaths[i]));
			}

			this.emitterContainer = new PIXI.particles.ParticleContainer();
			this.emitterContainer.setProperties({
				scale: true,
				position: true,
				rotation: true,
				uvs: true,
				alpha: true
			});

			this.emitter = new PIXI.particles.Emitter(
				this.emitterContainer,
				art,
				this.config
			);
			if (this.isAnim) emitter.particleConstructor = PIXI.particles.AnimatedParticle;

			this.dispatchEvent("loaded", this.emitter);
		},


		destroyEmitter: function() {
			this.emitter.destroy();
			this.emitter = null;
			this.destroyEmitter = null;
		}

	});


	TY.ParticleConfig = ParticleConfig;
}());