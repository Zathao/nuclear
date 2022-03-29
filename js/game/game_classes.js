Quintus.GameClasses = function( Q ){

	// Menu and Hud Elements
	Q.Sprite.extend( "Camera", {

		init: function(){

			this._super( { asset: "spr_atomic.png", x: Q.width/2, y: Q.height/2, opacity: 0 } );
			this.add( "camera" );

		}

	});

	Q.Sprite.extend( "NuclearTitle", {

		init: function(){

			var config = {

				type: Q.SPRITE_ACTIVE, 
				z: 1,
				opacity: 0,

				x: Q.width / 2,
				y: 0,

				w: 7 * 128,
				h: 200,

				textSheetGenerator: {

					sheet: "sht_fonts.png",
					tileW: 128,
					tileH: 200,
					scale: 1,

					text: "NUCLEAR",

					keySheetMap: {

						A: { sx: 0, sy: 0 },
						B: { sx: 1, sy: 0 },
						C: { sx: 2, sy: 0 },
						D: { sx: 3, sy: 0 },
						E: { sx: 4, sy: 0 },
						F: { sx: 5, sy: 0 },
						G: { sx: 6, sy: 0 },
						H: { sx: 0, sy: 1 }, 
						I: { sx: 1, sy: 1 },
						J: { sx: 2, sy: 1 },
						K: { sx: 3, sy: 1 },
						L: { sx: 4, sy: 1 },
						M: { sx: 5, sy: 1 },
						N: { sx: 6, sy: 1 },
						O: { sx: 0, sy: 2 },
						P: { sx: 1, sy: 2 },
						Q: { sx: 2, sy: 2 },
						R: { sx: 3, sy: 2 },
						S: { sx: 4, sy: 2 },
						T: { sx: 5, sy: 2 },
						U: { sx: 6, sy: 2 },
						V: { sx: 0, sy: 3 },
						X: { sx: 1, sy: 3 },
						Y: { sx: 2, sy: 3 },
						W: { sx: 3, sy: 3 },
						Z: { sx: 4, sy: 3 }

					}

				},

				tweenAnimation: {

					listner: "start",
					animation: {  y: 240, opacity: 1 }, 
					time: 2

				},

				triggerStart: { trigger: "start" }

			}

			this._super( config );

			this.add( "textSheetGenerator" );
			this.add( "tweenAnimation" );
			this.add( "triggerStart" );

		}

	});

	Q.Sprite.extend( "Label", {

		init: function( p ){

			var config = {

				type: Q.SPRITE_ACTIVE, 
				z: 1,
				opacity: 0,

				x: p.x,
				y: p.y,

				w: p.label.length * 128 * p.scale,
				h: 200 * p.scale,

				textSheetGenerator: {

					sheet: "sht_fonts.png",
					tileW: 128,
					tileH: 200,
					scale: p.scale,

					text: p.label,

					keySheetMap: {

						A: { sx: 0, sy: 0 },
						B: { sx: 1, sy: 0 },
						C: { sx: 2, sy: 0 },
						D: { sx: 3, sy: 0 },
						E: { sx: 4, sy: 0 },
						F: { sx: 5, sy: 0 },
						G: { sx: 6, sy: 0 },
						H: { sx: 0, sy: 1 }, 
						I: { sx: 1, sy: 1 },
						J: { sx: 2, sy: 1 },
						K: { sx: 3, sy: 1 },
						L: { sx: 4, sy: 1 },
						M: { sx: 5, sy: 1 },
						N: { sx: 6, sy: 1 },
						O: { sx: 0, sy: 2 },
						P: { sx: 1, sy: 2 },
						Q: { sx: 2, sy: 2 },
						R: { sx: 3, sy: 2 },
						S: { sx: 4, sy: 2 },
						T: { sx: 5, sy: 2 },
						U: { sx: 6, sy: 2 },
						V: { sx: 0, sy: 3 },
						X: { sx: 1, sy: 3 },
						Y: { sx: 2, sy: 3 },
						W: { sx: 3, sy: 3 },
						Z: { sx: 4, sy: 3 },
						_: { sx: 1, sy: 6 },
						"0": { sx: 5, sy: 3 },
						"1": { sx: 6, sy: 3 },
						"2": { sx: 0, sy: 4 },
						"3": { sx: 1, sy: 4 },
						"4": { sx: 2, sy: 4 },
						"5": { sx: 3, sy: 4 },
						"6": { sx: 4, sy: 4 },
						"7": { sx: 5, sy: 4 },
						"8": { sx: 6, sy: 4 },
						"9": { sx: 0, sy: 5 },
						".": { sx: 5, sy: 5 },
						"*": { sx: 3, sy: 5 }

					}

				},

				tweenAnimation: {

					listner: "start",
					animation: { opacity: ( p.opacity ? p.opacity : 1 ) }, 
					time: 2,
					delay: p.dl

				},

				triggerStart: { trigger: "start" }

			};

			this._super( config );

			this.add( "textSheetGenerator" );
			
			this.add( "tweenAnimation" );
			this.add( "triggerStart" );

		}

	});

	Q.Sprite.extend( "NavigationButton", {

		init: function( p ){

			var config = {

				z: 1,

				x: p.x, 
				y: p.y, 

				w: p.label.length * 128 * p.scale,
				h: 200 * p.scale,

				opacity: 0, 
				type: Q.SPRITE_ACTIVE,

				textSheetGenerator: {

					sheet: "sht_fonts.png",
					tileW: 128,
					tileH: 200,
					scale: p.scale,

					text: p.label,

					keySheetMap: {

						A: { sx: 0, sy: 0 },
						B: { sx: 1, sy: 0 },
						C: { sx: 2, sy: 0 },
						D: { sx: 3, sy: 0 },
						E: { sx: 4, sy: 0 },
						F: { sx: 5, sy: 0 },
						G: { sx: 6, sy: 0 },
						H: { sx: 0, sy: 1 }, 
						I: { sx: 1, sy: 1 },
						J: { sx: 2, sy: 1 },
						K: { sx: 3, sy: 1 },
						L: { sx: 4, sy: 1 },
						M: { sx: 5, sy: 1 },
						N: { sx: 6, sy: 1 },
						O: { sx: 0, sy: 2 },
						P: { sx: 1, sy: 2 },
						Q: { sx: 2, sy: 2 },
						R: { sx: 3, sy: 2 },
						S: { sx: 4, sy: 2 },
						T: { sx: 5, sy: 2 },
						U: { sx: 6, sy: 2 },
						V: { sx: 0, sy: 3 },
						X: { sx: 1, sy: 3 },
						Y: { sx: 2, sy: 3 },
						W: { sx: 3, sy: 3 },
						Z: { sx: 4, sy: 3 },
						_: { sx: 1, sy: 6 },
						">": { sx: 6, sy: 5 },
						"<": { sx: 0, sy: 6 }

					}

				},

				tweenAnimation: {

					listner: "start",
					animation: { opacity: 1 }, 
					time: 2,
					delay: p.dl

				},

				triggerStart: { trigger: "start" },
				objectMover: { listner: "touch", object: "Camera", position: { x: p.mx, y: p.my }, time: 1, delay: 0 }

			}

			this._super( config );

			this.add( "textSheetGenerator" );
			this.add( "tweenAnimation" );
			this.add( "triggerStart" );
			this.add( "objectMover" );

		}

	});

	Q.Sprite.extend( "MusicButton", {

		init: function( p ){

			var config = {

				z: 3,

				asset: "btn_sound.png", 
				x: p.x, 
				y: p.y, 
				opacity: 0, 
				type: Q.SPRITE_ACTIVE,

				tweenAnimation: {

					listner: "start",
					animation: { opacity: 1 }, 
					time: 2,
					delay: p.dl

				},

				triggerStart: { trigger: "start" },
			
				mask: { listners: { show: "off", hide: "on" }, asset: "spr_bar.png" },
				interrupter: { state: "on", triggers: { on: "on", off: "off" } },

				soundFinisher: {

					name: "snd_nuclear.mp3",
					listner: "off",
					trigger: "soundFinished"

				},

				soundInitializer: { 
 
					name: "snd_nuclear.mp3",
					loop: true,
					listner: "on",
					trigger: "soundInitialized"

			 	}

			}

			this._super( config );

			this.add( "tweenAnimation" );
			this.add( "triggerStart" );

			this.add( "mask" );
			this.add( "interrupter" );

			this.add( "soundInitializer" );
			this.add( "soundFinisher" );

		}

	});

	Q.Sprite.extend( "SoundButton", {

		init: function(){

			var config = {

				z: 1,

				asset: "btn_sound.png", 
				x: Q.width/2 + 660, 
				y: Q.height/2 + 360, 
				opacity: 0, 
				type: Q.SPRITE_ACTIVE,

				tweenAnimation: {

					listner: "start",
					animation: { opacity: 1 }, 
					time: 2,
					delay: p.dl

				},

				triggerStart: { trigger: "start" },
				
				mask: { listners: { show: "off", hide: "on" }, asset: "spr_bar.png" },
				interrupter: { state: "on", triggers: { on: "on", off: "off" } }

			}

			this._super( config );

			this.add( "tweenAnimation" );
			this.add( "triggerStart" );
			
			this.add( "mask" );
			this.add( "interrupter" );
			
		}

	});

	Q.Sprite.extend( "LevelButton", {

		init: function( p ){

			var config = {

				z: 3,

				x: p.x,
				y: p.y,
				w: p.w,
				h: p.h

			}

			this._super( config );

		}

	});

	Q.Sprite.extend( "ChangeSceneAndStateButton", {

		init: function( p ){

			var config = {

				type: Q.SPRITE_ACTIVE, 
				z: 1,
				opacity: 0,

				x: p.x,
				y: p.y,

				w: p.label.length * 128 * p.scale,
				h: 200 * p.scale,

				textSheetGenerator: {

					sheet: "sht_fonts.png",
					tileW: 128,
					tileH: 200,
					scale: p.scale,

					text: p.label,

					keySheetMap: {

						A: { sx: 0, sy: 0 },
						B: { sx: 1, sy: 0 },
						C: { sx: 2, sy: 0 },
						D: { sx: 3, sy: 0 },
						E: { sx: 4, sy: 0 },
						F: { sx: 5, sy: 0 },
						G: { sx: 6, sy: 0 },
						H: { sx: 0, sy: 1 }, 
						I: { sx: 1, sy: 1 },
						J: { sx: 2, sy: 1 },
						K: { sx: 3, sy: 1 },
						L: { sx: 4, sy: 1 },
						M: { sx: 5, sy: 1 },
						N: { sx: 6, sy: 1 },
						O: { sx: 0, sy: 2 },
						P: { sx: 1, sy: 2 },
						Q: { sx: 2, sy: 2 },
						R: { sx: 3, sy: 2 },
						S: { sx: 4, sy: 2 },
						T: { sx: 5, sy: 2 },
						U: { sx: 6, sy: 2 },
						V: { sx: 0, sy: 3 },
						X: { sx: 1, sy: 3 },
						Y: { sx: 2, sy: 3 },
						W: { sx: 3, sy: 3 },
						Z: { sx: 4, sy: 3 },
						_: { sx: 1, sy: 6 },
						"0": { sx: 5, sy: 3 },
						"1": { sx: 6, sy: 3 },
						"2": { sx: 0, sy: 4 },
						"3": { sx: 1, sy: 4 },
						"4": { sx: 2, sy: 4 },
						"5": { sx: 3, sy: 4 },
						"6": { sx: 4, sy: 4 },
						"7": { sx: 5, sy: 4 },
						"8": { sx: 6, sy: 4 },
						"9": { sx: 0, sy: 5 },
						".": { sx: 5, sy: 5 },
						"*": { sx: 3, sy: 5 }

					}

				},

				stateChanger: { 

					listner: "touch",
					trigger: "stateChanged",

					changes: p.changes

				},

				sceneChanger: {

					listner: "stateChanged",
					trigger: "sceneChanged",
					scene: p.scene,
					config: { sort: true, gridW: 120, gridH: 120 }

				},

				tweenAnimation: {

					listner: "start",
					animation: { opacity: 1 }, 
					time: 2,
					delay: p.dl

				},

				triggerStart: { trigger: "start" }

			};

			this._super( config );

			this.add( "textSheetGenerator" );

			this.add( "sceneChanger" );
			this.add( "stateChanger" );

			this.add( "tweenAnimation" );
			this.add( "triggerStart" );

		}

	});

	Q.Sprite.extend( "TutorialHand", {

		init: function( p ){

			var config = {

				sprite: "sht_tutorial_hand",
				sheet: "sht_tutorial_hand",
				frame: 0,

				z: 5,
				type: Q.SPRITE_ACTIVE,

				x: p.x,
				y: p.y,

				triggerStart: { trigger: "started" },
				sheetAnimation: { listner: "started", animation: "click" },

				tweenAnimations: [

					{
						listner: "directionChanged", 
						animation: { x: 0, y: 20 , angle: 0 }, 
						time: 0.1,
						easing: Q.Easing.Quadratic.Out
					}

				],

				objectTrigger: { 

					listner: "touch",
					trigger: "objectTriggered",

					target: "LauncherBarrel",
					targetTrigger: "touch"

		 		},

				objectsDestroyer: {

					listner: "objectTriggered",
					trigger: "destroyed",
					objects: [ "TutorialHand", "TutorialMask" ]

				}

			}

			this._super( config );

			this.add( "sheetAnimation" );
			this.add( "objectsDestroyer" );
			this.add( "objectTrigger" );

			this.add( "triggerStart" );

		}

	});

	Q.Sprite.extend( "TutorialMask", {

		init: function(){

			var config = {

				w: Q.width,
				h: Q.height,

				x: Q.width/2,
				y: Q.height/2,

				z: 4,

				opacity: 0.7

			}

			this._super( config );

		},

		draw: function( ctx ){

			ctx.fillRect( -this.p.cx, -this.p.cy, Q.width, Q.height );

		}

	});

	Q.Sprite.extend( "MenuButton", {

		init: function( p ){

			var config = {

				asset: "btn_exit.png",
				type: Q.SPRITE_ACTIVE, 
				z: 3,
				opacity: 0,

				x: p.x,
				y: p.y,

				tweenAnimation: {

					listner: "start",
					animation: { opacity: 1 }, 
					time: 2,
					delay: p.dl

				},

				triggerStart: { trigger: "start" },

				stateChanger: {

					listner: "touch",
					trigger: "stateChanged",
					changes: [

						{ state: "pass", value: false },
						{ state: "plataforms", value: 0 }

					]

				},

				sceneChanger: {

					listner: "stateChanged",
					trigger: "sceneChanged",
					scene: "menu",
					config: { sort: true, gridW: 120, gridH: 120 }

				}

			}

			this._super( config );

			this.add( "tweenAnimation" );
			this.add( "triggerStart" );

			this.add( "stateChanger" );
			this.add( "sceneChanger" );

		}

	});

	// Game Elements
	Q.Sprite.extend( "LauncherBarrel", {
		
		init: function( p ){

			var configs = { 
				
				asset: "spr_launcher_barrel.png", 
				type: Q.SPRITE_ACTIVE,
				z: 3,

				launcher: { listner: "touch", trigger: "launched", object: "Atomic", vx: p.direction.x, vy: p.direction.y }

			};

			this._super( p, configs );
			
			this.add( "direction" );
			this.add( "launcher" );	
			
		}

	});

	Q.Sprite.extend( "ReceiverBarrel", {
		
		init: function( p ){

			var configs = { 
				
				asset: "spr_receiver_barrel.png", 
				type: Q.SPRITE_ACTIVE, 
				z: 3,

				attractor: { trigger: "attracted", object: "Atomic", position: { x: p.direction.x, y: p.direction.y } },
				triggerTimer: { listner: "attracted", trigger: "triggerTimer", time: 150 },
				
				progressSaver: { 

					listner: "attracted",
					trigger: "progressSaved",

					storageArray: "nuclear",
					arrayPositionState: "level",
					states: [ "plataforms" ]

				},

				stateChanger: { 

					listner: "attracted",
					trigger: "stateChanged",

					changes: [

						{ state: "pass", value: true }
					
					]

				},

				sceneChanger: {

					listner: "triggerTimer",
					trigger: "sceneChanged",
					scene: "levelStats",
					config: { sort: true, gridW: 120, gridH: 120 }

				}

			};

			this._super( p, configs );

			this.add( "direction" );

			this.add( "attractor" );
			this.add( "progressSaver" );

			this.add( "triggerTimer");

			this.add( "stateChanger" );
			this.add( "sceneChanger" );

		}

	});

	Q.Sprite.extend( "Atomic", {

		init: function( p ){

			var config = {

				asset: "spr_atomic.png",
				
				tweenAnimation: {

					listner: "rotate", 
					trigger: "rotate",
					animation: { x: 0, y: 0, angle: 360, easing: Q.Easing.Linear }, 
					time: 2

				},

				triggerStart: { trigger: "rotate" },
				
				collider: { trigger: "collided", object: "Block" },
				
				creator: {

					listner: "collided",
					trigger: "created",

					object: { name: "Explosion" }

				},

				destroyer: { listner: "created", trigger: "destroyed" },

				screenCollider: { trigger: "changeState" },

				stateChanger: { 

					listner: "changeState",
					trigger: "changeScene",

					changes: [

						{ state: "pass", value: false },
						{ state: "plataforms", value: 0 }
					
					]

				},

				sceneChanger: {

					listner: "changeScene",
					trigger: "sceneChanged",
					scene: "levelStats",
					config: { sort: true, gridW: 120, gridH: 120 }

				}

			}

			this._super( p, config );	
			
			this.add( "2d" );

			this.add( "tweenAnimation" );	
			this.add( "triggerStart" );

			this.add( "collider" );
			this.add( "creator" );
			this.add( "destroyer" );
			
			this.add( "screenCollider" );
			this.add( "stateChanger" );
			this.add( "sceneChanger" );

		}

	});

	Q.Sprite.extend( "Electron", {

		init: function( p ){

			var config = {

				asset: "spr_electron.png",
				type: Q.SPRITE_ACTIVE,
				z: 2,
				
				tweenAnimation: {

					listner: "rotate", 
					trigger: "rotate",
					animation: { x: 0, y: 0, angle: -360, easing: Q.Easing.Linear }, 
					time: 2

				},

				triggerStart: { trigger: "rotate" }

			}

			this._super( p, config );	
			
			this.add( "tweenAnimation" );	
			this.add( "triggerStart" );

		}

	});

	Q.Sprite.extend( "Explosion", {

		init: function( p ){

			var config = {

				type: Q.SPRITE_ACTIVE,

				sprite: "sht_explosion",
				sheet: "sht_explosion",
				frame: 0,
				
				x: p.x,
				y: p.y,

				z: 3,

				triggerStart: { trigger: "start" },
				sheetAnimation: { listner: "start", animation: "explode" },
				destroyer: { listner: "endAnimation", trigger: "destroyed" }

			}

			this._super( p, config );	
			
			this.add( "destroyer" );
			this.add( "sheetAnimation" );
			this.add( "triggerStart" );
			
		}

	});

	Q.Sprite.extend( "Block", {

		init: function( p ){

			var configs = {

				asset: "spr_block.png", 
				z: 2,

				collider: { trigger: "collided", object: "Atomic" },

				triggerTimer: { listner: "collided", trigger: "timer", time: 1100 },

				stateChanger: { 

					listner: "timer",
					trigger: "stateChanged",

					changes: [

						{ state: "pass", value: false },
						{ state: "plataforms", value: 0 }
					
					]

				},

				sceneChanger: {

					listner: "stateChanged",
					trigger: "sceneChanged",
					scene: "levelStats",
					config: { sort: true, gridW: 120, gridH: 120 }

				}

			}

			this._super( p, configs );

			this.add( "collider" );
			this.add( "triggerTimer" );
			this.add( "stateChanger" );
			this.add( "sceneChanger" );

		}

	});

	Q.Sprite.extend( "Plataform", {

		init: function( p ){

			var configs = { 

				z: 1,
				type: Q.SPRITE_ACTIVE,

				triggerTimer: { listner: "directionChanged", trigger: "timer", time: 100 },
				destroyer: { listner: "endAnimation" }

			};

			this._super( p, configs );

			this.add( "direction" );
			this.add( "shiftPosition" );			
			this.add( "directionChanger" );
			this.add( "tweenAnimations");
			this.add( "triggerTimer");
			this.add( "sheetAnimation" );
			this.add( "destroyer" );

		}

	});

	Q.Sprite.extend( "TouchMask", {

		init: function(){

			var configs = { 
					
				x: Q.width/2, 
				y: Q.height/2, 
				w: Q.width, 
				h: Q.height, 
				type: Q.SPRITE_ACTIVE, 
				z: 1,

				touchItemCreator: {

					object: "Plataform",
					wall: "Block",
					tileW: 120,
					tileH: 120,
					stateItemCount: "plataforms",
						
					triggers: {

						createItem: "itemCreated",
						ajustItem: "itemAjusted"
							
					},

					aroundWall: [

						{ 
							x: 0, 
							y: -1,

							tileY: 0,

							directions: [

								{

									x: 0, 
									lineDirection: { x: 0, y: 1, shiftX: 0, shiftY: 72, w: 30, tw: 100 }, 

									option: {

										sprite: "sht_plataform",
										sheet: "sht_plataform",
										frame: 0,
										direction: { angle: 180, x: 0, y: 1  },
										shiftPosition: { y: -72 },

										directionChanger: {

											tileW: 120,
											tileH: 120,
											trigger: "directionChanged",
											object: "Atomic",
											power: 800,
											friction: -50,
											vx: 0,
											vy: 1,
											position: { x: 0, y: 1 }

										},

										sheetAnimation: { listner: "timer", animation: "destroy_front" },

										tweenAnimations: [

											{
												listner: "directionChanged", 
												animation: { x: 0, y: 20 , angle: 0 }, 
												time: 0.1,
												easing: Q.Easing.Quadratic.Out
											}

										]
											
									} 

								},

								{

									x: -1,
									lineDirection: { x: -1, y: 1, shiftX: 0, shiftY: 72, w: 22.5, tw: 75 }, 

									option: {

										sprite: "sht_plataform",
										sheet: "sht_plataform",
										frame: 11,
										direction: { angle: 180, x: 0, y: 1  },
										shiftPosition: { y: -72 },

										directionChanger: {

											tileW: 120,
											tileH: 120,
											trigger: "directionChanged",
											object: "Atomic",
											power: 800,
											friction: -50,
											vx: -1,
											vy: 1,
											position: { x: 0, y: 1 }

										},

										sheetAnimation: { listner: "timer", animation: "destroy_right" },

										tweenAnimations: [ 

											{
												listner: "directionChanged", 
												animation: { x: 0, y: 20, angle: 20 }, 
												time: 0.1,
												easing: Q.Easing.Quadratic.Out
											}

										]
											
									} 

								},

								{

								    x: 1,
									lineDirection: { x: 1, y: 1, shiftX: 0, shiftY: 72, w: 22.5, tw: 75 }, 

									option: {

										sprite: "sht_plataform",
										sheet: "sht_plataform",
										frame: 22,
										direction: { angle: 180, x: 0, y: 1  },
										shiftPosition: { y: -72 },

										directionChanger: {

											tileW: 120,
											tileH: 120,
											trigger: "directionChanged",
											object: "Atomic",
											power: 800,
											friction: -50,
											vx: 1,
											vy: 1,
											position: { x: 0, y: 1 }

										},

										sheetAnimation: { listner: "timer", animation: "destroy_left" },

										tweenAnimations: [ 

											{
												listner: "directionChanged", 
												animation: { x: 0, y: 20, angle: -20 }, 
												time: 0.1,
												easing: Q.Easing.Quadratic.Out
											}

										]
											
									} 

								}

							]

						},
							
						{ 
							x: 1, 
							y: 0, 

							tileX: 15,

							directions: [

								{

									y: 0, 
									lineDirection: { x: -1, y: 0, shiftX: -72, shiftY: 0, w: 30, tw: 100 },

									option: {

										sprite: "sht_plataform",
										sheet: "sht_plataform",
										frame: 0,
										direction: { angle: 270, x: -1, y: 0 },
										shiftPosition: { x: 72 },

										directionChanger: {

											tileW: 120,
											tileH: 120,
											trigger: "directionChanged",
											object: "Atomic",
											power: 800,
											friction: -50,
											vx: -1,
											vy: 0,
											position: { x: -1, y: 0 }

										},

										sheetAnimation: { listner: "timer", animation: "destroy_front" },

										tweenAnimations: [

											{
												listner: "directionChanged",
												animation: { x: -20, y: 0, angle: 0 }, 
												time: 0.1, 
												easing: Q.Easing.Quadratic.Out 

											}

										]				

									}

								},

								{

									y: -1, 
									lineDirection: { x: -1, y: -1, shiftX: -72, shiftY: 0, w: 22.5, tw: 75 }, 

									option: {

										sprite: "sht_plataform",
										sheet: "sht_plataform",
										frame: 11,
										direction: { angle: 270, x: -1, y: 0 },
										shiftPosition: { x: 72 },

										directionChanger: {

											tileW: 120,
											tileH: 120,
											trigger: "directionChanged",
											object: "Atomic",
											power: 800,
											friction: -50,
											vx: -1,
											vy: -1,
											position: { x: -1, y: 0 }

										},

										sheetAnimation: { listner: "timer", animation: "destroy_right" },

										tweenAnimations: [ 

											{
												listners: "directionChanged", 
												animation: { x: -20, y: 0, angle: 20 }, 
												time: 0.1,
												easing: Q.Easing.Quadratic.Out 
											}

										]
											
									} 

								},

								{

									y: 1, 
									lineDirection: { x: -1, y: 1, shiftX: -72, shiftY: 0, w: 22.5, tw: 75 }, 

									option: {

										sprite: "sht_plataform",
										sheet: "sht_plataform",
										frame: 22,
										direction: { angle: 270, x: -1, y: 0 },
										shiftPosition: { x: 72 },

										directionChanger: {

											tileW: 120,
											tileH: 120,
											trigger: "directionChanged",
											object: "Atomic",
											power: 800,
											friction: -50,
											vx: -1,
											vy: 1,
											position: { x: -1, y: 0 }

										},

										sheetAnimation: { listner: "timer", animation: "destroy_left" },

										tweenAnimations: [

											{
												listner: "directionChanged", 
												animation: { x: -20, y: 0, angle: -20 }, 
												time: 0.1,
												easing: Q.Easing.Quadratic.Out 
											}

										]
											
									} 

								}

							]
							
						},
							
						{ 
							x: 0, 
							y: 1,

							tileY: 8,

							directions: [

								{

									x: 0, 
									lineDirection: { x: 0, y: -1, shiftX: 0, shiftY: -72, w: 30, tw: 100 },

									option: {

										sprite: "sht_plataform",
										sheet: "sht_plataform",
										frame: 0,
										direction: { angle: 0, x: 0, y: -1 },
										shiftPosition: { y: 72 },

										directionChanger: {

											tileW: 120,
											tileH: 120,
											trigger: "directionChanged",
											object: "Atomic",
											power: 800,
											friction: -50,
											vx: 0,
											vy: -1,
											position: { x: 0, y: -1 }

										},

										sheetAnimation: { listner: "timer", animation: "destroy_front" },

										tweenAnimations: [

											{
												listner: "directionChanged", 
												animation: { x: 0, y: -20, angle: 0 }, 
												time: 0.1,
												easing: Q.Easing.Quadratic.Out 
											}

										]

									}

								},

								{

									x: -1, 
									lineDirection: { x: -1, y: -1, shiftX: 0, shiftY: -72, w: 22.5, tw: 75 },

									option: {

										sprite: "sht_plataform",
										sheet: "sht_plataform",
										frame: 22,
										direction: { angle: 0, x: 0, y: -1 },
										shiftPosition: { y: 72 },

										directionChanger: {

											tileW: 120,
											tileH: 120,
											trigger: "directionChanged",
											object: "Atomic",
											power: 800,
											friction: -50,
											vx: -1,
											vy: -1,
											position: { x: 0, y: -1 }

										},

										sheetAnimation: { listner: "timer", animation: "destroy_left" },

										tweenAnimations: [

											{
												listner: "directionChanged", 
												animation: { x: 0, y: -20, angle: -20 }, 
												time: 0.1,
												easing: Q.Easing.Quadratic.Out 
											}

										]

									}

								},

								{

									x: 1, 
									lineDirection: { x: 1, y: -1, shiftX: 0, shiftY: -72, w: 22.5, tw: 75 },

									option: {

										sprite: "sht_plataform",
										sheet: "sht_plataform",
										frame: 11,
										direction: { angle: 0, x: 0, y: -1 },
										shiftPosition: { y: 72 },

										directionChanger: {

											tileW: 120,
											tileH: 120,
											trigger: "directionChanged",
											object: "Atomic",
											power: 800,
											friction: -50,
											vx: 1,
											vy: -1,
											position: { x: 0, y: -1 }

										},

										sheetAnimation: { listner: "timer", animation: "destroy_right" },

										tweenAnimations: [ 

											{
												listner: "directionChanged", 
												animation: { x: 0, y: -20, angle: 20 }, 
												time: 0.1,
												easing: Q.Easing.Quadratic.Out
											}

										]

									}

								}

							]
							
						},
							
						{ 
							x: -1, 
							y: 0, 

							tileX: 0,
							
							directions: [

								{

									y: 0, 
									lineDirection: { x: 1, y: 0, shiftX: 72, shiftY: 0, w: 30, tw: 100 },

									option: {

										sprite: "sht_plataform",
										sheet: "sht_plataform",
										frame: 0,
										direction: { angle: 90, x: 1, y: 0 },
										shiftPosition: { x: -72 },

										directionChanger: {

											tileW: 120,
											tileH: 120,
											trigger: "directionChanged",
											object: "Atomic",
											power: 800,
											friction: -50,
											vx: 1,
											vy: 0,
											position: { x: 1, y: 0 }

										},

										sheetAnimation: { listner: "timer", animation: "destroy_front" },

										tweenAnimations: [

											{
												listner: "directionChanged", 
												animation: { x: 20, y: 0, angle: 0 }, 
												time: 0.1,
												easing: Q.Easing.Quadratic.Out
											}

										]

									} 

								},

								{

									y: -1, 
									lineDirection: { x: 1, y: -1, shiftX: 72, shiftY: 0, w: 22.5, tw: 75 },

									option: {

										sprite: "sht_plataform",
										sheet: "sht_plataform",
										frame: 22,
										direction: { angle: 90, x: 1, y: 0 },
										shiftPosition: { x: -72 },

										directionChanger: {

											tileW: 120,
											tileH: 120,
											trigger: "directionChanged",
											object: "Atomic",
											power: 800,
											friction: -50,
											vx: 1,
											vy: -1,
											position: { x: 1, y: 0 }

										},

										sheetAnimation: { listner: "timer", animation: "destroy_left" },

										tweenAnimations: [

											{
												listner: "directionChanged", 
												animation: { x: 20, y: 0, angle: -20 }, 
												time: 0.1,
												easing: Q.Easing.Quadratic.Out
											}

										]

									}  

								},

								{ 

									y: 1, 
									lineDirection: { x: 1, y: 1, shiftX: 72, shiftY: 0, w: 22.5, tw: 75 },

									option: {

										sprite: "sht_plataform",
										sheet: "sht_plataform",
										frame: 11,
										direction: { angle: 90, x: 1, y: 0 },
										shiftPosition: { x: -72 },

										directionChanger: {

											tileW: 120,
											tileH: 120,
											trigger: "directionChanged",
											object: "Atomic",
											power: 800,
											friction: -50,
											vx: 1,
											vy: 1,
											position: { x: 1, y: 0 }

										},

										sheetAnimation: { listner: "timer", animation: "destroy_right" },

										tweenAnimations: [ 

											{
												listner: "directionChanged", 
												animation: { x: 20, y: 0, angle: 20 }, 
												time: 0.1,
												easing: Q.Easing.Quadratic.Out
											}

										]

									} 

								}

							]
							
						}

					]

				}

			};

			this._super( configs );
			
			this.add( "touchItemCreator" );

		}

	});
		
}