Quintus.GameAnimations = function( Q ){

	Q.createAnimations = function(){

		Q.animations( "sht_plataform", {

			destroy_front: { frames: [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ], rate: 1/20, loop: false, trigger: "endAnimation" },
			destroy_right: { frames: [ 12, 13, 14, 15, 16, 17, 18, 19, 20 ], rate: 1/20, loop: false, trigger: "endAnimation" },
			destroy_left: { frames: [ 23, 24, 25, 26, 27, 28, 29, 30, 31 ], rate: 1/20, loop: false, trigger: "endAnimation" }

		});

		Q.animations( "sht_explosion", {

			explode: { frames: [ 1, 2, 3, 4, 5, 7, 9, 10, 11 ], rate: 1/8, loop: false, trigger: "endAnimation" }

		});

		Q.animations( "sht_tutorial_hand", {

			click: { frames: [ 0, 1 ], rate: 1, loop: true, trigger: "endAnimation" },
			drag: { frames: [ 0, 1, 2 ], rate: 1, loop: true, trigger: "endAnimation" }

		});

	}

}