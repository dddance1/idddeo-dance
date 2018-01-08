//fuzzywobble

var dancers = [];
dancers.push({name:"julie",x:18,y:4,rotation:1,paused:false,scene:undefined,box:undefined,skeleton:undefined});
dancers.push({name:"ben",x:-15,y:7,rotation:1,paused:false,scene:undefined,box:undefined,skeleton:undefined});
dancers.push({name:"selma",x:4,y:12,rotation:1,paused:false,scene:undefined,box:undefined,skeleton:undefined});
dancers.push({name:"tom2",x:-15,y:-15,rotation:1,paused:false,scene:undefined,box:undefined,skeleton:undefined});
dancers.push({name:"david",x:2,y:-5,rotation:1,paused:false,scene:undefined,box:undefined,skeleton:undefined});
dancers.push({name:"thom",x:14,y:-14,rotation:1,paused:false,scene:undefined,box:undefined,skeleton:undefined});
var dancers_meshes = [];
var dancer_count = 0;
var canvas_group;

//___________________________________________
//INIT DANCER
function init_group() {

	//CAMERA
	CAMERA_GROUP = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
	CAMERA_GROUP.getWorldRotation();

	//SCENE
	SCENE_GROUP = new THREE.Scene();

	//RENDERER
	canvas_group = document.getElementById("canvas_group");
	RENDERER_GROUP = new THREE.WebGLRenderer({ canvas: canvas_group, alpha: true, antialias: true });
	RENDERER_GROUP.setPixelRatio( window.devicePixelRatio );
	RENDERER_GROUP.setSize( window.innerWidth, window.innerHeight );
	RENDERER_GROUP.setClearColor( 0x444444 , 0.0);

	//CONTROLS
	CONTROLS_GROUP = new THREE.OrbitControls( CAMERA_GROUP, canvas_group );
	CONTROLS_GROUP.target.set( 0, 0, 0 );
	CAMERA_GROUP.position.set( 10, 20, 45 );
	CONTROLS_GROUP.update();

	// world = new THREE.Object3D();
	// SCENE_GROUP.add(world);

	MIXERS_GROUP = [];
	dancers_meshes = [];
	boxes = [];
	dancer_count = 0;
	for(var i=0;i<dancers.length;i++){ //is it faster if we try loading them all at the same time?
		load_dancer_of_group(dancers[i]);
	}


	
}


var active_index;
function load_dancer_of_group(i){

	var loader = new THREE.ColladaLoader();
	loader.options.convertUpAxis = true;
	loader.load('dae/group_bulebule/'+i.name+'/'+i.name+'.dae', onLoad2, onProgress2, onError2, i.name);
	
}

function onLoad2(object, name){
	console.log("!LOAD!");console.log(name);
	var animations = object.animations;
	var avatar = object.scene;
	var skeleton = new THREE.SkeletonHelper(avatar);
	mixer = new THREE.AnimationMixer(avatar);
	mixer.clipAction(animations[0]).play();
	MIXERS_GROUP.push( mixer );
	avatar.scale.set(10, 10, 10);
	SCENE_GROUP.add(avatar);
	for(d=0;d<dancers.length;d++){
		if(dancers[d].name==name){
			avatar.position.x = dancers[d].x;
			avatar.position.z = dancers[d].y;
			avatar.position.y = -6;
		}
	}
	dancer_count++;
	if(dancer_count==dancers.length){
		all_dancers_loaded();
	}
}
var onProgress2 = function( xhr ) {
	if ( xhr.lengthComputable ) {
		var percentComplete = xhr.loaded / xhr.total * 100;
		console.log( Math.round( percentComplete, 2 ) + '% downloaded' );
	}
};
var onError2 = function( xhr ) {
	console.error( xhr );
};
function all_dancers_loaded(){
	//GRID
	var gridHelper = new THREE.GridHelper( 50, 50, 0x303030, 0x303030 );
	gridHelper.position.set( 0, -6, 0 );
	SCENE_GROUP.add( gridHelper );
	//LIGHTS
	light = new THREE.HemisphereLight(0xffffff, 0xaaaaaa, 1.0);
	light.position.set(0, 1, 0);
	SCENE_GROUP.add(light);
	light = new THREE.DirectionalLight(0xffffff, 0.25);
	light.position.set(20, 0, 0);
	SCENE_GROUP.add(light);
	light = new THREE.DirectionalLight(0xffffff, 0.25);
	light.position.set(-20, 0, 0);
	SCENE_GROUP.add(light);
	light = new THREE.DirectionalLight(0xffffff, 0.25);
	light.position.set(0, 0, 20);
	SCENE_GROUP.add(light);
	light = new THREE.DirectionalLight(0xffffff, 0.25);
	light.position.set(0, 0, -20);
	SCENE_GROUP.add(light);
	rendered_once2 = false;
	$("#vid").html('<iframe style="position:absolute;" class="centerxy2" id="yt" width="560" height="315" src="https://www.youtube.com/embed/'+CUBE_PLAYING.yt+'?rel=0&amp;controls=0&amp;showinfo=0&amp;autoplay=1&amp;loop=1&amp;start=8&amp;playlist='+CUBE_PLAYING.yt+'" frameborder="0" allowfullscreen></iframe>');
	responsive_yt();
	animate_group();
}
//___________________________________________________
//FUNCTION ANIMATE
var id_dancer;
var delta;
var rendered_once2 = false;
var animation_id_group;
function animate_group() {
	delta = CLOCK_GROUP.getDelta();
	animation_id_group = requestAnimationFrame( animate_group );
	if ( MIXERS_GROUP.length > 0 ) {
		for ( var i = 0; i < MIXERS_GROUP.length; i ++ ) {
			MIXERS_GROUP[ i ].update( delta  );
		}
	}
	RENDERER_GROUP.render( SCENE_GROUP, CAMERA_GROUP );
	if(rendered_once2 === false){
		rendered_once2 = true;
		$(".loading").hide();
	}
}
//___________________________________________
//RESPONSIVE 
window.onload = function(){
  this.addEventListener( 'resize', onWindowResize_group, false );
};
function onWindowResize_group(){
	if(MODE=="group"){
		CAMERA_GROUP.aspect = window.innerWidth / window.innerHeight;
		CAMERA_GROUP.updateProjectionMatrix();
		RENDERER_GROUP.setSize( window.innerWidth, window.innerHeight );
	}
}




























