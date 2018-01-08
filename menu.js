//fuzzywobble



//======================================================================
// CUBE MENU
//======================================================================

var cubes = [];

cubes.push({name:"group2",text:"The IDEO Cambridge Dancefloor",y:150,mesh:undefined,scale:undefined,yt:"1_TQjEn6cpQ"});
cubes.push({name:"group",text:"The IDEO New York Dancefloor",y:90,mesh:undefined,scale:undefined,yt:"H5kfj2nZL38"});
cubes.push({name:"tom",text:"Tom's Solo Banana Boat",y:30,mesh:undefined,scale:13,yt:undefined});
cubes.push({name:"lawrence",text:"Larry's Solo Genius of Love",y:-30,mesh:undefined,scale:9,yt:undefined});
cubes.push({name:"jason",text:"Jason's Solo Erotic City",y:-90,mesh:undefined,scale:11,yt:undefined});
cubes.push({name:"dom",text:"Dom's Solo Yazoo",y:-150,mesh:undefined,scale:11,yt:undefined});









//___________________________________________
//INIT CUBE MENU
function init_cubes() {

	CAMERA_MENU = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
	CAMERA_MENU.position.z = 400;
	SCENE_MENU = new THREE.Scene();

	light = new THREE.HemisphereLight(0xffffff, 0x444444, 1.0);
	light.position.set(0, 0, 1);
	SCENE_MENU.add(light);

	var loader2 = new THREE.FontLoader();
	loader2.load( 'fonts/BubbleGum_Regular.json', function ( font ) {

		for(var c=0;c<cubes.length;c++){

			var textGeo = new THREE.TextGeometry( cubes[c].text, {
				font: font,
				size: 26,
				height: 12,
				curveSegments: 6,
				bevelThickness: 2,
				bevelSize: 1,
				bevelEnabled: true
			} );

			var textMaterial = new THREE.MeshPhongMaterial( { color: 0xe269ed } );
			var tmesh = new THREE.Mesh( textGeo, textMaterial );

			textGeo.computeBoundingBox();
			var ww = (textGeo.boundingBox.min.x - textGeo.boundingBox.max.x)/2;

			tmesh.position.set( ww, cubes[c].y, 0 );

			tmesh.name = cubes[c].name;

			SCENE_MENU.add( tmesh );
			
			cubes[c].mesh = tmesh;

		}

	});

	var canvas_menu = document.getElementById("canvas_menu");
	RENDERED_MENU = new THREE.WebGLRenderer({ canvas: canvas_menu, alpha: true, antialias: true });
	RENDERED_MENU.setPixelRatio( window.devicePixelRatio );
	RENDERED_MENU.setSize( window.innerWidth, window.innerHeight );
	RENDERED_MENU.setClearColor( 0x444444 , 0.0);

	animate_cubes();

}



//___________________________________________
//RESPONSIVE & MOUSE MOVE
window.addEventListener('resize', onWindowResize_menu, false );
function onWindowResize_menu(){
	if(MODE=="menu"){
		CAMERA_MENU.aspect = window.innerWidth / window.innerHeight;
		CAMERA_MENU.updateProjectionMatrix();
		RENDERED_MENU.setSize( window.innerWidth, window.innerHeight );
	}
}



//___________________________________________
//CHECK HOVER OF MESH
var projector, mouse = {x:0,y:0};
var INTERSECTED;
window.addEventListener('mousemove', onDocumentMouseMove_menu);
function onDocumentMouseMove_menu(event) {
	if(MODE=="menu"){
		mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
		mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
		var vector = new THREE.Vector3(mouse.x, mouse.y, 1);
		vector.unproject(CAMERA_MENU);
		var ray = new THREE.Raycaster(CAMERA_MENU.position, vector.sub(CAMERA_MENU.position).normalize());
		var intersects = ray.intersectObjects(SCENE_MENU.children);
		if(intersects.length > 0){
			$('body,html').css( 'cursor', 'pointer' );
			if( INTERSECTED ){
				INTERSECTED.material.color.setHex( INTERSECTED.currentHex );
				console.log(INTERSECTED.name);
				for(var i=0;i<cubes.length;i++){
					if(INTERSECTED.name == cubes[i].name){ 
						CUBE_PLAYING = cubes[i];
						if(cubes[i].name=="group"){
							ON_GROUP = true;
							ON_GROUP2 = false;
						}else if(cubes[i].name=="group2"){
							ON_GROUP2 = true;
							ON_GROUP = false;
						}else{
							ON_GROUP2 = false;
							ON_GROUP = false;							
						}
						break;
					}
				}
			}
			INTERSECTED = intersects[ 0 ].object;
			INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
			INTERSECTED.material.color.setHex( 0xeeeeee );
		}else {
			$('body,html').css( 'cursor', 'crosshair' );
			if( INTERSECTED ){INTERSECTED.material.color.setHex( INTERSECTED.currentHex );}
			INTERSECTED = null;
			ON_GROUP = false;
			CUBE_PLAYING = "";
		}
	}
}




//___________________________________________
//ANIMATE & RENDER
var animation_id_cubes;
var jj = 0;
function animate_cubes() {
	animation_id_cubes = requestAnimationFrame( animate_cubes );

	jj += 0.02;
	for(var i=0;i<cubes.length;i++){
		if(cubes[i].mesh){
			cubes[i].mesh.position.z = Math.sin(jj)*20;
		}
	}

	RENDERED_MENU.render( SCENE_MENU, CAMERA_MENU );
}



