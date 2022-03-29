Quintus.GameScenes = function( Q ){

	Q.scene( "menu", function( stage ){

		// Background
		stage.insert( new Q.Repeater( { asset: "spr_grid.png", speedX: 0.5, speedY: 0.225, z: 0 } ) );

		// Getting the screen width and height
		var w = Q.width;
		var h = Q.height;

		// Main
		stage.insert( new Q.NuclearTitle() );

		stage.insert( new Q.NavigationButton( { label: "PLAY", scale: 0.6, x: w/2, y: h/2, mx: w, my: h, dl: 2 } ) );
		stage.insert( new Q.NavigationButton( { label: "TUTORIAL", scale: 0.4, x: w/2, y: h/2+120, mx: w, my: -h, dl: 2.5 } ) );
		stage.insert( new Q.NavigationButton( { label: "CREDITS", scale: 0.3, x: w/2, y: h/2+240, mx: 0, my: -h, dl: 3 } ) );

		var musicButton = stage.insert( new Q.MusicButton( { x: Q.width/2 + 420, y: Q.height/2 + 360, dl: 3.5 } ) );

		var playingSounds = Q.audio.playingSounds;
		var isPlaying = false;

		for( i in playingSounds ){

			if( playingSounds[i].assetName == "snd_nuclear.mp3" )
				isPlaying = true;

		}

		if( !isPlaying )
			musicButton.trigger( "off" );

		// Arcade Levels
		var pages = Math.ceil( Q.levels.length/8 );
		for( var i=1; i<= pages; i++ ){

			stage.insert( new Q.Label( { label: "SELECT_LEVEL", scale: 0.4, x: w*i + w/2 , y: h + 180 } ) );

			if( i>1 )
				stage.insert( new Q.NavigationButton( { label: "<<", scale: 0.2, x: w*i + w/2-300, y: +h+h/2+240, mx: -w, my: 0, dl: 0 } ) );

			if( i<pages )
				stage.insert( new Q.NavigationButton( { label: ">>", scale: 0.2, x: w*i + w/2+300, y: +h+h/2+240, mx: w, my: 0, dl: 0 } ) );

			stage.insert( new Q.NavigationButton( { label: "BACK_TO_MENU", scale: 0.2,x: w*i + w/2, y: +h+h/2+360, mx: -w*i, my: -h, dl: 0 } ) );


		}

		var progress = JSON.parse( localStorage.getItem( "nuclear" ) ) || [];
		var completed = progress.length;

		for( var i=0; i<Q.levels.length; i++ ){

			var screenShift = Math.ceil( ( i + 1 ) / 8 );

			var x = w * screenShift + 780 + i%4 * 120;
			var y = h + 420 + ( Math.floor( i/4 ) % 2 ) * 120;

			var level = stage.insert( new Q.LevelButton( { x: x, y: y, w: 120, h: 120 } ) );

			if( completed >= i ){

				level.p.stateChanger = {

					listner: "touch",
					trigger: "stateChanged",
					changes: [ { state: "level", value: i } ]

				};

				level.p.sceneChanger = {

					listner: "stateChanged",
					trigger: "sceneChanged",
					scene: "levelInformation",
					config: { sort: true, gridW: 120, gridH: 120 }

				};

				level.add( "stateChanger" );
				level.add( "sceneChanger" );

			}

			stage.insert( new Q.Sprite( { x: x, y: y, asset: "spr_atomic.png", angle: 0.8, opacity: 0.1, z: 1 } ) );
			stage.insert( new Q.Label( { label: ( ( i + 1 ) + "" ), scale: 0.3, x: x, y: y - 15, dl: 0, opacity: ( completed >= i ? 1 : 0.1 ) } ) );

			var completedStar = completed > i;
			var plataformsStar = completedStar && progress[ i ] && progress[ i ].plataforms <= Q.levels[i].plataforms + Math.ceil( Q.levels[i].plataforms * 0.5 );
			var pefectStar = completedStar && progress[ i ] && progress[ i ].plataforms <= Q.levels[i].plataforms;

			var stars = ( completedStar ? "*" : "" ) + ( plataformsStar ? "*" : "" ) + ( pefectStar ? "*" : "" );
			stage.insert( new Q.Label( { label: ( stars + "" ), scale: 0.2, x: x, y: y + 30, dl: 0 } ) );

		}

		// Tutorial
		for( var i=1; i<=10; i++ ){

			if( i>1 )
				stage.insert( new Q.NavigationButton( { label: "<", scale: 0.4, x: w*i + w/2-300, y: -h+h/2+240, mx: -w, my: 0, dl: 0 } ) );

			if( i<10 )
				stage.insert( new Q.NavigationButton( { label: ">", scale: 0.4, x: w*i + w/2+300, y: -h+h/2+240, mx: w, my: 0, dl: 0 } ) );

			stage.insert( new Q.NavigationButton( { label: "BACK", scale: 0.4,x: w*i + w/2, y: -h+h/2+360, mx: -w*i, my: h, dl: 0 } ) );

		}

		var texts = [

			[

				"YOUR_OBJECTIVE_IS_TO_MOVE",
				"THE_ATOM_TO_THE_GREEN_BARREL.",
				"CLICK_IN_THE_BLUE_BARREL",
				"TO_RELEASE_THE_ATOM."

			],

			[

				"HERE_IT_IS.",
				"BE_CAREFUL",
				"HE_IS_VERY_UNSTABLE."

			],

			[

				"IF_THE_ATOM_TOUCHES_THE_BLOCKS",
				"HE_WILL_EXPLODE."

			],

			[

				"YOU_CAN_ONLY_CHANGE_ITS_DIRECTION",
				"WITH_THE_PLATAFORMS"

			],

			[

				"PLATAFORMS_CAN_ONLY_BE_CREATED",
				"NEAR_THE_BLOCKS."

			],

			[

				"TAP_TO_CREATE_OR_DELETE",
				"A_PLATAFORM."

			],

			[

				"TAP_AND_MOVE",
				"TO_CHANGE_ITS_DIRECTION."

			],

			[

				"PLATAFORMS_ARE_DESTROYED",
				"AFTER_TOUCH_THE_ATOM."

			],

			[

				"BE_SURE_TO_SET_THE_ALL_THE",
				"PLATAFORMS_YOU_WILL",
				"NEED_BEFORE",
				"THE_ATOM_BE_RELEASED."

			],

			[

				"AND_TRY_TO_USE",
				"AS_FEW_PLATAFORM_AS_POSSIBLE",
				"TO_HAVE_A_PERFECT_SCORE."

			]

		];

		for( var i=0; i<texts.length; i++ ){
			for( var j=0; j<texts[i].length; j++ ){

				var text = texts[i][j];
				stage.insert( new Q.Label( { label: text, scale: 0.2, x: w*(i+1)+w/2 , y: -h+180+60*j, dl: 0 } ) );

			}
		}

		var images = [

			[

				{ asset: "spr_launcher_barrel.png", x: w/2-180*2, y: h/2, angle: 90, z: 1 },
				{ asset: "spr_receiver_barrel.png", x: w/2+180*2, y: h/2, angle: -90, z: 1 }

			],

			[

				{ asset: "spr_launcher_barrel.png", x: w/2-180*2, y: h/2, angle: 90, z: 1 },
				{ asset: "spr_atomic.png", x: w/2-120, y: h/2, angle: 0, z: 1 },
				{ asset: "spr_receiver_barrel.png", x: w/2+180*2, y: h/2, angle: -90, z: 1 }

			],

			[

				{ asset: "spr_block.png", x: w/2+180, y: h/2-120, angle: 0, z: 1 },
				{ asset: "spr_block.png", x: w/2+180, y: h/2, angle: 0, z: 1 },
				{ asset: "spr_block.png", x: w/2+180, y: h/2+120, angle: 0, z: 1 },

				{ asset: "spr_explosion.png", x: w/2+120, y: h/2, angle: 0, z: 1 }

			],

			[

				{ asset: "spr_plataform_front.png", x: w/2, y: h/2, angle: 0, z: 1 },

			],

			[

				{ asset: "spr_block.png", x: w/2, y: h/2, angle: 0, z: 1 },

			],

			[

				{ asset: "spr_line_front.png", x: w/2+225, y: h/2, angle: 0, z: 1 },
				{ asset: "spr_plataform_front.png", x: w/2+47, y: h/2, angle: 90, z: 1 },
				{ asset: "spr_block.png", x: w/2, y: h/2, angle: 0, z: 1 },

			],

			[

				{ asset: "spr_line_front.png", x: w/2+180, y: h/2+5, angle: 45, z: 1 },
				{ asset: "spr_plataform_right.png", x: w/2-20, y: h/2-120, angle: 90, z: 1 },
				{ asset: "spr_block.png", x: w/2-60, y: h/2-120, angle: 0, z: 1 },

			],

			[

				{ sheet: "sht_plataform", frame: 5, x: w/2-220, y: h/2, angle: 90, z: 1 },
				{ asset: "spr_block.png", x: w/2-300, y: h/2, angle: 0, z: 1 },

				{ asset: "spr_atomic.png", x: w/2, y: h/2, angle: 0, z: 1 }

			],

			[

				{ asset: "spr_plataform_front.png", x: w/2-210, y: h/2, angle: 90, z: 1 },
				{ asset: "spr_plataform_left.png", x: w/2+259, y: h/2, angle: -90, z: 1 },

				{ asset: "spr_block.png", x: w/2-300, y: h/2, angle: 0, z: 1 },
				{ asset: "spr_block.png", x: w/2+300, y: h/2, angle: 0, z: 1 },

				{ asset: "spr_atomic.png", x: w/2, y: h/2, angle: 0, z: 1 }

			],

			[

				{ asset: "spr_score.png", x: w/2, y: h/2, angle: 0, z: 1 }

			]

		];

		for( var i=0; i<images.length; i++ ){
			for( var j=0; j<images[i].length; j++ ){

				var image = images[i][j];

				var config = {

					x: w*(i+1)+image.x,
					y: -h+image.y,
					angle: image.angle,
					z: image.z

				}

				if( image.asset ){

					config.asset = image.asset;

				} else {

					config.sheet = image.sheet;
					config.frame = image.frame;

				}

				stage.insert( new Q.Sprite( config ) );

			}
		}

		// Credits
		texts = [

			{ value: "GAME_DESIGN", scale: 0.4 },
			{ value: "_", scale: 0.4 },
			{ value: "_", scale: 0.4 },
			{ value: "MAYCKON_BERNARDES", scale: 0.2 },
			{ value: "_", scale: 0.4 },
			{ value: "LUCAS_LORENZATTI", scale: 0.2 },
			{ value: "_", scale: 0.4 },
			{ value: "_", scale: 0.4 },
			{ value: "_", scale: 0.4 },
			{ value: "_", scale: 0.4 },
			{ value: "PROGRAMMING_AND_MUSIC", scale: 0.4 },
			{ value: "_", scale: 0.4 },
			{ value: "_", scale: 0.4 },
			{ value: "MAYCKON_BERNARDES", scale: 0.2 },
			{ value: "_", scale: 0.4 },
			{ value: "_", scale: 0.4 },
			{ value: "_", scale: 0.4 },
			{ value: "_", scale: 0.4 },
			{ value: "ARTISTIC_DESIGN", scale: 0.4 },
			{ value: "_", scale: 0.4 },
			{ value: "_", scale: 0.4 },
			{ value: "LUCAS_LORENZATTI", scale: 0.2 }

		];

		for( var i=0; i<texts.length; i++ ){

			var text = texts[i];
			stage.insert( new Q.Label( { label: text.value, scale: text.scale, x: w/2 , y: -h+180+30*i, dl: 0 } ) );

		}

		stage.insert( new Q.NavigationButton( { label: "BACK", scale: 0.3, x: w/2, y: -h+h/2+420, mx: 0, my: h, dl: 0 } ) );

		// Dinamics
		stage.insert( new Q.Camera() );

	});

	Q.scene( "levelInformation", function( stage ){

		var w = Q.width;
		var h = Q.height;

		var level = Q.state.get( "level" );
		var plataforms = Q.levels[ level ].plataforms;

		var perfect = plataforms + "";

		stage.insert( new Q.Sprite( { asset: "spr_grid.png", x: Q.width/2, y: Q.height/2, type: Q.SPRITE_UI } ) );
		stage.insert( new Q.Label( { label: "STAGE_" + ( level + 1 ), scale: 1, x: w/2, y: 245, dl: 0 } ) );

		stage.insert( new Q.Label( { label: "USE", scale: 0.3, x: w/2, y: h/2, dl: 1 } ) );
		stage.insert( new Q.Label( { label: perfect + ( perfect > 1 ? "_PLATAFORMS" : "_PLATAFORM" ), scale: 0.5, x: w/2, y: h/2 + 120, dl: 1.5 } ) );
		stage.insert( new Q.Label( { label: "OR_LESS_TO_PERFECT_SCORE", scale: 0.2, x: w/2, y: h/2 + 240, dl: 2 } ) );

		var obj = stage.insert( new Q.Sprite({

			w: 0,
			h: 0,

			triggerStart: { trigger: "start" },

			triggerTimer: { listner: "start", trigger: "timer", time: 3500 },

			sceneChanger: {

				listner: "timer",
				trigger: "sceneChanged",
				scene: "game",
				config: { sort: true, gridW: 120, gridH: 120 }

			}

		}));

		obj.add( "sceneChanger" );
		obj.add( "triggerTimer");
		obj.add( "triggerStart" );

	});

	Q.scene( "game", function( stage ){

		// HUD
		stage.insert( new Q.MenuButton( { x: 60, y: 60, dl: 0 } ) );

		var musicButton = stage.insert( new Q.MusicButton( { x: Q.width/2 + 900, y: Q.height/2 + 480, dl: 0 } ) );

		var playingSounds = Q.audio.playingSounds;
		var isPlaying = false;

		for( i in playingSounds ){

			if( playingSounds[i].assetName == "snd_nuclear.mp3" )
				isPlaying = true;

		}

		if( !isPlaying )
			musicButton.trigger( "off" );

		// Level
		Q.generateLevel( Q.state.get( "level" ), stage );
		stage.insert( new Q.TouchMask() );

	});

	Q.scene( "levelStats", function( stage ){

		var w = Q.width;
		var h = Q.height;

		var label;

		var configButtonNextLevel;
		var configButtonMenu;

		var pass = Q.state.get( "pass" );

		if( pass ){

			var stars;

			var level = Q.state.get( "level" );
			var plataforms = Q.levels[ level ].plataforms;

			var good = plataforms + Math.ceil( plataforms * 0.5 ) + "";
			var perfect = plataforms + "";

			var passedPlataforms = Q.state.get( "plataforms" );
			if( passedPlataforms <= perfect ){

				label = "PERFECT";
				stars = "***";

			} else if( passedPlataforms <= good ){

				label = "GOOD";
				stars = "**";


			} else {

				label = "YOU_PASS";
				stars = "*";

			}

			stage.insert( new Q.Label( { label: label, scale: 1, x: w/2, y: 245, dl: 0 } ) );
			stage.insert( new Q.Label( { label: stars, scale: 0.5, x: w/2, y: 245 + 170, dl: 0.5 } ) );

			var nextLevel = Q.state.get( "level" ) + 1;
			if( nextLevel < Q.levels.length ){

				var configButtonNextLevel = {

					label: "NEXT_LEVEL",
					scale: 0.4,
					x: w/2,
					y: h/2 + 120,
					dl: 1,
					scene: "levelInformation",

					changes: [

						{ state: "pass", value: false },
						{ state: "plataforms", value: 0 },
						{ state: "level", value: nextLevel }

					]

				};

				stage.insert( new Q.ChangeSceneAndStateButton( configButtonNextLevel ) );

			}

			configButtonPlayAgain = {

				label: "PLAY_AGAIN",
				scale: 0.3,
				x: w/2,
				y: h/2 + 240,
				dl: 1.5,
				scene: "levelInformation",

				changes: [

					{ state: "pass", value: false },
					{ state: "plataforms", value: 0 }

				]

			};

			configButtonMenu = {

				label: "BACK_TO_MENU",
				scale: 0.2,
				x: w/2,
				y: h/2 + 360,
				dl: 2,
				scene: "menu",

				changes: [

					{ state: "pass", value: false },
					{ state: "plataforms", value: 0 }

				]

			};

		} else {

			configButtonPlayAgain = {

				label: "PLAY_AGAIN",
				scale: 0.3,
				x: w/2,
				y: h/2,
				dl: 1,
				scene: "game",

				changes: [

					{ state: "pass", value: false },
					{ state: "plataforms", value: 0 }

				]

			};

			configButtonMenu = {

				label: "BACK_TO_MENU",
				scale: 0.2,
				x: w/2,
				y: h/2 + 120,
				dl: 1.5,
				scene: "menu",

				changes: [

					{ state: "pass", value: false },
					{ state: "plataforms", value: 0 }

				]

			};

			stage.insert( new Q.Label( { label: "FAILED", scale: 1, x: w/2, y: 245, dl: 0 } ) );

		}

		stage.insert( new Q.ChangeSceneAndStateButton( configButtonPlayAgain ) );
		stage.insert( new Q.ChangeSceneAndStateButton( configButtonMenu ) );

		stage.insert( new Q.Sprite( { asset: "spr_grid.png", x: Q.width/2, y: Q.height/2, type: Q.SPRITE_UI } ) );

	});

}
