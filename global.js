//fuzzywobble

var CUBE_PLAYING = ""; //set the current cube playing

var MODE = "menu"; 
//menu – at main menu
//dancer – individual daancer
//group – all dancers
//group2 - all dancers cambridge
var MP3;
MP3 = new Howl({
  src: ['mp3/atnt.mp3'],
  autoplay: true,loop: true,volume: 1.0,
});

var ON_GROUP = false;
var ON_GROUP2 = false;

//three.js global vars, dancer
var CONTROLS;
var CAMERA;
var SCENE;
var RENDERER;
var CLOCK = new THREE.Clock();
var MIXERS = [];

//three.js global vars, menu
var CONTROLS_MENU;
var CAMERA_MENU;
var SCENE_MENU;
var RENDERED_MENU;

//three.js global vars, group
var CONTROLS_GROUP;
var CAMERA_GROUP;
var SCENE_GROUP;
var RENDERED_GROUP;
var CLOCK_GROUP = new THREE.Clock();
var MIXERS_GROUP = [];

//three.js global vars, group2
var CONTROLS_GROUP2;
var CAMERA_GROUP2;
var SCENE_GROUP2;
var RENDERED_GROUP2;
var CLOCK_GROUP2 = new THREE.Clock();
var MIXERS_GROUP2 = [];



if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

//check if mobile




//DOCUMENT READY
$(document).ready(function(){

	init_cubes();

	$(".about_content").hide();
	$(".change_dancer").hide();
	$(".control_instructions").hide();
	$(".about").hide();
	$(".loading").hide();
	$("#vid").hide();

	responsive_ui();

	$(".whiteout").fadeOut(200);

	$('#canvas_menu').click(function(){ //click on cube to load dancer or group

		if(MODE=="menu"){ //make sure we on menu

			if(CUBE_PLAYING!=""){ //only register clicks if we are hovering a cube

				$('body,html').css('cursor','default');
				$(".about").show();
				$(".change_dancer").show();
				$(".control_instructions").show();
				$(".equalizer").hide();
				$(".loading").show();
				responsive_ui();

				cancelAnimationFrame( animation_id_cubes );

				$("#canvas_menu").hide();

				MP3.stop();

				$("#grad_bg").removeClass("grad_0").removeClass("grad_1").removeClass("grad_2").removeClass("grad_3");

				if(ON_GROUP==true){
					$("#vid").show();
					$("#grad_bg").css("opacity",0.76);
					$("#grad_bg").addClass("grad_2");
					$("#canvas_dancer").hide();
					$("#canvas_group2").hide();
					$("#canvas_group").show();
					MODE = "group";
					init_group(); 
				}else if(ON_GROUP2==true){
					$("#vid").show();
					$("#grad_bg").css("opacity",0.60);
					$("#grad_bg").addClass("grad_3");
					$("#canvas_dancer").hide();
					$("#canvas_group").hide();
					$("#canvas_group2").show();
					MODE = "group2";
					init_group2(); 
				}else{
					console.log(CUBE_PLAYING.yt);
					if(CUBE_PLAYING.yt){
						$("#vid").show();	
						$("#grad_bg").css("opacity",0.65);
					}else{
						$("#vid").hide();
						$("#grad_bg").css("opacity",1.0);
					}
					$("#grad_bg").addClass("grad_1");
					$("#canvas_group").hide();
					$("#canvas_group2").hide();
					$("#canvas_dancer").show();
					MODE = "dancer";
					init_dancer();
					load_dancer();
				}

			}

		}

	});

	$(".change_dancer").click(function(){  //click button to go to menu

		$(".about").hide();
		$(".change_dancer").hide();
		$(".control_instructions").hide();
		$("#vid").hide();
		$("#grad_bg").removeClass("grad_0").removeClass("grad_1").removeClass("grad_2").removeClass("grad_3");
		$("#grad_bg").addClass("grad_0");

		if(MODE=="dancer"){
			while(SCENE.children.length > 0){ 
				SCENE.remove(SCENE.children[0]); 
			}
			RENDERER.render( SCENE, CAMERA );
			cancelAnimationFrame( animation_id_dancer );
		}	
		if(MODE=="group"){
			while(SCENE_GROUP.children.length > 0){ 
				SCENE_GROUP.remove(SCENE_GROUP.children[0]); 
			}
			RENDERER_GROUP.render( SCENE_GROUP, CAMERA_GROUP );
			cancelAnimationFrame( animation_id_group );
		}	
		if(MODE=="group2"){
			while(SCENE_GROUP2.children.length > 0){ 
				SCENE_GROUP2.remove(SCENE_GROUP2.children[0]); 
			}
			RENDERER_GROUP2.render( SCENE_GROUP2, CAMERA_GROUP2 );
			cancelAnimationFrame( animation_id_group2 );
		}	
		$("#canvas_menu").show();
		$("#canvas_group").hide();
		$("#grad_bg").css("opacity",1.0);
		MODE = "menu";
		MP3.stop();
		$("#vid").html("");
		$("#grad_bg").css("opacity",1.0);
		MP3 = new Howl({
		src: ['mp3/atnt.mp3'],
		autoplay: true,loop: true,volume: 1.0,
		});	
		animate_cubes();
		responsive_ui();
	});

	$(".about").click(function(){ 
		$(".about_content").show();
		responsive_ui();
	});

	$(".close_about").click(function(){ 
		$(".about_content").hide();
		responsive_ui();
	});
});




//RESPONSIVE
$(window).resize(function(){
	responsive_ui();
	if(MODE!="menu" && CUBE_PLAYING.yt){
		responsive_yt();
	}
});
$(window).load(function(){
	$(".loading").hide();
});
function responsive_ui(){
	$(".centerxy").each(function(){ $(this).center(1,1); });
	$(".centerx").each(function(){ $(this).center(1,0); });
}
$.fn.center = function(x,y){
	if(x==1){this.css("left", Math.max(0, (($(this).parent().width() - $(this).outerWidth()) / 2) ) + "px");}
	if(y==1){this.css("top", Math.max(0, (($(this).parent().height() - $(this).outerHeight()) / 2) ) + "px");}
	return this;
};
$.fn.center2 = function(x,y){
	if(x==1){this.css("left", (($(this).parent().width() - $(this).outerWidth()) / 2)  + "px");}
	if(y==1){this.css("top", (($(this).parent().height() - $(this).outerHeight()) / 2)  + "px");}
	return this;
};
function responsive_yt(){
	var ww = parseInt($("#vid").width());
	var hh = parseInt($("#vid").height());
	var multip = 1.1;
	var ratio = 1.33;
	if((ww/hh)>1.33){
		var new_w = ww*multip;
		$("#yt").attr("width",new_w);
		var new_hh = new_w/ratio;
		$("#yt").attr("height",new_hh);
	}else{
		var new_h = hh;
		$("#yt").attr("height",new_h);
		var new_ww = new_h*ratio;
		$("#yt").attr("width",new_ww);				
	}
	$(".centerxy2").each(function(){ $(this).center2(1,1); });
}





















