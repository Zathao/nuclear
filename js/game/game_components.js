Quintus.GameComponents = function( Q ){

	// Game Workflow
	Q.component( "stateChanger", {

		added: function(){

			Q._defaults( this.entity.p, {

				stateChanger: {}

			});

			Q._defaults( this.entity.p.stateChanger, {

				listner: "touch",
				trigger: "stateChanged",
				changes: [ { state: "changer", value: 1 } ]

			});

			this.entity.on( this.entity.p.stateChanger.listner, this.entity, "changeState" );

		},

		extend: {

			changeState: function(){

				var changes = this.p.stateChanger.changes;

				for( var i=0; i<changes.length; i++ ){

					var change = changes[ i ];
					Q.state.set( change.state, change.value );


				}

				this.trigger( this.p.stateChanger.trigger );

			}

		}

	});

	Q.component( "sceneChanger", {

		added: function(){

			Q._defaults( this.entity.p, {

				sceneChanger: {}

			});

			Q._defaults( this.entity.p.sceneChanger, {

				listner: "touch",
				trigger: "stateChanged",
				scene: Q.stage().scene.name,
				config: {}

			});

			this.entity.on( this.entity.p.sceneChanger.listner, this.entity, "changeScene" );

		},

		extend: {

			changeScene: function(){

				this.trigger( this.p.sceneChanger.trigger );
				Q.stageScene( this.p.sceneChanger.scene, this.p.sceneChanger.config );

			}

		}

	});

	Q.component( "camera", {

		added: function(){

			Q.stage().add( "viewport" ).follow( this.entity, { x: true, y: true } );

		}

	});

	Q.component( "progressSaver", {

		added: function(){

			Q._defaults( this.entity.p, {

				progressSaver: {}

			});

			Q._defaults( this.entity.p.progressSaver, {

				listner: "touch",
				trigger: "progressSaved",

				storageArray: "game",
				arrayPositionState: "level",
				states: [ "score" ]

			});

			this.entity.on( this.entity.p.progressSaver.listner, this.entity, "saveProgress" );

		},

		extend: {

			saveProgress: function(){

				var progress = JSON.parse( localStorage.getItem( this.p.progressSaver.storageArray ) ) || [];

				for( var i=0; i<this.p.progressSaver.states.length; i++ ){

					var arrayPosition = Q.state.get( this.p.progressSaver.arrayPositionState );
					var state = this.p.progressSaver.states[i];

					progress[ arrayPosition ] = progress[ arrayPosition ] ? progress[ arrayPosition ] : {};

					var savedState = progress[ arrayPosition ][ state ];
					var gameState = Q.state.get( state );

					progress[ arrayPosition ][ state ] = savedState == undefined || gameState < savedState ? gameState : savedState;

				}

				localStorage.setItem( this.p.progressSaver.storageArray, JSON.stringify( progress ) );
				this.trigger( this.p.progressSaver.trigger );

			}

		}

	})

	// Game Mechanics
	Q.component( "launcher", {

		added: function(){

			Q._defaults( this.entity.p, {

				launcher: {}

			});

			Q._defaults( this.entity.p.launcher, {

				listner: "touch",
				trigger: "launched",
				object: this.entity.className,
				vx: 0,
				vy: -1,
				singleRelease: true,
				releaseZ: 1,
				releaseSpeed: 1000,
				friction: -150

			});

			this.entity.on( this.entity.p.launcher.listner, this.entity, "launchObject" );

		},

		extend: {

			launchObject: function(){

				if( this.p.launcher.singleRelease ) this.off( this.p.launcher.listner );

				var x = this.p.x;
				var y = this.p.y;

				var rz = this.p.launcher.releaseZ;

				var ax = this.p.launcher.vx * this.p.launcher.friction;
				var ay = this.p.launcher.vy * this.p.launcher.friction;

				var vx = this.p.launcher.vx * this.p.launcher.releaseSpeed;
				var vy = this.p.launcher.vy * this.p.launcher.releaseSpeed;

				var obj = new Q[ this.p.launcher.object ]( { x: x, y: y, vx: vx, vy: vy, z: rz, ax: ax, ay: ay } );

				this.stage.insert( obj );
				this.trigger( this.p.launcher.trigger );

			}

		}

	});

	Q.component( "collider", {

		added: function(){

			Q._defaults( this.entity.p, {

				collider: {}

			});

			Q._defaults( this.entity.p.collider, {

				trigger: "collided",
				object: this.entity.className

			});

			this.entity.on( "hit", this.entity, "testCollision" );

		},

		extend: {

			testCollision: function( col ){

				if( col.obj.className == this.p.collider.object ){

					this.trigger( this.p.collider.trigger );

				}

			}

		}

	});

	Q.component( "attractor", {

		added: function(){

			Q._defaults( this.entity.p, {

				attractor: {}

			});

			Q._defaults( this.entity.p.attractor, {

				trigger: "attracted",
				object: this.entity.className,
				tileW: 120,
				tileH: 120,
				speed: 4500,
				position: { x: 0, y: 0 }

			});

			this.entity.on( "step", this.entity, "attract" );

		},

		extend: {

			attract: function(){

				var tileX = Math.floor( this.p.x / this.p.attractor.tileW ) + this.p.attractor.position.x;
				var tileY = Math.floor( this.p.y / this.p.attractor.tileH ) + this.p.attractor.position.y;

				var objects = Q( this.p.attractor.object ).items;

				for( var i=0; i<objects.length; i++ ){

					var object = objects[i];

					var objTileX = Math.floor( object.p.x / this.p.attractor.tileW );
					var objTileY = Math.floor( object.p.y / this.p.attractor.tileH );

					if( objTileX == tileX && objTileY == tileY ){

						var speed = this.p.attractor.speed;

						var vx = object.p.vx;
						var vy = object.p.vy;

						var ax = ( this.p.attractor.position.x == 0 ? -1 : 1 ) * ( vx > 0 ? speed : -speed ) * ( vx == 0 ? 0 : 1 );
						var ay = ( this.p.attractor.position.y == 0 ? -1 : 1 ) * ( vy > 0 ? speed : -speed ) * ( vy == 0 ? 0 : 1 );

						object.p.ax = ax;
						object.p.ay = ay;

						this.trigger( this.p.attractor.trigger );
						this.off( "step", this, "attract" );

					}

				}

			}

		}

	});

	Q.component( "touchItemCreator", {

		added: function(){

			Q._defaults( this.entity.p, {

				touchItemCreator: {}

			});

			Q._defaults( this.entity.p.touchItemCreator, {

				tileW: 120,
				tileH:120,

				triggers: {

					createItem: "itemCreated",
					ajustItem: "itemAjusted"

				},

				object: this.entity.className,
				wall: this.entity.className,

				aroundWall: [

					{

						x: 0,
						y: -1,
						directions: [

							{

								x: 0,
								lineDirection: { x: 0, y: 1 },

								option: {}

							}

						]

					}

				]

			});

			this.entity.on( "touch", this.entity, "createItem" );
			this.entity.on( "draw", this.entity, "drawCreatedObjectDirection" );
			this.entity.on( "drag", this.entity, "ajustItem" );
			this.entity.on( "touchEnd", this.entity, "endItemCreator" );

		},

		extend: {

			createItem: function( touch ){

				var tileW = this.p.touchItemCreator.tileW;
				var tileH = this.p.touchItemCreator.tileH;

				var tileX = Math.floor( touch.x / tileW );
				var tileY = Math.floor( touch.y / tileH );

				var x =  tileX * tileW + tileW / 2;
				var y = tileY * tileH + tileH / 2;

				var createdObjects = this.p.touchItemCreator.createdObjects;

				createdObjects = !createdObjects ? [] : createdObjects;
				createdObjects[ x ] = !createdObjects[ x ] ? [] : createdObjects[ x ];

				if( createdObjects[x][y] && !createdObjects[x][y].isDestroyed ) {

					Q.state.dec( this.p.touchItemCreator.stateItemCount, 1 );

					createdObjects[x][y].destroy();
					createdObjects[x][y] = null;

					return;

				}

				var wallAround = this.getWallAround( x, y, tileX, tileY );

				if( !wallAround ) return;

				this.p.touchItemCreator.currentWallAround = wallAround;

				var config = {};
				for( var option in wallAround.directions[0].option ){

					config[ option ] = wallAround.directions[0].option[ option ];

				}

				config.x = x;
				config.y = y;

				var obj = new Q[ this.p.touchItemCreator.object ]( config );
				this.p.touchItemCreator.lastCreatedObject = this.stage.insert( obj );

				this.p.touchItemCreator.objectLineDirection = wallAround.directions[0].lineDirection;
				this.p.touchItemCreator.drawObjectLineDirection = true;

				createdObjects[x][y] = obj;
				this.p.touchItemCreator.createdObjects = createdObjects;

				Q.state.inc( this.p.touchItemCreator.stateItemCount, 1 );
				this.trigger( this.p.touchItemCreator.triggers.createItem );

			},

			getWallAround: function( objX, objY, objTileX, objTileY ){

				var tileW = this.p.touchItemCreator.tileW;
				var tileH = this.p.touchItemCreator.tileH;

				var aroundWall = this.p.touchItemCreator.aroundWall;

				for( var i=0; i<aroundWall.length; i++ ){

					var tileX = aroundWall[i].tileX;
					var tileY = aroundWall[i].tileY;

					if( tileX == objTileX || tileY == objTileY ) return aroundWall[i];

					var x = objX + aroundWall[i].x * tileW;
					var y = objY + aroundWall[i].y * tileH;

					var located = Q.stage().locate( x, y );
					if( located && located.className == this.p.touchItemCreator.wall ) return aroundWall[i];

				}

				return false;

			},

			drawCreatedObjectDirection: function( ctx ){

				if( this.p.touchItemCreator.objectLineDirection && this.p.touchItemCreator.drawObjectLineDirection ){

					var lineXShift = this.p.touchItemCreator.objectLineDirection.shiftX;
					var lineYShift = this.p.touchItemCreator.objectLineDirection.shiftY;

					var objX = this.p.touchItemCreator.lastCreatedObject.p.x + lineXShift;
					var objY = this.p.touchItemCreator.lastCreatedObject.p.y + lineYShift;

					//

					var lineXShift = this.p.touchItemCreator.objectLineDirection.shiftX;
					var lineYShift = this.p.touchItemCreator.objectLineDirection.shiftY;

					var objX = this.p.touchItemCreator.lastCreatedObject.p.x + lineXShift;
					var objY = this.p.touchItemCreator.lastCreatedObject.p.y + lineYShift;

					var lineX = this.p.touchItemCreator.objectLineDirection.x;
					var lineY = this.p.touchItemCreator.objectLineDirection.y;

					var startX = objX - this.p.x;
					var startY = objY - this.p.y;

					var endX = startX + ( Q.width - objX ) * lineX;
					var endY = startY + ( Q.height - objY ) * lineY;

					var lineWidth = this.p.touchItemCreator.objectLineDirection.w;
					var lineTotalWidth = this.p.touchItemCreator.objectLineDirection.tw;

					var shift = this.p.touchItemCreator.objectLineDirection.shift
					this.p.touchItemCreator.objectLineDirection.shift = shift ? ( shift + 3 ) % lineTotalWidth : 1;

					for( var i=0; i<19; i++ ){

						var x = startX + lineTotalWidth * i * lineX;
						var y = startY + lineTotalWidth * i * lineY;

						ctx.beginPath();

						ctx.moveTo( x + shift * lineX, y + shift * lineY );
						ctx.lineTo( x + ( lineWidth + shift ) * lineX, y + ( lineWidth + shift ) * lineY );

						ctx.shadowColor = 'rgba(255,255,0,0.8)';
	      				ctx.shadowBlur = 10;

	      				ctx.lineCap = 'round';
						ctx.lineWidth = 2;
						ctx.strokeStyle = "rgba(255,255,255,0.5)";

						ctx.stroke();
						ctx.closePath();

					}

					//

				}

			},

			ajustItem: function( touch ){

				if( !this.p.touchItemCreator.drawObjectLineDirection ) return;

				var objTileX = Math.floor( this.p.touchItemCreator.lastCreatedObject.p.x / this.p.touchItemCreator.tileW );
				var objTileY = Math.floor( this.p.touchItemCreator.lastCreatedObject.p.y / this.p.touchItemCreator.tileH );

				var touchTileX = Math.floor( touch.x / this.p.touchItemCreator.tileW );
				var touchTileY = Math.floor( touch.y / this.p.touchItemCreator.tileH );

				var keyX = ( touchTileX == objTileX ? 0 : 1 ) * ( touchTileX > objTileX ? 1 : -1 );
				var keyY = ( touchTileY == objTileY ? 0 : 1 ) * ( touchTileY > objTileY ? 1 : -1 );

				var directions = this.p.touchItemCreator.currentWallAround.directions;
				var direction;

				for( var i=0; i<directions.length; i++ ){

					if( directions[i].x == keyX || directions[i].y == keyY )
						direction = directions[i];

				}

				if( !direction ) return;

				this.p.touchItemCreator.objectLineDirection = direction.lineDirection;

				for( var option in direction.option ){

					this.p.touchItemCreator.lastCreatedObject.p[ option ] = direction.option[ option ];

				}

			},

			endItemCreator: function(){

				this.p.touchItemCreator.drawObjectLineDirection = false;

			}

		}

	});

	Q.component( "directionChanger", {

		added: function(){

			Q._defaults( this.entity.p, {

				directionChanger: {}

			});

			Q._defaults( this.entity.p.directionChanger, {

				trigger: "directionChanged",
				object: this.entity.className,
				tileW: 120,
				tileH: 120,
				power: 300,
				friction: 200,
				vx: -1,
				vy: 1,
				position: { x: 0, y: 0 }

			});

			this.entity.on( "step", this.entity, "changeDirection" );

		},

		extend: {

			changeDirection: function(){

				var tileW = this.p.directionChanger.tileW;
				var tileH = this.p.directionChanger.tileH;

				var tileX = Math.floor( this.p.x / tileW ) + this.p.directionChanger.position.x;
				var tileY = Math.floor( this.p.y / tileH ) + this.p.directionChanger.position.y;

				var objects = Q( this.p.directionChanger.object ).items;

				for( var i=0; i<objects.length; i++ ){

					var object = objects[i];

					var objTileX = Math.floor( object.p.x / tileW );
					var objTileY = Math.floor( object.p.y / tileH );

					if( objTileX == tileX && objTileY == tileY ){

						var ajustTileX = objTileX * tileW + tileW/2;
						var ajustTileY = objTileY * tileH + tileH/2;

						object.p.x = ajustTileX;
						object.p.y = ajustTileY;

						object.p.vx = this.p.directionChanger.power * this.p.directionChanger.vx;
						object.p.vy = this.p.directionChanger.power * this.p.directionChanger.vy;

						object.p.ax = this.p.directionChanger.friction * this.p.directionChanger.vx;
						object.p.ay = this.p.directionChanger.friction * this.p.directionChanger.vy;

						this.trigger( this.p.directionChanger.trigger );
						this.off( "step", this, "changeDirection" );

					}

				}

			}

		}

	});

	Q.component( "creator", {

		added: function(){

			Q._defaults( this.entity.p, {

				creator: {}

			});

			Q._defaults( this.entity.p.creator, {

				listner: "touch",
				trigger: "created",

				object: { name: "" }

			});

			this.entity.on( this.entity.p.creator.listner, this.entity, "createObject" );

		},

		extend: {

			createObject: function(){

				this.off( this.p.creator.listner );

				Q.stage().insert( new Q[ this.p.creator.object.name ]( { x: this.p.x, y: this.p.y } ) );
				this.trigger( this.p.creator.trigger );

			}

		}

	});

	Q.component( "destroyer", {

		added: function(){

			Q._defaults( this.entity.p, {

				destroyer: {}

			});

			Q._defaults( this.entity.p.destroyer, {

				listner: "touch",
				trigger: "destroyed"

			});

			this.entity.on( this.entity.p.destroyer.listner, this.entity, "destroyObject" );

		},

		extend: {

			destroyObject: function(){

				this.trigger( this.p.destroyer.trigger );
				Q.stage().remove( this );

			}

		}

	});

	Q.component( "objectsDestroyer", {

		added: function(){

			Q._defaults( this.entity.p, {

				objectsDestroyer: {}

			});

			Q._defaults( this.entity.p.objectsDestroyer, {

				listner: "touch",
				trigger: "destroyed",
				objects: [ this ]

			});

			this.entity.on( this.entity.p.objectsDestroyer.listner, this.entity, "destroyObjects" );

		},

		extend: {

			destroyObjects: function(){

				this.trigger( this.p.objectsDestroyer.trigger );

				var objects = this.p.objectsDestroyer.objects;
				for( var i=0; i<objects.length; i++ ){

					Q( objects[i] ).destroy();

				}

			}

		}

	});

	Q.component( "screenCollider", {

		added: function(){

			Q._defaults( this.entity.p, {

				screenCollider: {}

			});

			Q._defaults( this.entity.p.screenCollider, {

				trigger: "screenCollided"

			});

			this.entity.on( "step", this.entity, this.entity.testScreenCollision );

		},

		extend: {

			testScreenCollision: function( dt ){

				if( this.p.x < 0 || this.p.y < 0 || this.p.x > Q.width || this.p.y > Q.height ){

					this.off( "step", this, this.testScreenCollision );
					this.trigger( this.p.screenCollider.trigger );

				}

			}

		}

	});

	// Images and Animation
	Q.component( "direction", {

		added: function(){

			Q._defaults( this.entity.p, {

				direction: {}

			});

			Q._defaults( this.entity.p.direction, {

				angle: 0,
				x: 0,
				y: -1

			});

			this.entity.p.angle = this.entity.p.direction.angle;

		}

	});

	Q.component( "tweenAnimation", {

		added: function(){

			this.entity.add( "tween" );

			Q._defaults( this.entity.p, {

				tweenAnimation: {}

			});

			Q._defaults( this.entity.p.tweenAnimation, {

				listner: "touch",
				trigger: "animated",
				animation: {},
				time: 0.15,
				delay: 0

			});

			Q._defaults( this.entity.p.tweenAnimation.animation, {

				easing: Q.Easing.Quadratic.Out

			});

			this.entity.on( this.entity.p.tweenAnimation.listner, this.entity, "tweenAnimate" );

		},

		extend: {

			tweenAnimate: function(){

				var config = {};

				if( this.p.tweenAnimation.animation.x )
					config.x = this.p.x + this.p.tweenAnimation.animation.x;

				if( this.p.tweenAnimation.animation.y )
					config.y = this.p.y + this.p.tweenAnimation.animation.y;

				if( this.p.tweenAnimation.animation.angle )
					config.angle = this.p.angle + this.p.tweenAnimation.animation.angle;

				if( this.p.tweenAnimation.animation.opacity )
					config.opacity = this.p.opacity + this.p.tweenAnimation.animation.opacity;

				var dl = this.p.tweenAnimation.delay;
				var cb = function(){ this.trigger( this.p.tweenAnimation.trigger ) };

				this.animate( config, this.p.tweenAnimation.time, this.p.tweenAnimation.animation.easing, { delay: dl, callback: cb } );

			}

		}

	});

	Q.component( "tweenAnimations", {

		added: function(){

			this.entity.add( "tween" );

			Q._defaults( this.entity.p, {

				tweenAnimations: []

			});

			for( var i=0; i<this.entity.p.tweenAnimations.length; i++ ){

				Q._defaults( this.entity.p.tweenAnimations[i], {

					listner: "touch",
					trigger: "animated",
					animation: {},
					time: 0.15,
					delay: 0

				});

				Q._defaults( this.entity.p.tweenAnimations[i].animation, {

					easing: Q.Easing.Quadratic.Out

				});

				var funcName = "animation" + i;

				var evalExp = "this.entity." + funcName + " = function(){ this.runAnimation( " + i + " ) }";
				eval( evalExp )

				this.entity.on( this.entity.p.tweenAnimations[i].listner, this.entity, funcName );

			}

		},

		extend: {

			runAnimation: function( i ){

				var config = {};

				if( this.p.tweenAnimations[i].animation.x )
					config.x = this.p.x + this.p.tweenAnimations[i].animation.x;

				if( this.p.tweenAnimations[i].animation.y )
					config.y = this.p.y + this.p.tweenAnimations[i].animation.y;

				if( this.p.tweenAnimations[i].animation.angle )
					config.angle = this.p.angle + this.p.tweenAnimations[i].animation.angle;

				if( this.p.tweenAnimations[i].animation.opacity )
					config.opacity = this.p.opacity + this.p.tweenAnimations[i].animation.opacity;

				var dl = this.p.tweenAnimations[i].delay;
				var cb = function(){ this.trigger( this.p.tweenAnimations[i].trigger ) };
				var time = this.p.tweenAnimations[i].time;
				var easing = this.p.tweenAnimations[i].easing;

				this.animate( config, time, easing, { delay: dl, callback: cb } );

			}

		}

	});

	Q.component( "sheetAnimation", {

		added: function(){

			this.entity.add( "animation" );

			Q._defaults( this.entity.p, {

				sheetAnimation: {}

			});

			Q._defaults( this.entity.p.sheetAnimation, {

				listner: "touch",
				trigger: "animated",
				animation: ""

			});

			this.entity.on( this.entity.p.sheetAnimation.listner, this.entity, "sheetAnimate" );

		},

		extend: {

			sheetAnimate: function(){

				this.play( this.p.sheetAnimation.animation );
				this.trigger( this.p.sheetAnimation.trigger );

			}

		}

	});

	Q.component( "shiftPosition", {

		added: function(){

			Q._defaults( this.entity.p, {

				shiftPosition: {}

			});

			Q._defaults( this.entity.p.shiftPosition, { x:0 , y: 0 } );

			this.entity.p.x += this.entity.p.shiftPosition.x;
			this.entity.p.y += this.entity.p.shiftPosition.y;

		}

	});

	Q.component( "shadowObject", {

		added: function(){

			Q._defaults( this.entity.p, {

				shadowObject: {}

			});

			Q._defaults( this.entity.p.shadowObject, { object: this.entity.className } );

			var x = this.entity.p.x;
			var y = this.entity.p.y;

			this.entity.p.createdShadowObject = Q.stage().insert( new Q[ this.entity.p.shadowObject.object ]( { x: x, y: y } ) );
			this.entity.p.createdShadowObject.on( "step", this.entity, "fallowObject" );

		},

		extend: {

			fallowObject: function( dt ){

				this.p.createdShadowObject.p.x = this.p.x;
				this.p.createdShadowObject.p.y = this.p.y;

			}

		}

	});

	Q.component( "mask", {

		added: function(){

			Q._defaults( this.entity.p, {

				mask: {}

			});

			Q._defaults( this.entity.p.mask, {

				listners: { show: "show", hide: "hide" },
				asset: this.entity.p.asset

		 	});

		 	this.entity.on( this.entity.p.mask.listners.show, this.entity, "showMask" );
		 	this.entity.on( this.entity.p.mask.listners.hide, this.entity, "hideMask" );
		 	this.entity.on( "draw", this.entity, "drawMask" );

		},

		extend: {

			showMask: function(){

				this.p.mask.draw = true;

			},

			hideMask: function(){

				this.p.mask.draw = false;

			},

			drawMask: function( ctx ){

				if( !this.p.mask.draw ) return;

				var maskImage = Q.assets[ this.p.mask.asset ];
				ctx.drawImage( maskImage, -this.p.cx, -this.p.cy );

			}

		}

	});

	Q.component( "objectMover", {

		added: function(){

			Q._defaults( this.entity.p, {

				objectMover: {}

			});

			Q._defaults( this.entity.p.objectMover, {

				listner: "touch",
				object: this.entity.className,
				position: { x: 0, y: 0 },
				easing: Q.Easing.Quadratic.In,
				time: 1,
				delay: 0

			});

			this.entity.on( this.entity.p.objectMover.listner, this.entity, "moveObject" );

		},

		extend: {

			moveObject: function(){

				var objects = Q( this.p.objectMover.object ).items;
				for( var i=0; i<objects.length; i++ ){

					if( objects[i].p.cantMove ) continue;
					objects[i].p.cantMove = true;

					var config = {};

					if( this.p.objectMover.position.x )
						config.x = objects[i].p.x + this.p.objectMover.position.x;

					if( this.p.objectMover.position.y )
						config.y = objects[i].p.y + this.p.objectMover.position.y;

					var dl = this.p.objectMover.delay;
					var cb = function(){ this.p.cantMove = false };

					if( !objects[i].has( "tween" ) ) objects[i].add( "tween" );
					objects[i].animate( config, this.p.objectMover.time, this.p.objectMover.easing, { delay: dl, callback: cb } );

				}

			}

		}

	});

	Q.component( "iconGenerator", {

		added: function(){

			Q._defaults( this.entity.p, {

				iconGenerator: {}

			});

			Q._defaults( this.entity.p.iconGenerator, {

				border: { color: "white", width: 3 },
				shadow: { color: "white", width: 0 },
				text: []

			});

			this.entity.on( "draw", this.entity, "generateIcon" );

		},

		extend: {

			generateIcon: function( ctx ){

				ctx.lineWidth = this.p.iconGenerator.border.width;
				ctx.strokeStyle = this.p.iconGenerator.border.color;

				ctx.strokeRect( this.p.cx, -this.p.cy, -this.p.w, this.p.h );

				var texts = this.p.iconGenerator.text;
				for( var i=0; i<texts.length; i++ ){

					var text = texts[ i ];

					ctx.fillStyle = text.color;
					ctx.font = "normal " + text.size + "pt Georgia";
					ctx.textAlign = "center";

					ctx.fillText( text.label, text.x, text.y );

				}

			}

		}

	});

	Q.component( "textSheetGenerator", {

		added: function(){

			Q._defaults( this.entity.p, {

				textSheetGenerator: {}

			});

			Q._defaults( this.entity.p.textSheetGenerator, {

				sheet: "",
				tileW: 128,
				tileH: 200,
				scale: 1,

				text: "text",

				keySheetMap: {

					A: { sx: 0, sy: 0 }

				}

			});

			this.entity.on( "draw", this.entity, "generateTextSheet" );

		},

		extend: {

			generateTextSheet: function( ctx ){

				var tileW = this.p.textSheetGenerator.tileW;
				var tileH = this.p.textSheetGenerator.tileH;

				var scale = this.p.textSheetGenerator.scale;

				var fontsImage = Q.assets[ this.p.textSheetGenerator.sheet ];
				var text = this.p.textSheetGenerator.text;

				for( var i in text ){

					var sx = this.p.textSheetGenerator.keySheetMap[ text.charAt( i ) ].sx * tileW;
					var sy = this.p.textSheetGenerator.keySheetMap[ text.charAt( i ) ].sy * tileH;

					var cx = ( tileW * scale * text.length ) / 2;
					var x = -cx + i * tileW * scale;

					ctx.drawImage( fontsImage, sx, sy, tileW, tileH, x, -this.p.cy, tileW * scale, tileH * scale );

				}

			}

		}

	});

	// Components Interaction
	Q.component( "triggerTimer", {

		added: function(){

			Q._defaults( this.entity.p, {

				triggerTimer: {}

			});

			Q._defaults( this.entity.p.triggerTimer, {

				listner: "touch",
				trigger: "timer",
				time: 1000

		 	});

		 	this.entity.on( this.entity.p.triggerTimer.listner, this.entity, "startTimer" );

		},

		extend: {

			startTimer: function(){

				this.p.triggerTimer.start = new Date();
				this.on( "step", this, "checkTimer" );

			},

			checkTimer: function(){

				var start = this.p.triggerTimer.start;
				var now = new Date();

				var time = this.p.triggerTimer.time;

				if( now - start >= time ){

					this.off( "step", this, "checkTimer" );
					this.trigger( this.p.triggerTimer.trigger );

				}

			}

		}

	});

	Q.component( "triggerStart", {

		added: function(){

			Q._defaults( this.entity.p, {

				triggerStart: {}

			});

			Q._defaults( this.entity.p.triggerStart, {

				trigger: "triggerStart"

		 	});

		 	this.entity.trigger( this.entity.p.triggerStart.trigger );

		}

	});

	Q.component( "objectTrigger", {

		added: function(){

			Q._defaults( this.entity.p, {

				objectTrigger: {}

			});

			Q._defaults( this.entity.p.objectTrigger, {

				listner: "touch",
				trigger: "objectTriggered",

				target: [ this ],
				targetTrigger: "touch"

		 	});

		 	this.entity.on( this.entity.p.objectTrigger.listner, this.entity, "triggerObject" );

		},

		extend: {

			triggerObject: function(){

				Q( this.p.objectTrigger.target ).trigger( this.p.objectTrigger.targetTrigger );
				this.trigger( this.p.objectTrigger.trigger );

			}

		}

	});

	Q.component( "interrupter", {

		added: function(){

			Q._defaults( this.entity.p, {

				interrupter: {}

			});

			Q._defaults( this.entity.p.interrupter, {

				state: "on",
				listner: "touch",
				triggers: { on: "on", off: "off" }

		 	});

		 	this.entity.on( this.entity.p.interrupter.listner, this.entity, "changeInterrupterState" );
		 	this.entity.trigger( this.entity.p.interrupter.triggers[ this.entity.p.interrupter.state ] );

		},

		extend: {

			changeInterrupterState: function(){

				this.p.interrupter.state = this.p.interrupter.state == "on" ? "off" : "on";
				this.trigger( this.p.interrupter.triggers[ this.p.interrupter.state ]  );

			}

		}

	});

	// Sound
	Q.component( "soundFinisher", {

		added: function(){

			Q._defaults( this.entity.p, {

				soundFinisher: {}

			});

			Q._defaults( this.entity.p.soundFinisher, {

				name: "snd_nuclear.mp3",
				listner: "touch",
				trigger: "soundFinished"

		 	});

		 	this.entity.on( this.entity.p.soundFinisher.listner, this.entity, "finishSound" );

		},

		extend: {

			finishSound: function(){

				Q.audio.stop( this.p.soundFinisher.name );
				Q.audio.enableWebAudioSound();

				this.trigger( this.p.soundFinisher.trigger );

			}

		}

	});

	Q.component( "soundInitializer", {

		added: function(){

			Q._defaults( this.entity.p, {

				soundInitializer: {}

			});

			Q._defaults( this.entity.p.soundInitializer, {

				name: "snd_nuclear.mp3",
				loop: true,
				listner: "touch",
				trigger: "soundInitialized"

		 	});

		 	this.entity.on( this.entity.p.soundInitializer.listner, this.entity, "initializeSound" );

		},

		extend: {

			initializeSound: function(){

				Q.audio.play( this.p.soundInitializer.name, { loop: this.p.soundInitializer.loop } );
				this.trigger( this.p.soundInitializer.trigger );

			}

		}

	});

}
