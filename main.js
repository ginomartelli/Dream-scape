//Made by Martelli Gino
// INTERFACESDIV
const backmenu = document.getElementById("backmenu");
const canvas = document.getElementById("renderCanvas");
const playMenu = document.getElementById("playMenu");
const loading = document.getElementById("loading");
const styleMenu = document.getElementById("styleMenu");
const controlsMenu = document.getElementById("controlsMenu");
const checkpointsMenu = document.getElementById("checkpointsMenu");
const soundMenu = document.getElementById("soundMenu");
const blackScreen = document.getElementById("blackScreen");
const helpUI = document.getElementById("helpUI");
const endDiv = document.getElementById("endDiv");
const looseDiv = document.getElementById("looseDiv");
const pauseMenu = document.getElementById("pauseMenu");
const timerValue = document.getElementById("timerValue");
const timerDiv = document.getElementById("timer");
//BOUTON MENU GET
const buttonPlay = document.getElementById("buttonPlay");
const buttonStyle = document.getElementById("buttonStyle");
const buttonControls = document.getElementById("buttonControls");
const buttonCheckpoints = document.getElementById("buttonCheckpoints");
const buttonSound = document.getElementById("buttonSound");
const buttonHome = document.getElementById("buttonHome"); //BOUTON PAUSE
const progressBar = document.getElementById("progress-bar");
const buttonUI = document.getElementById("buttonUI");
const buttonHelp = document.getElementById("buttonHelp");
const buttonReplay = document.getElementById("buttonReplay");
const buttonKeepPlaying = document.getElementById("buttonKeepPlaying");
const buttonReplay2 = document.getElementById("buttonReplay2");
const buttonKeepPlaying2 = document.getElementById("buttonKeepPlaying2");
const buttonResume = document.getElementById("buttonResume");
const buttonReplay3 = document.getElementById("buttonReplay3");
//BOUTON SOUS MENU STYLE GET
const head_color = document.getElementById("head");
const shirt_color = document.getElementById("shirt");
const pants_color = document.getElementById("pants");
const shoes_color = document.getElementById("shoes");
const backpack_color = document.getElementById("backpack");
// BOUTON SOUS MENU CONTROLS GET
const sensitivity = document.getElementById("sensitivity");
var valueKeys = { z: "z", s: "s", q: "q", d: "d", space: " ", shift: "Shift" };
const controls = [document.getElementById("z"), document.getElementById("s"), document.getElementById("q"), document.getElementById("d"), document.getElementById("space"), document.getElementById("shift")];
// BOUTON SOUS MENU SOUND GET
const mute = document.getElementById("buttonMute");
const mute_music = document.getElementById("buttonMuteMusic");
//BOUTON PARAMETRES GET
const volume = document.getElementById("volume");
var game_ready = false;
var is_playing = false;
//BOUTON MENU EVENT 
buttonStyle.addEventListener('click', function() {
    if(!styleMenu.classList.contains("hidden")){
        styleMenu.classList.add("hidden");
        styleMenu.classList.remove("show");
    } else {
        styleMenu.classList.remove("hidden");
        styleMenu.classList.add("show");
        controlsMenu.classList.add("hidden");
        controlsMenu.classList.remove("show");
        checkpointsMenu.classList.add("hidden");
        checkpointsMenu.classList.remove("show");
        soundMenu.classList.add("hidden");
        soundMenu.classList.remove("show");
        helpUI.classList.add("hidden");
    }
});
buttonControls.addEventListener('click', function() {
    if(!controlsMenu.classList.contains("hidden")){
        controlsMenu.classList.add("hidden");
        controlsMenu.classList.remove("show");
    } else {
        controlsMenu.classList.remove("hidden");
        controlsMenu.classList.add("show");
        styleMenu.classList.add("hidden");
        styleMenu.classList.remove("show");
        checkpointsMenu.classList.add("hidden");
        checkpointsMenu.classList.remove("show");
        soundMenu.classList.add("hidden");
        soundMenu.classList.remove("show");
        helpUI.classList.add("hidden");
        document.getElementById('rangeValue2').innerHTML = "Sensitivity : "+sensitivity.value;
    }
});
buttonCheckpoints.addEventListener('click', function() {
    if(!checkpointsMenu.classList.contains("hidden")){
        checkpointsMenu.classList.add("hidden");
        checkpointsMenu.classList.remove("show");
    } else {
        checkpointsMenu.classList.remove("hidden");
        checkpointsMenu.classList.add("show");
        controlsMenu.classList.add("hidden");
        controlsMenu.classList.remove("show");
        styleMenu.classList.add("hidden");
        styleMenu.classList.remove("show");
        soundMenu.classList.add("hidden");
        soundMenu.classList.remove("show");
        helpUI.classList.add("hidden");
    }
});
buttonSound.addEventListener('click', function() {
    if(!soundMenu.classList.contains("hidden")){
        soundMenu.classList.add("hidden");
        soundMenu.classList.remove("show");
    } else {
        soundMenu.classList.remove("hidden");
        soundMenu.classList.add("show");
        controlsMenu.classList.add("hidden");
        controlsMenu.classList.remove("show");
        checkpointsMenu.classList.add("hidden");
        checkpointsMenu.classList.remove("show");
        styleMenu.classList.add("hidden");
        styleMenu.classList.remove("show");
        helpUI.classList.add("hidden");
        document.getElementById('rangeValue1').innerHTML = "Volume : "+volume.value;
    }
});
canvas.addEventListener('click', function() {
    controlsMenu.classList.add("hidden");
    soundMenu.classList.add("hidden");
    styleMenu.classList.add("hidden");
    styleMenu.classList.remove("show");
    checkpointsMenu.classList.add("hidden");
    checkpointsMenu.classList.remove("show");
    controlsMenu.classList.remove("show");
    soundMenu.classList.remove("show");
    helpUI.classList.add("hidden");
});
//SOUS MENUS EVENTS : les mute et volume event sont dans la fonction createScene car ils faut import les sound avant pr pouvoir les utiliser
sensitivity.addEventListener('input', function() {
    document.getElementById('rangeValue2').innerHTML = "Sensitivity : "+sensitivity.value;
});
//SOUS MENU HELP
buttonUI.addEventListener('click', function() {
    helpUI.classList.add("hidden");
});
buttonHelp.addEventListener('click', function() {
    if(helpUI.classList.contains("hidden")){
        helpUI.classList.remove("hidden");
        styleMenu.classList.remove("show");
        styleMenu.classList.add("hidden");
        controlsMenu.classList.add("hidden");
        controlsMenu.classList.remove("show");
        checkpointsMenu.classList.add("hidden");
        checkpointsMenu.classList.remove("show");
        soundMenu.classList.add("hidden");
        soundMenu.classList.remove("show");
    } else {
        helpUI.classList.add("hidden");
    }
});
//END MENU
buttonReplay.addEventListener('click', function() {
    window.location.reload();
});
//LOOSE//PAUSES MENU ET TIMER
var DuringTime = 0; // secondes
var timer = "30:01";
var in_pause = false;
const timerPause = document.getElementById("timerPause");
const timerResult = document.getElementById("timerResult");
buttonReplay2.addEventListener('click', function() {
    window.location.reload();
});
buttonKeepPlaying2.addEventListener('click', function() {
    looseDiv.classList.add("hidden");
});
buttonReplay3.addEventListener('click', function() {
    window.location.reload();
});
buttonResume.addEventListener('click', function() {
    pauseMenu.classList.add("hidden");
    in_pause = false;
});
buttonHome.addEventListener('click', function() { //BUTTONPAUSE
    pauseMenu.classList.remove("hidden");
    in_pause = true;
});
let timerInterval;
function startTimer(looseSound) {
    timerDiv.classList.remove("hidden");
    timerInterval = setInterval(() => {
        if (is_playing && game_ready && !in_pause) {
            let parts = timer.split(":");
            let minutes = parseInt(parts[0], 10);
            let seconds = parseInt(parts[1], 10);
            seconds--;
            DuringTime++;
            if (seconds < 0) {
                seconds = 59;
                minutes--;
            }
            if (minutes < 0) {
                clearInterval(timerInterval);
                timer = "00:00";
                looseDiv.classList.remove("hidden");
                timerResult.innerHTML = timer;
                timerResult.style.color = "red";
                looseSound.play();
                return;
            }

            timer = (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
            timerValue.innerHTML = timer;
            timerPause.innerHTML = timer;
        }
    }, 1000);
}
var SpaceChange=false;
controls.forEach((control) => {
    control.addEventListener('click', function() {
        if(!SpaceChange){
            control.innerHTML = "Press key";
            control.style.border = "0.5vw solid white";
            const onKeyPress = function(event) {
                if(event.key.length === 1){
                    valueKeys[control.id] = event.key.toLowerCase();
                } else {
                    valueKeys[control.id] = event.key;
                }
                if(event.key === " "){
                    control.innerHTML = "Space";
                    SpaceChange=true;
                } else {
                    control.innerHTML = event.key.length === 1 ? event.key.toUpperCase() : event.key;
                }
                document.removeEventListener('keydown', onKeyPress);
                control.style.border = "";
            };
            document.addEventListener('keydown', onKeyPress);
        }
        SpaceChange=false;
    });
    
});

const engine = new BABYLON.Engine(canvas, true);
var scene = null;
buttonPlay.addEventListener('click', async function() {
    loading.classList.remove("hide");
    scene = await createScene(engine);
    game_ready = true;
    is_playing = true;
    engine.runRenderLoop(() => {
        scene.render();
    });
});
window.addEventListener("resize", function () {
    engine.resize();
});
async function createScene(engine) {
    var scene = new BABYLON.Scene(engine);
    var moonLight = new BABYLON.DirectionalLight("moonLight", new BABYLON.Vector3(-1, -1, -1), scene);
    moonLight.diffuse = new BABYLON.Color3(1, 1, 1); 
    moonLight.specular = new BABYLON.Color3(1,1,1);
    moonLight.intensity = 0.5;
    moonLight.position = new BABYLON.Vector3(500, 500, 500); 
    scene.shadowsEnabled = true;
    var ambientLight = new BABYLON.HemisphericLight("ambientLight", new BABYLON.Vector3(0, 1, 0), scene);
    ambientLight.diffuse = new BABYLON.Color3(0.5, 0.5, 0.5);
    ambientLight.specular = new BABYLON.Color3(0, 0, 0);
    ambientLight.intensity = 0.2; 
    var moon = BABYLON.MeshBuilder.CreateSphere("moon", { diameter: 50 }, scene);
    moon.position = new BABYLON.Vector3(700, 1200,700);
    var moonMaterial = new BABYLON.StandardMaterial("moonMaterial", scene);
    moonMaterial.disableLighting = true; 
    moonMaterial.emissiveColor = new BABYLON.Color3(1, 1, 1); 
    moon.material = moonMaterial;
    var shadowGenerator = new BABYLON.ShadowGenerator(10000, moonLight);
    shadowGenerator.usePercentageCloserFiltering = true;
    shadowGenerator.setDarkness(0); 
    shadowGenerator.bias = 0.00001; 
    shadowGenerator.forceBackFacesOnly = true;
    var skybox = BABYLON.MeshBuilder.CreateBox("skyBox", { size: 3000.0 }, scene);
    const skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.emissiveTexture = new BABYLON.Texture("./images/ciel2.jpg", scene);
    skyboxMaterial.emissiveTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.disableLighting = true; 
    skybox.material = skyboxMaterial;
    var fps = 60;
    scene.onAfterRenderObservable.add(function () {
        fps = engine.getFps();
    });
    const camera = new BABYLON.ArcRotateCamera("arcCam",
        Math.PI / 2, Math.PI / 4, 25,
        new BABYLON.Vector3(0, 0, 0),
        scene   
    );   
    var camera_free = new BABYLON.FreeCamera("camera_free", new BABYLON.Vector3(0, 10, 0), scene);
    var camera_anim = new BABYLON.FollowCamera("camera_anim", new BABYLON.Vector3(0, 10, 0), scene);
    camera_anim.radius = 20;
    camera_anim.heightOffset = 3;
    camera_anim.maxCameraSpeed = 50;
    scene.activeCamera = camera;
    ////////////////////////////////////// IMPORT WORLD
    var checkMeshes = [];
    var NoSeeThrough = [];
    ///////////////////// CREATE ISLANDS
    const island_radius = 26;
    var islandPositions = [
        { position: new BABYLON.Vector3(0, 0, -100), scale: 1 }, //PORTAL
        { position: new BABYLON.Vector3(0, 0, 0), scale: 1 }, //1ST
        { position: new BABYLON.Vector3(-37, 0, -37), scale: 0.45 }, //sub1st island
        { position: new BABYLON.Vector3(0, 0, 56), scale: 0.6 }, //2nd island
        { position: new BABYLON.Vector3(95, 0, 50), scale: 1.3 }, //3rd island with checkpoint ARTEFACTS
        { position: new BABYLON.Vector3(95, 0, -12), scale: 0.55 }, //4th island
        {position : new BABYLON.Vector3(107, 2, -86), scale: 0.6}, //7th island (4-7)
        { position: new BABYLON.Vector3(203.5, 0, -100), scale: 0.7 }, //8th island(7-8)
        { position: new BABYLON.Vector3(221.402 ,0,-142.272), scale: 0.5 }, //9th island(8-9) ARTEFACTS
        { position: new BABYLON.Vector3(154, 0, 50), scale: 0.4 }, //5th island(3-5)
        { position: new BABYLON.Vector3(200, 20, 100), scale: 1 }, //6th ilsand
        { position: new BABYLON.Vector3(200,50,150), scale: 0.3 }, //11th island(6-11) ARTEFACTS
        { position : new BABYLON.Vector3(-55, 28, 114), scale: 0.5}, //10th island(6-10) ARTEFACTS
        { position: new BABYLON.Vector3(34,0,274), scale: 0.5 }, //12th island(11?-12) ARTEFACTS
        { position: new BABYLON.Vector3(-122.3,2,-37.89), scale: 0.45 },
        { position: new BABYLON.Vector3(-135, 4, -23), scale: 0.1 },
        { position: new BABYLON.Vector3(-139, 6, -30), scale: 0.1 },
        { position: new BABYLON.Vector3(-145, 8, -23), scale: 0.1 },
        { position: new BABYLON.Vector3(-150, 11, -31), scale: 0.1 },
        { position: new BABYLON.Vector3(-156, 13, -30), scale: 0.1 },
        { position: new BABYLON.Vector3(-168, 15, -25), scale: 0.45}, // CHEKPOINTS
        { position: new BABYLON.Vector3(-91,21,-90), scale: 0.3}, //ARTEFACTS
        { position: new BABYLON.Vector3(-300,15,132), scale: 0.17 }, //ARTEFACTS
        { position: new BABYLON.Vector3(26, 2, 56), scale: 0.1 },
        { position : new BABYLON.Vector3(32, 5, 55), scale: 0.1},
        { position : new BABYLON.Vector3(56, -2, 49), scale: 0.2},
        { position: new BABYLON.Vector3(154, 1, 60), scale: 0.1 },
        { position: new BABYLON.Vector3(160, 3, 75), scale: 0.1 },
        { position: new BABYLON.Vector3(170, 4, 85), scale: 0.1 },
        { position: new BABYLON.Vector3(172.5, 7, 83), scale: 0.1 },
        { position: new BABYLON.Vector3(175, 10, 90), scale: 0.1 },
        { position: new BABYLON.Vector3(180, 17, 83), scale: 0.1 },
        { position: new BABYLON.Vector3(70,28,114), scale: 0.35 },
        { position: new BABYLON.Vector3(260, 52, 125), scale: 0.1 },
        { position: new BABYLON.Vector3(300, 20, 100), scale: 0.1 },
        { position: new BABYLON.Vector3(229.9,3,-161.7), scale: 0.1 },
        { position: new BABYLON.Vector3(242.2,4.8,-167), scale: 0.1 },
        { position: new BABYLON.Vector3(256.4,7.34,-169.5), scale: 0.3 },//chekpoint
        { position: new BABYLON.Vector3(269.9,14.5,-166.4), scale: 0.1 },
        { position: new BABYLON.Vector3(270,3,-102), scale: 0.1 },
        { position: new BABYLON.Vector3(187.56,0,-150), scale: 0.25 },//checkpoint
        { position: new BABYLON.Vector3(-2.67,0,274), scale: 0.32 },
        { position: new BABYLON.Vector3(-22,30,274), scale: 0.2 },
        { position: new BABYLON.Vector3(-25, 32, 280), scale: 0.1 },
        { position: new BABYLON.Vector3(-30, 35, 280), scale: 0.1 },
        { position: new BABYLON.Vector3(-35, 38, 280), scale: 0.1 },
        { position: new BABYLON.Vector3(-40, 41, 270), scale: 0.1 },
        { position: new BABYLON.Vector3(-45, 44, 260), scale: 0.1 },
        { position: new BABYLON.Vector3(-50, 47, 250), scale: 0.1 },
        { position: new BABYLON.Vector3(-55, 50, 240), scale: 0.1 },
        { position: new BABYLON.Vector3(-60, 53, 230), scale: 0.1 },
        { position: new BABYLON.Vector3(-65, 56, 220), scale: 0.1 },
        { position: new BABYLON.Vector3(-70, 59, 210), scale: 0.1 },
        { position: new BABYLON.Vector3(-75, 62, 200), scale: 0.1 },
        { position: new BABYLON.Vector3(-80, 65, 190), scale: 0.1 },
        { position: new BABYLON.Vector3(-88, 65, 172), scale: 0.1 },
        { position: new BABYLON.Vector3(-165, 77, 165), scale: 0.15 }, //chekpoint
        { position: new BABYLON.Vector3(-220, 0, 100), scale: 2 }, //final island
    ];
    var base_island = (await BABYLON.SceneLoader.ImportMeshAsync("", "./models/", "island.glb", scene)).meshes[0];
    islandPositions.forEach((islandPosition, index) => {
        let island = base_island.clone("island" + index);
        island.position = islandPosition.position;
        island.scaling = new BABYLON.Vector3(islandPosition.scale, islandPosition.scale + Math.random() *0.1, islandPosition.scale);
        island.rotationQuaternion = false;
        island.rotation.y = Math.random() * Math.PI * 2;
    });
    islandPositions.forEach((islandPosition, index) => {
        let island_box = BABYLON.MeshBuilder.CreateDisc("ground" + index, { radius: island_radius*islandPosition.scale }, scene);
        island_box.position = islandPosition.position;
        island_box.rotation.x = Math.PI / 2;
        checkMeshes.push(island_box);
        island_box.isVisible = false;
    });
    base_island.dispose();
    //////////////////////////// CREATE BRIDGES
    var bridgePositions = [
        { position: new BABYLON.Vector3(-23.5, 0, -23.5), rotation: -Math.PI / 4 }, 
        { position: new BABYLON.Vector3(0, 0, 33), rotation: Math.PI / 2 }, 
        { position: new BABYLON.Vector3(95, 0, 9), rotation: Math.PI / 2 }, 
        { position: new BABYLON.Vector3(136.5, 0, 50), rotation: 0}, 
        { position: new BABYLON.Vector3(213.518,0, -123.455), rotation: 1.2 }, 
        { position: new BABYLON.Vector3(201.28, 0, -146.88), rotation: BABYLON.Angle.FromDegrees(-13.75).radians() }, 
        { position: new BABYLON.Vector3(13.3,0,274), rotation: 0 }, 
    ];
    var bridge = (await BABYLON.SceneLoader.ImportMeshAsync("", "./models/", "bridge.glb", scene)).meshes[0]; 
    bridge.scaling = new BABYLON.Vector3(2.5, 2.5, 2.5);
    bridge.rotationQuaternion = false;
    bridgePositions.forEach((bridgePosition, index) => {
        let bridgeClone = bridge.clone("bridge" + index);
        bridgeClone.position = bridgePosition.position;
        bridgeClone.rotation.y = bridgePosition.rotation;
    });
    bridgePositions.forEach((bridgePosition) => {
        var bridge_box_bottom = BABYLON.MeshBuilder.CreateCylinder("cylinder", {arc: 0.1, height: 5, diameter: 54,tessellation: 4}, scene);
        bridge_box_bottom.rotation.x = 0.32;
        bridge_box_bottom.rotation.z = Math.PI / 2;
        bridge_box_bottom.rotation.y = bridgePosition.rotation + Math.PI / 2;
        bridge_box_bottom.position = new BABYLON.Vector3(bridgePosition.position.x, -25.7, bridgePosition.position.z);
        bridge_box_bottom.isVisible = false;
        checkMeshes.push(bridge_box_bottom);
        let rightOffset = new BABYLON.Vector3(2.5, 2.5, 0);
        rightOffset = BABYLON.Vector3.TransformCoordinates(rightOffset, BABYLON.Matrix.RotationY(bridge_box_bottom.rotation.y));
        var bridge_box_right = BABYLON.MeshBuilder.CreateCylinder("cylinder", {arc: 0.1, height: 0.5, diameter: 54, tessellation: 4}, scene);
        bridge_box_right.rotation = bridge_box_bottom.rotation;
        bridge_box_right.position = bridge_box_bottom.position.add(rightOffset);
        bridge_box_right.isVisible = false;
        checkMeshes.push(bridge_box_right);
        let leftOffset = new BABYLON.Vector3(-2.5, 2.5, 0);
        leftOffset = BABYLON.Vector3.TransformCoordinates(leftOffset, BABYLON.Matrix.RotationY(bridge_box_bottom.rotation.y));
        var bridge_box_left = bridge_box_right.clone("cylinder");
        bridge_box_left.position = bridge_box_bottom.position.add(leftOffset);
        checkMeshes.push(bridge_box_left);
    });
    bridge.dispose();
    progressBar.style.width = "4%"; //MAJ PROGRESS BAR
    /////////////////////////////////////////////////////// PLAYER
    var player = await BABYLON.SceneLoader.ImportMeshAsync("", "./models/", "playerF5.glb", scene);
    var player_root = player.meshes[0];
    var player_backpack = player.meshes[1]; 
    var player_body = player.meshes[2];
    var player_hairs = player.meshes[3]; 
    var player_pants = player.meshes[4]; 
    var player_shoes = player.meshes[5]; 
    var player_tshirt = player.meshes[6]; 
    player_root.position = new BABYLON.Vector3(0,0,0);
    camera.lockedTarget = player_root;
    const playerAnimations = player.animationGroups;
    let runAnim = playerAnimations[2];
    let jumpAnim=playerAnimations[1];
    let idleAnim=playerAnimations[0];
    runAnim.stop();
    jumpAnim.stop();
    idleAnim.stop();
    var jumpTargAnim = jumpAnim.targetedAnimations[0].animation;
    var firstJump=true;
    const fall = new BABYLON.AnimationEvent( 1,
        () => {
            if (firstJump) {
                firstJump = false;
            } else {
                resetAnimations();
                jumpAnim.start(false, 0.1, 30, 40,true);
                firstJump = true;
            }
        },false);
    jumpTargAnim.addEvent(fall);
    progressBar.style.width = "14%"; //MAJ PROGRESS BAR
    ////////////////////////////////////////////////////////// CREATE SOUNDS
    var background = new BABYLON.Sound("background", "sounds/themeTFM.mp3", scene, null, { loop: true, autoplay: true, volume:0.0007*volume.value});
    var jumpSound = new BABYLON.Sound("jump", "sounds/jump.mp3", scene, null, {loop: false, autoplay: false, volume:0.01*volume.value , spatialSound: true, maxDistance: 100, rolloffFactor: 1});
    jumpSound.attachToMesh(player_root);
    var grassWalkSound = new BABYLON.Sound("grass", "sounds/grassWalk.mp3", scene, null, { loop: true, autoplay: false, volume:0.15*volume.value ,spatialSound: true, maxDistance: 100, rolloffFactor: 1});
    var stoneWalkSound = new BABYLON.Sound("stone", "sounds/stoneWalk.mp3", scene, null, { loop: true, autoplay: false, volume:0.08*volume.value ,spatialSound: true, maxDistance: 100, rolloffFactor: 1});
    grassWalkSound.attachToMesh(player_root);
    stoneWalkSound.attachToMesh(player_root);
    progressBar.style.width = "27%"; //MAJ PROGRESS BAR
    var bedSound = new BABYLON.Sound("bed", "sounds/bed.mp3", scene, null, { loop: true, autoplay: false, volume:0.06*volume.value ,spatialSound: true, maxDistance: 100, rolloffFactor: 1});
    bedSound.attachToMesh(player_root);
    var buttonPressedSound = new BABYLON.Sound("buttonPressed", "sounds/buttonPressed.mp3", scene, null, { loop: false, autoplay: false, volume:0.02*volume.value,spatialSound: true, maxDistance: 100, rolloffFactor: 1 });
    buttonPressedSound.attachToMesh(player_root);
    var laserSound = new BABYLON.Sound("laser", "sounds/laser.mp3", scene, null, { loop: false, autoplay: false, volume:0.009*volume.value,spatialSound: true, maxDistance: 100, rolloffFactor: 1 });
    laserSound.attachToMesh(player_root);
    var winSound = new BABYLON.Sound("end", "sounds/win.mp3", scene, null, { loop: false, autoplay: false, volume:0.016*volume.value });
    var successSound = new BABYLON.Sound("success", "sounds/success.mp3", scene, null, { loop: false, autoplay: false, volume:0.016*volume.value });
    var errorSound = new BABYLON.Sound("error", "sounds/error.mp3", scene, null, { loop: false, autoplay: false, volume:0.014*volume.value });
    var magicIdleSound = new BABYLON.Sound("magicIdle", "sounds/magicIdle.mp3", scene, null, { loop: true, autoplay: false, volume:0.001*volume.value,spatialSound: true, maxDistance: 50, rolloffFactor: 1 });
    var magicIdleSound2 = new BABYLON.Sound("magicIdle2", "sounds/magicIdle.mp3", scene, null, { loop: true, autoplay: false, volume:0.01*volume.value,spatialSound: true, maxDistance: 500, rolloffFactor: 1 });
    var magicalsEffectsSound = new BABYLON.Sound("magicalEffects", "sounds/magicalEffects.mp3", scene, null, { loop: false, autoplay: false, volume:0.01*volume.value });
    var fallSound = new BABYLON.Sound("fall", "sounds/fall.mp3", scene, null, { loop: false, autoplay: false, volume:0.05*volume.value,spatialSound: true, maxDistance: 150, rolloffFactor: 1 });
    fallSound.attachToMesh(player_root);
    var looseSound = new BABYLON.Sound("loose", "sounds/loose.mp3", scene, null, { loop: false, autoplay: false, volume:0.005*volume.value });
    progressBar.style.width = "32%"; //MAJ PROGRESS BAR
    ///////////////////////////// CREATE CKECKPOINTS
    var socle = (await BABYLON.SceneLoader.ImportMeshAsync("", "./models/", "socle.glb", scene)).meshes[0];
    socle.scaling = new BABYLON.Vector3(0.45, 0.8, 0.45);
    var checkpointPositions = [
        { position: new BABYLON.Vector3(-37, 50, -37), color : "#FF0000"},
        { position: new BABYLON.Vector3(95, 50, 50), color : "#FFA500"}, 
        { position: new BABYLON.Vector3(200, 70, 100), color : "#FFFF00"}, 
        { position: new BABYLON.Vector3(107,52,-86),color : "#7FFF00"}, 
        { position: new BABYLON.Vector3(-168, 65, -25), color : "#00FF00"}, 
        { position: new BABYLON.Vector3(70,78,114), color : "#00FF7F"},
        { position: new BABYLON.Vector3(34,50,274), color : "#00FFFF" },
        { position: new BABYLON.Vector3(256.4,57.34,-169.5), color : "#007FFF"}, 
        { position: new BABYLON.Vector3(187.56,50,-150), color : "#0000FF"}, 
        { position: new BABYLON.Vector3(-22,80,274), color : "#8B00FF"},
        { position: new BABYLON.Vector3(-165, 127, 165), color : "#FF00FF"}, 
        { position: new BABYLON.Vector3(-220, 94.8, 100), color : "#FFC0CB"}, 
    ];
    var checkpointList = [];
    var PosCurrentCheckpoint = new BABYLON.Vector3(0, 50, 0);
    var checkpoint1 = BABYLON.MeshBuilder.CreateCylinder("checkpoint1", { diameter: 4, height: 100 }, scene);
    checkpoint1.position = checkpointPositions[0].position;
    socle.position = new BABYLON.Vector3(checkpointPositions[0].position.x, checkpointPositions[0].position.y - 50, checkpointPositions[0].position.z);
    checkpoint1.visibility = 0.1;
    checkpoint1.material = new BABYLON.StandardMaterial("checkpoint1Mat", scene);
    checkpoint1.material.emissiveColor = new BABYLON.Color3.FromHexString(checkpointPositions[0].color);
    checkpoint1.material.specularColor = new BABYLON.Color3.Black();
    checkpoint1.material.disableLighting = true;
    checkpointList.push({chekpoint : checkpoint1, color : checkpointPositions[0].color});
    checkpointPositions.forEach((checkpointPosition,index) => {
        if(index === 0) return;
        let checkpoint = checkpoint1.clone("checkpoint" + (index + 1));
        checkpoint.position = checkpointPosition.position;
        let socleClone = socle.clone("socle" + (index + 1));
        socleClone.position = new BABYLON.Vector3(checkpointPosition.position.x, checkpointPosition.position.y - 50, checkpointPosition.position.z);
        checkpoint.material = new BABYLON.StandardMaterial(`checkpoint${index + 1}Mat`, scene);
        checkpoint.material.diffuseColor = new BABYLON.Color3.FromHexString(checkpointPosition.color);
        checkpoint.material.emissiveColor = new BABYLON.Color3.FromHexString(checkpointPosition.color);
        checkpointList.push({ chekpoint: checkpoint, color: checkpointPosition.color });
    });
    var highlightLayerCheckpoint = new BABYLON.HighlightLayer("hl1", scene);
    checkpointList.forEach((checkpoint,index) => {
        const checkpointCallback = async () => {
            if (is_playing && game_ready && !in_pause) {
                if (index === 0) {
                    checkpoint.chekpoint.visibility=0.5;
                    highlightLayerCheckpoint.addMesh(checkpoint.chekpoint, new BABYLON.Color3.FromHexString(checkpoint.color));
                    const checkpoint_ = document.createElement("div");
                    checkpoint_.classList.add("checkpoint");
                    checkpoint_.style.backgroundColor = checkpoint.color; 
                    checkpoint_.addEventListener("click", () => {
                        magicalsEffectsSound.setPlaybackRate(1.5);
                        magicalsEffectsSound.play(0,10.3,4.1);
                        setTimeout(() => {
                            magicalsEffectsSound.setPlaybackRate(1);
                        },4100);
                        PosCurrentCheckpoint = checkpoint.chekpoint.position;
                        player_root.position = new BABYLON.Vector3(checkpoint.chekpoint.position.x, checkpoint.chekpoint.position.y - 50, checkpoint.chekpoint.position.z);
                    });
                    checkpointsMenu.appendChild(checkpoint_);
                    scene.onBeforeRenderObservable.removeCallback(checkpointCallback);
                } else 
                if (player_root.intersectsMesh(checkpoint.chekpoint, false)&&(checkpoint.chekpoint.visibility!=0.5)) {
                    checkpoint.chekpoint.visibility=0.5;
                    magicalsEffectsSound.setPlaybackRate(1.5);
                    magicalsEffectsSound.play(0,10.3,4.1);
                    setTimeout(() => {
                        magicalsEffectsSound.setPlaybackRate(1);
                    },4100);
                    PosCurrentCheckpoint = checkpoint.chekpoint.position;
                    highlightLayerCheckpoint.addMesh(checkpoint.chekpoint, checkpoint.chekpoint.material.diffuseColor);
                    const checkpoint_ = document.createElement("div");
                    checkpoint_.classList.add("checkpoint");
                    checkpoint_.style.backgroundColor = checkpoint.color; 
                    checkpoint_.addEventListener("click", () => {
                        magicalsEffectsSound.setPlaybackRate(1.5);
                        magicalsEffectsSound.play(0,10.3,4.1);
                        setTimeout(() => {
                            magicalsEffectsSound.setPlaybackRate(1);
                        },4100);
                        PosCurrentCheckpoint = checkpoint.chekpoint.position;
                        player_root.position = new BABYLON.Vector3(checkpoint.chekpoint.position.x, checkpoint.chekpoint.position.y - 50, checkpoint.chekpoint.position.z);
                    });
                    checkpointsMenu.appendChild(checkpoint_);
                    scene.onBeforeRenderObservable.removeCallback(checkpointCallback);
                }
            }
        };
        scene.onBeforeRenderObservable.add(checkpointCallback);
    });
    progressBar.style.width = "38%"; //MAJ PROGRESS BAR
    ///////////////////////////////////////// CREATE TREES
    var box_tree = BABYLON.MeshBuilder.CreateCylinder("box_tree", { diameter: 1.5, height: 12.5}, scene);
    box_tree.isVisible = false;
    var treePositions = [
        {position: new BABYLON.Vector3(172.5, 7, 83), rotation: 0, i: 1 },{position: new BABYLON.Vector3(-29, 0, -37), rotation: 0, i: 1 }, { position: new BABYLON.Vector3(-37, 0, -40), rotation: 0, i: 2 }, { position: new BABYLON.Vector3(-40, 0, -37), rotation: 0.5, i: 3 },{position: new BABYLON.Vector3(18, 0, 12), rotation: 0, i: 1 }, { position: new BABYLON.Vector3(-7, 0, 16), rotation: 3.4, i: 2 }, { position: new BABYLON.Vector3(12, 0, -17), rotation: 2, i: 3 }, { position: new BABYLON.Vector3(-13, 0, -10), rotation: 3.14, i: 4 }, { position: new BABYLON.Vector3(8, 0, 13), rotation: 3, i: 5 },{position: new BABYLON.Vector3(10, 0, 50), rotation: 2.5, i: 1 }, { position: new BABYLON.Vector3(-11, 0, 56), rotation: 1.5, i: 2 }, { position: new BABYLON.Vector3(2, 0, 70), rotation: 0.5, i: 3 }, { position: new BABYLON.Vector3(5, 0, 68), rotation: 1.3, i: 4 },
        {position: new BABYLON.Vector3(100, 0, 79), rotation: 3.5, i: 5 }, { position: new BABYLON.Vector3(108, 0, 81), rotation: 2.2, i: 1 }, { position: new BABYLON.Vector3(100, 0, 20), rotation: 0.6, i: 2 }, { position: new BABYLON.Vector3(83, 0, 71), rotation: 0.7, i: 3 }, { position: new BABYLON.Vector3(95, 0, 32), rotation: 0.9, i: 4 }, { position: new BABYLON.Vector3(102, 0, 76), rotation: 0, i: 5 }, { position: new BABYLON.Vector3(65, 0, 60), rotation: 0.5, i: 1 }, { position: new BABYLON.Vector3(80, 0, 62), rotation: 1.5, i: 2 }, { position: new BABYLON.Vector3(70, 0, 54), rotation: 0, i: 3 }, { position: new BABYLON.Vector3(109, 0, 55), rotation: 0.2, i: 4 }, { position: new BABYLON.Vector3(105, 0, 80), rotation: 0.1, i: 5 }, { position: new BABYLON.Vector3(90, 0, 70), rotation: 0.3, i: 1 }, { position: new BABYLON.Vector3(100, 0, 65), rotation: 0.8, i: 2 }, { position: new BABYLON.Vector3(85, 0, 75), rotation: 0.5, i: 3 }, { position: new BABYLON.Vector3(110, 0, 65), rotation: 0.6, i: 4 }, { position: new BABYLON.Vector3(110, 0, 70), rotation: 0.7, i: 5 }, { position: new BABYLON.Vector3(101, 0, 18), rotation: 0.8, i: 1 }, { position: new BABYLON.Vector3(82, 0, 23), rotation: 1.5, i: 2 }, { position: new BABYLON.Vector3(79, 0, 65), rotation: 2.5, i: 3 }, { position: new BABYLON.Vector3(85, 0, 42), rotation: 3.5, i: 4 }, { position: new BABYLON.Vector3(105, 0, 24), rotation: 2.5, i: 5 }, { position: new BABYLON.Vector3(90, 0, 35), rotation: 2, i: 1 }, { position: new BABYLON.Vector3(100, 0, 40), rotation: 2.5, i: 2 }, { position: new BABYLON.Vector3(115, 0, 45), rotation: 3, i: 3 }, { position: new BABYLON.Vector3(105, 0, 30), rotation: 3.5, i: 4 }, { position: new BABYLON.Vector3(100, 0, 35), rotation: 0, i: 5 }, { position: new BABYLON.Vector3(108, 0, 24), rotation: 0.5, i: 1 }, { position: new BABYLON.Vector3(124, 0, 55), rotation: 1, i: 2 }, { position: new BABYLON.Vector3(120, 0, 35), rotation: 1.5, i: 3 }, { position: new BABYLON.Vector3(117, 0, 29), rotation: 2, i: 4 }, { position: new BABYLON.Vector3(75, 0, 29), rotation: 2.5, i: 5 },
        {position: new BABYLON.Vector3(108, 0, -13), rotation: 0, i: 1 }, { position: new BABYLON.Vector3(90, 0, 0), rotation: 1.2, i: 5 },{ position: new BABYLON.Vector3(146, 0, 45), rotation: 0.2, i: 2 }, { position: new BABYLON.Vector3(159, 0, 42), rotation: 0.7, i: 3 },{ position: new BABYLON.Vector3(-13.511, 0, 13.381), rotation: 0.1, i: 1 }, { position: new BABYLON.Vector3(-13.643, 0, 19.885), rotation: 0, i: 2 },{ position: new BABYLON.Vector3(-21.544, 0, 8.054), rotation: 0.4, i: 3 }, { position: new BABYLON.Vector3(14.317, 0, 18.868), rotation: 0.1, i: 4 },{ position: new BABYLON.Vector3(-38.867, 0, -46.373), rotation: 0.9, i: 5 }, { position: new BABYLON.Vector3(8.765, 0, -21.701), rotation: 0, i: 1 },{ position: new BABYLON.Vector3(18.198, 0, -14.204), rotation: 0.8, i: 2 }, { position: new BABYLON.Vector3(-8.069, 0, 61.974), rotation: 0.2, i: 3 },
        {position: new BABYLON.Vector3(-7.223, 0, 47.039), rotation: 2, i: 4 }, { position: new BABYLON.Vector3(68.775, 0, 66.269), rotation: 0, i: 5 },{ position: new BABYLON.Vector3(92.742, 0, 79.677), rotation: 0, i: 1 }, { position: new BABYLON.Vector3(115.102, 0, 75.352), rotation: 0, i: 2 },{position: new BABYLON.Vector3(121.388, 0, 41.054), rotation: 1, i: 3 }, { position: new BABYLON.Vector3(110.506, 0, 34.946), rotation: 0.1, i: 4 },{ position: new BABYLON.Vector3(106.577, 0, 41.766), rotation: 0, i: 5 }, { position: new BABYLON.Vector3(75.406, 0, 72.462), rotation: 3.1, i: 1 },{position: new BABYLON.Vector3(103.400, 0, -3.279), rotation: 1.5, i: 2 }, { position: new BABYLON.Vector3(182.839, 20, 113.517), rotation: 3, i: 3 },{ position: new BABYLON.Vector3(180.534, 20, 95.417), rotation: 3, i: 4 }, { position: new BABYLON.Vector3(206.881, 20, 101.084), rotation: 2.5, i: 5 },{position: new BABYLON.Vector3(211.555, 20, 81.250), rotation: 2.8, i: 1 }, { position: new BABYLON.Vector3(224, 20, 95.7), rotation: 0, i: 2 },{ position: new BABYLON.Vector3(215.7, 20, 110.5), rotation: 1.1, i: 3 },{ position: new BABYLON.Vector3(190, 20, 114), rotation: 0.8, i: 4 },{position: new BABYLON.Vector3(203, 50, 155.5), rotation: 0.1, i: 5 },{ position: new BABYLON.Vector3(195, 50, 153.2), rotation: 0, i: 1 },{ position: new BABYLON.Vector3(-56.8, 28, 124.13), rotation: 1.3, i: 2 },{ position: new BABYLON.Vector3(-50, 28, 106.2), rotation: 0.7, i: 3 },{position: new BABYLON.Vector3(-63.5, 28, 108.4), rotation: 0.1, i: 4 },{ position: new BABYLON.Vector3(197, 20, 88.5), rotation: 0, i: 5 },{ position: new BABYLON.Vector3(97.45, 2, -86.6), rotation: 1.9, i: 1 },{ position: new BABYLON.Vector3(103.9, 2, -96.6), rotation: 0.7, i: 2 },{ position: new BABYLON.Vector3(110.97, 2, -75.3), rotation: 0.4, i: 3 },
        {position: new BABYLON.Vector3(215.9, 0, -91.3), rotation: 2.8, i: 5 },{ position: new BABYLON.Vector3(189.9, 0, -96.4), rotation: 2.5, i: 1 },{ position: new BABYLON.Vector3(229.6, 0, -135.7), rotation: 2.7, i: 2 },{ position: new BABYLON.Vector3(217.9, 0, -152.5), rotation: 1.5, i: 3 },{ position: new BABYLON.Vector3(211.6, 0, -148.3), rotation: 0.5, i: 4 },{ position: new BABYLON.Vector3(195.7, 0, -111.7), rotation: 1.2, i: 5 },{position: new BABYLON.Vector3(255.8,7.34,-174.48), rotation: 0, i: 1 },{ position: new BABYLON.Vector3(262.7,7.34,-171.4), rotation: 0.22, i: 2 },{position: new BABYLON.Vector3(271.35,3,-102.13), rotation: 0.1, i: 3 },{position: new BABYLON.Vector3(269.20 ,3,-101.92 ), rotation: 0.5, i: 4 },{position: new BABYLON.Vector3(270.52,3,-100.12), rotation: 0, i: 5 },{position: new BABYLON.Vector3(-119.91,0,-28.88), rotation: 0.1, i: 1 },{position: new BABYLON.Vector3(-114.8,0,-41.68), rotation: 0.2, i: 3 },{position: new BABYLON.Vector3(-120.51,0,-46.22), rotation: 0.3, i: 2 },{position: new BABYLON.Vector3(-138.67,5.80,-30.59), rotation: 0.4, i: 5 },{position: new BABYLON.Vector3(-175.64,15,-18.39), rotation: 0.5, i: 4 },
        {position: new BABYLON.Vector3(-177.64,15.04,-24.33), rotation: 0.6, i: 2 },{position: new BABYLON.Vector3(-300.75,15,134.77), rotation: 0.7, i: 1 },{position: new BABYLON.Vector3(-95.17,21,-86.47), rotation: 0.8, i: 3 },{position: new BABYLON.Vector3(-85.63,21,-93.25), rotation: 0.9, i: 4 },{position: new BABYLON.Vector3(53.76,-2,46.24), rotation: 0.1, i: 5 },{position: new BABYLON.Vector3(185.51,0,-146.03), rotation: 0.2, i: 1 },{position: new BABYLON.Vector3(190.87,0,-153.44), rotation: 0.3, i: 2 },{position: new BABYLON.Vector3(74.69,28,109.43), rotation: 0.4, i: 3 },{position: new BABYLON.Vector3(75.04,28,118.88), rotation: 0.5, i: 4 },{position: new BABYLON.Vector3(41.9,0,281.951), rotation: 0.6, i: 5 },{position: new BABYLON.Vector3(43.110,0,269.33), rotation: 0.7, i: 1 },{position: new BABYLON.Vector3(28.247,0,269.967), rotation: 0.8, i: 2 },{position: new BABYLON.Vector3(25.232,0,279.739), rotation: 0.9, i: 3 },{position: new BABYLON.Vector3(1.65,0,269.81), rotation: 0.1, i: 4 },{position: new BABYLON.Vector3(-19.72,30,271.15), rotation: 0.2, i: 5 },{position: new BABYLON.Vector3(-48.69,47,249.02), rotation: 0.3, i: 1 },{position: new BABYLON.Vector3(-76.52,62,200.96), rotation: 0.4, i: 2 },{position: new BABYLON.Vector3(-86.50,64.83,171.1), rotation: 0.5, i: 3 },{position: new BABYLON.Vector3(-201.52,0,147.41), rotation: 0.6, i: 4 },{position: new BABYLON.Vector3(-202.47,0,144.03), rotation: 0.7, i: 5 },{position: new BABYLON.Vector3(-207.37,0,139.12), rotation: 0.8, i: 1 },{position: new BABYLON.Vector3(-214.26,0,147.51), rotation: 0.9, i: 2 },{position: new BABYLON.Vector3(-218.33,0,142.12), rotation: 0.1, i: 3 },{position: new BABYLON.Vector3(-223.81,0,149.03), rotation: 0.2, i: 4 },{position: new BABYLON.Vector3(-255.31, 0, 117.89), rotation: 2.94, i: 2},{position: new BABYLON.Vector3(-228.12, 0, 147.02), rotation: 1.21, i: 3},{position: new BABYLON.Vector3(-182, 0, 124), rotation: 0.62, i: 1},{position: new BABYLON.Vector3(-181.57, -1.8, 125.53), rotation: 2.13, i: 4},{position: new BABYLON.Vector3(-204.19, 0, 82.46), rotation: 0.91, i: 5},{position: new BABYLON.Vector3(-231.22, 0, 53.18), rotation: 1.75, i: 2},
        {position: new BABYLON.Vector3(-262.49, 0, 76.44), rotation: 0.33, i: 3},{position: new BABYLON.Vector3(-268.37, 0, 112.88), rotation: 2.67, i: 1},{position: new BABYLON.Vector3(-242.08, 0, 138.97), rotation: 1.13, i: 4},{position: new BABYLON.Vector3(-210.34, 0, 145.63), rotation: 2.89, i: 5},{position: new BABYLON.Vector3(-185, -1.8, 118), rotation: 0.27, i: 2},{position: new BABYLON.Vector3(-183.24, 0, 95.02), rotation: 1.91, i: 3},{position: new BABYLON.Vector3(-196.85, 0, 70.41), rotation: 2.45, i: 1},{position: new BABYLON.Vector3(-221.09, 0, 53.82), rotation: 0.15, i: 5},{position: new BABYLON.Vector3(-248.96, 0, 59.04), rotation: 1.57, i: 4},{position: new BABYLON.Vector3(-264.42, 0, 90.77), rotation: 2.77, i: 3},{position: new BABYLON.Vector3(-252.28, 0, 121.33), rotation: 1.38, i: 2},{position: new BABYLON.Vector3(-226.47, 0, 137.41), rotation: 0.48, i: 1},{position: new BABYLON.Vector3(-178, -3.2, 127), rotation: 2.22, i: 5},{position: new BABYLON.Vector3(-186.32, 0, 93.84), rotation: 0.76, i: 3},{position: new BABYLON.Vector3(-198.43, 0, 65.27), rotation: 2.57, i: 2},{position: new BABYLON.Vector3(-223.81, 0, 50.11), rotation: 1.89, i: 4},{position: new BABYLON.Vector3(-249.05, 0, 65.85), rotation: 0.39, i: 1},{position: new BABYLON.Vector3(-263.17, 0, 96.43), rotation: 2.04, i: 5},
        {position: new BABYLON.Vector3(-215.12, 0, 148.75), rotation: 0.87, i: 3},{ position: new BABYLON.Vector3(-218.1, 0, 102.7), rotation: 1.42, i: 2 },{ position: new BABYLON.Vector3(-230.8, 0, 117.4), rotation: 0.67, i: 3 },{ position: new BABYLON.Vector3(-210.9, 0, 125.3), rotation: 2.51, i: 1 },{ position: new BABYLON.Vector3(-202.5, 0, 111.2), rotation: 1.89, i: 4 },{ position: new BABYLON.Vector3(-201.7, 0, 94.9), rotation: 0.91, i: 5 },{ position: new BABYLON.Vector3(-212.3, 0, 85.4), rotation: 2.17, i: 3 },{ position: new BABYLON.Vector3(-226.5, 0, 87.2), rotation: 1.11, i: 2 },{ position: new BABYLON.Vector3(-236.4, 0, 95.8), rotation: 2.81, i: 1 },{ position: new BABYLON.Vector3(-241.3, 0, 109.7), rotation: 1.75, i: 4 },{ position: new BABYLON.Vector3(-228.6, 0, 105.2), rotation: 0.33, i: 5 },{ position: new BABYLON.Vector3(-215.4, 0, 113.9), rotation: 2.98, i: 1 },{ position: new BABYLON.Vector3(-207.8, 0, 100.5), rotation: 1.27, i: 2 },{ position: new BABYLON.Vector3(-219.2, 0, 92.3), rotation: 2.24, i: 3 },{ position: new BABYLON.Vector3(-231.7, 0, 97.1), rotation: 0.79, i: 4 },{ position: new BABYLON.Vector3(-237.5, 0, 112.4), rotation: 2.66, i: 5 },{ position: new BABYLON.Vector3(-223.9, 0, 115.7), rotation: 1.33, i: 1 },{ position: new BABYLON.Vector3(-213.5, 0, 108.2), rotation: 0.59, i: 2 },{ position: new BABYLON.Vector3(-208.4, 0, 92.7), rotation: 2.49, i: 3 },{ position: new BABYLON.Vector3(-218.6, 0, 89.1), rotation: 0.94, i: 4 },{ position: new BABYLON.Vector3(-229.3, 0, 91.8), rotation: 1.63, i: 5 },{ position: new BABYLON.Vector3(-233.2, 0, 105.6), rotation: 2.88, i: 2 },{ position: new BABYLON.Vector3(-220.1, 0, 110.9), rotation: 0.41, i: 3 },{ position: new BABYLON.Vector3(-210.7, 0, 96.3), rotation: 1.15, i: 1 },{ position: new BABYLON.Vector3(-225.2, 0, 101.6), rotation: 2.22, i: 4 },
    ];
    var trees = [(await BABYLON.SceneLoader.ImportMeshAsync("", "./models/", "tree1.glb", scene)).meshes[0], (await BABYLON.SceneLoader.ImportMeshAsync("", "./models/", "tree2.glb", scene)).meshes[0], (await BABYLON.SceneLoader.ImportMeshAsync("", "./models/", "tree3.glb", scene)).meshes[0], (await BABYLON.SceneLoader.ImportMeshAsync("", "./models/", "tree4.glb", scene)).meshes[0], (await BABYLON.SceneLoader.ImportMeshAsync("", "./models/", "tree5.glb", scene)).meshes[0]];
    treePositions.forEach((treePosition, index) => {
        let tree = trees[treePosition.i - 1].clone("tree" + index);
        tree.position = treePosition.position;
        tree.rotationQuaternion = false;
        tree.rotation.y = treePosition.rotation;
        var box_tree_i = box_tree.clone("box_tree");
        box_tree_i.position = treePosition.position;
        checkMeshes.push(box_tree_i);
    });
    trees.forEach((tree) => {
        tree.dispose();
    });
    progressBar.style.width = "43%"; //MAJ PROGRESS BAR
    // CREATE LAMPS
    var lampPositions = [
        { position: new BABYLON.Vector3(-10.073, 0, -7.731), rotation: 0 },
        { position: new BABYLON.Vector3(14.982, 0, 6.899), rotation: Math.PI },
        { position: new BABYLON.Vector3(3.456, 0, 51.944), rotation: Math.PI / 4 },
        { position: new BABYLON.Vector3(76.188, 0, 55.915), rotation: Math.PI / 3 },
        { position: new BABYLON.Vector3(97.347, 0, 61.113), rotation: Math.PI / 3 },
        { position: new BABYLON.Vector3(115.848, 0, 65.034), rotation: Math.PI / 4 },
        { position: new BABYLON.Vector3(88.349, 0, -8.465), rotation: Math.PI / 4 },
        { position: new BABYLON.Vector3(153.402, 0, 49.009), rotation: 0 },
        { position: new BABYLON.Vector3(83.440, 0, 36.556), rotation: Math.PI / 2 },
        { position: new BABYLON.Vector3(210, 20, 91.97), rotation: 3 * Math.PI / 2 },
        { position: new BABYLON.Vector3(200, 20, 112.2), rotation: Math.PI / 2 },
        { position: new BABYLON.Vector3(-52.34, 28, 114.43), rotation: Math.PI },
        { position: new BABYLON.Vector3(115.65, 2, -86.6), rotation: 0 },
        { position: new BABYLON.Vector3(213, 0, -102.45), rotation: Math.PI },
        { position: new BABYLON.Vector3(221.8, 0, -143.39), rotation: -Math.PI / 2 },
        { position: new BABYLON.Vector3(200, 50, 150), rotation: -Math.PI / 2 },
        { position: new BABYLON.Vector3(-166.14, 15, -29.23), rotation: Math.PI },
        { position: new BABYLON.Vector3(-90.74, 21, -90.29), rotation: Math.PI/2 },
        { position: new BABYLON.Vector3(-124.85, 2, -38.73), rotation: Math.PI/6 },
        { position: new BABYLON.Vector3(29.88, 0, 277.48), rotation: Math.PI/5 },
        { position: new BABYLON.Vector3(-2.21, 0, 274.06), rotation: Math.PI/4 },
        { position: new BABYLON.Vector3(-236.38, 0, 76.40), rotation: Math.PI },
        { position: new BABYLON.Vector3(-217.21, 0, 66.96), rotation: Math.PI*3/ 2 },
        { position: new BABYLON.Vector3(-185.74, 0, 82.21), rotation: Math.PI*0.6 },
        { position: new BABYLON.Vector3(-179.88, 0, 110.72), rotation: Math.PI*0.8 },
        { position: new BABYLON.Vector3(-205.36, 0, 117.91), rotation: Math.PI*1.2 },
        { position: new BABYLON.Vector3(-218.68, 0, 122.5), rotation: Math.PI/7 },
        { position: new BABYLON.Vector3(-247.41, 0, 130.69), rotation: Math.PI*1.8 },
        { position: new BABYLON.Vector3(-253.72, 0, 105.94), rotation: Math.PI*1.9 },
        { position: new BABYLON.Vector3(-251.61, 0, 83.79), rotation: Math.PI*0.5 }

    ];
    var lamp = (await BABYLON.SceneLoader.ImportMeshAsync("", "./models/", "lamp.glb", scene)).meshes[0];
    lamp.scaling = new BABYLON.Vector3(1,1.2,1);
    lamp.rotationQuaternion = false;
    var lampConeMaterial=new BABYLON.StandardMaterial("lampConeMat", scene);
    lampConeMaterial.emissiveColor = new BABYLON.Color3(1, 1, 0);
    lampConeMaterial.disableLighting = true;
    const glowLayerCone = new BABYLON.GlowLayer("glow", scene);
    glowLayerCone.intensity = 0.15;
    glowLayerCone.blurKernelSize = 64;
    lampPositions.forEach((lampPosition, index) => {
        let lampClone = lamp.clone("Lamp" + index);
        lampClone.position = lampPosition.position;
        lampClone.rotation.y = lampPosition.rotation;
        var lampCone = BABYLON.MeshBuilder.CreateCylinder('LampCone'+index, { diameterTop: 0.7, diameterBottom: 10, height: 10 }, scene);
        lampCone.position = new BABYLON.Vector3(lampPosition.position.x,lampPosition.position.y+4.9,lampPosition.position.z);
        lampCone.visibility = 0.1; 
        lampCone.material = lampConeMaterial;
        lampCone.receiveShadows = false;
        var lampCone2 = BABYLON.MeshBuilder.CreateCylinder("LampCone2"+index, { diameterTop: 1.7, diameterBottom: 14, height: 9 }, scene);
        lampCone2.position = new BABYLON.Vector3(lampPosition.position.x,lampPosition.position.y+4.3,lampPosition.position.z);
        lampCone2.visibility = 0.02;
        lampCone2.material = lampConeMaterial;
        lampCone2.receiveShadows = false;
        var lampSphere = BABYLON.MeshBuilder.CreateCylinder("LampSphere", { diameterTop: 1, diameterBottom: 2, height: 1 }, scene);
        lampSphere.position = lampPosition.position.add(new BABYLON.Vector3(0, 9.1, 0)); 
        lampSphere.material = new BABYLON.StandardMaterial("lampSphereMat", scene);
        lampSphere.material.emissiveColor = new BABYLON.Color3(1, 1, 0); 
        highlightLayerCheckpoint.addMesh(lampSphere, new BABYLON.Color3(1, 1, 0));
        glowLayerCone.addIncludedOnlyMesh(lampCone);
        glowLayerCone.addIncludedOnlyMesh(lampCone2);
        var lamp_box = BABYLON.MeshBuilder.CreateCylinder("lamp_box", { diameter: 1, height: 19}, scene);
        lamp_box.position = lampPosition.position;
        lamp_box.visibility=0;
        checkMeshes.push(lamp_box);
    });
    lamp.dispose();
    progressBar.style.width = "47%"; //MAJ PROGRESS BAR
    // CREATE BENCHES
    var benchPositions = [
        { position: new BABYLON.Vector3(-16,0,-8), rotationQ: -96 },
        { position: new BABYLON.Vector3(18.54,0,5.67), rotationQ: -12.8 },
        { position: new BABYLON.Vector3(-42.63,0,-31.54), rotationQ: 23.6 },
        { position: new BABYLON.Vector3(77.53,0,34.93), rotationQ: -129.3 },
        { position: new BABYLON.Vector3(93.12,0,65.33), rotationQ: 106.9 },
        {position : new BABYLON.Vector3(84.4,0,-15.32), rotationQ: -16.23}, 
        {position : new BABYLON.Vector3(159.31,0,45.69), rotationQ: -131.21},
        {position : new BABYLON.Vector3(182.94,20,86.91), rotationQ: -37.3},
        {position : new BABYLON.Vector3(122.8,0,63.91), rotationQ: 156.18},
        {position : new BABYLON.Vector3(177.81,20,103.24), rotationQ: 0.13},
        { position: new BABYLON.Vector3(223.2, 20, 102), rotationQ: 180 },
        { position: new BABYLON.Vector3(199.8, 20, 109.2), rotationQ: 90 },
        { position: new BABYLON.Vector3(217.39, 20, 86.3), rotationQ: 227.7 },
        { position: new BABYLON.Vector3(-56.3, 28, 105.16), rotationQ: 99.9 },
        { position: new BABYLON.Vector3(0.6, 0, 62.3), rotationQ: 67.4 },
        { position: new BABYLON.Vector3(94.65, 2, -85.93), rotationQ: 180 },
        { position: new BABYLON.Vector3(207.6, 0, -87.87), rotationQ: 107.5 },
        { position: new BABYLON.Vector3(223.99, 0, -145.66), rotationQ: 39.8 },
        {position : new BABYLON.Vector3(252.35,7.34,-169.25), rotationQ: 9.79 },
        {position : new BABYLON.Vector3(-171.87,15,-33.22), rotationQ: 117.7},
        {position : new BABYLON.Vector3(-160.86,15,-20), rotationQ: -31.9},
        {position : new BABYLON.Vector3(-94.86,21,-92.42), rotationQ: -31.9},
        {position : new BABYLON.Vector3(-126.56,2,-41.337), rotationQ: 137.7},
        {position : new BABYLON.Vector3(200,20,78.6), rotationQ: 270},
        {position : new BABYLON.Vector3(65.38,28,109.58), rotationQ: -41.9},
        {position : new BABYLON.Vector3(43.53,0,276.09), rotationQ: 170.3},
        {position : new BABYLON.Vector3(-0.12,0,279.32), rotationQ: 115.2},
        {position : new BABYLON.Vector3(-213.8,0,80.61), rotationQ: 107.5},
        {position : new BABYLON.Vector3(-233.23,0,89.51), rotationQ: 127.5},
        {position : new BABYLON.Vector3(-239.8,0,102.33), rotationQ: 162.5},
        {position : new BABYLON.Vector3(-235.44,0,116.62), rotationQ: -124.8},
        {position : new BABYLON.Vector3(-217.51,0,135.49), rotationQ: 82.4},
        {position : new BABYLON.Vector3(-200.20,0,103.58), rotationQ: -2.1},
        {position : new BABYLON.Vector3(-200.98,0,88.19), rotationQ: 9.8},
        {position : new BABYLON.Vector3(-185.66,0,66.77), rotationQ: 227.7},
        {position : new BABYLON.Vector3(-177.9,0,119.03), rotationQ: 64.9},
        {position : new BABYLON.Vector3(-239.1,0,57.99), rotationQ: 290.3},
        {position : new BABYLON.Vector3(-252.25,0,137.58), rotationQ: 52.4}
    ];
    var bench = (await BABYLON.SceneLoader.ImportMeshAsync("", "./models/", "bench.glb", scene)).meshes[0];
    bench.rotationQuaternion = null;
    benchPositions.forEach((benchPosition, index) => {
        let benchClone = bench.clone("bench" + index);
        benchClone.rotationQuaternion = null;
        benchClone.position = benchPosition.position;
        benchClone.rotation = new BABYLON.Vector3(0, BABYLON.Angle.FromDegrees(benchPosition.rotationQ).radians()+ Math.PI,0);
        let box_bench1 = BABYLON.MeshBuilder.CreateBox("box_bench1_" + index, { width: 2.1, height: 3, depth: 6.5 }, scene);
        box_bench1.position = benchPosition.position;
        box_bench1.rotation = new BABYLON.Vector3(0, benchClone.rotation.y, 0);
        box_bench1.isVisible = false;
        checkMeshes.push(box_bench1);
        let rightOffset = new BABYLON.Vector3(1.1, 0, 0);
        rightOffset = BABYLON.Vector3.TransformCoordinates(rightOffset, BABYLON.Matrix.RotationY(box_bench1.rotation.y));
        let box_bench2 = BABYLON.MeshBuilder.CreateBox("box_bench2_" + index, { width: 0.7, height: 6.5, depth: 6.5 }, scene);
        box_bench2.position = benchPosition.position.add(rightOffset);
        box_bench2.rotation = box_bench1.rotation.clone();
        box_bench2.isVisible = false;
        checkMeshes.push(box_bench2);
    });
    bench.dispose();
    progressBar.style.width = "50%"; //MAJ PROGRESS BAR
    ///////////////////////////////////// BED
    var bedInUse = (await BABYLON.SceneLoader.ImportMeshAsync("", "./models/", "bedInUse.glb", scene)).meshes;
    var bedInUse_root = bedInUse[0];
    bedInUse.forEach(mesh => {
        mesh.isVisible = false;
    });
    var bed = (await BABYLON.SceneLoader.ImportMeshAsync("", "./models/", "bed.glb", scene)).meshes;
    var z_letter = (await BABYLON.SceneLoader.ImportMeshAsync("", "./models/", "z.glb", scene)).meshes[1];
    var zLetters = [z_letter, z_letter.clone("z_letter2"), z_letter.clone("z_letter3")];
    zLetters.forEach((zLetter,index) => {
        zLetter.isVisible = false;
        zLetter.position = new BABYLON.Vector3(1.2*index-1.4, 3.5+index*0.1, 0);
    });
    var box_bed = BABYLON.MeshBuilder.CreateBox("box_bed", { width: 6, height: 5, depth: 8 }, scene);
    box_bed.isVisible = false;
    var bedInUseScaleY = 1;
    var bedInUseDirection = 1;
    var inBed = false;
    var iteration = 0;
    var started = false;
    scene.onBeforeRenderObservable.add(() => {
        if(inBed){
            bedInUseScaleY +=bedInUseDirection*0.15/fps;
            bedInUse_root.scaling.y = bedInUseScaleY;
            if (bedInUseScaleY >= 1.15 || bedInUseScaleY <= 0.9) {
                bedInUseDirection *= -1;
            }
            
            zLetters.forEach((zLetter,index) => {
                zLetter.position.y = 3.5+index*0.1+ Math.sin((index+1)+iteration) * 0.25;
                iteration += 0.5/fps;
            });
        }
        if(!inBed&&player_root.intersectsMesh(box_bed, false)){
            inBed = true;
            in_pause = true;
            bedInUse.forEach(mesh => {
                mesh.isVisible = true;
            });
            bed.forEach(mesh => {
                mesh.isVisible = false;
            });
            player.meshes.forEach(mesh => {
                mesh.isVisible = false;
            });
            zLetters.forEach((zLetter) => {
                zLetter.isVisible = true;
            });
            player_root.position = new BABYLON.Vector3(0, 0, 0);
            camera.rotationOffset = 0;
            bedSound.play(2,0);
        } else if(inBed&&!player_root.intersectsMesh(box_bed, false)){
            inBed = false;
            bedSound.stop();
            if(!started){
                startTimer(looseSound);
                started = true;
            }
            in_pause = false;
            bedInUse.forEach(mesh => {
                mesh.isVisible = false;
            });
            bed.forEach(mesh => {
                mesh.isVisible = true;
            });
            player.meshes.forEach(mesh => {
                mesh.isVisible = true;
            });
            zLetters.forEach((zLetter) => {
                zLetter.isVisible = false;
            });
        }
    });
    progressBar.style.width = "56%"; //MAJ PROGRESS BAR
    ///////////////////////////////ARTEFACTS (+ positions socle portail)
    var bridgePortalMeshes = (await BABYLON.SceneLoader.ImportMeshAsync("", "./models/", "bridgePortal.glb", scene)).meshes;
    bridgePortalMeshes.forEach(mesh => {
        mesh.visibility = 0;
    });
    var portalCreated = false;
    var portal = (await BABYLON.SceneLoader.ImportMeshAsync("", "./models/", "portalEnd.glb", scene));     
    portal.meshes[0].position = new BABYLON.Vector3(0, 0, -100); 
    portal.meshes[0].rotationQuaternion = null;
    portal.meshes[0].rotation.y = Math.PI / 2;
    var planePortal = portal.meshes[2];
    planePortal.isVisible = false;
    var boxPlanePortal = BABYLON.MeshBuilder.CreateBox("boxPlanePortal", { width: 9, height: 20, depth:1.5 }, scene);
    boxPlanePortal.position = new BABYLON.Vector3(0, 0, -101);
    boxPlanePortal.isVisible = false;
    var planeMat = new BABYLON.StandardMaterial("planeMat", scene);
    planeMat.emissiveTexture = new BABYLON.Texture("./textures/portail.PNG", scene);
    planeMat.backFaceCulling = false;
    planePortal.material = planeMat;
    var soclePositions = [ 
        { position: new BABYLON.Vector3(-0.2,3.6,-79.86), color: "#FF0000"},
        { position: new BABYLON.Vector3(-10.289,3.6,-82.788), color: "#FFA500"},
        { position: new BABYLON.Vector3(-17.471,3.6,-90.223), color: "#FFFF00"},
        { position: new BABYLON.Vector3(-19.93,3.6,-100.31), color: "#7FFF00"},
        { position: new BABYLON.Vector3(-17.16,3.6,-110.37), color: "#00FF00"},
        { position: new BABYLON.Vector3(-9.84,3.6,-117.5), color: "#00FF7F"},
        { position: new BABYLON.Vector3(0.33,3.6,-120.06), color: "#00FFFF"},
        { position: new BABYLON.Vector3(10.35,3.6,-117.28), color: "#007FFF"},
        { position: new BABYLON.Vector3(17.47,3.6,-109.8), color: "#0000FF"},
        { position: new BABYLON.Vector3(20.18,3.6,-99.56), color: "#8B00FF"},
        { position: new BABYLON.Vector3(17.26,3.6,-89.51), color: "#FF00FF"},
        { position: new BABYLON.Vector3(9.76,3.6,-82.31), color: "#FFC0CB"}
    ]
    var artefact = (await BABYLON.SceneLoader.ImportMeshAsync("", "./models/", "artefact.glb", scene)).meshes[0];
    artefact.rotationQuaternion = null;
    artefact.rotation.x = Math.PI / 2;
    var artefactPositions = [ 
        { position: new BABYLON.Vector3(218 ,2,-139), color: "#FF0000" }, 
        { position: new BABYLON.Vector3(198,52,150), color: "#FFA500" }, 
        { position: new BABYLON.Vector3(94.990,10,75.060), color: "#FFFF00" }, 
        { position: new BABYLON.Vector3(-87,23,-89), color: "#7FFF00" }, 
        { position: new BABYLON.Vector3(-300,17,132), color: "#00FF00" }, 
        { position: new BABYLON.Vector3(-58, 30, 116), color: "#00FF7F" }, 
        { position: new BABYLON.Vector3(38,2,271), color: "#00FFFF" }, 
        { position: new BABYLON.Vector3(275.5,6,-85.9), color: "#007FFF" }, 
        { position: new BABYLON.Vector3(76,35,-160), color: "#0000FF" }, 
        { position: new BABYLON.Vector3(-30,32,234), color: "#8B00FF" }, 
        { position: new BABYLON.Vector3(-0.48,4,61,72), color: "#FF00FF" }, 
        { position: new BABYLON.Vector3(-180, 46.8, 100), color: "#FFC0CB" }
    ];
    const glowLayerArtefact = new BABYLON.GlowLayer("glow", scene);
    glowLayerArtefact.intensity = 3;
    var allFound = 0;
    var simonsIteration = 0;
    artefactPositions.forEach((artefactPosition, index) => {
        let artefactClone = artefact.clone("artefact" + index);
        artefactClone.position = artefactPosition.position;
        var magicIdleOrbeSound=magicIdleSound.clone("magicIdleOrbeSound" + index);
        var subMeshes=artefactClone.getChildMeshes();
        var center = subMeshes[1];
        var caseL=subMeshes[0];
        var caseR=subMeshes[2];
        NoSeeThrough.push(caseL);
        NoSeeThrough.push(caseR);
        center.material = new BABYLON.StandardMaterial("artefactMat", scene);
        center.material.emissiveColor = new BABYLON.Color3.FromHexString(artefactPosition.color);
        center.material.disableLighting = true;
        glowLayerArtefact.addIncludedOnlyMesh(center);
        caseL.rotationQuaternion = null;
        caseR.rotationQuaternion = null;
        center.rotationQuaternion = null;
        const floatingAnimation = new BABYLON.Animation("floatingAnimation", "position.y", 60,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
        const floatingKeys = [
        { frame: 0, value: artefactPosition.position.y },
        { frame: 30, value: artefactPosition.position.y + 0.5 },
        { frame: 60, value: artefactPosition.position.y }
        ];
        floatingAnimation.setKeys(floatingKeys);
        const easingFunc = new BABYLON.SineEase();
        easingFunc.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
        floatingAnimation.setEasingFunction(easingFunc);
        artefactClone.animations = [floatingAnimation];
        scene.beginAnimation(artefactClone, 0, 60, true,0.5);
        const rotationAnimation = new BABYLON.Animation("rotationAnimation", "rotation.y", 60, 
        BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
        const rotationKeys = [
        { frame: 0, value: 0 },
        { frame: 360, value: Math.PI * 2 }  
        ];
        rotationAnimation.setKeys(rotationKeys);
        caseL.animations = [rotationAnimation];
        var caseRAnim=rotationAnimation.clone("caseRAnim");
        caseRAnim.setKeys(rotationKeys.map(key => ({ frame: key.frame, value: -key.value })));
        caseR.animations = [caseRAnim];
        scene.beginAnimation(caseL, 0, 60, true);
        scene.beginAnimation(caseR, 0, 60, true);
        var triggered = false;
        var endAnim = false;
        var soundCallback = () => {
            magicIdleOrbeSound.attachToMesh(artefactClone);
            magicIdleOrbeSound.setVolume(0.002*volume.value);
            magicIdleOrbeSound.play(0,4,20);
            scene.onAfterRenderObservable.removeCallback(soundCallback);
        };
        scene.onAfterRenderObservable.add(soundCallback);
        scene.onAfterRenderObservable.add(() => {
            if(triggered && !endAnim) {
                var direction =new BABYLON.Vector3(0, 0, -100).subtract(artefactClone.position).normalize();
                camera_anim.rotationOffset = Math.atan2(direction.x, direction.z)*180/Math.PI;
            }
            if (player_body.intersectsMesh(artefactClone, false)&&!triggered&&!portalCreated) {
                triggered = true;
                magicIdleOrbeSound.stop();
                magicIdleOrbeSound.dispose();
                magicalsEffectsSound.play(0,6.5,2);
                allFound++;
                const moveAnimation = new BABYLON.Animation("moveAnimation", "position", 30,
                    BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
                const moveKeys = [
                    { frame: 0, value: artefactClone.position },
                    { frame: 30, value: soclePositions.find(socle => socle.color === artefactPosition.color).position }
                ]; 
                if(allFound==12){
                    var godrays = new BABYLON.VolumetricLightScatteringPostProcess('godrays', 1.0, camera_anim, portal.meshes[2], 100, BABYLON.Texture.BILINEAR_SAMPLINGMODE, scene.getEngine(), false); 
                    highlightLayerCheckpoint.addMesh(portal.meshes[2], new BABYLON.Color3(1,1,1));
                    portalCreated = true;
                }
                moveAnimation.setKeys(moveKeys);
                moveAnimation.setEasingFunction(easingFunc);
                artefactClone.animations = [moveAnimation];
                camera_anim.lockedTarget = artefactClone;
                camera_anim.radius = 40;
                camera_anim.heightOffset = 10;
                scene.activeCamera = camera_anim;
                scene.beginAnimation(artefactClone, 0, 30, false, 1, () => {
                    endAnim = true;
                    var direction =new BABYLON.Vector3(0, 0, -100).subtract(artefactClone.position).normalize();
                    camera_anim.rotationOffset = Math.atan2(direction.x, direction.z)*180/Math.PI;
                    setTimeout(() => {
                        if(!portalCreated){
                            scene.activeCamera = camera;
                        } else {
                            NoSeeThrough.push(bridgePortalMeshes[1]);
                            var bridgePortal = bridgePortalMeshes[0];
                            bridgePortal.rotationQuaternion = null;
                            bridgePortal.position = new BABYLON.Vector3(0, 0, -50);
                            var bridgePortalBox= BABYLON.MeshBuilder.CreateBox("bridgePortalBox", { width: 5, height: 2, depth: 48 }, scene);
                            bridgePortalBox.position = new BABYLON.Vector3(0, -1.1, -50);
                            bridgePortalBox.isVisible = false;
                            var bridgeWallBox= BABYLON.MeshBuilder.CreateBox("bridgeWallBox", { width: 1, height: 8, depth: 54 }, scene);
                            bridgeWallBox.position = new BABYLON.Vector3(2.7, 2.5, -50);
                            bridgeWallBox.isVisible = false;
                            var bridgeWallBox2= BABYLON.MeshBuilder.CreateBox("bridgeWallBox", { width: 1, height: 8, depth: 54 }, scene);
                            bridgeWallBox2.position = new BABYLON.Vector3(-2.7, 2.5, -50);
                            bridgeWallBox2.isVisible = false;
                            checkMeshes.push(bridgeWallBox2);
                            checkMeshes.push(bridgePortalBox);
                            checkMeshes.push(bridgeWallBox);
                            bridgeWallBox.checkCollisions = true;
                            bridgeWallBox2.checkCollisions = true;
                            bridgePortalBox.checkCollisions = true;
                            const animY = new BABYLON.Animation("rise", "position.y", 30,
                                BABYLON.Animation.ANIMATIONTYPE_FLOAT,
                                BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
                            const keysY = [
                                { frame: 0, value: -10 },
                                { frame: 15, value: 0 }
                            ];
                            animY.setKeys(keysY);
                            const animFade = new BABYLON.Animation("fadeIn", "visibility", 30,
                                BABYLON.Animation.ANIMATIONTYPE_FLOAT,
                                BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
                            const keysFade = [
                                { frame: 0, value: 0 },
                                { frame: 15, value: 1 }
                            ];
                            animFade.setKeys(keysFade);
                            var tempBlock = new BABYLON.MeshBuilder.CreateBox("tempBlock", { width: 1, height: 1, depth: 1 }, scene);
                            tempBlock.position = new BABYLON.Vector3(-0.2,3.6,-79.86);
                            tempBlock.isVisible = false;
                            camera_anim.lockedTarget = tempBlock;
                            camera_anim.radius = 90;
                            camera_anim.heightOffset = 10;
                            camera_anim.rotationOffset = 0;
                            magicalsEffectsSound.play(0,11,3);
                            bridgePortalMeshes.forEach(mesh => {
                                mesh.animations = [animY, animFade];
                                scene.beginAnimation(mesh, 0, 15, false,0.33, () => {
                                    setTimeout(() => {
                                        camera_anim.fov = 1.2;
                                        camera_anim.radius = 50;
                                        camera_anim.lockedTarget = planePortal;
                                        tempBlock.dispose();
                                        camera_anim.heightOffset = 8;
                                        camera_anim.rotationOffset = 90;
                                        planePortal.isVisible = true;
                                        magicalsEffectsSound.play(0,1.8,4.2);
                                        magicIdleSound2.attachToMesh(planePortal);
                                        magicIdleSound2.play(0,4,21);
                                        setTimeout(() => {
                                            scene.activeCamera = camera;
                                            if(simonsIteration==0){
                                                createSimonsSays(scene, new BABYLON.Vector3(0,0,-7), new BABYLON.Vector3(0,0,-24), 8);
                                                scene.meshes.forEach(mesh => {
                                                    if(!mesh.checkCollisions&&mesh.name.includes("portal")){
                                                        mesh.checkCollisions = true;
                                                        checkMeshes.push(mesh);
                                                    }
                                                });
                                            }
                                            simonsIteration++;
                                            camera.fov = 0.8;
                                            godrays.dispose(camera_anim);
                                            camera_anim.dispose();
                                            godrays = new BABYLON.VolumetricLightScatteringPostProcess('godrays', 1.0, camera, portal.meshes[2], 100, BABYLON.Texture.BILINEAR_SAMPLINGMODE, scene.getEngine(), false); 
                                        }, 3000);
                                    }, 1800);
                                });
                            });
                        }
                    }, 2000);
                });
            }
        });
    });
    artefact.dispose();
    var iter_rotation = 0;
    scene.onBeforeRenderObservable.add(() => {
        if (planePortal.isVisible) {
            planePortal.material.emissiveTexture.wAng= iter_rotation/fps;
            iter_rotation += 5;
            if (iter_rotation >= 360) {
                iter_rotation = 0;
            }
            let distanceToPortal = BABYLON.Vector3.Distance(player_root.position, new BABYLON.Vector3(0, 0, -100));
            if (distanceToPortal < 100) {
                camera.fov = 0.8+(100-distanceToPortal) * 0.01;
                camera.radius = 14+distanceToPortal * 0.5;
                if(player_root.intersectsMesh(boxPlanePortal, false)){
                    player_root.position = new BABYLON.Vector3(0, 0, 0);
                    magicIdleSound2.stop();
                    endDiv.classList.remove("hidden");
                    winSound.play();
                    in_pause = true;
                    timerResult.innerHTML = Math.floor(DuringTime/60) + " minutes and " + Math.floor(DuringTime%60)+" seconds !";
                    document.exitPointerLock();
                }
            } else {
                camera.fov = 0.8;
            }
        }
    });
    //////////////////////////////////////////////////////////////////////////////////FIN IMPORT WORLD
    progressBar.style.width = "68%"; //MAJ PROGRESS BAR
    ////////////////////////////////////////////////////////////////////////////////////////////////////////// CREATE QUESTS
    let keys = { z: false, s: false, q: false, d: false, space: false, shift: false };
    var buttInvisMat=new BABYLON.StandardMaterial("plateformMat", scene);
    buttInvisMat.diffuseTexture = new BABYLON.Texture("./textures/buttonInvis.JPG", scene);
    buttInvisMat.emissiveColor = new BABYLON.Color3(0.5,0.5,0.5);
    var platInvisMat=new BABYLON.StandardMaterial("plateformMat", scene);
    platInvisMat.diffuseTexture = new BABYLON.Texture("./textures/platformInvis.JPG", scene);
    platInvisMat.emissiveColor = new BABYLON.Color3(0.5,0.5,0.5);
    var platMoveMat=new BABYLON.StandardMaterial("plateformMat", scene);
    platMoveMat.diffuseTexture = new BABYLON.Texture("./textures/plateformMove.JPG", scene);
    platMoveMat.emissiveColor = new BABYLON.Color3(0.5,0.5,0.5);
    var buttSimonMat=new BABYLON.StandardMaterial("plateformMat", scene);
    buttSimonMat.diffuseTexture = new BABYLON.Texture("./textures/buttonSimon.JPG", scene);
    buttSimonMat.emissiveColor = new BABYLON.Color3(0.5,0.5,0.5);
    var platLaserMat=new BABYLON.StandardMaterial("plateformMat", scene);
    platLaserMat.diffuseTexture = new BABYLON.Texture("./textures/platformLaser.JPG", scene);
    platLaserMat.emissiveColor = new BABYLON.Color3(0.5,0.5,0.5);
    var faceUV = new Array(6);
    for (var i = 0; i < 6; i++) {
        if(i==5||i==4){
            faceUV[i] = new BABYLON.Vector4(0, 0, 1, 1);
        }else if(i==2||i==3){
            faceUV[i] = new BABYLON.Vector4(1/3, 0, 2/3, 1);
        }else{
            faceUV[i] = new BABYLON.Vector4(0, 1/3, 1, 2/3);
        }
    }
    function createInvisParkour(scene, platformPositions, buttonPosition, visibleTime = 5000) {
        const platforms = platformPositions.map(pos => {
            const box = BABYLON.MeshBuilder.CreateBox("parkourBox", { height:0.5,width:4,depth:4,faceUV:faceUV}, scene);
            box.position = new BABYLON.Vector3(pos.x, pos.y - 4, pos.z); // commence plus bas
            box.visibility = 0;
            box.checkCollisions = false; 
            box.material = platInvisMat;
            return box;
        });
        const buttonParkour = BABYLON.MeshBuilder.CreateBox("parkourButton", { height:0.5,width:4,depth:4,faceUV:faceUV }, scene);
        buttonParkour.position = buttonPosition;
        buttonParkour.material = buttInvisMat;
        let triggered = false; // pour éviter les déclenchements multiples
        scene.onAfterRenderObservable.add(() => {
            if (!triggered && player_root.intersectsMesh(buttonParkour, false)) {
                buttonParkour.position.y = buttonPosition.y - 0.2; // fait monter le bouton
                buttonPressedSound.play(0,0.9);
                triggered = true;
                // Animation d’apparition des plateformes
                platforms.forEach((platform, i) => {
                    setTimeout(() => {
                        platform.visibility = 1;
                        const animY = new BABYLON.Animation("rise", "position.y", 30,
                            BABYLON.Animation.ANIMATIONTYPE_FLOAT,
                            BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
                        const keysY = [
                            { frame: 0, value: platform.position.y },
                            { frame: 15, value: platformPositions[i].y }
                        ];
                        animY.setKeys(keysY);
                        const animFade = new BABYLON.Animation("fadeIn", "visibility", 30,
                            BABYLON.Animation.ANIMATIONTYPE_FLOAT,
                            BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
                        const keysFade = [
                            { frame: 0, value: 0 },
                            { frame: 15, value: 1 }
                        ];
                        animFade.setKeys(keysFade);
                        platform.animations = [animY, animFade];
                        scene.beginAnimation(platform, 0, 15, false);
                        checkMeshes.push(platform);
                        platform.checkCollisions = true;
                    }, i * 400);
                });
                // Cache les plateformes après un délai
                setTimeout(() => {
                    platforms.forEach((platform,i) => {
                        setTimeout(() => {
                            const animFadeOut = new BABYLON.Animation("fadeOut", "visibility", 30,
                                BABYLON.Animation.ANIMATIONTYPE_FLOAT,
                                BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
                            const keys = [
                                { frame: 0, value: 1 },
                                { frame: 15, value: 0 }
                            ];
                            animFadeOut.setKeys(keys);
                            const animYd = new BABYLON.Animation("fall", "position.y", 30,
                                BABYLON.Animation.ANIMATIONTYPE_FLOAT,
                                BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
                    
                            const keysYd = [
                                { frame: 0, value: platformPositions[i].y },
                                { frame: 15, value: platform.position.y-4 }
                            ];
                            animYd.setKeys(keysYd);
                            platform.animations = [animFadeOut, animYd];
                            scene.beginAnimation(platform, 0, 15, false);
                            checkMeshes.splice(checkMeshes.indexOf(platform), 1); 
                            platform.checkCollisions = false;
                        }, i * 400);
                    });
                    buttonParkour.position.y = buttonPosition.y + 0.2;
                    triggered = false; // permet de réactiver le bouton plus tard si tu veux
                }, visibleTime);
            }
        });
    }
    function createMovParkour(scene, platformsData) {
        const movingPlatforms = [];
        platformsData.forEach((data, index) => {
            const platform = BABYLON.MeshBuilder.CreateBox(`movPlatform_${index}`, { width: 3.5, height: 0.5, depth: 3.5,faceUV:faceUV }, scene);
            platform.position = data.position.clone();
            platform.originalPosition = data.position.clone();
            platform.material = platMoveMat;
            checkMeshes.push(platform);
            platform.direction = data.direction.clone();
            platform.targetPosition = platform.originalPosition.add(platform.direction);
            platform.speed = data.speed;
            const animation = new BABYLON.Animation(`platformAnim_${index}`, "position", fps,
                BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
            const keys = [
                { frame: 0, value: platform.originalPosition },
                { frame: fps, value: platform.targetPosition },
                { frame: fps * 2, value: platform.originalPosition }
            ];
            animation.setKeys(keys);
            const easingFunc = new BABYLON.SineEase();
            easingFunc.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
            animation.setEasingFunction(easingFunc);
            platform.animations = [animation];
            const oneWayDistance = platform.direction.length();
            const durationInSeconds = oneWayDistance / platform.speed;
            const durationInFrames = durationInSeconds * fps;
            const totalFrames = durationInFrames * 2;
            const speedRatio = (fps * 2) / totalFrames;
            scene.beginAnimation(platform, 0, fps * 2, true, speedRatio);
            movingPlatforms.push(platform);
        });
        let currentPlatform = null;
        scene.onBeforeRenderObservable.add(() => {
            currentPlatform = null;
            for (const platform of movingPlatforms) {
                const bbox = platform.getBoundingInfo().boundingBox;
                const playerPos = player_root.position;
                const isOnPlatform = (
                    playerPos.x >= bbox.minimumWorld.x && playerPos.x <= bbox.maximumWorld.x &&
                    playerPos.z >= bbox.minimumWorld.z && playerPos.z <= bbox.maximumWorld.z &&
                    Math.abs(playerPos.y - bbox.maximumWorld.y) < 0.2 // tolérance verticale
                );
                if (isOnPlatform) {
                    currentPlatform = platform;
                    break;
                }
            }
            if (currentPlatform) {
                const platformDelta = currentPlatform.position.subtract(currentPlatform.lastPosition || currentPlatform.position.clone());
                player_root.position.addInPlace(platformDelta);
            }
            movingPlatforms.forEach(p => {
                p.lastPosition = p.position.clone();
            });
        });
    }
    async function createSimonsSays(scene, posButton, posPortail,size) {
        var rotPortail = -Math.atan2(posButton.x - posPortail.x, posPortail.z - posButton.z);
        const button = BABYLON.MeshBuilder.CreateBox("simonButton", { width: 4, height: 0.5, depth: 4,faceUV:faceUV }, scene);
        button.rotationQuaternion = null;
        button.position = posButton.clone();
        button.rotation.y = rotPortail;
        button.material = buttSimonMat;
        const portal = BABYLON.MeshBuilder.CreateBox("portal", { width: 15, height: 15, depth: 3 }, scene);
        portal.rotationQuaternion = null;
        portal.rotation.y = rotPortail;
        portal.position = posPortail.clone().add(new BABYLON.Vector3(0, 7.5, 0));
        portal.material = new BABYLON.StandardMaterial("portalMat", scene);
        portal.material.diffuseTexture = new BABYLON.Texture("./textures/platform.jpg", scene);
        checkMeshes.push(portal);
        var keysButtonM = (await BABYLON.SceneLoader.ImportMeshAsync("", "./models/", "keysButton.glb", scene)).meshes;
        keysButtonM[0].rotationQuaternion = null;
        keysButtonM[0].rotation.y = portal.rotation.y+Math.PI/2;
        keysButtonM[0].position = portal.position.clone().add(new BABYLON.Vector3(1.5*Math.cos(keysButtonM[0].rotation.y), -2, -1.5*Math.sin(keysButtonM[0].rotation.y)));
        const allKeys = ["z", "q", "s", "d"];
        for (let i = 0; i < 4; i++) {
            keysButtonM[2*i+1].material = new BABYLON.StandardMaterial("keyMat", scene);
            keysButtonM[2*i+1].material.emissiveColor = new BABYLON.Color3(0.5, 0.5, 0.5);
            keysButtonM[2*i+1].material.disableLighting = true;
        }
        var keysButton = [keysButtonM[1], keysButtonM[7], keysButtonM[3], keysButtonM[5]];
        let sequence = [];
        let currentStep = 0;
        let isPlaying = false;
        let triggered_sim = false;
        let portalSpawned = false;     
        var pos_player = new BABYLON.Vector3(0, 10, 0);   
        const lookAtPortal = () => {
            camera_free.position = new BABYLON.Vector3(
                2*player_root.position.x-posPortail.x,
                player_root.position.y + 7,
                2*player_root.position.z-posPortail.z
            );
            camera_free.setTarget(posPortail);
        };
        const extendSequence = () => {
            const randomKey = Math.floor(Math.random() * allKeys.length);
            sequence.push(randomKey);
        };
        extendSequence();
        const displaySequence = async () => {
            for (let i = 0; i < sequence.length; i++) {
                var iTEmp=i;
                await new Promise(resolve => setTimeout(resolve, 100));
                if(keysButton[sequence[i]]==undefined){
                    console.log("undefined");
                    resetGame();
                    return;
                }
                keysButton[sequence[i]].material.emissiveColor = new BABYLON.Color3(1, 1, 0);
                await new Promise(resolve => setTimeout(resolve, 400));
                if(keysButton[sequence[iTEmp]]==undefined){
                    console.log("undefined");
                    resetGame();
                    return;
                }
                keysButton[sequence[iTEmp]].material.emissiveColor = new BABYLON.Color3(0.5, 0.5, 0.5);
            }
            isPlaying = true;
            currentStep = 0;
        };
        var inputAccepted = false;
        const resetGame = () => {
            keysButton.forEach((key) => {
                key.material.emissiveColor = new BABYLON.Color3(1, 0, 0); // Rouge
            });
            setTimeout(() => {
                keysButton.forEach((key) => {
                    key.material.emissiveColor = new BABYLON.Color3(0.5, 0.5, 0.5); // Couleur par défaut
                });
            }, 200);
            sequence = [];
            extendSequence();
            currentStep = 0;
            isPlaying = true;
            setTimeout(()=>displaySequence(), 1000); // Délai avant le prochain tour
            inputAccepted = false;
        };
        const checkInput = () => {
            if (inputAccepted) return;
            const expectedKey = allKeys[sequence[currentStep]];
            if (keys[expectedKey]) {
                player_root.position = pos_player.clone();
                inputAccepted = true;
                keys[expectedKey] = false;
                keysButton[sequence[currentStep]].material.emissiveColor = new BABYLON.Color3(0, 1, 0) 
                
                setTimeout(()=>{
                    if(keysButton[sequence[currentStep-1]]==undefined){
                        console.log("undefined");
                        resetGame();
                        return;
                    }
                    keysButton[sequence[currentStep-1]].material.emissiveColor = new BABYLON.Color3(0.5, 0.5, 0.5);
                    inputAccepted = false;
                },200) 
                currentStep++;
                if (currentStep >= sequence.length) {
                    if (sequence.length >= size && !portalSpawned) {
                        successSound.play(0,0.3);
                        keysButton.forEach((key) => {
                            key.material.emissiveColor = new BABYLON.Color3(0, 1, 0);
                        });
                        portalSpawned = true;
                        isPlaying = false;
                        button.dispose();
                        keysButtonM.forEach(key => key.dispose());
                        const animY = new BABYLON.Animation("rise", "position.y", 30,
                            BABYLON.Animation.ANIMATIONTYPE_FLOAT,
                            BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
                        const keysY = [
                            { frame: 0, value: portal.position.y },
                            { frame: 15, value: portal.position.y-15 }
                        ];
                        animY.setKeys(keysY);
                        const animFade = new BABYLON.Animation("fadeIn", "visibility", 30,
                            BABYLON.Animation.ANIMATIONTYPE_FLOAT,
                            BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
                        const keysFade = [
                            { frame: 0, value: 1 },
                            { frame: 15, value: 0 }
                        ];
                        animFade.setKeys(keysFade);
                        portal.animations = [animFade,animY];
                        scene.beginAnimation(portal, 0, 15, false,0.3);
                        scene.activeCamera = camera;
                        return;
                    }else{
                        successSound.play(0,0.732);
                    }
                    isPlaying = false;
                    extendSequence();
                    setTimeout(() => {
                        displaySequence();
                    }, 1000);  // Délai avant le prochain tour
                }else{
                    successSound.play(0,0.732);
                }
            } else if (Object.values(keys).some(v => v)) {
                player_root.position = pos_player.clone();
                errorSound.play(0);
                inputAccepted = true;
                keys[Object.keys(keys).find(key => keys[key])] = false;
                keysButton[sequence[currentStep]].material.emissiveColor = new BABYLON.Color3(1, 0, 0); // Rouge
                setTimeout(()=>keysButton[sequence[currentStep]].material.emissiveColor = new BABYLON.Color3(0.5, 0.5, 0.5),500)
                isPlaying = false;
                setTimeout(() => {
                    resetGame();
                }, 500);  // Délai avant le prochain tour
                return;
            }
        };
        scene.onBeforeRenderObservable.add(() => {
            if(!inBed&&is_playing){
                if (!triggered_sim && !portalSpawned && player_root.intersectsMesh(button, false)) {
                    triggered_sim = true;
                    buttonPressedSound.play(0,0.9);
                    button.position.y = posButton.y - 0.2;
                    lookAtPortal();
                    displaySequence();
                    scene.activeCamera = camera_free;
                    pos_player = player_root.position.clone();
                }
                if (triggered_sim&&!portalSpawned){
                    if(isPlaying){
                        checkInput();
                    }else{
                        keys = { z: false, s: false, q: false, d: false, space: false, shift: false };
                    }
                    lookAtPortal();
                }
            }
        });
    }
    function createLaserParkour(scene, positions, laserConfigs) {
        const lasers = [];
        positions.forEach(pos => {
            const platform = BABYLON.MeshBuilder.CreateBox("platform", { width: 4, height: 0.5, depth: 4 ,faceUV:faceUV}, scene);
            platform.position = pos.clone();
            platform.material = platLaserMat;
            checkMeshes.push(platform);
        });
        laserConfigs.forEach((config, index) => {
            const laserMesh = BABYLON.MeshBuilder.CreateBox("laserMesh", {
                width: config.axis === "x" ? 15 : 0.05,
                height: config.axis === "y" ? 15 : 0.05,
                depth: config.axis === "z" ? 15 : 0.05,
            }, scene);
            laserMesh.material = new BABYLON.StandardMaterial("laserMat", scene);
            laserMesh.material.emissiveColor = new BABYLON.Color3(1, 0, 0);
            laserMesh.material.alpha = 0.9;
            laserMesh.disableLighting = true;
            highlightLayerCheckpoint.addMesh(laserMesh, new BABYLON.Color3(1, 0, 0));
            laserMesh.position = config.position.clone();
            const originalPos = config.position.clone();
            const targetPos = originalPos.add(config.direction.clone());
            const speed = config.speed;
            const animation = new BABYLON.Animation(`LaserAnim_${index}`, "position", fps,
                BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
            const keys = [
                { frame: 0, value: originalPos },
                { frame: fps, value: targetPos },
                { frame: fps * 2, value: originalPos }
            ];
            animation.setKeys(keys);
            const easing = new BABYLON.SineEase();
            easing.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
            animation.setEasingFunction(easing);
            laserMesh.animations = [animation];
            const oneWayDistance = config.direction.length();
            const durationInSeconds = oneWayDistance / speed;
            const totalFrames = durationInSeconds * fps * 2;
            const speedRatio = (fps * 2) / totalFrames;
            scene.beginAnimation(laserMesh, 0, fps * 2, true, speedRatio);
            lasers.push({
                mesh: laserMesh,
                axis: config.axis
            });
        });
        let rayLength = 7.5;
        scene.onBeforeRenderObservable.add(() => {
            lasers.forEach(laser => {
                const laserOrigin = laser.mesh.position.clone();
                let rayDirection;
                if (laser.axis === "x") rayDirection = new BABYLON.Vector3(1, 0, 0);
                else if (laser.axis === "y") rayDirection = new BABYLON.Vector3(0, 1, 0);
                else rayDirection = new BABYLON.Vector3(0, 0, 1);
                const ray1 = new BABYLON.Ray(laserOrigin, rayDirection, rayLength);
                const ray2 = new BABYLON.Ray(laserOrigin, rayDirection.negate(), rayLength);
                const hit1 = scene.pickWithRay(ray1, mesh => player.meshes.includes(mesh));
                const hit2 = scene.pickWithRay(ray2, mesh => player.meshes.includes(mesh));
                if ((hit1.hit || hit2.hit)) {
                    if(!laserSound.isPlaying){
                        laserSound.play(0,2.5,0.8);
                    }
                    const bounceDir = player_root.position.subtract(laserOrigin);
                    player_root.position.addInPlace(bounceDir.scale(4));
                }
            });
        });
    }
    progressBar.style.width = "79%"; //MAJ PROGRESS BAR
    createLaserParkour(scene, [
        new BABYLON.Vector3(-55, 2, -38), new BABYLON.Vector3(-59, 2, -38), new BABYLON.Vector3(-63, 2, -38),
        new BABYLON.Vector3(-67, 2, -38), new BABYLON.Vector3(-71, 2, -38), new BABYLON.Vector3(-75, 2, -38),
        new BABYLON.Vector3(-79, 2, -38), new BABYLON.Vector3(-83, 2, -38), new BABYLON.Vector3(-87, 2, -38),
        new BABYLON.Vector3(-91, 2, -38), new BABYLON.Vector3(-95, 2, -38), new BABYLON.Vector3(-99, 2, -38),
        new BABYLON.Vector3(-103, 2, -38), new BABYLON.Vector3(-107, 2, -38)
    ], [
        { position: new BABYLON.Vector3(-63, 4, -38), direction: new BABYLON.Vector3(10, 0, 0), speed: 5, axis: "z"},
        { position: new BABYLON.Vector3(-70, 4, -40), direction: new BABYLON.Vector3(0, 0, 6), speed: 2,  axis: "x" },
        { position: new BABYLON.Vector3(-90, 8, -38), direction: new BABYLON.Vector3(0, -8, 0), speed: 5, axis: "z" },
        { position: new BABYLON.Vector3(-96, 9.5, -38), direction: new BABYLON.Vector3(0, -9.5, 0), speed: 5, axis: "z" },
        { position: new BABYLON.Vector3(-100, 10.5, -38), direction: new BABYLON.Vector3(0, -10.5, 0), speed: 5, axis: "z" },
        { position: new BABYLON.Vector3(-104, 11.5, -38), direction: new BABYLON.Vector3(0, -11.5, 0), speed: 5, axis: "z" }
    ]); 
    createLaserParkour(scene, [
        new BABYLON.Vector3(-150, 17, -40), new BABYLON.Vector3(-140,18,-42), new BABYLON.Vector3(-130, 19, -44),
        new BABYLON.Vector3(-120, 20, -46), new BABYLON.Vector3(-110, 21, -48), new BABYLON.Vector3(-105, 22, -49.5),
    ], [
        { position: new BABYLON.Vector3(-150, 18, -40), direction: new BABYLON.Vector3(50, 5, -10), speed: 5, axis: "z"},
        { position: new BABYLON.Vector3(-150, 18, -40), direction: new BABYLON.Vector3(50, 5, -10), speed: 4, axis: "z"},
        { position: new BABYLON.Vector3(-150, 18, -40), direction: new BABYLON.Vector3(50, 5, -10), speed: 3, axis: "z"},
        { position: new BABYLON.Vector3(-100, 23, -50), direction: new BABYLON.Vector3(-50, -5, 10), speed: 2, axis: "z"},
    ]);
    createMovParkour(scene, [
        {position: new BABYLON.Vector3(-150, 16, -36),direction: new BABYLON.Vector3(-4, 0, 3),speed: 3},
        {position: new BABYLON.Vector3(-94, 22, -48),direction: new BABYLON.Vector3(0,0,-30),speed: 6},
    ]); 
    createMovParkour(scene, [
        {position: new BABYLON.Vector3(40, 3, 55),direction: new BABYLON.Vector3(0, 1, 4),speed: 2},
        {position: new BABYLON.Vector3(45, 2, 50),direction: new BABYLON.Vector3(0, 0, -4),speed: 3},
        {position: new BABYLON.Vector3(50, 1, 56),direction: new BABYLON.Vector3(1, 0, 8),speed: 2},
    ]); 
    createInvisParkour(scene,[
        new BABYLON.Vector3(98, 0.5, -32),new BABYLON.Vector3(100.5, 1.5, -46),new BABYLON.Vector3(104.5, 1.5, -61),],new BABYLON.Vector3(96, 0.25, -14),5000
    );
    createMovParkour(scene, [
        {position: new BABYLON.Vector3(112, 4, -100),direction: new BABYLON.Vector3(0, 0, 4),speed: 2},
        {position: new BABYLON.Vector3(112, 4, -112),direction: new BABYLON.Vector3(3, 2, 0),speed: 1.5},
        {position: new BABYLON.Vector3(135, 2, -108),direction: new BABYLON.Vector3(0, 0, -5),speed: 3},
        {position: new BABYLON.Vector3(132, 2, -116),direction: new BABYLON.Vector3(-6, 0, 0),speed: 1.5},
        {position: new BABYLON.Vector3(150, -2, -114),direction: new BABYLON.Vector3(0, 1, 3),speed: 2},
        {position: new BABYLON.Vector3(180, 2, -105),direction: new BABYLON.Vector3(-30, -2, 0),speed: 8}
    ]);
    createMovParkour(scene, [
        {position: new BABYLON.Vector3(60,28,114), direction: new BABYLON.Vector3(0,0,3), speed: 1.9},
        {position: new BABYLON.Vector3(56.5,28,114), direction: new BABYLON.Vector3(0,0,3), speed: 1.95},
        {position: new BABYLON.Vector3(53,28,114), direction: new BABYLON.Vector3(0,0,3), speed: 1.9},
        {position: new BABYLON.Vector3(49.5,28,114), direction: new BABYLON.Vector3(0,0,3), speed: 1.85},
        {position: new BABYLON.Vector3(46,28,114), direction: new BABYLON.Vector3(0,0,3), speed: 1.8},
        {position: new BABYLON.Vector3(42.5,28,114), direction: new BABYLON.Vector3(0,0,3), speed: 1.75},
        {position: new BABYLON.Vector3(39,28,114), direction: new BABYLON.Vector3(0,0,3), speed: 1.7},
        {position: new BABYLON.Vector3(35.5,28,114), direction: new BABYLON.Vector3(0,0,3), speed: 1.75},
        {position: new BABYLON.Vector3(32,28,114), direction: new BABYLON.Vector3(0,0,3), speed: 1.8},
        {position: new BABYLON.Vector3(28.5,28,114), direction: new BABYLON.Vector3(0,0,3), speed: 1.85},
        {position: new BABYLON.Vector3(25,28,114), direction: new BABYLON.Vector3(0,0,3), speed: 1.9},
        {position: new BABYLON.Vector3(21.5,28,114), direction: new BABYLON.Vector3(0,0,3), speed: 1.95},
        {position: new BABYLON.Vector3(18,28,114), direction: new BABYLON.Vector3(0,0,3), speed: 1.9},
        {position: new BABYLON.Vector3(14.5,28,114), direction: new BABYLON.Vector3(0,0,3), speed: 1.85},
        {position: new BABYLON.Vector3(11,28,114), direction: new BABYLON.Vector3(0,0,3), speed: 1.8},
        {position: new BABYLON.Vector3(7.5,28,114), direction: new BABYLON.Vector3(0,0,3), speed: 1.75},
        {position: new BABYLON.Vector3(4,28,114), direction: new BABYLON.Vector3(0,0,3), speed: 1.8},
        {position: new BABYLON.Vector3(0.5,28,114), direction: new BABYLON.Vector3(0,0,3), speed: 1.85},
        {position: new BABYLON.Vector3(-3,28,114), direction: new BABYLON.Vector3(0,0,3), speed: 1.9},
        {position: new BABYLON.Vector3(-6.5,28,114), direction: new BABYLON.Vector3(0,0,3), speed: 1.95},
        {position: new BABYLON.Vector3(-10,28,114), direction: new BABYLON.Vector3(0,0,3), speed: 1.9},
        {position: new BABYLON.Vector3(-13.5,28,114), direction: new BABYLON.Vector3(0,0,3), speed: 1.85},
        {position: new BABYLON.Vector3(-17,28,114), direction: new BABYLON.Vector3(0,0,3), speed: 1.8},
        {position: new BABYLON.Vector3(-20.5,28,114), direction: new BABYLON.Vector3(0,0,3), speed: 1.75},
        {position: new BABYLON.Vector3(-24,28,114), direction: new BABYLON.Vector3(0,0,3), speed: 1.8},
        {position: new BABYLON.Vector3(-27.5,28,114), direction: new BABYLON.Vector3(0,0,3), speed: 1.85},
        {position: new BABYLON.Vector3(-31,28,114), direction: new BABYLON.Vector3(0,0,3), speed: 1.9},
        {position: new BABYLON.Vector3(-34.5,28,114), direction: new BABYLON.Vector3(0,0,3), speed: 1.95},
        {position: new BABYLON.Vector3(-38,28,114), direction: new BABYLON.Vector3(0,0,3), speed: 1.9},
        {position: new BABYLON.Vector3(-41.5,28,114), direction: new BABYLON.Vector3(0,0,3), speed: 1.85}
    ]);
    createLaserParkour(scene, [
        new BABYLON.Vector3(170, 20, 120), new BABYLON.Vector3(78, 20, 120), new BABYLON.Vector3(80, 23, 116),
        new BABYLON.Vector3(83, 26, 112)
    ], [
        { position: new BABYLON.Vector3(160, 22, 120), direction: new BABYLON.Vector3(0, 0, 1), speed: 0, axis: "z"},
        { position: new BABYLON.Vector3(150, 22, 120), direction: new BABYLON.Vector3(0, 0, -1), speed: 0, axis: "z"},
        { position: new BABYLON.Vector3(130, 22, 120), direction: new BABYLON.Vector3(1, 0, 0), speed: 0, axis: "z"},
        { position: new BABYLON.Vector3(120, 22, 120), direction: new BABYLON.Vector3(1, 0, 0), speed: 0, axis: "z"},
        { position: new BABYLON.Vector3(110, 22, 120), direction: new BABYLON.Vector3(0, 0, -5), speed: 5, axis: "y"},
        { position: new BABYLON.Vector3(100, 22, 120), direction: new BABYLON.Vector3(0, 1, 0), speed: 0, axis: "z"},
        { position: new BABYLON.Vector3(90, 22, 120), direction: new BABYLON.Vector3(0, 0, 0), speed: 0, axis: "z"},
        { position: new BABYLON.Vector3(62, 29.5, 115), direction: new BABYLON.Vector3(-105, 0, 0), speed: 15, axis: "z"},
        { position: new BABYLON.Vector3(62, 29.5, 115), direction: new BABYLON.Vector3(-105, 0, 0), speed: 5, axis: "z"},
        { position: new BABYLON.Vector3(62, 29.5, 115), direction: new BABYLON.Vector3(-105, 0, 0), speed: 7, axis: "z"},
        { position: new BABYLON.Vector3(62, 29.5, 115), direction: new BABYLON.Vector3(-105, 0, 0), speed: 2, axis: "z"},
    ]);
    createInvisParkour(scene,[
        new BABYLON.Vector3(166, 20, 120),new BABYLON.Vector3(162,20, 121),new BABYLON.Vector3(158,20, 122),
        new BABYLON.Vector3(154,20, 123),new BABYLON.Vector3(150,20, 123),new BABYLON.Vector3(146,20, 122),
        new BABYLON.Vector3(142,20, 121),new BABYLON.Vector3(138,20, 120),new BABYLON.Vector3(134,20, 119),
        new BABYLON.Vector3(130,20, 118),new BABYLON.Vector3(126,20, 117),new BABYLON.Vector3(122,20, 117),
        new BABYLON.Vector3(118,20, 118),new BABYLON.Vector3(114,20, 119),new BABYLON.Vector3(110,20, 120),
        new BABYLON.Vector3(106,20, 121),new BABYLON.Vector3(102,20, 122),new BABYLON.Vector3(98,20, 123),
        new BABYLON.Vector3(94,20, 123),new BABYLON.Vector3(90,20, 122),new BABYLON.Vector3(86,20, 121),
        new BABYLON.Vector3(82,20, 120)
    ],new BABYLON.Vector3(180,20.25, 110),2000);
    createInvisParkour(scene,[
        new BABYLON.Vector3(70,28,125),new BABYLON.Vector3(70,28,129),new BABYLON.Vector3(70,27,133),
        new BABYLON.Vector3(70,26,137),new BABYLON.Vector3(70,25,141),new BABYLON.Vector3(70,24,145),
        new BABYLON.Vector3(70,23,149),new BABYLON.Vector3(70,22,153),new BABYLON.Vector3(70,21,157),
        new BABYLON.Vector3(70,20,161),new BABYLON.Vector3(70,19,165),new BABYLON.Vector3(70,18,169),
        new BABYLON.Vector3(66,17,169),new BABYLON.Vector3(62,16,169),new BABYLON.Vector3(58,15,169),
        new BABYLON.Vector3(54,14,169),new BABYLON.Vector3(50,13,169),new BABYLON.Vector3(46,12,169),
        new BABYLON.Vector3(42,11,169),new BABYLON.Vector3(38,10,169),new BABYLON.Vector3(34,9,169),
        new BABYLON.Vector3(34,8,173),new BABYLON.Vector3(34,7,177),
        new BABYLON.Vector3(34,6,181),new BABYLON.Vector3(34,5,185),new BABYLON.Vector3(34,4,189),
        new BABYLON.Vector3(34,3,193),new BABYLON.Vector3(34,2,197),new BABYLON.Vector3(34,1,201),
        new BABYLON.Vector3(34,0,205),new BABYLON.Vector3(34,0,209),new BABYLON.Vector3(34,0,213),
        new BABYLON.Vector3(34,0,217),new BABYLON.Vector3(34,0,221),new BABYLON.Vector3(34,0,225),
        new BABYLON.Vector3(34,0,229),new BABYLON.Vector3(34,0,233),new BABYLON.Vector3(34,0,237),
        new BABYLON.Vector3(34,0,241),new BABYLON.Vector3(34,0,245),new BABYLON.Vector3(34,0,253),
        new BABYLON.Vector3(34,0,253),new BABYLON.Vector3(34,0,257),new BABYLON.Vector3(34,0,261)
    ],new BABYLON.Vector3(70,28.25,120),1200);
    createInvisParkour(scene,[
        new BABYLON.Vector3(200, 22, 125),new BABYLON.Vector3(204,24, 125),new BABYLON.Vector3(208,26, 125),
        new BABYLON.Vector3(212,28, 125),new BABYLON.Vector3(216,30, 125),new BABYLON.Vector3(220,32, 125),
        new BABYLON.Vector3(224,34, 125),new BABYLON.Vector3(228,36, 125),new BABYLON.Vector3(232,38, 125),
        new BABYLON.Vector3(236,40, 125),new BABYLON.Vector3(240,42, 125),new BABYLON.Vector3(244,44, 125),
        new BABYLON.Vector3(248,46, 125),new BABYLON.Vector3(252,48, 125),new BABYLON.Vector3(256,50, 125)
    ],new BABYLON.Vector3(200, 20.25, 121),4000);
    createInvisParkour(scene,[
        new BABYLON.Vector3(290,20,100),new BABYLON.Vector3(280,20,100),new BABYLON.Vector3(270,20,100),
        new BABYLON.Vector3(260,20,100),new BABYLON.Vector3(250,20,100),new BABYLON.Vector3(240,20,100)
    ],new BABYLON.Vector3(260, 52.25, 125),19000);
    createInvisParkour(scene,[
        new BABYLON.Vector3(228,36, 130),new BABYLON.Vector3(224,40, 134),
        new BABYLON.Vector3(222,42, 136),new BABYLON.Vector3(216,46, 140),
        new BABYLON.Vector3(214,48, 142),new BABYLON.Vector3(210,50, 146),
    ],new BABYLON.Vector3(300,20.25,100),23000); 
    await createSimonsSays(scene, new BABYLON.Vector3(203.5, 0.25, -100), new BABYLON.Vector3(210,0, -115),5);
    createLaserParkour(scene, [
        new BABYLON.Vector3(-168, 15.5, -8),new BABYLON.Vector3(-168, 15.5, 0),new BABYLON.Vector3(-172, 15.5, 0),new BABYLON.Vector3(-176, 15.5, 0),//1chemin
        new BABYLON.Vector3(-180, 15.5, 0),new BABYLON.Vector3(-192, 15.5, 0),
        new BABYLON.Vector3(-196, 15.5, 0),new BABYLON.Vector3(-200, 15.5, 0),new BABYLON.Vector3(-204, 15.5, 0),new BABYLON.Vector3(-208, 15.5, 0),
        new BABYLON.Vector3(-212, 15.5, 0),new BABYLON.Vector3(-216, 15.5, 0),new BABYLON.Vector3(-220, 15.5, 0),new BABYLON.Vector3(-224, 15.5, 0),
        new BABYLON.Vector3(-228, 15.5, 0),new BABYLON.Vector3(-236, 15.5, 0),new BABYLON.Vector3(-240, 15.5, 0),
        new BABYLON.Vector3(-244, 15.5, 0),new BABYLON.Vector3(-248, 15.5, 0),new BABYLON.Vector3(-252, 15.5, 0),new BABYLON.Vector3(-256, 15.5, 0),
        new BABYLON.Vector3(-276, 15.5, 0),new BABYLON.Vector3(-280, 15.5, 0),new BABYLON.Vector3(-288, 15.5, 0),
        new BABYLON.Vector3(-292, 15.5, 0),new BABYLON.Vector3(-296, 15.5, 0),new BABYLON.Vector3(-300, 15.5, 0),new BABYLON.Vector3(-304, 15.5, 0),
        new BABYLON.Vector3(-216, 15.5, 20),new BABYLON.Vector3(-220, 15.5, 20),new BABYLON.Vector3(-224, 15.5, 20),new BABYLON.Vector3(-228, 15.5, 20),
        new BABYLON.Vector3(-232, 15.5, 20),new BABYLON.Vector3(-236, 15.5, 20),new BABYLON.Vector3(-294, 15.5, 20),
        new BABYLON.Vector3(-298, 15.5, 20),new BABYLON.Vector3(-302, 15.5, 20),new BABYLON.Vector3(-306, 15.5, 20),
        new BABYLON.Vector3(-306, 15.5, 24),new BABYLON.Vector3(-306, 15.5, 28),new BABYLON.Vector3(-306, 15.5, 32),new BABYLON.Vector3(-306, 15.5, 36),
        new BABYLON.Vector3(-306, 15.5, 42)
    ], [
        { position: new BABYLON.Vector3(-200, 15.5, -3.5), direction: new BABYLON.Vector3(0, 0, 7), speed: 4, axis: "y" },
        { position: new BABYLON.Vector3(-244, 16.5, 0), direction: new BABYLON.Vector3(7, 0, 0), speed: 4, axis: "x" },
        { position: new BABYLON.Vector3(-255, 16.5, 0), direction: new BABYLON.Vector3(7, 0, -0.5), speed: 2, axis: "z" },
        { position: new BABYLON.Vector3(-280, 16.5, 20.5), direction: new BABYLON.Vector3(7, 0, -0.5), speed: 5, axis: "x" },
    ]);
    createMovParkour(scene, [
        { position: new BABYLON.Vector3(-260, 15.5, 0), direction: new BABYLON.Vector3(0, 0, 5), speed: 4 },
        { position: new BABYLON.Vector3(-268, 15.5, 0), direction: new BABYLON.Vector3(-2, 0, -5), speed: 3 },
        { position: new BABYLON.Vector3(-240, 15.5, 20), direction: new BABYLON.Vector3(-50, 0, 0), speed: 8 },
        { position: new BABYLON.Vector3(-306, 15.5, 136), direction: new BABYLON.Vector3(0, 0, -90), speed: 10 },
    ]);
    await createSimonsSays(scene, new BABYLON.Vector3(-168, 16, 0), new BABYLON.Vector3(-190, 15.5, 0), 3);
    await createSimonsSays(scene, new BABYLON.Vector3(-306, 16, 36), new BABYLON.Vector3(-306, 15.5, 50), 3);
    createInvisParkour(scene, [new BABYLON.Vector3(-216, 15.5, 5),new BABYLON.Vector3(-216, 15.5, 10),new BABYLON.Vector3(-216, 15.5, 15)
    ], new BABYLON.Vector3(-304, 15.75, 0), 30000);
    createInvisParkour(scene,[ new BABYLON.Vector3(270, 15,-160),new BABYLON.Vector3(270,15,-150.6),
    new BABYLON.Vector3(270,15,-132),new BABYLON.Vector3(270,15,-120)],new BABYLON.Vector3(269.9 ,14.5,-166.4), 11000);
    await createSimonsSays(scene, new BABYLON.Vector3(270, 15.5,-141.2), new BABYLON.Vector3(270,15,-132), 2);
    createMovParkour(scene, [{ position: new BABYLON.Vector3(270, 15,-141.2), direction: new BABYLON.Vector3(0, 0, 5), speed: 0 }]);
    createMovParkour(scene, [
        { position: new BABYLON.Vector3(188, 0,-160), direction: new BABYLON.Vector3(-38, 0, 0), speed: 10 },
        { position: new BABYLON.Vector3(145, 0,-160), direction: new BABYLON.Vector3(-40,0, 0), speed: 10 },
        { position: new BABYLON.Vector3(100, 0,-160), direction: new BABYLON.Vector3(0, 10, 0), speed: 0 },
        { position: new BABYLON.Vector3(95,2,-160), direction: new BABYLON.Vector3(0, 8, 0), speed: 3 },
        { position: new BABYLON.Vector3(91,5,-160), direction: new BABYLON.Vector3(0, 15, 0), speed: 5 },
        { position: new BABYLON.Vector3(87,8,-160), direction: new BABYLON.Vector3(0, 20, 0), speed: 5 },
        { position: new BABYLON.Vector3(83,21,-160), direction: new BABYLON.Vector3(0, -5, 0), speed: 5 },
        { position: new BABYLON.Vector3(79,23,-160), direction: new BABYLON.Vector3(0, -7, 0), speed: 5 },
        { position: new BABYLON.Vector3(76,19,-160), direction: new BABYLON.Vector3(0, 14, 0), speed: 7 },
        { position: new BABYLON.Vector3(-220, 44.8, 100), direction: new BABYLON.Vector3(40, 0, 0), speed: 5 }
        
    ]); 
    createLaserParkour(scene, [
        new BABYLON.Vector3(98,0,-164),new BABYLON.Vector3(138,0,-164),new BABYLON.Vector3(168,0,-164),
        new BABYLON.Vector3(102,0,-164),new BABYLON.Vector3(142,0,-164),new BABYLON.Vector3(172,0,-164),
    ], [
        { position: new BABYLON.Vector3(170, 5,-160), direction: new BABYLON.Vector3(0, 0, -5), speed: 0, axis: "y" },
        { position: new BABYLON.Vector3(170, 5,-159), direction: new BABYLON.Vector3(0, 0, -5), speed: 0, axis: "y" },
        { position: new BABYLON.Vector3(170, 5,-161), direction: new BABYLON.Vector3(0, 0, -5), speed: 0, axis: "y" },
        { position: new BABYLON.Vector3(140, 5,-160), direction: new BABYLON.Vector3(0, 0, -5), speed: 0, axis: "y" },
        { position: new BABYLON.Vector3(140, 5,-159), direction: new BABYLON.Vector3(0, 0, -5), speed: 0, axis: "y" },
        { position: new BABYLON.Vector3(140, 5,-161), direction: new BABYLON.Vector3(0, 0, -5), speed: 0, axis: "y" },
        { position: new BABYLON.Vector3(102, 5,-160), direction: new BABYLON.Vector3(0, 0, -5), speed: 0, axis: "y" },
        { position: new BABYLON.Vector3(102, 5,-159), direction: new BABYLON.Vector3(0, 0, -5), speed: 0, axis: "y" },
        { position: new BABYLON.Vector3(102, 5,-161), direction: new BABYLON.Vector3(0, 0, -5), speed: 0, axis: "y" },
    ]);
    createMovParkour(scene, [
        { position: new BABYLON.Vector3(-14,0,274), direction: new BABYLON.Vector3(0, 30, 0), speed: 7 },
        { position: new BABYLON.Vector3(-30,30,274), direction: new BABYLON.Vector3(0, 0, -40), speed: 7 },
        { position: new BABYLON.Vector3(-90, 65, 172), direction: new BABYLON.Vector3(-40, 20, 0), speed: 8 },
        { position: new BABYLON.Vector3(-135, 65, 172), direction: new BABYLON.Vector3(-10, 0, 0), speed: 0 },
        { position: new BABYLON.Vector3(-145, 65, 172), direction: new BABYLON.Vector3(-10, 0, 0), speed: 0 },
        { position: new BABYLON.Vector3(-150, 60, 172), direction: new BABYLON.Vector3(-10, 15, -5), speed: 6 },
    ]);
    createLaserParkour(scene, [
        new BABYLON.Vector3(-14,0,274)],
        [{ position: new BABYLON.Vector3(-14, 5, 275), direction: new BABYLON.Vector3(0, 0, -5), speed: 0, axis: "x" },
        { position: new BABYLON.Vector3(-13, 12, 274), direction: new BABYLON.Vector3(0, 0, -5), speed: 0, axis: "z" },
        { position: new BABYLON.Vector3(-14, 19, 272.5), direction: new BABYLON.Vector3(0, 0, -5), speed: 0, axis: "x" },
        { position: new BABYLON.Vector3(-14, 25, 276), direction: new BABYLON.Vector3(0, 0, -5), speed: 0, axis: "x" },
        { position: new BABYLON.Vector3(-15, 30, 274), direction: new BABYLON.Vector3(0, 0, -5), speed: 0, axis: "z" },
        { position: new BABYLON.Vector3(-29, 35, 264), direction: new BABYLON.Vector3(0, 0, -5), speed: 0, axis: "y" },
        { position: new BABYLON.Vector3(-31, 35, 256), direction: new BABYLON.Vector3(0, 0, -5), speed: 0, axis: "y" },
        { position: new BABYLON.Vector3(-29, 35, 248), direction: new BABYLON.Vector3(0, 0, -5), speed: 0, axis: "y" },
        { position: new BABYLON.Vector3(-27, 35, 240), direction: new BABYLON.Vector3(-5, 0, 0), speed: 5, axis: "y" },
    ]); 
    createInvisParkour(scene,[ new BABYLON.Vector3(-85, 65, 180)
    ], new BABYLON.Vector3(-25, 32, 280), 12000);
    await createSimonsSays(scene, new BABYLON.Vector3(-188.8,0.25,137.6), new BABYLON.Vector3(-195.189,-2.5,130.057), 4);
    await createSimonsSays(scene, new BABYLON.Vector3(-205,-2,145.921), new BABYLON.Vector3(-198.22,0,142.062), 1);
    await createSimonsSays(scene, new BABYLON.Vector3(-180.728,-2,126.981), new BABYLON.Vector3(-182.79,0,129.48), 1);
    const spiralPositions = [];
    let currentRadius = 35;
    let currentHeight = 2;
    for (let i = 0; i < 36; i++) {
        const angle = i * Math.PI / 7;
        const x = -220 + currentRadius * Math.cos(angle);
        const z = 100 + currentRadius * Math.sin(angle);
        spiralPositions.push(new BABYLON.Vector3(x, currentHeight, z));
        currentRadius -= 1;
        currentHeight += 1.2;
    }
    createLaserParkour(scene, spiralPositions, [
        { position: new BABYLON.Vector3(-200, 49.8, 100), direction: new BABYLON.Vector3(1, 0, 0), speed: 0, axis: "y" },
        { position: new BABYLON.Vector3(-200, 49.8, 101.2), direction: new BABYLON.Vector3(1, 0, 0), speed: 0, axis: "y" },
        { position: new BABYLON.Vector3(-200, 49.8, 98.8), direction: new BABYLON.Vector3(1, 0, 0), speed: 0, axis: "y" },
        { position: new BABYLON.Vector3(-185, 49.8, 100), direction: new BABYLON.Vector3(1, 0, 0), speed: 0, axis: "y" },
        { position: new BABYLON.Vector3(-185, 49.8, 101.2), direction: new BABYLON.Vector3(1, 0, 0), speed: 0, axis: "y" },
        { position: new BABYLON.Vector3(-185, 49.8, 98.8), direction: new BABYLON.Vector3(1, 0, 0), speed: 0, axis: "y" },
    ]);
    progressBar.style.width = "95%"; //MAJ PROGRESS BAR
    ////////////////////////////////////////////////////////////////////////////////// CONTROLS PLAYER
    let isJumping = false;
    window.addEventListener("keydown", function (event) {
        if(event.key.length === 1){
            var key = event.key.toLowerCase();
        } else {
            var key = event.key;
        }
        switch (key) {
            case valueKeys.z:
                keys.z = true;
                break;
            case valueKeys.s:
                keys.s = true;
                break;
            case valueKeys.q:
                keys.q = true;
                break;
            case valueKeys.d:
                keys.d = true;
                break;
            case valueKeys.space:
                if (!isJumping) {
                    keys.space = true;
                }
                break;
            case valueKeys.shift:
                keys.shift = true;
                break;
        }
    });
    window.addEventListener("keyup", function (event) {
        if(event.key.length === 1){
            var key = event.key.toLowerCase();
        } else {
            var key = event.key;
        }
        switch (key) {
            case valueKeys.z:
                keys.z = false;
                break;
            case valueKeys.s:
                keys.s = false;
                break;
            case valueKeys.q:
                keys.q = false;
                break;
            case valueKeys.d:
                keys.d = false;
                break;
            case valueKeys.space:
                keys.space = false;
                break;
            case valueKeys.shift:
                keys.shift = false;
                break;
        }
    });
    //////////////////////////// MOUVEMENT PLAYER+COLLISIONS
    const jumpSpeed = 20;
    var jumpVelocity = 0;
    var onFall=false;
    var is_falling=false;
    scene.collisionsEnabled = true;
    player_root.checkCollisions = true;
    player_root.ellipsoid = new BABYLON.Vector3(1.05, 2.1, 0.75);
    player_root.ellipsoidOffset = new BABYLON.Vector3(0, 2.1, 0);
    checkMeshes.forEach(mesh => {
        mesh.checkCollisions = true;
    });
    scene.meshes.forEach(mesh => {
        if(mesh.isVisible&&mesh.visibility>0.9){
            mesh.receiveShadows = true;
            shadowGenerator.addShadowCaster(mesh);
        }
    });
    var delay_sound = 0;
    var gravityV = 0.1;
    var onGrass = false;
    ////////////////////////////// BOUCLE MOUVEMENT PLAYER 
    scene.onBeforeRenderObservable.add(() => {
        if(is_playing){
            let rotationY = -camera.alpha-Math.PI/2;
            let forward = new BABYLON.Vector3(Math.sin(rotationY), 0, Math.cos(rotationY));
            let right = new BABYLON.Vector3(Math.sin(rotationY + Math.PI / 2), 0, Math.cos(rotationY + Math.PI / 2));
            let movement = new BABYLON.Vector3(0, 0, 0);
            let gravity = new BABYLON.Vector3(0, -10/fps, 0);
            if(document.pointerLockElement === canvas){
                if (keys.z && keys.q) {
                    movement.addInPlace(forward.scale(10 / fps).add(right.scale(-10 / fps)).scale(0.707));
                } else if (keys.z && keys.d) {
                    movement.addInPlace(forward.scale(10 / fps).add(right.scale(10 / fps)).scale(0.707));
                } else if (keys.s && keys.q) {
                    movement.addInPlace(forward.scale(-10 / fps).add(right.scale(-10 / fps)).scale(0.707));
                } else if (keys.s && keys.d) {
                    movement.addInPlace(forward.scale(-10 / fps).add(right.scale(10 / fps)).scale(0.707));
                } else if (keys.z) {
                    movement.addInPlace(forward.scale(10 / fps));
                } else if (keys.s) {
                    movement.addInPlace(forward.scale(-10 / fps));
                } else if (keys.q) {
                    movement.addInPlace(right.scale(-10 / fps));
                } else if (keys.d) {
                    movement.addInPlace(right.scale(10 / fps));
                }
                if (movement.length() > 0.001) {
                    player.meshes.forEach(mesh => {
                        mesh.rotation.z = Math.atan2(movement.x, movement.z);
                    });
                }
                if (keys.shift){
                    if(isJumping||onFall){
                        movement.scaleInPlace(1.2);
                    } else {
                        movement.scaleInPlace(1.75);
                    }
                }
            } else {
                keys.z = false;
                keys.s = false;
                keys.q = false;
                keys.d = false;
                keys.space = false;
                keys.shift = false;
            }
            delay_sound++;
            var onGround = false;
            let rayLength = player_root.ellipsoid.y + 0.5;
            const offsets = [
            new BABYLON.Vector3(0.8, 0,  0.8),
            new BABYLON.Vector3(-0.8, 0, 0.8),
            new BABYLON.Vector3(0.8, 0, -0.8),
            new BABYLON.Vector3(-0.8, 0, -0.8),
            new BABYLON.Vector3(0, 0, 0),
            ];
            for (let offset of offsets) {
                let origin = player_root.position.add(offset);
                let ray = new BABYLON.Ray(origin, BABYLON.Vector3.Down(), rayLength);
                let hit = scene.pickWithRay(ray, mesh => checkMeshes.includes(mesh));
                if (hit.hit&&player_root.position.y - hit.pickedPoint.y<= 0.15) {
                    onGround = true;
                    if(hit.pickedMesh.name.includes("ground")){
                        onGrass=true;
                    }else{
                        onGrass=false;
                    }
                    jumpVelocity = 0;
                    if((isJumping||onFall)&&delay_sound>1000/fps) {
                        jumpSound.play(0,1.3,0.3);
                        delay_sound = 0;
                    }
                    fallSound.stop();
                    isJumping = false;
                    firstJump=true;
                    is_falling=false;
                    onFall=false;
                    if (keys.space){
                        isJumping = true;
                        if(!jumpSound.isPlaying){
                            jumpSound.play(0,1.15,1);
                        }
                        jumpVelocity = jumpSpeed;
                    }
                    break;
                }
            }
            if(!onGround) {
                movement.addInPlace(gravity);
                if(!isJumping) {
                    onFall=true;
                    is_falling=true;
                }
            }
            if (isJumping) {
                onFall=false;
                movement.addInPlace(new BABYLON.Vector3(0, jumpVelocity / fps, 0));
                jumpVelocity += 2 * gravity.y;
                if(jumpVelocity < 0) {
                    is_falling=true;
                } else {
                    is_falling=false;
                }
            }
            if(is_falling){
                if(!fallSound.isPlaying){
                    fallSound.play(0.1,1,4);
                }
                gravityV += 15/fps;
                movement.y-= gravityV/fps;
            }else{
                gravityV = 0.1;
            }
            player_root.moveWithCollisions(movement);
            if (player_root.position.y < -5) {
                blackScreen.classList.remove("hidden");
            }
            
        }
    });
    ////////////////////////////// BOUCLE ANIMATION PLAYER 
    scene.onBeforeRenderObservable.add(() => {
        if (!is_playing) return;
        const playAnimation = (animation, speed = 1.0, loop = true) => {
            if (!animation.isPlaying) {
                resetAnimations();
                animation.start(loop, speed, 0, animation.to, true);
            }
        };
        if (isJumping) {
            grassWalkSound.stop();
            stoneWalkSound.stop();
            playAnimation(jumpAnim, 1.0, false);
        } else if (keys.z || keys.s || keys.q || keys.d) {
            if(onGrass){
                stoneWalkSound.stop();
                if(keys.shift){
                    if(!grassWalkSound.isPlaying|| grassWalkSound.getPlaybackRate() !== 1.5){
                        grassWalkSound.stop();
                        grassWalkSound.setPlaybackRate(1.5);
                        grassWalkSound.play(0,4,15);
                    }
                }else{
                    if(!grassWalkSound.isPlaying|| grassWalkSound.getPlaybackRate() !== 1){
                        grassWalkSound.stop();
                        grassWalkSound.setPlaybackRate(1);
                        grassWalkSound.play(0,4,15);
                    }
                }
            }else{
                grassWalkSound.stop();
                if(keys.shift){
                    if(!stoneWalkSound.isPlaying || stoneWalkSound.getPlaybackRate() !== 1.5){
                        stoneWalkSound.stop();
                        stoneWalkSound.setPlaybackRate(1.5);
                        stoneWalkSound.play(0,1,15);
                    }
                }else{
                    if(!stoneWalkSound.isPlaying || stoneWalkSound.getPlaybackRate() !== 1){
                        stoneWalkSound.stop();
                        stoneWalkSound.setPlaybackRate(1);
                        stoneWalkSound.play(0,1,15);
                    }
                }
            }
            playAnimation(runAnim, keys.shift ? 1.25 : 0.9, false);
        } else {
            grassWalkSound.stop();
            stoneWalkSound.stop();
            playAnimation(idleAnim, 1.0, true);
        }
        if(onFall) {
            grassWalkSound.stop();
            stoneWalkSound.stop();
            resetAnimations();
            jumpAnim.start(true, 0.1, 30, 40,true); 
        }
    });
    function resetAnimations() {
        runAnim.stop();
        jumpAnim.stop();
        idleAnim.stop();
    }
    blackScreen.addEventListener("transitionend", async () => {
        if(blackScreen.classList.contains("hidden")){
            return;
        }
        magicalsEffectsSound.setPlaybackRate(1.5);
        magicalsEffectsSound.play(0,10.3,4.1);
        setTimeout(() => {
            magicalsEffectsSound.setPlaybackRate(1);
        },4100);
        player_root.position = new BABYLON.Vector3(PosCurrentCheckpoint.x, PosCurrentCheckpoint.y-50, PosCurrentCheckpoint.z);
        jumpVelocity = 0;
        isJumping = false;
        await wait(400);
        camera.radius = 25; 
        camera.heightOffset = 10;
        blackScreen.classList.add("hidden");
    });
    /////////////////////////// CONTROL CAMERA
    camera.cameraAcceleration = 0.05; 
    camera.maxCameraSpeed = 5;
    let shifted = false;
    window.addEventListener("keydown", (event) => {
        if (event.key === "Shift") {
            shifted = true;
        }
    });
    window.addEventListener("keyup", (event) => {
        if (event.key === "Shift") {
            shifted = false;
        }
    });
    window.addEventListener("mousemove", (event) => {
        if (is_playing && document.pointerLockElement === canvas || scene.debugLayer.isVisible()&&shifted) {
            let movementX = event.movementX || 0;
            let movementY = event.movementY || 0;
            camera.alpha -= movementX * sensitivity.value/200;
            camera.beta -= movementY * sensitivity.value/200;
        }
    });
    var tempInvis = new Map();
    var seeThrough = [];
    scene.meshes.forEach(mesh => {
        mesh.isPickable = true 
        if(mesh.isVisible && mesh.visibility >= 0.2 &&
        !bedInUse.includes(mesh) && !player.meshes.includes(mesh) &&
        !mesh.name.includes("checkpoint")&&!mesh.name.includes("bench") &&
        !bed.includes(mesh) && !mesh.name.includes("bridge") &&
        !mesh.name.includes("Lamp")&&!NoSeeThrough.includes(mesh)&&
        !mesh.name.includes("portal")){
            seeThrough.push(mesh);
        }
    });
    scene.onAfterRenderObservable.add(() => { //MOUSE MOUVE EVENT
        if (is_playing && game_ready&&document.pointerLockElement === canvas) {
            let target1 = player_root.position.add(new BABYLON.Vector3(0, 0.5, 0)); 
            let direction1 = target1.subtract(scene.activeCamera.position).normalize();
            let target2 = player_root.position.add(new BABYLON.Vector3(0, 3.5, 0));
            let direction2 = target2.subtract(scene.activeCamera.position).normalize();
            let rayBody = new BABYLON.Ray(scene.activeCamera.position, direction1, new BABYLON.Vector3(scene.activeCamera.position.x-target1.x, scene.activeCamera.position.y-target1.y, scene.activeCamera.position.z-target1.z).length());
            let rayHead = new BABYLON.Ray(scene.activeCamera.position, direction2, new BABYLON.Vector3(scene.activeCamera.position.x-target2.x, scene.activeCamera.position.y-target2.y, scene.activeCamera.position.z-target2.z).length());
            let hitsBody = scene.multiPickWithRay(rayBody, (mesh) => seeThrough.includes(mesh));
            let hitsHead = scene.multiPickWithRay(rayHead, (mesh) => seeThrough.includes(mesh));
            let newInvis = new Set();
            let fadeSpeed = 2.4/fps;
            let hits = [...hitsBody, ...hitsHead];
            if (hits.length > 0) {
                hits.forEach(hit => {
                    let mesh = hit.pickedMesh;
                    if (!tempInvis.has(mesh)) {
                        tempInvis.set(mesh, 5);
                    }
                    newInvis.add(mesh);
                    mesh.visibility = Math.max(0.2, mesh.visibility - fadeSpeed);
                });
            }
            tempInvis.forEach((timestamp, mesh) => {
                if (!newInvis.has(mesh)) {
                    let newTime = timestamp - (60 / fps);
                    tempInvis.set(mesh, newTime);
                    if (newTime <= 0) {
                        mesh.visibility = Math.min(1, mesh.visibility + fadeSpeed);
                        if (mesh.visibility >= 1) {
                            tempInvis.delete(mesh);
                        }
                    }
                }
            });
            skybox.position.copyFrom(scene.activeCamera.position);
            moon.position.copyFrom(scene.activeCamera.position).addInPlace(new BABYLON.Vector3(700, 1200, 700));
            
        }
    });
    canvas.addEventListener("wheel", (event) => {
        camera.radius += event.deltaY * 0.08;
        if (camera.radius < 10) {
            camera.radius = 10;
        } else if (camera.radius > 500) {
            camera.radius = 500;
        }
    });
    ///////////////////////SOUS MENU EVENT : STYLE
    var isInStyleMenu = false;   
    var tempPosition = new BABYLON.Vector3(0, 0, 0);
    var alpha = 0;
    const observer = new MutationObserver(() => {
        if (!styleMenu.classList.contains("hidden")) {
            scene.activeCamera = camera_free;
            if(inBed){
                player_root.position = new BABYLON.Vector3(5, 0, 1);
            }
            tempPosition.copyFrom(player_root.position);
            camera_free.setTarget(tempPosition);
            isInStyleMenu = true;
        } else {
            scene.activeCamera = camera;
            isInStyleMenu = false;
            alpha = 0;
        }
    });
    observer.observe(styleMenu, { attributes: true, attributeFilter: ['class'] });
    scene.onBeforeRenderObservable.add(() => {
        if (isInStyleMenu) {
            player_root.position.copyFrom(tempPosition);
            alpha += 0.01;
            camera_free.position = new BABYLON.Vector3(
                player_root.position.x + 10 * Math.sin(alpha),
                player_root.position.y + 4,
                player_root.position.z + 10 * Math.cos(alpha)
            );
            camera_free.setTarget(new BABYLON.Vector3(player_root.position.x+3*Math.cos(alpha), player_root.position.y + 2, player_root.position.z - 3*Math.sin(alpha)));            
        }
    });
    player_hairs.material = new BABYLON.StandardMaterial("hairs", scene);
    player_hairs.material.diffuseColor = new BABYLON.Color3.FromHexString(head_color.value);
    player_hairs.material.specularColor = new BABYLON.Color3(0, 0, 0);
    player_hairs.material.emissiveColor = new BABYLON.Color3(0, 0, 0);
    head_color.addEventListener('input', function() {
        player_hairs.material = new BABYLON.StandardMaterial("hairs", scene);
        player_hairs.material.diffuseColor = new BABYLON.Color3.FromHexString(head_color.value);
        player_hairs.material.specularColor = new BABYLON.Color3(0, 0, 0);
        player_hairs.material.emissiveColor = new BABYLON.Color3(0, 0, 0);
    });
    player_tshirt.material = new BABYLON.StandardMaterial("tshirt", scene);
    player_tshirt.material.diffuseColor = new BABYLON.Color3.FromHexString(shirt_color.value);
    player_tshirt.material.specularColor = new BABYLON.Color3(0.2, 0.2, 0.2);
    player_tshirt.material.emissiveColor = new BABYLON.Color3(0, 0, 0);
    shirt_color.addEventListener('input', function() {
        player_tshirt.material = new BABYLON.StandardMaterial("tshirt", scene);
        player_tshirt.material.diffuseColor = new BABYLON.Color3.FromHexString(shirt_color.value);
        player_tshirt.material.specularColor = new BABYLON.Color3(0.2, 0.2, 0.2);
        player_tshirt.material.emissiveColor = new BABYLON.Color3(0, 0, 0);
    });
    player_pants.material = new BABYLON.StandardMaterial("pants", scene);
    player_pants.material.diffuseColor = new BABYLON.Color3.FromHexString(pants_color.value);
    player_pants.material.specularColor = new BABYLON.Color3(0,0,0);
    player_pants.material.emissiveColor = new BABYLON.Color3(0, 0, 0);
    pants_color.addEventListener('input', function() {
        player_pants.material = new BABYLON.StandardMaterial("pants", scene);
        player_pants.material.diffuseColor = new BABYLON.Color3.FromHexString(pants_color.value);
        player_pants.material.specularColor = new BABYLON.Color3(0,0,0);
        player_pants.material.emissiveColor = new BABYLON.Color3(0, 0, 0);
    });
    player_backpack.material = new BABYLON.StandardMaterial("backpack", scene);
    player_backpack.material.diffuseColor = new BABYLON.Color3.FromHexString(backpack_color.value);
    player_backpack.material.specularColor = new BABYLON.Color3(0.1,0.1,0.1);
    player_backpack.material.emissiveColor = new BABYLON.Color3(0,0,0);
    backpack_color.addEventListener('input', function() {
        player_backpack.material = new BABYLON.StandardMaterial("backpack", scene);
        player_backpack.material.diffuseColor = new BABYLON.Color3.FromHexString(backpack_color.value);
        player_backpack.material.specularColor = new BABYLON.Color3(0.1,0.1,0.1);
        player_backpack.material.emissiveColor = new BABYLON.Color3(0,0,0);
    });
    player_shoes.material = new BABYLON.StandardMaterial("shoes", scene);
    player_shoes.material.diffuseColor = new BABYLON.Color3.FromHexString(shoes_color.value);
    player_pants.material.specularColor = new BABYLON.Color3(0,0,0);
    player_pants.material.emissiveColor = new BABYLON.Color3(0, 0, 0);
    shoes_color.addEventListener('input', function() {
        player_shoes.material = new BABYLON.StandardMaterial("shoes", scene);
        player_shoes.material.diffuseColor = new BABYLON.Color3.FromHexString(shoes_color.value);
        player_pants.material.specularColor = new BABYLON.Color3(0,0,0);
        player_pants.material.emissiveColor = new BABYLON.Color3(0, 0, 0);
    });
    ///////////////////////////// SOUS MENU EVENT : SOUND
    volume.addEventListener('input', function() {
        if(!mute_music.classList.contains("on")){
            background.setVolume(0.0007*volume.value);
        }
        if(!mute.classList.contains("on")){
            jumpSound.setVolume(0.01*volume.value);
            grassWalkSound.setVolume(0.15*volume.value);
            stoneWalkSound.setVolume(0.08*volume.value);
            bedSound.setVolume(0.06*volume.value);
            buttonPressedSound.setVolume(0.02*volume.value);
            laserSound.setVolume(0.009*volume.value);
            winSound.setVolume(0.016*volume.value);
            successSound.setVolume(0.016*volume.value);
            errorSound.setVolume(0.014*volume.value);
            magicIdleSound.setVolume(0.001*volume.value);
            magicalsEffectsSound.setVolume(0.01*volume.value);
            fallSound.setVolume(0.05*volume.value);
            looseSound.setVolume(0.005*volume.value);
        }
        document.getElementById('rangeValue1').innerHTML = "Volume : "+volume.value;
    })
    mute_music.addEventListener('click', function() {
        if(mute_music.classList.contains("on")){
            mute_music.classList.remove("on");
            background.setVolume(0.0007*volume.value);
        } else {
            mute_music.classList.add("on");
            background.setVolume(0);
        }
    });
    mute.addEventListener('click', function() {
        if(mute.classList.contains("on")){
            mute.classList.remove("on");
            jumpSound.setVolume(0.01*volume.value);
            grassWalkSound.setVolume(0.15*volume.value);
            stoneWalkSound.setVolume(0.08*volume.value);
            bedSound.setVolume(0.06*volume.value);
            buttonPressedSound.setVolume(0.02*volume.value);
            laserSound.setVolume(0.009*volume.value);
            winSound.setVolume(0.016*volume.value);
            successSound.setVolume(0.016*volume.value);
            errorSound.setVolume(0.014*volume.value);
            magicIdleSound.setVolume(0.001*volume.value);
            magicalsEffectsSound.setVolume(0.01*volume.value);
            fallSound.setVolume(0.05*volume.value);
            looseSound.setVolume(0.005*volume.value);
        } else {
            mute.classList.add("on");
            jumpSound.setVolume(0);
            grassWalkSound.setVolume(0);
            stoneWalkSound.setVolume(0);
            bedSound.setVolume(0);
            buttonPressedSound.setVolume(0);
            laserSound.setVolume(0);
            winSound.setVolume(0);
            successSound.setVolume(0);
            errorSound.setVolume(0);
            magicIdleSound.setVolume(0);
            magicalsEffectsSound.setVolume(0);
            fallSound.setVolume(0);
            looseSound.setVolume(0);
        }
    });
    buttonKeepPlaying.addEventListener('click', function() {
        player_root.position = new BABYLON.Vector3(0,0,0);
        endDiv.classList.add("hidden");
    });
    progressBar.style.width = "100%";
    window.addEventListener("keydown", function(evt) {
        if (evt.key === "i") {
            if(scene.debugLayer.isVisible()){
                scene.debugLayer.hide();
            }else{
                scene.debugLayer.show();
            }
        }
    });
    scene.debugLayer.show().then(() => {
        const debugIframe = document.getElementById("scene-explorer-host");
        const debugIframe2= document.getElementById("inspector-host");
        debugIframe.style.zIndex = "6";
        debugIframe2.style.zIndex = "6";
        scene.debugLayer.hide();
    });
    canvas.addEventListener("click", () => {
        if (document.pointerLockElement === canvas) {
            document.exitPointerLock();
        } else if(!scene.debugLayer.isVisible()) {
            canvas.requestPointerLock();
        }
    });
    loading.classList.add("hide");
    canvas.classList.remove("hide");
    playMenu.classList.remove("hide");
    backmenu.classList.add("hide");
    engine.resize();
    helpUI.classList.remove("hidden");
    timerDiv.classList.remove("hidden");
    return scene;
}
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
