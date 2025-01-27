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

    // Iluminación
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.8);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(8, 30, 7);
    directionalLight.castShadow = true;
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
    directionalLight.shadow.radius = 4;
    scene.add(directionalLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
    fillLight.position.set(-30, 20, 20);
    scene.add(fillLight);

    const backLight = new THREE.DirectionalLight(0xffffff, 0.7);
    backLight.position.set(0, 15, -30);
    backLight.castShadow = false;
    scene.add(backLight);

    let meshList = [];
    loader.load(
      muraltoModelUrl,
      (glb) => {
        const model = glb.scene;
        model.traverse((node) => {
          if (node.isMesh) {
            node.material.metalness = 0.5;
            node.material.roughness = 0.8;
            node.material.side = THREE.DoubleSide;
            node.castShadow = true;
            node.receiveShadow = true;
            meshList.push(node);
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

    // ----------- POSTPROCESADO ------------
    // 1. Crear composer
    const composer = new EffectComposer(renderer);

    // 2. Agregar RenderPass (renderizado base de la escena)
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    // Función de animación
    const animate = () => {
      requestAnimationFrame(animate);

      // Actualiza controles
      controls.update();

      // Renderiza la escena con composer en vez de renderer directamente
      composer.render();
    };

    animate();

    // Ajustar tamaño en caso de resize
    const handleResize = () => {
      const w = visorRef.current.clientWidth;
      const h = visorRef.current.clientHeight;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);

      // Importante: también ajustar el tamaño de los passes
      composer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

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
                {mesh.name}
              </p>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Visor;
