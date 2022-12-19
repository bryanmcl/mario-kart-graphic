import * as THREE from './three.js/build/three.module.js'
import { OrbitControls } from './three.js/examples/jsm/controls/OrbitControls.js'
let scene, camera, renderer, orbitControl;
let plane,track;
function init(){
    scene = new THREE.Scene();

    let fov = 45;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let aspect = width/height;

    camera = new THREE.PerspectiveCamera(fov, aspect);

    renderer = new THREE.WebGLRenderer({
        antialias: true
    })
    renderer.setClearColor('skyblue');
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;

    orbitControl = new OrbitControls(camera,renderer.domElement)
    orbitControl.target = new THREE.Vector3 (0,0,0)
    camera.position.set(0,15,25);
    camera.lookAt(0,0,0);
    // orbitControl.update();
    document.body.appendChild(renderer.domElement);
}

function loadTexture(name){
    let loader = new THREE.TextureLoader();
    let texture = loader.load(name);

    return texture
}

//lighting
function createAmbientLight(){
    let light = new THREE.AmbientLight("white", 0.3);
    scene.add(light);
}
function createSunLight(){
    let light = new THREE.SpotLight("white", 1, 1000);
    light.position.set(0,100,0);
    light.castShadow=true;
    scene.add(light);
}

function createPlane(w,h){
    let texture = loadTexture('./asset/grass.jpeg');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(50,50)
    texture.rotation = Math.PI/2
    let geometry = new THREE.PlaneGeometry(w,h);
    let material = new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide,
        map: texture,
    })
    let plane = new THREE.Mesh(geometry, material);
    plane.rotateX(Math.PI/2)
    plane.position.x = 0
    plane.receiveShadow = true;
    return plane;
}


function createTrack(w,h){
    let texture = loadTexture('./asset/road.jpg');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(2,1)
    texture.rotation = Math.PI/2
    let geometry = new THREE.PlaneGeometry(w,h);
    let material = new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide,
        map: texture,
    })
    let plane = new THREE.Mesh(geometry, material);
    plane.rotateX(Math.PI/2)
    plane.position.x = 0
    plane.position.y = 0.001
    plane.receiveShadow = true;
    return plane;
}

function createBoxSideTrack(x,y,z,color,textureurl){
    let geometry = new THREE.BoxGeometry(1,1,1);
    let material
    if(textureurl){
        let texture = loadTexture(textureurl);
         material = new THREE.MeshPhongMaterial({
            map: texture
        })}
    else{
        material = new THREE.MeshPhongMaterial({
        color: color
    })}
    let box = new THREE.Mesh(geometry,material);
    box.position.set(x,y,z);
    box.castShadow = true;
    return box;
}

function loadSideTack(){
    let x1 = 7;
    let x2 = -7;
    for(let i=-25;i<25;i+=4){
        let box1 = createBoxSideTrack(x1,0,i,"rgb(0,120,255,1)", "./asset/bluebox.jpg");
        let box2 = createBoxSideTrack(x1,0,i+1,"rgb(0,255,0,1)", "./asset/greenbox.jpg");
        let box3 = createBoxSideTrack(x1,0,i+2,"rgb(255,255,0,1)");
        let box4 = createBoxSideTrack(x1,0,i+3,"rgb(255,0,0,1)", "./asset/redbox.jpg");
        scene.add(box1);
        scene.add(box2);
        scene.add(box3);
        scene.add(box4);
    }
    for(let i=-25;i<25;i+=4){
        let box1 = createBoxSideTrack(x2,0,i,"rgb(0,120,255,1)", "./asset/bluebox.jpg");
        let box2 = createBoxSideTrack(x2,0,i+1,"rgb(0,255,0,1)", "./asset/greenbox.jpg");
        let box3 = createBoxSideTrack(x2,0,i+2,"rgb(255,255,0,1)");
        let box4 = createBoxSideTrack(x2,0,i+3,"rgb(255,0,0,1)", "./asset/redbox.jpg");
        scene.add(box1);
        scene.add(box2);
        scene.add(box3);
        scene.add(box4);
    }
    return;
}
function createGate(){
    let texture = loadTexture('./asset/wood.jpeg');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(10,10)
    let geometry = new THREE.BoxGeometry(0.1,1.5,1);
    let material = new THREE.MeshPhongMaterial({
        color:"white",
        map:texture
    })
    let box = new THREE.Mesh(geometry, material);
    box.position.set(12.5,0.5,0);
    box.castShadow=true;
    box.receiveShadow=true;
    scene.add(box);
}
function createMainBuilding(){
    let texture = loadTexture('./asset/concrete.jpg');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(10,10)
    let geometry = new THREE.BoxGeometry(5,10,10);
    let material = new THREE.MeshPhongMaterial({
        color:"white",
        map:texture
    })
    let box = new THREE.Mesh(geometry, material);
    box.position.set(15,0,0);
    box.castShadow=true;
    box.receiveShadow=true;
    scene.add(box);
}
function createTowerRoof(x,y,z){
    let texture = loadTexture('./asset/roof.jpg');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(7,7)
    let geometry = new THREE.ConeGeometry(1.50,3,13,64);
    let material = new THREE.MeshPhongMaterial({
        color:"white",
        map:texture
    })
    let roof = new THREE.Mesh(geometry, material);
    roof.position.set(x,y+8,z)
    roof.castShadow=true;
    roof.receiveShadow=true;
    scene.add(roof);
}
function createTower(x,y,z){
    let texture = loadTexture('./asset/concrete.jpg');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(10,10)
    let geometry = new THREE.CylinderGeometry(1.25,1.25,13,64);
    let material = new THREE.MeshPhongMaterial({
        color:"white",
        map:texture
    })
    let tower = new THREE.Mesh(geometry, material);
    tower.position.set(x,y,z)
    createTowerRoof(x,y,z);
    tower.castShadow=true;
    tower.receiveShadow=true;
    scene.add(tower);
}
function createRoofBuilding(x,y,z){
    let texture = loadTexture('./asset/roof.jpg');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(10,10)
    let geometry = new THREE.CylinderGeometry(0,5,3,4)
    let material = new THREE.MeshPhongMaterial({
        color:"white",
        map:texture
    })
    let box = new THREE.Mesh(geometry, material);
    box.position.set(15,0+6.5,0);
    box.rotateY(Math.PI/4)
    box.castShadow=true;
    box.receiveShadow=true;
    scene.add(box);
}
function loadCastle(){
    createMainBuilding();
    createGate();
    createTower(17.5,0,5);
    createTower(17.5,0,-5);
    createTower(12.5,0,5);
    createTower(12.5,0,-5);
    createRoofBuilding();
}
function loadFinishLine(){
    let texture = loadTexture('./asset/finishline.jpg');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(2,1)
    let geometry = new THREE.PlaneGeometry(10,3);
    let material = new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide,
        map:texture
    })
    let plane = new THREE.Mesh(geometry, material);
    plane.rotateX(Math.PI/2);
    plane.position.set(0,0.01,10)
    plane.receiveShadow = true;
    scene.add(plane);
}
function loadFinishTitle(x,y,z){
    let texture = loadTexture('./asset/mariokart.jpg');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1,1)
    let geometry = new THREE.PlaneGeometry(5,2)
    let material = new THREE.MeshPhongMaterial({
        color:"white",
        map:texture,
        side: THREE.DoubleSide
    })
    let plane = new THREE.Mesh(geometry, material);
    plane.position.set(x,y,z);
    plane.rotateY(Math.PI/1)
    plane.castShadow=true;
    plane.receiveShadow=true;
    scene.add(plane);
}
function loadFinishArc(){
    let texture = loadTexture('./asset/gold.jpg');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1,2)
    let geometry = new THREE.TorusGeometry(6,0.5,100,10,3.3)
    let material = new THREE.MeshPhongMaterial({
        color:"white",
        map:texture
    })
    let torus = new THREE.Mesh(geometry, material);
    torus.position.set(0,0,10);
    torus.castShadow=true;
    torus.receiveShadow=true;
    scene.add(torus);
}
function loadFinishGate(){
    loadFinishTitle(0,6,9.5);
    loadFinishArc();
}
let fakebox1;
function loadFakeItemBox(x,y,z){
    let texture = loadTexture('./asset/rainbowbox.jpg');
    let geometry = new THREE.BoxGeometry(0.8,0.8,0.8);
    let material = new THREE.MeshPhongMaterial({
        map:texture
    });
    let box = new THREE.Mesh(geometry,material);
    box.position.set(x,y,z);
    box.castShadow = true;
    return box;
}

function loadObstacle(){
    fakebox1 = loadFakeItemBox(2,1,1);
    scene.add(fakebox1);
}
function load(){
    createAmbientLight();
    createSunLight();
    plane = createPlane(40,50);
    scene.add(plane)
    track = createTrack(10,50);
    scene.add(track)
    loadSideTack();
    loadCastle();
    loadFinishLine();
    loadFinishGate();

    loadObstacle();
}
let fakebox1state = false;
function updatefakebox1(){
    fakebox1.rotateX(0.01);
    fakebox1.rotateY(0.01);
    if(fakebox1state){
        fakebox1.position.y+=0.003
    }
    else fakebox1.position.y-=0.003
    if(fakebox1.position.y>=1.2){
        fakebox1state = false;
    }
    else if(fakebox1.position.y<=0.7){
        fakebox1state = true;
    }
}
function update(){
    updatefakebox1();
    
}
function render(){
    requestAnimationFrame(render);
    update();
    renderer.render(scene, camera);
}

window.onload = () =>{
    init();
    load();
    render();
}