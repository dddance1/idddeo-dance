//fuzzywobble

var dancers2 = [];
dancers2.push({name:"ashley",x:14,y:4,rotation:0,paused:false,scene:undefined,box:undefined,skeleton:undefined});
dancers2.push({name:"danny",x:-15,y:7,rotation:0,paused:false,scene:undefined,box:undefined,skeleton:undefined});
dancers2.push({name:"jacob",x:14,y:-14,rotation:1,paused:false,scene:undefined,box:undefined,skeleton:undefined});
dancers2.push({name:"jro",x:-15,y:-15,rotation:-1,paused:false,scene:undefined,box:undefined,skeleton:undefined});
dancers2.push({name:"lauren",x:-10,y:15,rotation:0,paused:false,scene:undefined,box:undefined,skeleton:undefined});
dancers2.push({name:"lindsey",x:9,y:19,rotation:2,paused:false,scene:undefined,box:undefined,skeleton:undefined});
dancers2.push({name:"nick",x:0,y:0,rotation:0,paused:false,scene:undefined,box:undefined,skeleton:undefined});
var dancers_meshes2 = [];
var dancer_count2 = 0;
var canvas_group2;

//___________________________________________
//INIT DANCER
function init_group2() {
	//CAMERA
	CAMERA_GROUP2 = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
	CAMERA_GROUP2.getWorldRotation();
	//SCENE
	SCENE_GROUP2 = new THREE.Scene();
	//RENDERER
	canvas_group2 = document.getElementById("canvas_group2");
	RENDERER_GROUP2 = new THREE.WebGLRenderer({ canvas: canvas_group2, alpha: true, antialias: true });
	RENDERER_GROUP2.setPixelRatio( window.devicePixelRatio );
	RENDERER_GROUP2.setSize( window.innerWidth, window.innerHeight );
	RENDERER_GROUP2.setClearColor( 0x444444 , 0.0);
	//CONTROLS
	CONTROLS_GROUP2 = new THREE.OrbitControls( CAMERA_GROUP2, canvas_group2 );
	CONTROLS_GROUP2.target.set( 0, 0, 0 );
	CAMERA_GROUP2.position.set( 10, 20, 45 );
	CONTROLS_GROUP2.update();
	//LOAD
	MIXERS_GROUP2 = [];
	dancers_meshes2 = [];
	dancer_count2 = 0;
	for(var i=0;i<dancers2.length;i++){ 
		load_dancer_of_group2(dancers2[i]);
	}
}
function load_dancer_of_group2(i){
	var loader = new THREE.ColladaLoader();
	loader.options.convertUpAxis = true;
	loader.load('dae/group_raf/d_'+i.name+'/'+i.name+'.dae', onLoad3, onProgress3, onError3, i.name);	
}
function onLoad3(object, name){
	var animations = object.animations;
	var avatar = object.scene;
	var skeleton = new THREE.SkeletonHelper(avatar);
	mixer = new THREE.AnimationMixer(avatar);
	mixer.clipAction(animations[0]).play();
	MIXERS_GROUP2.push( mixer );
	avatar.scale.set(10, 10, 10);
	SCENE_GROUP2.add(avatar);
	for(d=0;d<dancers2.length;d++){
		if(dancers2[d].name==name){
			avatar.position.x = dancers2[d].x;
			avatar.position.z = dancers2[d].y;
			avatar.position.y = -6;
			avatar.rotation.y = ((Math.PI/2)*dancers2[d].rotation);
		}
	}
	dancer_count2++;
	if(dancer_count2==dancers2.length){
		all_dancers_loaded2();
	}
}
var onProgress3 = function( xhr ) {
	if ( xhr.lengthComputable ) {
		var percentComplete = xhr.loaded / xhr.total * 100;
		console.log( Math.round( percentComplete, 2 ) + '% downloaded' );
	}
};
var onError3 = function( xhr ) {
	console.error( xhr );
};
function all_dancers_loaded2(){
	//GRID
	var gridHelper = new THREE.GridHelper( 70, 70, 0x111111, 0x111111 );
	gridHelper.position.set( 0, -6, 0 );
	SCENE_GROUP2.add( gridHelper );
	//LIGHTS
	light = new THREE.HemisphereLight(0xffffff, 0xaaaaaa, 1.0);
	light.position.set(0, 1, 0);
	SCENE_GROUP2.add(light);
	light = new THREE.DirectionalLight(0xffffff, 0.25);
	light.position.set(20, 0, 0);
	SCENE_GROUP2.add(light);
	light = new THREE.DirectionalLight(0xffffff, 0.25);
	light.position.set(-20, 0, 0);
	SCENE_GROUP2.add(light);
	light = new THREE.DirectionalLight(0xffffff, 0.25);
	light.position.set(0, 0, 20);
	SCENE_GROUP2.add(light);
	light = new THREE.DirectionalLight(0xffffff, 0.25);
	light.position.set(0, 0, -20);
	SCENE_GROUP2.add(light);
	rendered_once3 = false;
	$("#vid").html('<iframe style="position:absolute !important;" class="centerxy2" id="yt" width="560" height="315" src="https://www.youtube.com/embed/'+CUBE_PLAYING.yt+'?rel=0&amp;controls=0&amp;showinfo=0&amp;autoplay=1&amp;loop=1&amp;start=8&amp;playlist='+CUBE_PLAYING.yt+'" frameborder="0" allowfullscreen></iframe>');
	responsive_yt();
	animate_group2();
}
//___________________________________________________
//FUNCTION ANIMATE
var animation_id_group2;
var delta;
var rendered_once3 = false;
function animate_group2() {
	delta = CLOCK_GROUP2.getDelta();
	animation_id_group2 = requestAnimationFrame( animate_group2 );
	if ( MIXERS_GROUP2.length > 0 ) {
		for ( var i = 0; i < MIXERS_GROUP2.length; i ++ ) {
			MIXERS_GROUP2[ i ].update( delta );
		}
	}
	RENDERER_GROUP2.render( SCENE_GROUP2, CAMERA_GROUP2 );
	if(rendered_once3 === false){
		rendered_once3 = true;
		$(".loading").hide();
	}

}
//___________________________________________
//RESPONSIVE 
window.onload = function(){
  this.addEventListener( 'resize', onWindowResize_group2, false );
};
function onWindowResize_group2(){
	if(MODE=="group2"){
		CAMERA_GROUP2.aspect = window.innerWidth / window.innerHeight;
		CAMERA_GROUP2.updateProjectionMatrix();
		RENDERER_GROUP2.setSize( window.innerWidth, window.innerHeight );
	}
}




























