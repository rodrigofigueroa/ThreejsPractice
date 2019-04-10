function molinoTresD(){
    var scene = new THREE.Scene(),
        camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
        camera.position.z = 10 ;
        rend = new THREE.WebGLRenderer({antialias: true});
        rend.setClearColor('#e5e5e5');
        rend.setSize(window.innerWidth,innerHeight);
        document.getElementById('canvas-contenedor').appendChild(rend.domElement);

        window.addEventListener('resize', () => {
            rend.setSize(window.innerWidth,innerHeight);
            camera.aspect = window.innerWidth / innerHeight;

            camera.updateProjectionMatrix();
        });

        var raycaster = new THREE.Raycaster();
        var mouse = new THREE.Vector2();
        
        var geometry = new THREE.BoxGeometry(1, 1, 1),
            material = new THREE.MeshLambertMaterial({color: 0xFFCC00}),
            // mesh = new THREE.Mesh(geometry, material);
            // scene.add(mesh);     

        meshX = -10;
        for(b=0; b < 15; b++){
            mesh = new THREE.Mesh(geometry, material);
            mesh.position.x = (Math.random() - 0.5)* 10;
            mesh.position.y = (Math.random() - 0.5)* 10;
            mesh.position.z = (Math.random() - 0.5)* 10;
            scene.add(mesh);  
            // meshX = 1;
        }
            
            var lg = new THREE.PointLight(0xffffff, 1, 500 );
                lg.position.set(10,0, 25);
                scene.add(lg);
        var loader = new THREE.JSONLoader();
            loader.load('tst.json', handle_load);

            function handle_load(geometry, materials){
                var metsh =  new THREE.Mesh(geometry, materials);
                scene.add(metsh);
                mesh.position.z = -10;
            }
            
        var render =  function(){
            //60 Frame for seconds
            requestAnimationFrame(render);
            rend.render(scene, camera);    
        }

        function onMouseMove(e){
            e.preventDefault();

            mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
            mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
            
            raycaster.setFromCamera(mouse, camera);
            var intersects = raycaster.intersectObjects(scene.children, true);
            for(a = 0; a < intersects.length; a++){
                // console.log(intersects[a]);
                //intersects[a].object.material.color.set(0xff0000);
                this.tl = new TimelineMax();
                this.tl.to(intersects[a].object.position, 1, {x: 3, ease: Expo.easeOut});
                this.tl.to(intersects[a].object.rotation, 1,{y:2});
                this.tl.to(intersects[a].object.scale, .4, {x:1.8, ease: Expo.easeOut});                
            }
        }
        
        render();
        window.addEventListener('mousemove', onMouseMove);
        
           
}