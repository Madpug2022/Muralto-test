import { useRef, useEffect } from "react";
import { useThree, addEffect } from "@react-three/fiber";
import * as THREE from "three";
import CSM from "three-csm";

export function Csm({
  children,
  maxFar = 250,
  shadowBias = 0,
  lightNear = 1,
  lightFar = 5000,
  cascades = 3,
  shadowMapSize = 2048,
  lightDirection = [1, -1, 1],
  ...props
}) {
  const ref = useRef();
  const { scene: parent, camera } = useThree();

  useEffect(() => {
    const impl = new CSM({
      camera,
      parent,
      maxFar,
      cascades,
      shadowMapSize,
      lightFar,
      lightNear,
      shadowBias,
      lightDirection: new THREE.Vector3(...lightDirection).normalize(),
    });

    ref.current.traverse((obj) => {
      if (obj.material) impl.setupMaterial(obj.material);
    });

    const unsub = addEffect(() => {
      impl.update(camera.matrix);
    });

    return () => {
      unsub();
      impl.dispose();
    };
  }, [
    camera,
    parent,
    maxFar,
    cascades,
    shadowMapSize,
    lightFar,
    lightNear,
    shadowBias,
    ...lightDirection,
  ]);

  return (
    <group ref={ref} {...props}>
      {children}
    </group>
  );
}
