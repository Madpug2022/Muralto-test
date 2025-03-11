import { useRef, useEffect, useState, use, useCallback } from "react";
import * as THREE from "three";
// Importa los loaders y controles que necesitas
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { HalfFloatType } from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { FXAAShader } from "three/addons/shaders/FXAAShader.js";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass";
import { CiMaximize2 } from "react-icons/ci";
import { PiBoundingBox } from "react-icons/pi";
import { MdOutlineCameraIndoor, MdOutlineViewInAr } from "react-icons/md";
import { gsap } from "gsap";
import Button from "../ui/Button";
import Helper from "../ui/Helper";
import MenuButton from "../ui/MenuButton";
import { TransformControls } from "three/addons/controls/TransformControls.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import {
  MeshBVH,
  computeBoundsTree,
  disposeBoundsTree,
  computeBatchedBoundsTree,
  disposeBatchedBoundsTree,
  acceleratedRaycast,
} from "three-mesh-bvh";
import { N8AOPass } from "n8ao";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";

import arcUrl from "../../assets/Muralto/arc.glb";
import entUrl from "../../assets/Muralto/ent.glb";
import mepUrl from "../../assets/Muralto/MEP.glb";
import strUrl from "../../assets/Muralto/str.glb";

function extractOODDirectShapeIds(rooms) {
  const oodDirectShapeIds = [];

  for (const key in rooms) {
    if (rooms.hasOwnProperty(key)) {
      const room = rooms[key];

      if (
        typeof room === "object" &&
        room !== null &&
        room.hasOwnProperty("_OOD_DirectShapeId")
      ) {
        oodDirectShapeIds.push(room._OOD_DirectShapeId.toString());
      }
    }
  }

  return oodDirectShapeIds;
}

const Visor = ({
  externalIds,
  testMode = false,
  dataUrl,
  roomsUrl,
  modelUrl,
  backgroundColor = "#DAE7F2",
  level,
}) => {
  const [showCameraControls, setShowCameraControls] = useState(false);
  const [cuttingActive, setCuttingActive] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isTopView, setIsTopView] = useState(false);
  const originalCameraPositionRef = useRef(null);
  const originalControlsTargetRef = useRef(null);
  const visorRef = useRef();
  const cameraRef = useRef();
  const orthographicCameraRef = useRef(null);
  const perspectiveCameraRef = useRef(null);
  const controlsRef = useRef();
  const rendererRef = useRef();
  const sceneRef = useRef();
  const boxHelperRef = useRef(null);
  const raycasterRef = useRef(null);
  const clippingPlaneRef = useRef(null);
  const planeMeshRef = useRef(null);
  const transformControlsRef = useRef(null);
  const modelRef = useRef(null);
  const roomsModelRef = useRef(null);
  const composerRef = useRef(null);
  const originalMaterialsRef = useRef({});
  const roomsOriginalMaterialsRef = useRef({});
  const roomsRef = useRef([]);
  const n8aopassRef = useRef(null);
  const isHoverActive = useRef(false);
  const animationFrameId = useRef(null);
  const levelsRef = useRef([]);
  const modelMaterialsRef = useRef([]);
  const modelCloneRef = useRef(null);
  const originalMaterialsMapRef = useRef(new Map());
  const mepModelMaterialsRef = useRef([]);
  const strModelMaterialsRef = useRef([]);
  const arcModelMaterialsRef = useRef([]);
  const roomsModelMaterialsRef = useRef([]);
  const originalAoIntensityRef = useRef(null);
  const targetIntensityRef = useRef(2.3); // Valor predeterminado
  const targetDenoiseSamplesRef = useRef(4);
  const targetDenoiseRadiusRef = useRef(6);
  const isTopViewRef = useRef(false);

  const arcModelRef = useRef(null);
  const entModelRef = useRef(null);
  const mepModelRef = useRef(null);
  const strModelRef = useRef(null);

  const fillUpperClipPlaneRef = useRef(
    new THREE.Plane(new THREE.Vector3(0, -1, 0), 0)
  );
  const fillLowerClipPlaneRef = useRef(
    new THREE.Plane(new THREE.Vector3(0, 1, 0), 0)
  );
  const clipPlaneRef = useRef(new THREE.Plane(new THREE.Vector3(0, -1, 0), 0));
  const [jsonData, setJson] = useState(null);

  const cargarJSON = useCallback(async () => {
    try {
      const respuesta = await fetch(dataUrl);
      if (!respuesta.ok) {
        throw new Error(
          `Error al obtener el archivo JSON: ${respuesta.status}`
        );
      }
      const datos = await respuesta.json();
      setJson(datos);
      roomsRef.current = extractOODDirectShapeIds(datos.rooms);
      levelsRef.current = datos.levels;
      return datos;
    } catch (error) {
      console.error("Hubo un problema al cargar el JSON:", error);
      throw error;
    }
  }, [dataUrl]);

  const darkerTransparentGrayMaterial = new THREE.MeshStandardMaterial({
    color: 0xd3d3d3,
    transparent: true,
    opacity: 0.1,
    roughness: 0.5,
    metalness: 0.3,
    depthWrite: false,
  });

  // Cargar modelo GLB
  const loader = new GLTFLoader();
  const roomLoader = new GLTFLoader();

  loader.setMeshoptDecoder(MeshoptDecoder);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Configuración básica
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
      alpha: true,
      stencil: true,
      depth: false,
    });
    renderer.setClearColor(0x000000, 0);
    function render() {
      renderer.render(scene, camera);
    }
    const width = visorRef.current.clientWidth;
    const height = visorRef.current.clientHeight;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputEncoding = THREE.SRGBColorSpace;
    renderer.localClippingEnabled = true;
    renderer.toneMappingExposure = 1.2;
    rendererRef.current = renderer;
    visorRef.current.appendChild(renderer.domElement);

    THREE.BufferGeometry.prototype.computeBoundsTree = computeBoundsTree;
    THREE.BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree;
    THREE.Mesh.prototype.raycast = acceleratedRaycast;

    THREE.BatchedMesh.prototype.computeBoundsTree = computeBatchedBoundsTree;
    THREE.BatchedMesh.prototype.disposeBoundsTree = disposeBatchedBoundsTree;
    THREE.BatchedMesh.prototype.raycast = acceleratedRaycast;

    if (dataUrl) {
      cargarJSON();
    }
    // Crear escena, cámara y renderer
    const scene = new THREE.Scene();
    //scene.background = new THREE.Color(0xdae7f2);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1, // near plane
      10000 // far plane - aumentado significativamente
    );
    camera.position.set(-17, 26, 16);
    camera.fov = 40;
    perspectiveCameraRef.current = camera;
    cameraRef.current = camera;

    const frustumSize = 30;
    const aspect = width / height;
    const orthographicCamera = new THREE.OrthographicCamera(
      (frustumSize * aspect) / -2,
      (frustumSize * aspect) / 2,
      frustumSize / 2,
      frustumSize / -2,
      0.1,
      10000
    );
    orthographicCamera.position.set(-17, 26, 16);
    orthographicCameraRef.current = orthographicCamera;
    // Controles de cámara
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.dampingFactor = 0.2;
    controls.enableDamping = true;
    controls.target.set(3, 7, -3);
    controls.maxDistance = Infinity; // Permite alejarse infinitamente
    controls.minDistance = 0; // Permite acercarse hasta el target
    controls.enablePan = true; // Asegura que el pan esté habilitado
    controls.panSpeed = 1.0; // Velocidad de pan (ajusta según necesites)
    controls.screenSpacePanning = true; // Mejor comportamiento para el pan
    controlsRef.current = controls;

    renderer.domElement.addEventListener("wheel", (event) => {
      event.preventDefault();

      const direction = event.deltaY > 0 ? 1 : -1;
      const speed = 0.5; // Ajusta según necesites

      const vector = new THREE.Vector3();
      camera.getWorldDirection(vector);

      camera.position.add(vector.multiplyScalar(speed * direction));
      controls.target.add(vector.multiplyScalar(speed * direction));

      controls.update();
    });

    // No olvides actualizar la matriz de proyección después de cambiar el far plane
    camera.updateProjectionMatrix();

    const control = new TransformControls(camera, renderer.domElement);
    control.addEventListener("objectChange", render);
    control.addEventListener("dragging-changed", function (event) {
      controls.enabled = !event.value;
    });
    transformControlsRef.current = control;
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.2);
    scene.add(hemiLight);

    const directionalLight = new THREE.DirectionalLight();
    // Ajustes de la luz direccional
    directionalLight.color.setHex(0xffffff);
    directionalLight.intensity = 0.63;
    directionalLight.castShadow = true;

    directionalLight.position.set(70, 100, 70);

    directionalLight.shadow.mapSize.set(4096 * 2, 4096 * 2);
    // Asegúrate de que el 'near' y 'far' sean adecuados al tamaño de tu escena

    directionalLight.shadow.camera.far = 200;
    directionalLight.shadow.camera.left = -200;
    directionalLight.shadow.camera.right = 200;
    directionalLight.shadow.camera.top = 200;
    directionalLight.shadow.camera.bottom = -200;
    // Un bias pequeño ayuda a evitar "bandas" en sombras
    directionalLight.shadow.bias = -0.0005;

    scene.add(directionalLight);

    scene.fog = new THREE.Fog(0x949494, 1000, 1000000);

    const composer = new EffectComposer(renderer);
    composerRef.current = composer;

    const n8aopass = new N8AOPass(scene, camera, width, height);
    n8aopassRef.current = n8aopass;
    const renderPasse = new RenderPass(scene, camera);
    const outputPass = new OutputPass();

    const outlinePass = new OutlinePass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      scene,
      camera
    );

    outlinePass.edgeStrength = 10;
    outlinePass.edgeGlow = 0;
    outlinePass.edgeThickness = 4;
    outlinePass.visibleEdgeColor.set("#0055ff");
    outlinePass.hiddenEdgeColor.set("#0055ff");

    n8aopass.configuration.aoRadius = 8;
    n8aopass.configuration.distanceFalloff = 2;
    n8aopass.configuration.intensity = 1;
    n8aopass.configuration.color = new THREE.Color(0, 0, 0);
    n8aopass.configuration.screenSpaceRadius = false;

    n8aopass.setQualityMode("Ultra");

    n8aopass.configuration.aoSamples = 64;

    THREE.ColorManagement.legacyMode = false;

    renderer.toneMapping = THREE.ACESFilmicToneMapping;

    const fxaaPass = new ShaderPass(FXAAShader);
    const pixelRatio = renderer.getPixelRatio();

    fxaaPass.material.uniforms["resolution"].value.x =
      1 / (visorRef.offsetWidth * pixelRatio);
    fxaaPass.material.uniforms["resolution"].value.y =
      1 / (visorRef.offsetHeight * pixelRatio);
    composer.addPass(fxaaPass);
    composer.addPass(renderPasse); // RenderPass primero
    composer.addPass(n8aopass); // N8AOPass después
    composer.addPass(outlinePass); // OutlinePass antes del OutputPass

    composer.addPass(outputPass);

    //MOUSEOVER

    // Variables globales
    const raycaster = new THREE.Raycaster();
    raycasterRef.current = raycaster;
    const mouse = new THREE.Vector2();
    const hoverLabel = document.createElement("div");
    let hoveredMesh = null;

    // Configurar el cartel (hover label)
    hoverLabel.style.position = "absolute";
    hoverLabel.style.backgroundColor = "#ffffff";
    hoverLabel.style.color = "black";
    hoverLabel.style.boxShadow = "0 0 5px rgba(0,0,0,0.3)";
    hoverLabel.style.padding = "5px 10px";
    hoverLabel.style.borderRadius = "5px";
    hoverLabel.style.display = "none";
    document.body.appendChild(hoverLabel);

    function onMouseMove(event) {
      // Convertir la posición del mouse a coordenadas normalizadas (-1 to 1)
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    // Agregar el listener para el movimiento del mouse
    window.addEventListener("mousemove", onMouseMove);

    // Cargar el modelo ARC
    loader.load(
      arcUrl,
      (glb) => {
        const model = glb.scene;
        arcModelRef.current = model;
        model.traverse((node) => {
          if (node.isMesh) {
            node.castShadow = true;
            node.receiveShadow = true;
            const materials = Array.isArray(node.material)
              ? node.material
              : [node.material];
            materials.forEach((material) => {
              arcModelMaterialsRef.current.push(material);
            });
          }
        });
      },
      (progress) => {},
      (error) => {
        console.error("Error cargando el modelo:", error);
      }
    );
    loader.load(
      entUrl,
      (glb) => {
        const model = glb.scene;
        entModelRef.current = model;
      },
      (progress) => {},
      (error) => {
        console.error("Error cargando el modelo:", error);
      }
    );
    loader.load(
      mepUrl,
      (glb) => {
        const model = glb.scene;
        mepModelRef.current = model;

        model.traverse((node) => {
          if (node.isMesh) {
            // Guarda sus materiales
            const materials = Array.isArray(node.material)
              ? node.material
              : [node.material];
            materials.forEach((material) => {
              mepModelMaterialsRef.current.push(material);
            });

            node.castShadow = true;
            node.receiveShadow = true;
          }
        });
      },
      (progress) => {},
      (error) => {
        console.error("Error cargando el modelo mep:", error);
      }
    );
    loader.load(
      strUrl,
      (glb) => {
        const model = glb.scene;
        strModelRef.current = model;

        model.traverse((node) => {
          if (node.isMesh) {
            // Guarda sus materiales
            const materials = Array.isArray(node.material)
              ? node.material
              : [node.material];
            materials.forEach((material) => {
              strModelMaterialsRef.current.push(material);
            });

            node.castShadow = true;
            node.receiveShadow = true;
          }
        });
      },
      (progress) => {},
      (error) => {
        console.error("Error cargando el modelo:", error);
      }
    );

    let meshList = [];
    loader.load(
      modelUrl,
      (glb) => {
        const model = glb.scene;

        storeOriginalMaterials(model, originalMaterialsRef);
        modelRef.current = model;

        const modelClone = model.clone();
        modelCloneRef.current = modelClone;
        // Configurar el material de relleno para el clon
        const fillMaterial = new THREE.MeshStandardMaterial({
          color: 0x1f79db,
          side: 2, // Cambio importante: solo renderizar el lado posterior
          transparent: true,
          opacity: 1,
          clippingPlanes: [
            fillUpperClipPlaneRef.current,
            fillLowerClipPlaneRef.current,
          ],
          clipShadows: true,
          depthWrite: false, // Evitar que escriba en el buffer de profundidad
          stencilWrite: true,
          stencilRef: 0,
          stencilFunc: THREE.EqualStencilFunc,
          stencilFail: THREE.KeepStencilOp,
          stencilZFail: THREE.KeepStencilOp,
          stencilZPass: THREE.ReplaceStencilOp,
        });

        modelClone.traverse((node) => {
          if (node.isMesh) {
            node.material = fillMaterial;
            node.renderOrder = 2; // Asegurarse que se renderiza después del modelo original
          }
        });
        model.traverse((node) => {
          if (node.isMesh) {
            node.material.metalness = 0.1;
            node.material.roughness = 0.2;
            node.frustumCulled = true;
            node.castShadow = true;
            node.receiveShadow = true;

            node.geometry.computeVertexNormals();

            const materials = Array.isArray(node.material)
              ? node.material
              : [node.material];
            materials.forEach((material) => {
              modelMaterialsRef.current.push(material);
            });
          }
        });
        scene.add(model);
        boxHelperRef.current = new THREE.Box3().setFromObject(model);
      },
      (progress) => {},
      (error) => {
        // Éste sí es el onError real
        console.error("Error cargando el modelo:", error);
      }
    );
    const roomMeshes = [];
    const roomsIds = [];
    let roomModel;
    if (roomsUrl) {
      roomLoader.load(
        roomsUrl,
        (glb) => {
          roomModel = glb.scene;
          roomsModelRef.current = roomModel;
          storeOriginalMaterials(roomModel, roomsOriginalMaterialsRef);

          // Recorrer todos los nodos del modelo
          roomModel.traverse((node) => {
            if (node.isMesh) {
              node.frustumCulled = true;
              const match = node.name.match(/<(\d{7})/);
              const number = match && match[1];
              roomMeshes.push(node);
              roomsIds.push(number);
              meshList.push(node);

              // Opcional: Configurar el BVH para la geometría original
              node.geometry.boundsTree = new MeshBVH(node.geometry, {
                maxDepth: 400,
              });
            }
          });

          // Configurar el outlinePass si existe
          if (outlinePass) {
            outlinePass.selectedObjects = meshList; // Seleccionar el modelo cargado
          }
        },
        (progress) => {},
        (error) => {
          console.error("Error cargando el modelo de rooms:", error);
        }
      );
    }

    function updateRaycaster() {
      if (!isHoverActive.current) return;
      // Actualizar el raycaster con la posición del mouse
      raycaster.setFromCamera(mouse, camera);

      // Verificar intersecciones solo con los meshes de roomModel
      const intersects = raycaster.intersectObjects(roomMeshes, true);
      if (intersects.length > 0) {
        const firstIntersect = intersects[0].object;
        const match = firstIntersect.name.match(/<(\d{7})/);
        const number = match && match[1];
        if (roomsIds.includes(number)) {
          // Si el mesh intersectado es diferente al anterior, actualizar el cartel
          if (hoveredMesh !== firstIntersect) {
            hoveredMesh = firstIntersect;

            // Mostrar el nombre del mesh en el cartel
            hoverLabel.textContent = hoveredMesh.name || "Unnamed Mesh";
            hoverLabel.style.display = "block";

            // Posicionar el cartel cerca del cursor
            const rect = renderer.domElement.getBoundingClientRect();
            hoverLabel.style.left = `${
              mouse.x * (rect.width / 2) + rect.width / 2 + rect.left + 10
            }px`;
            hoverLabel.style.top = `${
              -mouse.y * (rect.height / 2) + rect.height / 2 + rect.top + 10
            }px`;
          }
        } else {
          // Si no hay intersecciones, ocultar el cartel
          if (hoveredMesh !== null) {
            hoveredMesh = null;
            hoverLabel.style.display = "none";
          }
        }
      }
    }
    const renderTarget = new THREE.WebGLRenderTarget(
      Math.max(width, 1),
      Math.max(height, 1),
      {
        type: HalfFloatType,
        depthTexture: new THREE.DepthTexture(),
      }
    );

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

    // Variables para almacenar la posición y rotación anterior de la cámara
    let previousCameraPosition = new THREE.Vector3();
    let previousCameraRotation = new THREE.Euler();

    // Variables para determinar si la cámara se está moviendo
    let isCameraMoving = false;

    // Variables para el valor actual de denoise y sus objetivos
    let currentDenoiseSamples = 6;
    let currentDenoiseRadius = 6;
    let currentIntensity = 1;
    // Función para detectar movimiento de cámara
    function updateCameraMovement(camera) {
      const positionThreshold = 0.01; // Umbral para detectar movimiento en la posición
      const rotationThreshold = 0.01; // Umbral para detectar movimiento en la rotación

      const positionDelta = camera.position.distanceTo(previousCameraPosition);
      const rotationDelta =
        Math.abs(camera.rotation.x - previousCameraRotation.x) +
        Math.abs(camera.rotation.y - previousCameraRotation.y) +
        Math.abs(camera.rotation.z - previousCameraRotation.z);

      // Actualizamos la variable que indica si la cámara se está moviendo
      isCameraMoving =
        positionDelta > positionThreshold || rotationDelta > rotationThreshold;

      // Guardamos la posición y rotación actual para el siguiente frame
      previousCameraPosition.copy(camera.position);
      previousCameraRotation.copy(camera.rotation);
    }

    // Función para definir los valores objetivo según si la cámara se mueve o no
    function setN8AOTargetValues() {
      if (isTopViewRef.current) {
        // Si estamos en vista 2D, mantener alta intensidad sin importar el movimiento
        targetDenoiseSamplesRef.current = 2;
        targetDenoiseRadiusRef.current = 1;
        targetIntensityRef.current = 6; // Alta intensidad para vista 2D
      } else if (isCameraMoving) {
        // Valores normales para movimiento en vista 3D
        targetDenoiseSamplesRef.current = 8;
        targetDenoiseRadiusRef.current = 12;
        targetIntensityRef.current = 1;
      } else {
        // Valores normales para vista 3D estática
        targetDenoiseSamplesRef.current = 2;
        targetDenoiseRadiusRef.current = 1;
        targetIntensityRef.current = 2.3;
      }
    }

    // Función para ir interpolando progresivamente hacia esos valores objetivo
    function updateN8AOParameters(n8aopass) {
      const lerpFactor = 0.05;

      currentDenoiseSamples = THREE.MathUtils.lerp(
        currentDenoiseSamples,
        targetDenoiseSamplesRef.current, // Usa la referencia en lugar de la variable local
        lerpFactor
      );

      currentDenoiseRadius = THREE.MathUtils.lerp(
        currentDenoiseRadius,
        targetDenoiseRadiusRef.current, // Usa la referencia en lugar de la variable local
        lerpFactor
      );

      // Interpolación para intensity
      currentIntensity = THREE.MathUtils.lerp(
        currentIntensity,
        targetIntensityRef.current, // Usa la referencia en lugar de la variable local
        lerpFactor
      );

      n8aopass.configuration.denoiseSamples = Math.round(currentDenoiseSamples);
      n8aopass.configuration.denoiseRadius = Math.round(currentDenoiseRadius);
      n8aopass.configuration.intensity = currentIntensity; // Asignar el valor actualizado
    }

    // Para calcular 'delta' (el tiempo transcurrido entre frames),
    // en Three.js usualmente se hace algo así:
    const clock = new THREE.Clock();

    //Modo test con GUI

    if (testMode) {
      const gui = new GUI();

      //Folder de luz direccional
      const directionalLightFolder = gui.addFolder("Directional Light");
      directionalLightFolder.add(directionalLight, "intensity", 0, 10, 0.01);
      directionalLightFolder.add(
        directionalLight.position,
        "x",
        -100,
        100,
        0.1
      );
      directionalLightFolder.add(
        directionalLight.position,
        "y",
        -100,
        100,
        0.1
      );
      directionalLightFolder.add(
        directionalLight.position,
        "z",
        -100,
        100,
        0.1
      );

      //Folder de luz hemisférica
      const hemiLightFolder = gui.addFolder("Hemisphere Light");
      hemiLightFolder.add(hemiLight, "intensity", 0, 1, 0.01);

      //folder de n8aopass
      const n8aopassFolder = gui.addFolder("N8AO Pass");
      n8aopassFolder.add(n8aopass.configuration, "aoSamples", 1, 64, 1);
      n8aopassFolder.add(n8aopass.configuration, "aoRadius", 1, 64, 1);
      n8aopassFolder.add(n8aopass.configuration, "intensity", 0, 10, 0.01);
      n8aopassFolder.addColor(n8aopass.configuration, "color");
      n8aopassFolder.add(
        n8aopass.configuration,
        "distanceFalloff",
        0,
        10,
        0.01
      );
      n8aopassFolder.add(n8aopass.configuration, "screenSpaceRadius");
    }

    // Ciclo de animación
    function animate() {
      animationFrameId.current = requestAnimationFrame(animate);
      updateRaycaster();
      // Calculamos el tiempo transcurrido desde el frame anterior
      const delta = clock.getDelta();

      // Revisar movimiento de la cámara
      updateCameraMovement(camera);

      // Ajustar los valores objetivo de denoise/Radius
      setN8AOTargetValues();

      // Interpola y actualiza los parámetros del pass
      updateN8AOParameters(n8aopass, delta);

      // Actualiza controles
      controls.update();

      // Renderiza la escena
      composer.render();
    }

    if (typeof window !== "undefined") {
      animate();
    }

    const handleResize = () => {
      const width = Math.max(visorRef.current.clientWidth, 1); // Mínimo 1px
      const height = Math.max(visorRef.current.clientHeight, 1); // Mínimo 1px

      perspectiveCameraRef.current.aspect = width / height;
      perspectiveCameraRef.current.updateProjectionMatrix();

      // Actualizar cámara ortográfica
      const frustumSize = 30;
      const aspect = width / height;
      orthographicCameraRef.current.left = (frustumSize * aspect) / -2;
      orthographicCameraRef.current.right = (frustumSize * aspect) / 2;
      orthographicCameraRef.current.top = frustumSize / 2;
      orthographicCameraRef.current.bottom = frustumSize / -2;
      orthographicCameraRef.current.updateProjectionMatrix();

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderTarget.setSize(width, height);
      composer.setSize(width, height);
      n8aopass.setSize(width, height);
    };

    window.addEventListener("resize", () => {
      handleResize();
    });

    // Limpieza
    return () => {
      window.removeEventListener("resize", handleResize);

      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }

      //eliminar todos los modelos
      if (modelRef.current) {
        disposeModel();
      }
      // Limpieza de controles
      if (controlsRef.current) {
        controlsRef.current.dispose();
      }

      if (transformControlsRef.current) {
        transformControlsRef.current.dispose();
      }

      if (renderer) {
        renderer.dispose();
        if (visorRef.current) {
          visorRef.current.removeChild(renderer.domElement);
        }
      }

      // Limpieza del renderTarget si existe
      if (renderTarget) {
        renderTarget.dispose();
        renderTarget.depthTexture.dispose();
      }

      // Limpieza de luces
      scene.traverse((object) => {
        if (object.isLight) {
          object.dispose();
        }
      });

      // limpia el raycaster
      window.removeEventListener("mousemove", onMouseMove);

      // Limpieza del modelo y materiales
      if (modelRef.current) {
        disposeModel();
      }

      if (composerRef.current) {
        composerRef.current.dispose();
      }

      // Limpiar la escena
      while (scene.children.length > 0) {
        scene.remove(scene.children[0]);
      }

      // Cancelar el loop de animación
      if (window.requestAnimationFrameId) {
        cancelAnimationFrame(window.requestAnimationFrameId);
      }
    };
  }, []);

  function disposeModel() {
    const model = modelRef.current;
    model.traverse((node) => {
      if (node.isMesh) {
        node.geometry.dispose();
        if (node.material.isMaterial) {
          cleanMaterial(node.material);
        } else if (Array.isArray(node.material)) {
          node.material.forEach(cleanMaterial);
        }
      }
    });
  }

  function cleanMaterial(material) {
    Object.keys(material).forEach((key) => {
      if (material[key] && typeof material[key].dispose === "function") {
        material[key].dispose();
      }
    });
  }

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
  const createplane = useCallback((event) => {
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

    renderer.clippingPlanes = [plane];

    transformControls.attach(planeMesh);

    transformControls.addEventListener("change", updatePlaneFromMesh);
  }, []);

  function updatePlaneFromMesh() {
    const plane = clippingPlaneRef.current;
    const planeMesh = planeMeshRef.current;
    if (!plane || !planeMesh) return;

    const newNormal = new THREE.Vector3(0, 0, 1);
    planeMesh.getWorldDirection(newNormal);

    const coplanarPoint = new THREE.Vector3().setFromMatrixPosition(
      planeMesh.matrixWorld
    );

    plane.setFromNormalAndCoplanarPoint(newNormal, coplanarPoint);
  }

  const moveCamera = (newPos, time = 1) => {
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (!camera || !controls) return;

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
        controls.update();
      },
    });
  };

  // Esta función la llamas una sola vez, quizá cuando cargaste el modelo
  function storeOriginalMaterials(model, ref) {
    model.traverse((node) => {
      if (node.isMesh) {
        // Guardas el material original asociado al uuid (o id) del node
        ref.current[node.uuid] = node.material;
      }
    });
  }

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

  function restoreOriginalState() {
    isHoverActive.current = false;
    // Restaurar los materiales originales del modelo principal
    modelRef.current.traverse((node) => {
      if (node.isMesh && originalMaterialsRef.current[node.uuid]) {
        node.material = originalMaterialsRef.current[node.uuid]; // Restaurar el material original
        node.castShadow = true; // Restaurar sombras si es necesario
        node.receiveShadow = true; // Restaurar sombras si es necesario
      }
    });

    // Restaurar la visibilidad de todos los nodos del modelo de habitaciones
    if (roomsModelRef.current) {
      roomsModelRef.current.traverse((node) => {
        if (node.isMesh) {
          node.visible = true; // Asegurarse de que todos los nodos estén visibles
        }
      });
    }

    // Quitar el modelo de habitaciones de la escena si está presente
    if (sceneRef.current.children.includes(roomsModelRef.current)) {
      sceneRef.current.remove(roomsModelRef.current);
    }

    return moveCamera({ x: -17, y: 26, z: 16 });
  }

  function selectRoom(roomsData) {
    // Si no hay datos, restaurar el estado original
    if (roomsData.length === 0) return restoreOriginalState();
    //isHoverActive.current = true;
    // Verificar que todos los IDs existan
    const allMeshIds = roomsData.flatMap((room) => room.directShapeIds);
    const invalidIds = allMeshIds.filter(
      (id) => !roomsRef.current.includes(id)
    );
    if (invalidIds.length > 0) {
      return alert(`IDs no encontrados: ${invalidIds.join(", ")}`);
    }

    // Transparentar todos los elementos del modelo original
    modelRef.current.traverse((node) => {
      if (node.isMesh) {
        node.material = darkerTransparentGrayMaterial;
        node.castShadow = false;
        node.receiveShadow = false;
      }
    });

    // Verificar si el modelo de rooms ya está cargado en la escena
    const isModelAlreadyLoaded = sceneRef.current.children.includes(
      roomsModelRef.current
    );

    // Si el modelo no está cargado, agregarlo a la escena
    if (!isModelAlreadyLoaded) {
      sceneRef.current.add(roomsModelRef.current);
    }

    // Restaurar la visibilidad de todos los nodos del modelo de rooms
    roomsModelRef.current.traverse((node) => {
      if (node.isMesh) {
        node.visible = true; // Restaurar la visibilidad de todos los nodos
      }
    });

    // Ocultar los elementos de room excepto los seleccionados y pintarlos según su status
    const selectedPositions = []; // Para almacenar las posiciones de las habitaciones seleccionadas

    roomsModelRef.current.traverse((node) => {
      if (node.isMesh) {
        const match = node.name.match(/<(\d{7})/);
        const number = match && match[1];

        if (number) {
          // Buscar el roomData correspondiente al directShapeId
          const roomData = roomsData.find((room) =>
            room.directShapeIds.includes(number)
          );

          if (roomData) {
            // Determinar el color según el status
            let colorHex;
            switch (roomData.status) {
              case "Occupied":
                colorHex = 0xff2323;
                break;
              case "Available":
                colorHex = 0x1daf94;
                break;
              case "Warning":
                colorHex = 0xe1901f;
                break;
              default:
                colorHex = 0x90d5ff; // Color por defecto
            }

            // Crear el material con el color correspondiente
            const coloredMaterial = new THREE.MeshBasicMaterial({
              color: colorHex,
            });

            // Aplicar el material y hacer visible el nodo
            node.material = coloredMaterial;
            node.visible = true;

            // Guardar la posición para calcular el centro
            node.updateWorldMatrix(true, true);
            const position = new THREE.Vector3();
            position.setFromMatrixPosition(node.matrixWorld);
            selectedPositions.push(position);
          } else {
            // Ocultar nodos que no coinciden con ningún directShapeId
            node.visible = false;
          }
        }
      }
    });

    // Calcular el centro de las habitaciones seleccionadas (si es necesario)
    if (selectedPositions.length > 0) {
      const center = selectedPositions
        .reduce((acc, pos) => acc.add(pos), new THREE.Vector3())
        .divideScalar(selectedPositions.length);
      console.log("Centro de las habitaciones seleccionadas:", center);
    }
  }

  function getDirectShapeIdsByExternalIds(inputArray) {
    // Array para almacenar los resultados finales
    const result = [];

    // Recorrer el array de objetos de entrada
    for (const item of inputArray) {
      const { externalIds, status } = item;

      // Array para almacenar los _OOD_DirectShapeId encontrados para este grupo de externalIds
      const directShapeIds = [];

      // Recorrer el objeto principal (jsonData.rooms)
      for (const key in jsonData.rooms) {
        if (jsonData.rooms.hasOwnProperty(key)) {
          const room = jsonData.rooms[key];

          // Verificar si el _OOD_ExternalId está en el array de externalIds
          if (externalIds.includes(room._OOD_ExternalId)) {
            // Agregar el _OOD_DirectShapeId al array de resultados
            directShapeIds.push(room._OOD_DirectShapeId.toString());
          }
        }
      }

      // Agregar el objeto con los directShapeIds y el status al resultado final
      result.push({
        directShapeIds,
        status,
      });
    }

    return result;
  }

  useEffect(() => {
    if (!jsonData) return;
    if (!externalIds) return restoreOriginalState();
    if (externalIds.length === 0) return restoreOriginalState();
    const directShapeIds = getDirectShapeIdsByExternalIds(externalIds);
    selectRoom(directShapeIds);
  }, [externalIds]);

  useEffect(() => {
    if (!cuttingActive) {
      removePlane();
    }
  }, [cuttingActive]);

  useEffect(() => {
    if (!level) return;
    if (level === "none") {
      setCutLevel("none");
    } else {
      setCutLevel(parseInt(level));
    }
  }, [level]);

  function setCutLevel(y) {
    // Verificar que el modelo esté cargado
    if (!modelRef.current) return;

    // Guardar estado actual de los materiales antes de modificarlos
    const is2DMode = isTopViewRef.current;

    if (y === "none") {
      // Eliminar todos los planos de recorte
      modelMaterialsRef.current.forEach((material) => {
        material.clippingPlanes = [];
        material.needsUpdate = true;
      });

      // Eliminar el modelo clonado si existe
      if (modelCloneRef.current) {
        sceneRef.current.remove(modelCloneRef.current);
      }

      // Establecer la constante del plano de recorte a 0 para indicar que no hay recorte activo
      clipPlaneRef.current.constant = 0;

      // Si está en vista 2D, actualizar la posición de la cámara
      if (is2DMode) {
        const boundingBox = new THREE.Box3().setFromObject(modelRef.current);
        const center = boundingBox.getCenter(new THREE.Vector3());
        const size = boundingBox.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.z) * 1.2;

        moveCamera({
          x: center.x,
          y: center.y + maxDim * 0.75,
          z: center.z,
        });

        controlsRef.current.target.set(center.x, center.y, center.z);
      } else {
        // Mover a la posición de cámara 3D predeterminada si no está en modo 2D
        moveCamera({ x: -17, y: 26, z: 16 });
      }

      // Volver a aplicar el estilo blanco y negro si está en modo 2D
      if (is2DMode) {
        // Pequeño retraso para asegurar que los materiales se actualicen después de eliminar los recortes
        setTimeout(() => {
          applyBlackAndWhiteStyling();
        }, 50);
      }

      return;
    }

    // Añadir 2 al valor y como en la función original
    y = y + 2;

    // Configurar el plano de recorte
    clipPlaneRef.current.set(new THREE.Vector3(0, -1, 0), y);

    // Configurar los planos de relleno según el modo (más grueso en 2D)
    if (is2DMode) {
      // Corte más grueso para vista 2D
      fillUpperClipPlaneRef.current.set(new THREE.Vector3(0, -1, 0), y + 0.3);
      fillLowerClipPlaneRef.current.set(new THREE.Vector3(0, 1, 0), -(y - 0.3));
    } else {
      // Grosor normal para vista 3D
      fillUpperClipPlaneRef.current.set(new THREE.Vector3(0, -1, 0), y + 0.1);
      fillLowerClipPlaneRef.current.set(new THREE.Vector3(0, 1, 0), -(y - 0.1));
    }

    // Añadir el modelo clonado si es necesario
    if (
      modelCloneRef.current &&
      !sceneRef.current.children.includes(modelCloneRef.current)
    ) {
      sceneRef.current.add(modelCloneRef.current);
    }

    // Actualizar materiales con planos de recorte
    modelMaterialsRef.current.forEach((mat) => {
      mat.clippingPlanes = [clipPlaneRef.current];
      mat.clipShadows = true;
      mat.needsUpdate = true;
    });

    // Manejar el posicionamiento de la cámara según el modo de vista actual
    if (is2DMode) {
      // Si está en vista 2D, mover la cámara directamente sobre el nivel de corte
      const boundingBox = new THREE.Box3().setFromObject(modelRef.current);
      const center = boundingBox.getCenter(new THREE.Vector3());
      const size = boundingBox.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.z) * 1.2;

      // Posicionar la cámara sobre el plano de corte
      moveCamera({
        x: center.x,
        y: y + maxDim * 0.5, // Posición relativa al plano de corte
        z: center.z,
      });

      // Establecer el objetivo en el nivel del plano de corte
      controlsRef.current.target.set(center.x, y, center.z);
      controlsRef.current.update();

      // Volver a aplicar el estilo blanco y negro después de un breve retraso
      // Esto asegura que el estilo se aplique después de establecer los planos de recorte
      setTimeout(() => {
        applyBlackAndWhiteStyling();
      }, 50);
    } else {
      // Usar la lógica de posicionamiento 3D original
      moveCamera({ x: -17, y: 26 + y, z: 16 });

      // Si estamos en vista 3D, debemos configurar el material del corte como azul
      if (modelCloneRef.current) {
        const blueFillMaterial = new THREE.MeshStandardMaterial({
          color: 0x1f79db, // Azul para el modelo copiado en vista 3D
          side: 2, // THREE.DoubleSide
          transparent: true,
          opacity: 1,
          clippingPlanes: [
            fillUpperClipPlaneRef.current,
            fillLowerClipPlaneRef.current,
          ],
          clipShadows: true,
          depthWrite: false,
          stencilWrite: true,
          stencilRef: 0,
          stencilFunc: THREE.EqualStencilFunc,
          stencilFail: THREE.KeepStencilOp,
          stencilZFail: THREE.KeepStencilOp,
          stencilZPass: THREE.ReplaceStencilOp,
        });

        modelCloneRef.current.traverse((node) => {
          if (node.isMesh) {
            node.material = blueFillMaterial;
          }
        });
      }
    }
  }

  const toggle2D3DView = () => {
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    const n8aopass = n8aopassRef.current;

    if (!camera || !controls) return;

    // Toggle the state
    setIsTopView(!isTopView);
    isTopViewRef.current = !isTopViewRef.current;

    if (!isTopView) {
      // Switching to 2D view
      setIsTopView(true);
      isTopViewRef.current = true;
      setCutLevel(2);

      // Store current values
      originalAoIntensityRef.current = targetIntensityRef.current;
      originalCameraPositionRef.current = camera.position.clone();
      originalControlsTargetRef.current = controls.target.clone();

      // Higher intensity for better clarity in 2D
      targetIntensityRef.current = 12;
      if (n8aopass) {
        n8aopass.configuration.intensity = 12;
      }

      // Calculate the center and height of your model
      const boundingBox = new THREE.Box3().setFromObject(modelRef.current);
      const center = boundingBox.getCenter(new THREE.Vector3());
      const size = boundingBox.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.z) * 1.2;

      // Get current cut level (if any)
      const currentClipPlane = clipPlaneRef.current;
      let cameraHeight;

      if (currentClipPlane && currentClipPlane.constant !== 0) {
        cameraHeight = currentClipPlane.constant + maxDim * 0.75;
        // Configurar grosor para 2D
        const cutLevel = currentClipPlane.constant;
        fillUpperClipPlaneRef.current.set(
          new THREE.Vector3(0, -1, 0),
          cutLevel + 0.3
        );
        fillLowerClipPlaneRef.current.set(
          new THREE.Vector3(0, 1, 0),
          -(cutLevel - 0.3)
        );
      } else {
        cameraHeight = center.y + maxDim * 0.75;
      }

      // Crear una timeline para la animación en etapas
      const tl = gsap.timeline();

      const elevationHeight = camera.position.y + maxDim * 0.5;
      tl.to(camera.position, {
        duration: 0.7,
        y: elevationHeight,
        ease: "power2.out",
        onUpdate: () => controls.update(),
      });

      // Configurar la cámara y controles para vista 2D
      tl.call(() => {
        // Lock controls to prevent rotation
        controls.enableRotate = false;
        controls.minPolarAngle = 0;
        controls.maxPolarAngle = 0;

        // Update camera up vector to ensure correct orientation
        camera.up.set(0, 0, -1);
        camera.lookAt(center);
        camera.updateProjectionMatrix();
        controls.update();

        // Apply black and white floor plan styling
        applyBlackAndWhiteStyling();
      });
    } else {
      // Switching back to 3D view
      setCutLevel("none");
      // Restore original N8AO intensity
      if (originalAoIntensityRef.current !== undefined) {
        targetIntensityRef.current = originalAoIntensityRef.current;

        // Also apply directly for immediate effect
        if (n8aopass) {
          n8aopass.configuration.intensity = originalAoIntensityRef.current;
        }
      }

      if (
        originalCameraPositionRef.current &&
        originalControlsTargetRef.current
      ) {
        // Restore original camera position and controls target
        gsap.to(camera.position, {
          duration: 1,
          x: originalCameraPositionRef.current.x,
          y: originalCameraPositionRef.current.y,
          z: originalCameraPositionRef.current.z,
          ease: "power2.inOut",
          onUpdate: () => controls.update(),
        });

        gsap.to(controls.target, {
          duration: 1,
          x: originalControlsTargetRef.current.x,
          y: originalControlsTargetRef.current.y,
          z: originalControlsTargetRef.current.z,
          ease: "power2.inOut",
          onUpdate: () => controls.update(),
        });
      }

      // Re-enable orbit controls
      controls.enableRotate = true;
      controls.minPolarAngle = 0;
      controls.maxPolarAngle = Math.PI; // Allow full rotation

      // Reset camera orientation
      camera.up.set(0, 1, 0);
      camera.updateProjectionMatrix();
      controls.update();

      // Restore original materials
      restoreOriginalMaterials();

      // Si hay un corte activo, restauramos el material azul y el grosor normal
      if (clipPlaneRef.current && clipPlaneRef.current.constant !== 0) {
        // Restaurar el grosor normal del corte
        const cutLevel = clipPlaneRef.current.constant;
        fillUpperClipPlaneRef.current.set(
          new THREE.Vector3(0, -1, 0),
          cutLevel + 0.1
        );
        fillLowerClipPlaneRef.current.set(
          new THREE.Vector3(0, 1, 0),
          -(cutLevel - 0.1)
        );

        // Restaurar el color azul al modelo clonado
        if (modelCloneRef.current) {
          const blueFillMaterial = new THREE.MeshStandardMaterial({
            color: 0x1f79db, // Azul para el modelo copiado en vista 3D
            side: 2, // THREE.DoubleSide
            transparent: true,
            opacity: 1,
            clippingPlanes: [
              fillUpperClipPlaneRef.current,
              fillLowerClipPlaneRef.current,
            ],
            clipShadows: true,
            depthWrite: false,
            stencilWrite: true,
            stencilRef: 0,
            stencilFunc: THREE.EqualStencilFunc,
            stencilFail: THREE.KeepStencilOp,
            stencilZFail: THREE.KeepStencilOp,
            stencilZPass: THREE.ReplaceStencilOp,
          });

          modelCloneRef.current.traverse((node) => {
            if (node.isMesh) {
              node.material = blueFillMaterial;
            }
          });
        }
      }
    }
  };

  const applyBlackAndWhiteStyling = () => {
    const model = modelRef.current;
    const modelClone = modelCloneRef.current;
    if (!model) return;

    // Obtener planos de recorte actuales
    const currentClippingPlanes = [];

    // Añadir el plano de recorte actual si está activo
    if (clipPlaneRef.current && clipPlaneRef.current.constant !== 0) {
      currentClippingPlanes.push(clipPlaneRef.current);
    }

    // Crear materiales con los planos de recorte actuales
    const structureMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff, // Blanco para la estructura (mesh[0])
      side: THREE.DoubleSide,
      clippingPlanes: currentClippingPlanes,
      clipShadows: true,
    });

    const furnitureMaterial = new THREE.MeshBasicMaterial({
      color: 0xaaaaaa, // Gris claro para muebles (mesh[1])
      side: THREE.DoubleSide,
      clippingPlanes: currentClippingPlanes,
      clipShadows: true,
    });

    // Aplicar materiales basados en la estructura del modelo
    // Asumiendo que model.children[0] es la estructura y model.children[1] son los muebles
    if (model.children && model.children.length > 0) {
      // Aplicar material blanco a la estructura (mesh[0])
      if (model.children[0]) {
        model.children[0].traverse((node) => {
          if (node.isMesh) {
            // Guardar material original si aún no se ha guardado
            if (!originalMaterialsMapRef.current.has(node.uuid)) {
              originalMaterialsMapRef.current.set(node.uuid, node.material);
            }
            node.material = structureMaterial.clone();
          }
        });
      }

      // Aplicar material gris claro a los muebles (mesh[1])
      if (model.children.length > 1 && model.children[1]) {
        model.children[1].traverse((node) => {
          if (node.isMesh) {
            // Guardar material original si aún no se ha guardado
            if (!originalMaterialsMapRef.current.has(node.uuid)) {
              originalMaterialsMapRef.current.set(node.uuid, node.material);
            }
            node.material = furnitureMaterial.clone();
          }
        });
      }
    } else {
      // Alternativa si la estructura no está organizada en children[0] y children[1]
      console.warn(
        "La estructura del modelo no coincide con lo esperado. Aplicando estilos alternativos."
      );

      // Aplicar a todos los meshes
      model.traverse((node) => {
        if (node.isMesh) {
          // Guardar material original
          if (!originalMaterialsMapRef.current.has(node.uuid)) {
            originalMaterialsMapRef.current.set(node.uuid, node.material);
          }

          // Por defecto, usar el material de estructura
          node.material = structureMaterial.clone();
        }
      });
    }

    // Cambiar el color del modelo copiado a negro en vista 2D
    if (modelClone) {
      // Crear material negro para el modelo copiado
      const fillMaterial = new THREE.MeshStandardMaterial({
        color: 0x000000, // Negro para el modelo copiado en vista 2D
        side: 2, // THREE.DoubleSide
        transparent: true,
        opacity: 1,
        clippingPlanes: [
          fillUpperClipPlaneRef.current,
          fillLowerClipPlaneRef.current,
        ],
        clipShadows: true,
        depthWrite: false,
        stencilWrite: true,
        stencilRef: 0,
        stencilFunc: THREE.EqualStencilFunc,
        stencilFail: THREE.KeepStencilOp,
        stencilZFail: THREE.KeepStencilOp,
        stencilZPass: THREE.ReplaceStencilOp,
      });

      modelClone.traverse((node) => {
        if (node.isMesh) {
          node.material = fillMaterial;
        }
      });
    }
  };

  const restoreOriginalMaterials = () => {
    const model = modelRef.current;
    if (!model) return;

    model.traverse((node) => {
      if (node.isMesh && originalMaterialsMapRef.current.has(node.uuid)) {
        node.material = originalMaterialsMapRef.current.get(node.uuid);
      }
    });
  };

  function hideEnt(event) {
    const newState = event.target.checked;
    setIsVisible(newState);
    if (entModelRef.current) {
      entModelRef.current.traverse((node) => {
        if (node.isMesh) {
          node.visible = newState;
        }
      });
    }
  }

  function displayMEPs(modelName) {
    // Primero, hacer transparente el modelo principal
    if (modelRef.current) {
      modelRef.current.traverse((node) => {
        if (node.isMesh) {
          node.material = darkerTransparentGrayMaterial;
          node.castShadow = false;
          node.receiveShadow = false;
        }
      });
    }

    // Remover todos los modelos existentes de la escena, excepto ent
    const models = {
      arc: arcModelRef.current,
      mep: mepModelRef.current,
      str: strModelRef.current,
    };

    // Primero removemos los modelos (excepto ent)
    Object.values(models).forEach((model) => {
      if (model && sceneRef.current.children.includes(model)) {
        sceneRef.current.remove(model);
      }
    });

    // Luego añadimos solo el modelo seleccionado
    if (modelName !== "default" && models[modelName]) {
      sceneRef.current.add(models[modelName]);
    } else if (modelName !== "ent") {
      // Solo restauramos si no es 'ent'
      restoreOriginalState();
    }
  }

  return (
    <div
      style={{
        backgroundColor: `${backgroundColor}`,
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      <section
        ref={visorRef}
        style={{
          filter: "saturate(3) contrast(1.2)",
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
          left: "46%",
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
              <MenuButton onClick={() => moveCamera({ x: 0, y: 70, z: 0 })}>
                Arriba
              </MenuButton>
              <MenuButton onClick={() => moveCamera({ x: -70, y: 0, z: 0 })}>
                Izquierda
              </MenuButton>
              <MenuButton onClick={() => moveCamera({ x: 0, y: -70, z: 0 })}>
                Abajo
              </MenuButton>
              <MenuButton onClick={() => moveCamera({ x: 70, y: 0, z: 0 })}>
                Derecha
              </MenuButton>
              <MenuButton onClick={() => moveCamera({ x: 0, y: 0, z: 70 })}>
                Frente
              </MenuButton>
              <MenuButton onClick={() => moveCamera({ x: 0, y: 0, z: -70 })}>
                Detras
              </MenuButton>
            </div>
          )}
          <Button onClick={toggle2D3DView}>{isTopView ? "2D" : "3D"}</Button>
        </div>
      </nav>
    </div>
  );
};

export default Visor;
