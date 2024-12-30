import goyaModelUrl from "../../assets/Goya/goya.glb";
import { CgMaximize } from "react-icons/cg";
import { IoCubeOutline } from "react-icons/io5";
import { MdOutlineSwitchCamera } from "react-icons/md";

import { Canvas } from "@react-three/fiber";
import {
  Environment,
  PerspectiveCamera,
  OrbitControls,
  Preload,
  useGLTF,
  SoftShadows,
  Stage,
  CameraControls,
} from "@react-three/drei";
import { useRef, Suspense, useState, useEffect } from "react";
import { Color } from "three";
import * as THREE from "three";
import Button from "../ui/Button";
import { useControls, folder } from "leva";
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Vignette,
  ChromaticAberration,
  ToneMapping,
  SSAO,
} from "@react-three/postprocessing";

const ModelBase = ({ modelRef }) => {
  const model = useGLTF(goyaModelUrl);
  const directionalLightRef = useRef();

  const {
    ambientlightOn,
    direcionalLightOn,
    hemisphereLightOn,
    pointLightOn,
    ambientLightIntensity,
    directionalLightIntensity,
    directionalLightPosition,
    directionalLightMapSize,
    directionalLightBias,
    directionalLightNormalBias,
    directionalLightRadius,
    hemisphereLightIntensity,
    hemisphereLightGroundColor,
    hemisphereLightSkyColor,
    pointLightIntensity,
    pointLightDistance,
    pointLightDecay,
    pointLightPosition,
  } = useControls({
    "Ambient Light": folder({
      ambientlightOn: {
        value: true,
      },
      ambientLightIntensity: {
        value: 0.5,
        min: 0,
        max: 20,
        step: 0.1,
        label: "Intensity",
      },
    }),
    "Directional Light": folder({
      direcionalLightOn: {
        value: true,
      },
      directionalLightIntensity: {
        value: 0.5,
        min: 0,
        max: 20,
        step: 0.1,
        label: "Intensity",
      },
      directionalLightPosition: {
        value: [10, 25, 20],
        step: 1,
        joystick: "invertY",
        label: "Position",
      },
      directionalLightMapSize: {
        value: 4096,
        min: 512,
        max: 8192,
        step: 512,
        label: "Shadow Map Size",
      },
      directionalLightBias: {
        value: -0.0001,
        min: -0.01,
        max: 0.01,
        step: 0.0001,
        label: "Shadow Bias",
      },
      directionalLightNormalBias: {
        value: 0.02,
        min: 0,
        max: 0.1,
        step: 0.01,
        label: "Shadow Normal Bias",
      },
      directionalLightRadius: {
        value: 7,
        min: 0,
        max: 20,
        step: 0.5,
        label: "Shadow Radius",
      },
    }),
    "Hemisphere Light": folder({
      hemisphereLightOn: {
        value: true,
      },
      hemisphereLightIntensity: {
        value: 0.3,
        min: 0,
        max: 1,
        step: 0.1,
        label: "Intensity",
      },
      hemisphereLightGroundColor: {
        value: "#080820",
        label: "Ground Color",
      },
      hemisphereLightSkyColor: {
        value: "#ffffff",
        label: "Sky Color",
      },
    }),
    "Point Light": folder({
      pointLightOn: {
        value: true,
      },
      pointLightIntensity: {
        value: 0.5,
        min: 0,
        max: 20,
        step: 0.1,
        label: "Intensity",
      },
      pointLightDistance: {
        value: 10,
        min: 0,
        max: 20,
        step: 1,
        label: "Distance",
      },
      pointLightDecay: {
        value: 2,
        min: 1,
        max: 5,
        step: 1,
        label: "Decay",
      },
      pointLightPosition: {
        value: [0, 10, 0],
        step: 1,
        joystick: "invertY",
        label: "Position",
      },
    }),
  });

  model.scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return (
    <>
      {ambientlightOn && <ambientLight intensity={ambientLightIntensity} />}

      {direcionalLightOn && (
        <directionalLight
          ref={directionalLightRef}
          position={directionalLightPosition}
          intensity={directionalLightIntensity}
          castShadow
          shadow-mapSize={[directionalLightMapSize, directionalLightMapSize]}
          shadow-bias={directionalLightBias}
          shadow-normalBias={directionalLightNormalBias}
          shadow-radius={directionalLightRadius}
        >
          <orthographicCamera
            attach="shadow-camera"
            args={[-15, 15, -15, 15, 0.1, 50]}
          />
        </directionalLight>
      )}

      {hemisphereLightOn && (
        <hemisphereLight
          intensity={hemisphereLightIntensity}
          groundColor={new Color(hemisphereLightGroundColor)}
          color={new Color(hemisphereLightSkyColor)}
        />
      )}

      {pointLightOn && (
        <pointLight
          position={pointLightPosition}
          intensity={pointLightIntensity}
          color="#ffffff"
          distance={pointLightDistance}
          decay={pointLightDecay}
          castShadow
        />
      )}

      <mesh ref={modelRef} castShadow receiveShadow>
        <primitive object={model.scene} />
      </mesh>
    </>
  );
};

const Visor = () => {
  const orbitControlsRef = useRef();
  const cameraControlRef = useRef();
  const modelRef = useRef();
  const [cameraModal, setCameraModal] = useState(false);
  const [showBBox, setShowBBox] = useState(false);

  const {
    stageIntensity,
    stageShadowOpacity,
    stageShadowBlur,
    stageEnvironment,
    enableBloom,
    enableDOF,
    enableChromatic,
    enableVignette,
    enableToneMapping,
    bloomIntensity,
    bloomRadius,
    dofFocusDistance,
    dofFocalLength,
    dofBokehScale,
    vignetteIntensity,
    vignetteDarkness,
    enableAO,
    aoIntensity,
    aoRadius,
    aoLumInfluence,
  } = useControls({
    "Post Processing": folder({
      "Effects Toggle": folder({
        enableBloom: {
          value: false,
          label: "Bloom",
        },
        enableDOF: {
          value: false,
          label: "Depth of Field",
        },
        enableChromatic: {
          value: false,
          label: "Chromatic Aberration",
        },
        enableVignette: {
          value: false,
          label: "Vignette",
        },
        enableToneMapping: {
          value: false,
          label: "Tone Mapping",
        },
        enableAO: {
          value: false,
          label: "Ambient Occlusion",
        },
      }),
      Bloom: folder({
        bloomIntensity: {
          value: 1,
          min: 0,
          max: 3,
          step: 0.1,
          label: "Intensity",
        },
        bloomRadius: {
          value: 0.4,
          min: 0,
          max: 1,
          step: 0.1,
          label: "Radius",
        },
      }),
      "Ambient Occlusion": folder({
        aoIntensity: {
          value: 1.5,
          min: 0,
          max: 3,
          step: 0.1,
          label: "Intensity",
        },
        aoRadius: {
          value: 2,
          min: 0.1,
          max: 10,
          step: 0.1,
          label: "Radius",
        },
        aoLumInfluence: {
          value: 0.7,
          min: 0,
          max: 1,
          step: 0.1,
          label: "Luminance Influence",
        },
      }),
      "Depth of Field": folder({
        dofFocusDistance: {
          value: 0,
          min: 0,
          max: 20,
          step: 0.1,
          label: "Focus Distance",
        },
        dofFocalLength: {
          value: 0.1,
          min: 0,
          max: 1,
          step: 0.01,
          label: "Focal Length",
        },
        dofBokehScale: {
          value: 2,
          min: 0,
          max: 10,
          step: 0.1,
          label: "Bokeh Scale",
        },
      }),
      Vignette: folder({
        vignetteIntensity: {
          value: 0.5,
          min: 0,
          max: 1,
          step: 0.1,
          label: "Intensity",
        },
        vignetteDarkness: {
          value: 0.5,
          min: 0,
          max: 1,
          step: 0.1,
          label: "Darkness",
        },
      }),
    }),
  });

  const BoundingBox = () => {
    useEffect(() => {
      if (modelRef.current) {
        const box = new THREE.Box3().setFromObject(modelRef.current);
        const helper = new THREE.Box3Helper(box, 0x000000);
        modelRef.current.parent.add(helper);

        return () => {
          modelRef.current?.parent.remove(helper);
        };
      }
    }, [modelRef.current]);

    return null;
  };

  const resetCameraPosition = () => {
    if (modelRef.current) {
      const box = new THREE.Box3().setFromObject(modelRef.current);

      if (box.min.x !== Infinity) {
        cameraControlRef.current?.setLookAt(30, 20, 30, 0, 3, 0, true);
      }
    }
  };

  const setCameraPosition = (position) => {
    switch (position) {
      case "top":
        cameraControlRef.current?.setLookAt(0, 45, 0, 0, 0, 0, true);
        break;
      case "left":
        cameraControlRef.current?.setLookAt(-45, 3, 0, 0, 3, 0, true);
        break;
      case "right":
        cameraControlRef.current?.setLookAt(45, 3, 0, 0, 3, 0, true);
        break;
      case "front":
        cameraControlRef.current?.setLookAt(0, 3, 45, 0, 3, 0, true);
        break;
      case "back":
        cameraControlRef.current?.setLookAt(0, 3, -45, 0, 3, 0, true);
        break;
      default:
        break;
    }
  };

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      <Canvas
        shadows={{
          enabled: true,
          type: THREE.PCFSoftShadowMap,
        }}
        style={{ background: "#ffffff" }}
      >
        <EffectComposer enableNormalPass={enableAO}>
          {enableAO && (
            <SSAO
              intensity={aoIntensity}
              radius={aoRadius}
              luminanceInfluence={aoLumInfluence}
            />
          )}
          {enableBloom && (
            <Bloom intensity={bloomIntensity} radius={bloomRadius} />
          )}
          {enableDOF && (
            <DepthOfField
              focusDistance={dofFocusDistance}
              focalLength={dofFocalLength}
              bokehScale={dofBokehScale}
            />
          )}
          {enableChromatic && <ChromaticAberration />}
          {enableVignette && (
            <Vignette
              intensity={vignetteIntensity}
              darkness={vignetteDarkness}
            />
          )}
          {enableToneMapping && <ToneMapping />}
        </EffectComposer>
        <CameraControls ref={cameraControlRef} />

        <SoftShadows size={25} samples={16} focus={0.5} rings={11} />

        <PerspectiveCamera makeDefault position={[30, 20, 30]} />

        <OrbitControls
          ref={orbitControlsRef}
          target={[0, 3, 0]}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 1.8}
        />

        <Suspense fallback={null}>
          <ModelBase modelRef={modelRef} orbitControlsRef={orbitControlsRef} />
          {showBBox && <BoundingBox />}

          <Environment preset="studio" background={false} />
        </Suspense>

        <Preload all />
      </Canvas>
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          position: "absolute",
          bottom: "1rem",
          left: "50%",
          padding: "0.5rem",
          background: "#f9f9f9",
          borderRadius: "15px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Button onClick={() => resetCameraPosition()}>
          <CgMaximize
            style={{
              color: "black",
              width: "100%",
              height: "100%",
            }}
          />
        </Button>
        <Button onClick={() => setShowBBox(!showBBox)}>
          <IoCubeOutline
            style={{
              color: "black",
              width: "100%",
              height: "100%",
            }}
          />
        </Button>
        <div style={{ position: "relative" }}>
          <Button onClick={() => setCameraModal(!cameraModal)}>
            <MdOutlineSwitchCamera
              style={{
                color: "black",
                width: "100%",
                height: "100%",
              }}
            />
          </Button>
          {cameraModal && (
            <div
              style={{
                display: "flex",
                gap: "0.2rem",
                flexDirection: "column",
                position: "absolute",
                top: "-11rem",
                left: "50%",
                transform: "translateX(-50%)",
                background: "#f9f9f9",
                padding: "0.5rem",
                borderRadius: "15px",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                fontSize: "10px",
                color: "black",
              }}
            >
              <button onClick={() => setCameraPosition("top")}>Top</button>
              <button onClick={() => setCameraPosition("left")}>Left</button>
              <button onClick={() => setCameraPosition("right")}>Right</button>
              <button onClick={() => setCameraPosition("front")}>Front</button>
              <button onClick={() => setCameraPosition("back")}>Back</button>
            </div>
          )}
        </div>
      </nav>
    </section>
  );
};

export default Visor;
