import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
// Importa los loaders y controles que necesitas
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import muraltoModelUrl from "../../assets/Muralto/model.glb";

// Importa el compositor y los passes
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { CiMaximize2 } from "react-icons/ci";
import { PiBoundingBox } from "react-icons/pi";
import { MdOutlineCameraIndoor } from "react-icons/md";

import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { gsap } from "gsap";

import Button from "../ui/Button";
import Helper from "../ui/Helper";
import MenuButton from "../ui/MenuButton";
import { TransformControls } from "three/addons/controls/TransformControls.js";

const Visor = () => {
  const [showCameraControls, setShowCameraControls] = useState(false);
  const [cuttingActive, setCuttingActive] = useState(false);
  const [meshes, setMeshes] = useState([]);
  const visorRef = useRef();
  const cameraRef = useRef();
  const controlsRef = useRef();
  const rendererRef = useRef();
  const sceneRef = useRef();
  const boxHelperRef = useRef(null);
  const raycasterRef = useRef(new THREE.Raycaster());
  const clippingPlaneRef = useRef(null);
  const planeMeshRef = useRef(null);
  const transformControlsRef = useRef(null);

  // Cargar modelo GLB
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath(
    "https://www.gstatic.com/draco/versioned/decoders/1.5.7/"
  );
  dracoLoader.setDecoderConfig({ type: "js" });
  loader.setDRACOLoader(dracoLoader);

  useEffect(() => {
    // Configuración básica
    const width = visorRef.current.clientWidth;
    const height = visorRef.current.clientHeight;

    // Crear escena, cámara y renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xdae7f2);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(-17, 26, 16);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
      stencil: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.localClippingEnabled = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.physicallyCorrectLights = true;

    visorRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    function render() {
      renderer.render(scene, camera);
    }
    // Controles de cámara
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.dampingFactor = 0.2;
    controls.enableDamping = true;
    controls.target.set(3, 7, -3);
    controlsRef.current = controls;

    const control = new TransformControls(camera, renderer.domElement);
    control.addEventListener("objectChange", render);
    control.addEventListener("dragging-changed", function (event) {
      controls.enabled = !event.value;
    });
    transformControlsRef.current = control;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.5);
    scene.add(hemiLight);

    const directionalLight = new THREE.DirectionalLight();
    // Ajustes de la luz direccional
    directionalLight.color.setHex(0xffffff);
    directionalLight.intensity = 4;
    directionalLight.castShadow = true;

    // Elevation y azimuth en radianes
    const elevation = 1.5;
    const azimuth = 0.75;

    // Para posicionar la luz usando coordenadas esféricas
    // Radio “r” puede ser la distancia que quieras
    const r = 50;
    const x = r * Math.sin(elevation) * Math.cos(azimuth);
    const y = r * Math.cos(elevation);
    const z = r * Math.sin(elevation) * Math.sin(azimuth);

    directionalLight.position.set(x, y, z);

    // Ajusta el radio de sombra a 0 para sombras más definidas
    directionalLight.shadow.radius = 0;

    // Configura el resto de parámetros de sombra que consideres necesarios
    directionalLight.shadow.mapSize.width = 8192;
    directionalLight.shadow.mapSize.height = 8192;
    directionalLight.shadow.camera.near = 0.1;
    directionalLight.shadow.camera.far = 100;
    directionalLight.shadow.camera.left = -15;
    directionalLight.shadow.camera.right = 15;
    directionalLight.shadow.camera.top = 15;
    directionalLight.shadow.camera.bottom = -15;
    directionalLight.shadow.bias = -0.0002;
    directionalLight.shadow.normalBias = 0.001;

    scene.add(directionalLight);

    const gui = new dat.GUI();
    const ambientFolder = gui.addFolder("Ambient Light");
    ambientFolder.add(ambientLight, "intensity", 0, 10, 0.1).name("Intensity");
    const params = {
      color: ambientLight.color.getHex(),
    };
    ambientFolder
      .addColor(params, "color")
      .name("Color")
      .onChange((value) => {
        // value llega en formato 0xRRGGBB
        ambientLight.color.setHex(value);
      });
    const hemiLightFolder = gui.addFolder("Hemisphere Light");
    hemiLightFolder.add(hemiLight, "intensity", 0, 10, 0.1).name("Intensity");

    // Control del color del cielo
    const hemiLightParams = {
      skyColor: hemiLight.color.getHex(), // Color del cielo inicial
      groundColor: hemiLight.groundColor.getHex(), // Color del suelo inicial
    };

    hemiLightFolder
      .addColor(hemiLightParams, "skyColor")
      .name("Sky Color")
      .onChange((value) => {
        hemiLight.color.setHex(value); // Actualizar el color del cielo
      });

    hemiLightFolder
      .addColor(hemiLightParams, "groundColor")
      .name("Ground Color")
      .onChange((value) => {
        hemiLight.groundColor.setHex(value); // Actualizar el color del suelo
      });
    // Crear una carpeta para los controles de la luz direccional
    const dirLightFolder = gui.addFolder("Directional Light");

    // Control de la intensidad
    dirLightFolder
      .add(directionalLight, "intensity", 0, 10, 0.1)
      .name("Intensity");

    // Control del color de la luz
    const dirLightParams = {
      color: directionalLight.color.getHex(), // Color inicial
    };

    dirLightFolder
      .addColor(dirLightParams, "color")
      .name("Color")
      .onChange((value) => {
        directionalLight.color.setHex(value); // Actualizar el color
      });

    // Control de la posición
    const dirLightPosition = {
      x: directionalLight.position.x,
      y: directionalLight.position.y,
      z: directionalLight.position.z,
    };

    dirLightFolder
      .add(dirLightPosition, "x", -100, 100, 0.1)
      .name("Position X")
      .onChange((value) => {
        directionalLight.position.x = value; // Actualizar la posición en el eje X
      });

    dirLightFolder
      .add(dirLightPosition, "y", -100, 100, 0.1)
      .name("Position Y")
      .onChange((value) => {
        directionalLight.position.y = value; // Actualizar la posición en el eje Y
      });

    dirLightFolder
      .add(dirLightPosition, "z", -100, 100, 0.1)
      .name("Position Z")
      .onChange((value) => {
        directionalLight.position.z = value; // Actualizar la posición en el eje Z
      });

    const spotLights = [];
    const spotLightParams = [];

    for (let i = 0; i < 5; i++) {
      const spotLight = new THREE.SpotLight(0xffffff, 1);
      spotLight.position.set((i - 2) * 5, 10, 5); // Posiciones iniciales
      spotLight.castShadow = true;
      spotLight.angle = Math.PI / 6; // Ángulo del cono
      spotLight.penumbra = 0.5; // Suavidad en los bordes
      scene.add(spotLight);

      // Añadimos la luz al array
      spotLights.push(spotLight);

      // Creamos parámetros iniciales para cada luz
      spotLightParams.push({
        color: spotLight.color.getHex(),
        intensity: spotLight.intensity,
        x: spotLight.position.x,
        y: spotLight.position.y,
        z: spotLight.position.z,
      });

      // Crear una carpeta para cada SpotLight en dat.gui
      const folder = gui.addFolder(`SpotLight ${i + 1}`);

      // Control de color
      folder
        .addColor(spotLightParams[i], "color")
        .name("Color")
        .onChange((value) => {
          spotLight.color.setHex(value);
        });

      // Control de intensidad
      folder
        .add(spotLightParams[i], "intensity", 0, 10, 0.1)
        .name("Intensity")
        .onChange((value) => {
          spotLight.intensity = value;
        });

      // Controles de posición
      folder
        .add(spotLightParams[i], "x", -20, 20, 0.1)
        .name("Position X")
        .onChange((value) => {
          spotLight.position.x = value;
        });

      folder
        .add(spotLightParams[i], "y", 0, 20, 0.1)
        .name("Position Y")
        .onChange((value) => {
          spotLight.position.y = value;
        });

      folder
        .add(spotLightParams[i], "z", -20, 20, 0.1)
        .name("Position Z")
        .onChange((value) => {
          spotLight.position.z = value;
        });
    }

    let meshList = [];
    loader.load(
      modelRoute,
      (glb) => {
        const model = glb.scene;
        model.traverse((node) => {
          if (node.isMesh) {
            node.material.metalness = 0.5;
            node.material.roughness = 0.8;
            node.material.side = THREE.DoubleSide;
            node.castShadow = true;
            node.receiveShadow = true;

            const match = node.name.match(/<(\d{7})/);

            const number = match && match[1];

            meshList.push(number);
            node.geometry.computeVertexNormals();
          }
        });
        scene.add(model);
        if (meshList.length !== meshes.length) {
          setMeshes(meshList);
        }
        boxHelperRef.current = new THREE.Box3().setFromObject(model);
      },
      (xhr) => {
        console.log("Modelo cargado");
      },
      (error) => {
        console.error("Error cargando el modelo:", error);
      }
    );

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const n8aopass = new N8AOPass(scene, camera, width, height);
    composer.addPass(n8aopass);
    n8aopass.configuration.gammaCorrection = false;
    n8aopass.configuration.aoRadius = 5.0;
    n8aopass.configuration.distanceFalloff = 1.0;
    n8aopass.configuration.intensity = 5.0;
    n8aopass.configuration.color = new THREE.Color(0, 0, 0);

    n8aopass.setQualityMode("high");

    const renderTarget = new THREE.WebGLRenderTarget(width, height);
    // If you just want a depth buffer
    renderTarget.depthTexture = new THREE.DepthTexture(
      width,
      height,
      THREE.UnsignedIntType
    );
    renderTarget.depthTexture.format = THREE.DepthFormat;
    // If you want a depth buffer and a stencil buffer
    renderTarget.depthTexture = new THREE.DepthTexture(
      width,
      height,
      THREE.UnsignedInt248Type
    );
    renderTarget.depthTexture.format = THREE.DepthStencilFormat;

    const nnfolder = gui.addFolder(`AAO`);
    nnfolder
      .add(n8aopass.configuration, "aoRadius", 0.1, 10, 0.1)
      .name("AO Radius");
    nnfolder
      .add(n8aopass.configuration, "distanceFalloff", 0.1, 5, 0.1) // Rango de 0.1 a 5 con pasos de 0.1
      .name("Distance Falloff");
    nnfolder
      .add(n8aopass.configuration, "intensity", 0, 10, 0.1) // Rango de 0 a 10 con pasos de 0.1
      .name("Intensity");

    // Función de animación
    const animate = () => {
      requestAnimationFrame(animate);

      // Actualiza controles
      controls.update();

      // Renderiza la escena con composer en vez de renderer directamente
      composer.render();
    };

    animate();

    window.addEventListener("resize", () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    });

    // Limpieza
    return () => {
      window.removeEventListener("resize", handleResize);
      if (visorRef.current) {
        visorRef.current.removeChild(renderer.domElement);
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, []);

  useEffect(() => {
    const renderer = rendererRef.current;

    const createplanefunc = (event) => {
      if (!cuttingActive) return;
      createplane(event);
    };

    if (cuttingActive) {
      renderer.domElement.addEventListener("dblclick", createplanefunc);
    } else {
      renderer.domElement.removeEventListener("dblclick", createplanefunc);
    }
  }, [cuttingActive]);

  /**
   * Función para crear un plano de corte
   */
  const createplane = (event) => {
    const renderer = rendererRef.current;
    const camera = cameraRef.current;
    const scene = sceneRef.current;
    const raycaster = raycasterRef.current;
    const transformControls = transformControlsRef.current;

    if (!renderer || !camera || !scene || !raycaster || !transformControls)
      return;

    // 1. Raycast
    const rect = renderer.domElement.getBoundingClientRect();
    const mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera({ x: mouseX, y: mouseY }, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);
    if (intersects.length === 0) return;

    const intersection = intersects[0];
    const point = intersection.point;

    const plane = new THREE.Plane();
    clippingPlaneRef.current = plane;

    const gizmo = transformControls.getHelper();
    scene.add(gizmo);

    // 3. Si ya existe un planeMesh anterior, lo removemos de la escena
    if (planeMeshRef.current) {
      scene.remove(planeMeshRef.current);
      transformControls.detach(planeMeshRef.current);
      planeMeshRef.current.geometry.dispose();
      planeMeshRef.current.material.dispose();
      planeMeshRef.current = null;
    }

    // 4. Crear un Mesh plano semitransparente para visualizarlo
    const planeSize = 8;
    const planeGeometry = new THREE.PlaneGeometry(planeSize, planeSize);
    const planeMaterial = new THREE.MeshPhongMaterial({
      color: 0x90d5ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.3,
    });
    const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    planeMesh.position.copy(point);

    // 1. Obtienes el vector "normal" mundial del plano
    const cameraDir = new THREE.Vector3();
    camera.getWorldDirection(cameraDir);

    if (Math.abs(cameraDir.y) > 0.7) {
      if (cameraDir.y > 0) {
        // Cámara por encima => normal hacia abajo => rotación.x = -90°
        planeMesh.rotation.set(-Math.PI / 2, 0, 0);
      } else {
        // Cámara por debajo => normal hacia arriba => +90°
        planeMesh.rotation.set(Math.PI / 2, 0, 0);
      }
    } else {
      // Si no domina Y, consideramos "vertical" => normal +Z => (0,0,0)
      planeMesh.rotation.set(0, 0, 0);
    }

    // Agregar a la escena
    scene.add(planeMesh);
    planeMeshRef.current = planeMesh;

    updatePlaneFromMesh();

    // 5. Asignar el clipping plane al renderer (o a tus materiales)
    renderer.clippingPlanes = [plane];

    // 6. Conectar el planeMesh al TransformControls para poder arrastrarlo
    transformControls.attach(planeMesh);
    // OJO: El arrastre se hace sobre las flechas de colores que dibuja TransformControls,
    //      NO sobre el AxesHelper.

    // Cada vez que movamos/rotemos el planeMesh, actualizar la normal en clippingPlane
    transformControls.addEventListener("change", updatePlaneFromMesh);
  };

  /**
   * onPlaneTransform:
   *   Recalcula la normal y la posición (coplanar point) del plane (THREE.Plane)
   *   basados en la transform del planeMesh.
   */
  const updatePlaneFromMesh = () => {
    const plane = clippingPlaneRef.current;
    const planeMesh = planeMeshRef.current;
    if (!plane || !planeMesh) return;

    // Por defecto, la geometría del Plane "mira" +Z local
    const newNormal = new THREE.Vector3(0, 0, 1);
    planeMesh.getWorldDirection(newNormal);

    // Punto en espacio mundo
    const coplanarPoint = new THREE.Vector3().setFromMatrixPosition(
      planeMesh.matrixWorld
    );

    // Reconfigurar
    plane.setFromNormalAndCoplanarPoint(newNormal, coplanarPoint);
  };

  const moveCamera = (newPos, time = 1) => {
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (!camera || !controls) return;

    const center = new THREE.Vector3();
    boxHelperRef.current.getCenter(center);

    // Usamos gsap para interpolar la posición de la cámara
    gsap.to(camera.position, {
      duration: time,
      x: newPos.x,
      y: newPos.y,
      z: newPos.z,
      ease: "power2.inOut",
      onUpdate: () => {
        controls.update();
      },
      onComplete: () => {
        camera.lookAt(center);
        controls.target.copy(center);
        controls.update();
      },
    });
  };

  const removePlane = () => {
    const scene = sceneRef.current;
    const renderer = rendererRef.current;
    const transformControls = transformControlsRef.current;

    // Quitar planeMesh
    if (planeMeshRef.current) {
      scene.remove(planeMeshRef.current);
      transformControls.detach(planeMeshRef.current);
      planeMeshRef.current.geometry.dispose();
      planeMeshRef.current.material.dispose();
      planeMeshRef.current = null;
    }

    if (renderer) {
      renderer.clippingPlanes = [];
    }

    clippingPlaneRef.current = null;
  };

  useEffect(() => {
    if (!cuttingActive) {
      removePlane();
    }
  }, [cuttingActive]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      <section
        ref={visorRef}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      ></section>
      <nav
        style={{
          display: "flex",
          gap: "15px",
          position: "absolute",
          bottom: "20px",
          left: "50%",
          padding: "10px",
        }}
      >
        <Helper text="Centra la camara en el modelo">
          <Button onClick={() => moveCamera({ x: -17, y: 26, z: 16 })}>
            <CiMaximize2 />
          </Button>
        </Helper>
        <Helper text="Activa un boundingbox alrededor del modelo">
          <button
            onClick={() => setCuttingActive(!cuttingActive)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "2rem",
              width: "2rem",
              background: cuttingActive ? "#3D3C3B" : "#f9f9f9",
              color: cuttingActive ? "#f9f9f9" : "#3D3C3B",
              borderRadius: "50%",
              boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
              border: "none",
              cursor: "pointer",
              padding: "0.2rem",
            }}
          >
            <PiBoundingBox />
          </button>
        </Helper>
        <div style={{ position: "relative" }}>
          <Helper text="Abre Menu de navegacion de la camara">
            <button
              onClick={() => setShowCameraControls(!showCameraControls)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "2rem",
                width: "2rem",
                background: showCameraControls ? "#3D3C3B" : "#f9f9f9",
                color: showCameraControls ? "#f9f9f9" : "#3D3C3B",
                borderRadius: "50%",
                boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
                border: "none",
                cursor: "pointer",
                padding: "0.2rem",
              }}
            >
              <MdOutlineCameraIndoor />
            </button>
          </Helper>
          {showCameraControls && (
            <div
              style={{
                position: "absolute",
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                bottom: "100%",
                marginBottom: "5px",
                padding: "5px",
                background: "#f9f9f9",
                borderRadius: "5px",
                boxShadow: "0 0 5px rgba(0,0,0,0.1)",
              }}
            >
              <MenuButton onClick={() => moveCamera({ x: 0, y: 30, z: 0 })}>
                Arriba
              </MenuButton>
              <MenuButton onClick={() => moveCamera({ x: -30, y: 0, z: 0 })}>
                Izquierda
              </MenuButton>
              <MenuButton onClick={() => moveCamera({ x: 0, y: -30, z: 0 })}>
                Abajo
              </MenuButton>
              <MenuButton onClick={() => moveCamera({ x: 30, y: 0, z: 0 })}>
                Derecha
              </MenuButton>
              <MenuButton onClick={() => moveCamera({ x: 0, y: 0, z: 30 })}>
                Frente
              </MenuButton>
              <MenuButton onClick={() => moveCamera({ x: 0, y: 0, z: -30 })}>
                Detras
              </MenuButton>
            </div>
          )}
        </div>
      </nav>
      {meshes && (
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            borderRadius: "5px",
            gap: "10px",
            position: "absolute",
            width: "300px",
            bottom: "50px",
            left: "5px",
            padding: "10px",
            background: "#f9f9f9",
            color: "#3D3C3B",
          }}
        >
          <p>Meshes in the model</p>
          <div style={{ overflowY: "auto", maxHeight: "200px" }}>
            {meshes.map((mesh, index) => (
              <p style={{ margin: 0, fontSize: "10px" }} key={index}>
                {mesh}
              </p>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Visor;
