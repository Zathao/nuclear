window.addEventListener( "load", function() {

	// Creating the Engine Instance
	Q = new Quintus( { development: true } );

	// Loading Quintus and Sharfox Modules
	Q.include( "Sprites, Anim, Scenes, 2D, Touch, UI, Audio" );
	Q.include( "Strecher" );

	// Loading Game Modules
	Q.include( "GameSpriteSheets, GameAnimations, GameClasses, GameComponents, GameScenes, GameLevels" );

	// Initializing the Engine
	Q.setup( { width: 1920, height: 1080 } );

	// Force the Canvas Strech
	Q.strech();

	// Enable Touch Functions
	Q.touch( Q.SPRITE_ACTIVE );

	// Enable Sound System
	Q.enableSound();

	// Creating the Asset List
	Q.preload( "spr_grid.png" );
	Q.preload( "sht_fonts.png" );
	Q.preload( "sht_tutorial_hand.png" );

	Q.preload( "btn_sound.png" );
	Q.preload( "btn_music.png" );
	Q.preload( "spr_bar.png" );
	
	Q.preload( "spr_atomic.png" );
	Q.preload( "spr_electron.png" );
	Q.preload( "spr_launcher_barrel.png" );
	Q.preload( "spr_receiver_barrel.png" );	
	Q.preload( "spr_block.png" );
	Q.preload( "btn_exit.png" );

	Q.preload( "spr_plataform_front.png" );
	Q.preload( "spr_plataform_left.png" );
	Q.preload( "spr_plataform_right.png" );

	Q.preload( "sht_plataform.png" );
	Q.preload( "sht_explosion.png" );
	
	Q.preload( "spr_explosion.png" );
	Q.preload( "spr_line_front.png" );
	Q.preload( "spr_score.png" );

	Q.preload( "snd_nuclear.mp3" );
	
	// Loading the Assets and Starting the Game
	Q.preload( function(){

		Q.audio.play( "snd_nuclear.mp3", { loop: true } );

		Q.createSpriteSheets();
		Q.createAnimations();

		Q.gravityY = 0;
		Q.state.reset( { level: 0, plataforms: 0 } );

		Q.stageScene( "menu", { sort: true, gridW: 120, gridH: 120 } );

	}, {
	 	
	 	progressCallback: function( loaded, total ) {

	    	var element = document.getElementById( "loading" );
	   		element.innerHTML = "Loading: " + Math.floor( loaded / total * 100 ) + "%";

	 	}

	});
	
}); 