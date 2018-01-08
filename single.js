//fuzzywobble


//___________________________________________
//INIT DANCER
function init_dancer() {

	//CAMERA
	CAMERA = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
	CAMERA.getWorldRotation();

	//SCENE
	SCENE = new THREE.Scene();

	//RENDERER
	var canvas_dancer = document.getElementById("canvas_dancer");
	RENDERER = new THREE.WebGLRenderer({ canvas: canvas_dancer, alpha: true, antialias: true });
	RENDERER.setPixelRatio( window.devicePixelRatio );
	RENDERER.setSize( window.innerWidth, window.innerHeight );
	RENDERER.setClearColor( 0x444444 , 0.0);

	//CONTROLS
	CONTROLS = new THREE.OrbitControls( CAMERA, canvas_dancer );
	CONTROLS.target.set( 0, 0, 0 );
	CAMERA.position.set( 10, 25, 45 );
	CONTROLS.update();


}




//___________________________________________
//RESPONSIVE 
window.onload = function(){
  this.addEventListener( 'resize', onWindowResize_dancer, false );
};
function onWindowResize_dancer(){
	if(MODE=="dancer"){
		CAMERA.aspect = window.innerWidth / window.innerHeight;
		CAMERA.updateProjectionMatrix();
		RENDERER.setSize( window.innerWidth, window.innerHeight );
	}
}


//___________________________________________
//MODEL LOAD
function load_dancer(){
	if(CUBE_PLAYING.yt){
		$("#vid").html('<iframe style="position:absolute;" class="centerxy" id="yt" width="560" height="315" src="https://www.youtube.com/embed/'+CUBE_PLAYING.yt+'?rel=0&amp;controls=0&amp;showinfo=0&amp;autoplay=1&amp;loop=1&amp;playlist='+CUBE_PLAYING.yt+'" frameborder="0" allowfullscreen></iframe>');
		responsive_yt();
	}else{
		MP3 = new Howl({
			src: ['mp3/'+CUBE_PLAYING.name+'.mp3'],
			autoplay:false, loop:true, volume:0.8
		});
	}
	var loader = new THREE.ColladaLoader();
	loader.options.convertUpAxis = true;
	loader.load('dae/'+CUBE_PLAYING.name+'/'+CUBE_PLAYING.name+'.dae', onLoad, onProgress, onError);
}


//___________________________________________
//FUNCTION ON LOAD
function onLoad(object){

	var animations = object.animations;
	var avatar = object.scene;
	var skeleton = new THREE.SkeletonHelper(avatar);

	MIXERS = [];
	mixer = new THREE.AnimationMixer(avatar);
	avatar.position.set( 0, -7, 0 );
	mixer.clipAction(animations[0]).play();
	MIXERS.push( mixer );

	avatar.scale.set(CUBE_PLAYING.scale, CUBE_PLAYING.scale, CUBE_PLAYING.scale);
	//skeleton.material.linewidth = 3;

	SCENE.add(avatar);
	//scene.add(skeleton);

	//GRID
	var gridHelper = new THREE.GridHelper( 30, 30, 0x303030, 0x303030 );
	gridHelper.position.set( 0, -7, 0 );
	SCENE.add( gridHelper );

	//LIGHTS
	light = new THREE.HemisphereLight(0xffffff, 0xaaaaaa, 1.0);
	light.position.set(0, 1, 0);
	SCENE.add(light);
	light = new THREE.DirectionalLight(0xffffff, 0.25);
	light.position.set(20, 0, 0);
	SCENE.add(light);
	light = new THREE.DirectionalLight(0xffffff, 0.25);
	light.position.set(-20, 0, 0);
	SCENE.add(light);
	light = new THREE.DirectionalLight(0xffffff, 0.25);
	light.position.set(0, 0, 20);
	SCENE.add(light);
	light = new THREE.DirectionalLight(0xffffff, 0.25);
	light.position.set(0, 0, -20);
	SCENE.add(light);

	rendered_once = false; //trying to sync the drop with when the dancers appear, but not working

	animate();

}	


//___________________________________________
//MODEL LOADING MANAGER
var onProgress = function( xhr ) {
	if ( xhr.lengthComputable ) {
		var percentComplete = xhr.loaded / xhr.total * 100;
		console.log( Math.round( percentComplete, 2 ) + '% downloaded' );
	}
};
var onError = function( xhr ) {
	console.error( xhr );
};	



//___________________________________________
//ANIMATE & RENDER
var animation_id_dancer;
function animate() {

	animation_id_dancer = requestAnimationFrame( animate );
	if ( MIXERS.length > 0 ) {
		for ( var i = 0; i < MIXERS.length; i ++ ) {
			MIXERS[ i ].update( CLOCK.getDelta() );
		}
	}
	render();

}
var rendered_once = false;
function render(){

	RENDERER.render( SCENE, CAMERA );

	if(rendered_once==false){
		rendered_once = true;
		$(".loading").hide();
		if(!CUBE_PLAYING.yt){
			MP3.play(); //tryint to wait for texture to load to sync the drop but NOT WORKING
		}
	}
	
}


