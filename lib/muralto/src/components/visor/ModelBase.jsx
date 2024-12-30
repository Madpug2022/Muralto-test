import { useGLTF } from "@react-three/drei";
import goyaModelUrl from "./assets/Goya/goya.glb";
import {
  Environment,
  PerspectiveCamera,
  OrbitControls,
  Preload,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";

const ClippingPlane = ({ orbitControlsRef }) => {
  const planeRef = useRef();
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState([0, 0, 0]);

  // Crear el plano visual (para referencia)
  const planeGeometry = new THREE.PlaneGeometry(20, 20);
  const planeMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    transparent: true,
    opacity: 0.2,
    side: THREE.DoubleSide,
  });

  useFrame(() => {
    if (planeRef.current) {
      // Actualizar el plano de corte con la posición actual
      const worldPosition = new THREE.Vector3();
      planeRef.current.getWorldPosition(worldPosition);
      const worldNormal = new THREE.Vector3(0, 0, 1);
      worldNormal.applyQuaternion(planeRef.current.quaternion);

      // Actualizar el plano de corte
      if (planeRef.current.parent) {
        planeRef.current.parent.traverse((child) => {
          if (child.isMesh && child.material.clippingPlanes) {
            child.material.clippingPlanes[0].setFromNormalAndCoplanarPoint(
              worldNormal,
              worldPosition
            );
          }
        });
      }
    }
  });

  const handlePointerDown = (e) => {
    e.stopPropagation();
    setIsDragging(true);
    // Desactivar OrbitControls
    if (orbitControlsRef.current) {
      orbitControlsRef.current.enabled = false;
    }
  };

  const handlePointerUp = (e) => {
    if (e) e.stopPropagation();
    setIsDragging(false);
    // Reactivar OrbitControls
    if (orbitControlsRef.current) {
      orbitControlsRef.current.enabled = true;
    }
  };

  const handlePointerMove = (e) => {
    if (isDragging) {
      e.stopPropagation();
      const newPosition = [...position];
      newPosition[0] += e.movementX * 0.01;
      newPosition[2] += e.movementY * 0.01;
      setPosition(newPosition);
    }
  };

  // Asegurarse de reactivar los controles si el componente se desmonta mientras arrastra
  useEffect(() => {
    const handleGlobalPointerUp = () => {
      if (isDragging) {
        handlePointerUp();
      }
    };

    window.addEventListener("pointerup", handleGlobalPointerUp);
    return () => {
      window.removeEventListener("pointerup", handleGlobalPointerUp);
      if (orbitControlsRef.current) {
        orbitControlsRef.current.enabled = true;
      }
    };
  }, [isDragging]);

  return (
    <mesh
      ref={planeRef}
      position={position}
      geometry={planeGeometry}
      material={planeMaterial}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerUp}
    />
  );
};

const ModelBase = ({ orbitControlsRef }) => {
  const model = useGLTF(goyaModelUrl);
  const [clippingPlane] = useState(
    new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
  );

  // Configurar el material para usar clipping
  useEffect(() => {
    model.scene.traverse((child) => {
      if (child.isMesh) {
        child.material = child.material.clone(); // Clonar el material para evitar compartirlo
        child.material.clippingPlanes = [clippingPlane];
        child.material.clipShadows = true;
        child.material.needsUpdate = true;
      }
    });
  }, [model]);

  return (
    <mesh>
      <ambientLight intensity={3} color={0xe6e7e4} />
      <directionalLight
        intensity={0.75}
        color={0xf9f9f9}
        position={[10, 50, 10]}
      />
      <PerspectiveCamera makeDefault position={[15, 10, 15]} />
      <Environment background>
        <color attach="background" args={[0x334551]} />
      </Environment>
      <primitive object={model.scene} />
      <ClippingPlane orbitControlsRef={orbitControlsRef} />
    </mesh>
  );
};

const Visor = () => {
  const orbitControlsRef = useRef();

  return (
    <Canvas
      frameloop="demand"
      shadows
      gl={{
        localClippingEnabled: true,
      }}
    >
      <OrbitControls ref={orbitControlsRef} />
      <ModelBase orbitControlsRef={orbitControlsRef} />
      <Preload all />
    </Canvas>
  );
};

export default Visor;
