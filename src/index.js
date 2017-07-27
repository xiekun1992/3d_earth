(function(factory){
	if(typeof this.f3dt === "undefined")
		this.f3dt = {};	
	this.f3dt.main = factory();
})(function(){
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
	var renderer = new THREE.WebGLRenderer({antialias: true});
	// renderer.setClearColor(0xaaaaaa);
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMapEnabled = true;
	var controls = new THREE.OrbitControls( camera, renderer.domElement );
	controls.target.set( 0, 1, 0 );
	camera.position.z = dis;
	camera.rotation.z = 0.4;
	// camera.position.set( 1, 1, 1 );
	// controls.enableZoom = false;
	controls.minDistance = 100;
	controls.maxDistance = 1000;
	controls.update();

	// 获得星体的半径值
	var planetRadius = f3dt.constantEval.eval_radius(10);
	var planetCycle = f3dt.constantEval.eval_cycle(100);

	// var sun = new THREE.SphereGeometry(40, 40, 40);
	// var texture = THREE.ImageUtils.loadTexture('textures/sun/sunmap.jpg');
	// var sunMaterial = new THREE.MeshBasicMaterial({color: 0xffffff});
	// sunMaterial.map = texture;
	// var sunMesh = new THREE.Mesh(sun, sunMaterial);
	// sunMesh.position.set(1000, 0, 1500);
	// scene.add(sunMesh);


	var earth = new THREE.SphereGeometry(planetRadius.earth, 40, 40);

	var planetTexture = THREE.ImageUtils.loadTexture("textures/earth/Earth1.jpg");
	var specularTexture = THREE.ImageUtils.loadTexture("textures/earth/EarthSpec.jpg");
	var normalTexture = THREE.ImageUtils.loadTexture("textures/earth/EarthNormal.jpg");
	// var cloudTexture = THREE.ImageUtils.loadTexture("earthcloudmaptrans.jpg");
	var bumpTexture = THREE.ImageUtils.loadTexture("textures/earth/earthbump1k.jpg");
	var planetMaterial = new THREE.MeshPhongMaterial({color: 0xffffff});
	// var planetMaterial2 = new THREE.MeshLambertMaterial({color: 0xffffff});
	// planetMaterial2.bumpMap = cloudTexture;
	// planetMaterial.alphaMap = cloudTexture;
	planetMaterial.specularMap = specularTexture;
	planetMaterial.specular = new THREE.Color(0x4444aa);
	planetMaterial.normalMap = normalTexture;
	planetMaterial.map = planetTexture;
	planetMaterial.bumpMap = bumpTexture;
	planetMaterial.shininess = 10;
	// create a multimaterial
	var earthMesh = THREE.SceneUtils.createMultiMaterialObject(earth, [planetMaterial]);
	// earthMesh.rotation.z = -0.4;
	earthMesh.receiveShadow = true;
	scene.add(earthMesh);



	var moon = new THREE.SphereGeometry(planetRadius.moon, 40, 40);
	var moonMaterial = new THREE.MeshPhongMaterial();
	var moonTexture = THREE.ImageUtils.loadTexture("textures/moon/moonmap1k.jpg");
	// var moonBumpTexture = THREE.ImageUtils.loadTexture("textures/moon/moonbump1k.jpg");
	moonMaterial.map = moonTexture;
	// moonMaterial.bumpMap = moonBumpTexture;
	moonMaterial.bumpScale = 0.5;
	var moonMesh = THREE.SceneUtils.createMultiMaterialObject(moon, [moonMaterial]);
	moonMesh.position.set(100, 0, 0);
	moonMesh.rotation.y = -2;
	moonMesh.receiveShadow = true;
	scene.add(moonMesh);


	var light = new THREE.DirectionalLight(0xffffff);
	light.position.set(1000, 0, 500);
	light.castShadow = true;
	scene.add(light);

	var amLight = new THREE.AmbientLight(0x111111);
	scene.add(amLight);

	// var slight = new THREE.SpotLight(0xcccccc);
	// slight.position.set(10000, 0, 15000);
	// scene.add(slight);

	document.body.appendChild(renderer.domElement);
	window.addEventListener('resize', function(){
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize( window.innerWidth, window.innerHeight );
	});

	var deg = 0;
	function moonTrack(){
		var a, b;
		a = b = 200;//planetRadius.moonTrack;
		deg -= Math.PI * 2 / planetCycle.moonRevolution;
		deg = deg % (2 * Math.PI);
		var x = a * Math.cos(deg), z = b * Math.sin(deg), y = Math.tan(5 * (2 * Math.PI / 360)) * x;
		return {x: x, z: z, y: y};
	}

	function render(){
		earthMesh.rotation.y += Math.PI * 2 / planetCycle.earth;
		moonMesh.rotation.y += Math.PI * 2 / planetCycle.moon;

		var pos = moonTrack();
		moonMesh.position.x = pos.x;
		moonMesh.position.z = pos.z;
		moonMesh.position.y = pos.y;
		
		requestAnimationFrame(render);
		renderer.render(scene, camera);
		controls.update();
	}
	render();
	
});