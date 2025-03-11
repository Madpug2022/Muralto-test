import { useRef, useEffect, useState, useCallback } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { FXAAShader } from "three/addons/shaders/FXAAShader.js";
import { N8AOPass } from "n8ao";
import { gsap } from "gsap";
import { CustomOutlinePass } from "./CustomOutlinePass";

const Visor2D = ({
  modelUrl,
  backgroundColor = "#DAE7F2",
  level,
  width = "100%",
  height = "100%",
}) => {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const composerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const animationFrameRef = useRef(null);
  const modelRef = useRef(null);
  const modelCloneRef = useRef(null);
  const n8aoPassRef = useRef(null);
  const originalMaterialsMapRef = useRef(new Map());
  const outlinePassRef = useRef(null);
  const modelMaterialsRef = useRef([]);
  const targetIntensityRef = useRef(12); // Default higher intensity for 2D view

  // Line drawing state references
  const isDrawingRef = useRef(false);
  const pointsRef = useRef([]);
  const lineRef = useRef(null);
  const markersRef = useRef([]);

  // Clipping planes for cut level functionality
  const clipPlaneRef = useRef(new THREE.Plane(new THREE.Vector3(0, -1, 0), 0));
  const fillUpperClipPlaneRef = useRef(
    new THREE.Plane(new THREE.Vector3(0, -1, 0), 0)
  );
  const fillLowerClipPlaneRef = useRef(
    new THREE.Plane(new THREE.Vector3(0, 1, 0), 0)
  );

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // For camera movement tracking and N8AO quality adjustments
  const previousCameraPositionRef = useRef(new THREE.Vector3());
  const previousCameraRotationRef = useRef(new THREE.Euler());
  const isCameraMovingRef = useRef(false);

  // For lerping N8AO values
  const currentDenoiseSamplesRef = useRef(2);
  const currentDenoiseRadiusRef = useRef(1);
  const currentIntensityRef = useRef(12);
  const targetDenoiseSamplesRef = useRef(2);
  const targetDenoiseRadiusRef = useRef(1);

  const animate = useCallback(() => {
    if (!composerRef.current || !sceneRef.current || !cameraRef.current) return;

    animationFrameRef.current = requestAnimationFrame(animate);

    // Update camera movement detection
    updateCameraMovement();

    // Set N8AO target values based on camera movement
    setN8AOTargetValues();

    // Update N8AO parameters with lerping
    updateN8AOParameters();

    // Update controls
    if (controlsRef.current) {
      controlsRef.current.update();
    }

    // Render with composer instead of renderer directly
    composerRef.current.render();
  }, []);

  const updateCameraMovement = () => {
    if (!cameraRef.current) return;

    const camera = cameraRef.current;
    const positionThreshold = 0.01;
    const rotationThreshold = 0.01;

    const positionDelta = camera.position.distanceTo(
      previousCameraPositionRef.current
    );
    const rotationDelta =
      Math.abs(camera.rotation.x - previousCameraRotationRef.current.x) +
      Math.abs(camera.rotation.y - previousCameraRotationRef.current.y) +
      Math.abs(camera.rotation.z - previousCameraRotationRef.current.z);

    // Update moving state
    isCameraMovingRef.current =
      positionDelta > positionThreshold || rotationDelta > rotationThreshold;

    // Store current values for next frame
    previousCameraPositionRef.current.copy(camera.position);
    previousCameraRotationRef.current.copy(camera.rotation);
  };

  const setN8AOTargetValues = () => {
    if (isCameraMovingRef.current) {
      // Lower quality during movement
      targetDenoiseSamplesRef.current = 8;
      targetDenoiseRadiusRef.current = 12;
      targetIntensityRef.current = 6; // Still keep higher intensity in 2D view
    } else {
      // Higher quality when static
      targetDenoiseSamplesRef.current = 2;
      targetDenoiseRadiusRef.current = 1;
      targetIntensityRef.current = 12;
    }
  };

  const updateN8AOParameters = () => {
    if (!n8aoPassRef.current) return;

    const n8aoPass = n8aoPassRef.current;
    const lerpFactor = 0.05;

    // Lerp denoise samples
    currentDenoiseSamplesRef.current = THREE.MathUtils.lerp(
      currentDenoiseSamplesRef.current,
      targetDenoiseSamplesRef.current,
      lerpFactor
    );

    // Lerp denoise radius
    currentDenoiseRadiusRef.current = THREE.MathUtils.lerp(
      currentDenoiseRadiusRef.current,
      targetDenoiseRadiusRef.current,
      lerpFactor
    );

    // Lerp intensity
    currentIntensityRef.current = THREE.MathUtils.lerp(
      currentIntensityRef.current,
      targetIntensityRef.current,
      lerpFactor
    );

    // Apply rounded values to n8aoPass configuration
    n8aoPass.configuration.denoiseSamples = Math.round(
      currentDenoiseSamplesRef.current
    );
    n8aoPass.configuration.denoiseRadius = Math.round(
      currentDenoiseRadiusRef.current
    );
    n8aoPass.configuration.intensity = currentIntensityRef.current;
  };

  const handleResize = useCallback(() => {
    if (
      !containerRef.current ||
      !rendererRef.current ||
      !cameraRef.current ||
      !composerRef.current
    )
      return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const width = Math.max(rect.width, 1);
    const height = Math.max(rect.height, 1);

    if (outlinePassRef.current) {
      outlinePassRef.current.setSize(width, height);
    }

    // Update camera based on type
    const camera = cameraRef.current;
    if (camera.isPerspectiveCamera) {
      camera.aspect = width / height;
    } else if (camera.isOrthographicCamera) {
      const currentSize = camera.top;
      camera.left = (-currentSize * width) / height;
      camera.right = (currentSize * width) / height;
    }
    camera.updateProjectionMatrix();

    // Update renderer and composer
    rendererRef.current.setSize(width, height);
    composerRef.current.setSize(width, height);

    // Update FXAA pass if it exists
    composerRef.current.passes.forEach((pass) => {
      if (
        pass.material &&
        pass.material.uniforms &&
        pass.material.uniforms.resolution
      ) {
        const pixelRatio = rendererRef.current.getPixelRatio();
        pass.material.uniforms.resolution.value.x = 1 / (width * pixelRatio);
        pass.material.uniforms.resolution.value.y = 1 / (height * pixelRatio);
      }
    });

    // Update N8AO pass size
    if (n8aoPassRef.current) {
      n8aoPassRef.current.setSize(width, height);
    }
  }, []);

  function storeOriginalMaterials(model) {
    model.traverse((node) => {
      if (node.isMesh) {
        originalMaterialsMapRef.current.set(node.uuid, node.material);

        // Also store materials in array for easy access
        const materials = Array.isArray(node.material)
          ? node.material
          : [node.material];
        materials.forEach((material) => {
          modelMaterialsRef.current.push(material);
        });
      }
    });
  }

  // Helper function to create a marker point at a specific position
  const createMarker = useCallback((position) => {
    if (!sceneRef.current) return null;

    // Create a small sphere as a marker
    const geometry = new THREE.SphereGeometry(0.2, 16, 16);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Red marker
    const marker = new THREE.Mesh(geometry, material);

    // Set position
    marker.position.copy(position);

    // Add to scene
    sceneRef.current.add(marker);

    return marker;
  }, []);

  // Function to create a line between two points
  const createLine = useCallback((point1, point2) => {
    if (!sceneRef.current) return null;

    // Create geometry with the two points
    const geometry = new THREE.BufferGeometry().setFromPoints([point1, point2]);

    // Create a thicker blue line material
    const material = new THREE.LineBasicMaterial({
      color: 0x0000ff,
      linewidth: 5, // Increased thickness (note: linewidth may not work in WebGL)
    });

    // Create the line
    const line = new THREE.Line(geometry, material);

    // Calculate distance in cm (assuming model units are in meters)
    const distance = point1.distanceTo(point2) * 100; // Convert to cm
    const formattedDistance = distance.toFixed(1); // One decimal place

    // Create text to display the distance
    // Find midpoint for label placement
    const midPoint = new THREE.Vector3()
      .addVectors(point1, point2)
      .multiplyScalar(0.5);

    // Create a canvas for the text
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = 256;
    canvas.height = 128;

    // Style the text
    context.fillStyle = "#FFFFFF"; // White background with some transparency
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.font = "bold 48px Arial";
    context.fillStyle = "#000000"; // Black text
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(
      `${formattedDistance} cm`,
      canvas.width / 2,
      canvas.height / 2
    );

    // Create texture from canvas
    const texture = new THREE.CanvasTexture(canvas);

    // Create a sprite material using the texture
    const spriteMaterial = new THREE.SpriteMaterial({
      map: texture,
      sizeAttenuation: false, // Makes the sprite maintain consistent size regardless of distance
    });

    // Create the sprite for the text
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.position.copy(midPoint);
    sprite.position.y -= 1; // Position slightly below the line

    // Adjust sprite scale to make it appropriately sized
    sprite.scale.set(0.7, 0.35, 1);

    // Add the sprite to the scene
    sceneRef.current.add(sprite);

    // Create a group to hold both the line and the text sprite
    const group = new THREE.Group();
    group.add(line);
    group.add(sprite);
    sceneRef.current.add(group);

    return group;
  }, []);

  // Function to handle mouse clicks
  const handleMouseClick = useCallback(
    (event) => {
      if (
        !sceneRef.current ||
        !cameraRef.current ||
        !rendererRef.current ||
        !containerRef.current
      )
        return;

      // Don't process clicks when controls are moving the camera
      if (isCameraMovingRef.current) return;

      // Get mouse position in normalized device coordinates
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      // Create a ray from the camera passing through the mouse position
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera({ x, y }, cameraRef.current);

      // Check for intersections with the model
      const intersects = raycaster.intersectObjects(
        sceneRef.current.children,
        true
      );

      // If we hit something
      if (intersects.length > 0) {
        // Get intersection point
        const intersectionPoint = intersects[0].point;

        // If we're not already drawing a line, this is the first point
        if (!isDrawingRef.current) {
          // Clear existing line and markers
          clearLineAndMarkers();

          // Create a marker at the clicked point
          const marker = createMarker(intersectionPoint);
          markersRef.current.push(marker);

          // Store the point
          pointsRef.current.push(intersectionPoint);

          // Now we're in drawing mode
          isDrawingRef.current = true;
        }
        // If we're already drawing, this is the second point
        else {
          // Create a marker at the second clicked point
          const marker = createMarker(intersectionPoint);
          markersRef.current.push(marker);

          // Store the second point
          pointsRef.current.push(intersectionPoint);

          // Create the line between the two points
          const line = createLine(pointsRef.current[0], pointsRef.current[1]);
          lineRef.current = line;

          // Exit drawing mode - line is complete
          isDrawingRef.current = false;
        }
      }
    },
    [createMarker, createLine]
  );

  // Function to clear existing line and markers
  const clearLineAndMarkers = useCallback(() => {
    if (!sceneRef.current) return;

    // Remove existing line group if any
    if (lineRef.current) {
      // If it's a group, we need to dispose all children
      if (lineRef.current.isGroup) {
        lineRef.current.traverse((child) => {
          if (child.geometry) child.geometry.dispose();
          if (child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach((mat) => mat.dispose());
            } else {
              child.material.dispose();
            }
          }

          // If it's a sprite with a texture
          if (child.isSprite && child.material && child.material.map) {
            child.material.map.dispose();
          }
        });
      } else {
        // Handle as before for single objects
        if (lineRef.current.geometry) lineRef.current.geometry.dispose();
        if (lineRef.current.material) {
          if (Array.isArray(lineRef.current.material)) {
            lineRef.current.material.forEach((mat) => mat.dispose());
          } else {
            lineRef.current.material.dispose();
          }
        }
      }

      // Remove from scene
      sceneRef.current.remove(lineRef.current);
      lineRef.current = null;
    }

    // Remove existing markers
    markersRef.current.forEach((marker) => {
      sceneRef.current.remove(marker);
      if (marker.geometry) marker.geometry.dispose();
      if (marker.material) marker.material.dispose();
    });

    // Reset state
    markersRef.current = [];
    pointsRef.current = [];
  }, []);

  // Function to setup mouse click listener
  const setupClickListener = useCallback(() => {
    if (!containerRef.current) return;

    // Add click event listener to the container
    containerRef.current.addEventListener("click", handleMouseClick);

    // Return cleanup function
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("click", handleMouseClick);
      }
    };
  }, [handleMouseClick]);

  const applyBlackAndWhiteStyling = useCallback(() => {
    const model = modelRef.current;
    const modelClone = modelCloneRef.current;
    if (!model) return;

    // Get current clipping planes
    const currentClippingPlanes = [];
    if (clipPlaneRef.current && clipPlaneRef.current.constant !== 0) {
      currentClippingPlanes.push(clipPlaneRef.current);
    }

    if (outlinePassRef.current) {
      outlinePassRef.current.clippingPlanes = currentClippingPlanes;
    }

    // Create materials with current clipping planes
    const structureMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff, // White for structure
      side: THREE.DoubleSide,
      clippingPlanes: currentClippingPlanes,
      clipShadows: true,
    });

    const furnitureMaterial = new THREE.MeshBasicMaterial({
      color: 0x000000, // Light gray for furniture
      side: THREE.DoubleSide,
      clippingPlanes: currentClippingPlanes,
      clipShadows: true,
    });

    // Apply materials based on model structure
    if (model.children && model.children.length > 0) {
      // Apply white material to structure (mesh[0])
      if (model.children[0]) {
        model.children[0].traverse((node) => {
          if (node.isMesh) {
            node.material = structureMaterial.clone();
          }
        });
      }

      // Apply light gray material to furniture (mesh[1])
      if (model.children.length > 1 && model.children[1]) {
        model.children[1].traverse((node) => {
          if (node.isMesh) {
            node.material = furnitureMaterial.clone();
          }
        });
      }
    } else {
      // Alternative if structure is not organized as expected
      model.traverse((node) => {
        if (node.isMesh) {
          // Default to structure material
          node.material = structureMaterial.clone();
        }
      });
    }

    // Change the clone model color to black in 2D view
    if (modelClone) {
      const fillMaterial = new THREE.MeshStandardMaterial({
        color: 0x000000, // Black for the cloned model
        side: THREE.DoubleSide,
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
  }, []);

  const setCutLevel = useCallback(
    (y) => {
      // Check if model is loaded
      if (!modelRef.current) return;

      if (y === "none") {
        // Remove all clipping planes
        modelMaterialsRef.current.forEach((material) => {
          material.clippingPlanes = [];
          material.needsUpdate = true;
        });

        // Remove the cloned model from scene if it exists
        if (modelCloneRef.current && sceneRef.current) {
          sceneRef.current.remove(modelCloneRef.current);
        }
        if (outlinePassRef.current) {
          outlinePassRef.current.clippingPlanes = [];
        }

        // Set clipping plane constant to 0 to indicate no active clipping
        clipPlaneRef.current.constant = 0;

        // Update camera position - center on model
        const boundingBox = new THREE.Box3().setFromObject(modelRef.current);
        const center = boundingBox.getCenter(new THREE.Vector3());
        const size = boundingBox.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.z) * 1.2;

        // Position camera above the model
        moveCamera({
          x: center.x,
          y: center.y + maxDim * 0.75,
          z: center.z,
        });

        // Set controls target to model center
        if (controlsRef.current) {
          controlsRef.current.target.set(center.x, center.y, center.z);
          controlsRef.current.update();
        }

        // Reapply B&W styling after a small delay
        setTimeout(() => {
          applyBlackAndWhiteStyling();
        }, 50);

        return;
      }

      // Add 2 to y value as in the original function
      y = y + 2;

      // Configure clipping plane
      clipPlaneRef.current.set(new THREE.Vector3(0, -1, 0), y);

      // Configure fill planes - thicker for 2D view
      fillUpperClipPlaneRef.current.set(new THREE.Vector3(0, -1, 0), y + 0.3);
      fillLowerClipPlaneRef.current.set(new THREE.Vector3(0, 1, 0), -(y - 0.3));

      // Add cloned model to scene if necessary
      if (
        modelCloneRef.current &&
        sceneRef.current &&
        !sceneRef.current.children.includes(modelCloneRef.current)
      ) {
        sceneRef.current.add(modelCloneRef.current);
      }

      if (outlinePassRef.current) {
        outlinePassRef.current.clippingPlanes = [clipPlaneRef.current];
      }

      // Update materials with clipping planes
      modelMaterialsRef.current.forEach((mat) => {
        mat.clippingPlanes = [clipPlaneRef.current];
        mat.clipShadows = true;
        mat.needsUpdate = true;
      });

      // Position camera for 2D view
      const boundingBox = new THREE.Box3().setFromObject(modelRef.current);
      const center = boundingBox.getCenter(new THREE.Vector3());
      const size = boundingBox.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.z) * 1.2;

      // Position camera above the cut plane
      moveCamera({
        x: center.x,
        y: y + maxDim * 0.5, // Position relative to cut plane
        z: center.z,
      });

      // Set controls target at cut level
      if (controlsRef.current) {
        controlsRef.current.target.set(center.x, y, center.z);
        controlsRef.current.update();
      }

      // Reapply B&W styling after a small delay
      setTimeout(() => {
        applyBlackAndWhiteStyling();
      }, 50);
    },
    [applyBlackAndWhiteStyling]
  );

  const moveCamera = useCallback((newPos, time = 1) => {
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (!camera || !controls) return;

    if (camera.isPerspectiveCamera) {
      // Use gsap to interpolate camera position
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
    } else if (camera.isOrthographicCamera) {
      // For orthographic camera, we need to calculate the appropriate zoom level
      const boundingBox = new THREE.Box3().setFromObject(modelRef.current);
      const size = boundingBox.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.z) * 1.2;

      // Animate the position
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

      // Adjust the orthographic camera size
      gsap.to(camera, {
        duration: time,
        top: maxDim / 2,
        bottom: -maxDim / 2,
        left:
          (-maxDim / 2) *
          (containerRef.current.clientWidth /
            containerRef.current.clientHeight),
        right:
          (maxDim / 2) *
          (containerRef.current.clientWidth /
            containerRef.current.clientHeight),
        onUpdate: () => {
          camera.updateProjectionMatrix();
        },
      });
    }
  }, []);

  const setup2DCamera = useCallback(() => {
    if (!modelRef.current || !containerRef.current || !sceneRef.current) return;

    // Calculate model bounds
    const boundingBox = new THREE.Box3().setFromObject(modelRef.current);
    const center = boundingBox.getCenter(new THREE.Vector3());
    const size = boundingBox.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.z) * 1.2;

    // Get current viewport size
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Create orthographic camera for 2D view
    const orthoCameraSize = maxDim / 1.8;
    const orthoCamera = new THREE.OrthographicCamera(
      (-orthoCameraSize * width) / height, // left
      (orthoCameraSize * width) / height, // right
      orthoCameraSize, // top
      -orthoCameraSize, // bottom
      0.1, // near
      10000 // far
    );

    // Position camera above the model
    const cameraHeight = center.y + maxDim * 0.75;
    orthoCamera.position.set(center.x, cameraHeight, center.z);

    // Orient camera for top-down view
    orthoCamera.up.set(0, 0, -1);
    orthoCamera.lookAt(new THREE.Vector3(center.x, center.y, center.z));
    orthoCamera.updateProjectionMatrix();

    // Update camera reference
    cameraRef.current = orthoCamera;

    // Update controls to use the orthographic camera
    if (controlsRef.current) {
      controlsRef.current.object = orthoCamera;
      controlsRef.current.target.set(center.x, center.y, center.z);

      // Lock rotation for 2D top-down view
      controlsRef.current.enableRotate = false;
      controlsRef.current.minPolarAngle = 0;
      controlsRef.current.maxPolarAngle = 0;

      controlsRef.current.update();
    }

    // Update composer and passes with new camera
    if (composerRef.current) {
      composerRef.current.passes.forEach((pass) => {
        if (pass.camera) {
          pass.camera = orthoCamera;
        }
      });
    }

    // Apply black and white styling for 2D view
    applyBlackAndWhiteStyling();
  }, [applyBlackAndWhiteStyling]);

  async function loadVisor() {
    if (!containerRef.current) return;

    try {
      setIsLoading(true);

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const width = Math.max(rect.width, 1);
      const height = Math.max(rect.height, 1);

      // Initialize scene
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(backgroundColor);
      sceneRef.current = scene;

      // Initialize camera (will be replaced with orthographic later)
      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
      camera.position.set(-17, 26, 16);
      cameraRef.current = camera;

      // Initialize renderer
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        powerPreference: "high-performance",
      });

      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(width, height);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.outputEncoding = THREE.SRGBColorSpace;
      renderer.localClippingEnabled = true;
      renderer.toneMappingExposure = 1.2;

      container.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      // Set up post-processing
      const composer = new EffectComposer(renderer);
      composerRef.current = composer;

      // Start with the render pass
      const renderPass = new RenderPass(scene, camera);
      composer.addPass(renderPass);

      // Add outline pass immediately after render pass
      const outlinePass = new CustomOutlinePass(
        new THREE.Vector2(width, height),
        scene,
        camera
      );
      // Configure outline pass
      outlinePass.clippingPlanes = [];
      outlinePass.fsQuad.material.uniforms.outlineColor.value = new THREE.Color(
        0x000000
      );
      // Make outlines stronger and thicker
      outlinePass.fsQuad.material.uniforms.multiplierParameters.value =
        new THREE.Vector4(1.0, 5.0, 1.0, 5.0); // Much higher multipliers for visibility
      outlinePassRef.current = outlinePass;
      composer.addPass(outlinePass);

      // Then add FXAA pass for anti-aliasing
      const fxaaPass = new ShaderPass(FXAAShader);
      const pixelRatio = renderer.getPixelRatio();
      fxaaPass.material.uniforms["resolution"].value.x =
        1 / (width * pixelRatio);
      fxaaPass.material.uniforms["resolution"].value.y =
        1 / (height * pixelRatio);
      composer.addPass(fxaaPass);
      // Set up N8AO pass for ambient occlusion
      const n8aoPass = new N8AOPass(scene, camera, width, height);
      n8aoPassRef.current = n8aoPass;

      // Configure N8AO for 2D view - higher intensity
      n8aoPass.configuration.aoRadius = 8;
      n8aoPass.configuration.distanceFalloff = 2;
      n8aoPass.configuration.intensity = 8; // Higher intensity for 2D view
      n8aoPass.configuration.color = new THREE.Color(0, 0, 0);
      n8aoPass.configuration.screenSpaceRadius = false;
      n8aoPass.setQualityMode("Ultra");
      n8aoPass.configuration.aoSamples = 64;

      composer.addPass(n8aoPass);

      // Add output pass to ensure proper rendering
      const outputPass = new OutputPass();
      composer.addPass(outputPass);

      // Add orbit controls
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.2;
      controls.enableZoom = true;
      controls.enablePan = true;
      controls.target.set(0, 0, 0);
      controls.maxDistance = Infinity;
      controls.minDistance = 0;
      controls.screenSpacePanning = true;
      controlsRef.current = controls;

      // Add directional light
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.color.setHex(0xffffff);
      directionalLight.intensity = 0.63;
      directionalLight.castShadow = true;
      directionalLight.position.set(70, 100, 70);
      directionalLight.shadow.mapSize.set(4096 * 2, 4096 * 2);
      directionalLight.shadow.camera.far = 200;
      directionalLight.shadow.camera.left = -200;
      directionalLight.shadow.camera.right = 200;
      directionalLight.shadow.camera.top = 200;
      directionalLight.shadow.camera.bottom = -200;
      directionalLight.shadow.bias = -0.0005;
      scene.add(directionalLight);

      // Add ambient light
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
      scene.add(ambientLight);

      // Load model
      const loader = new GLTFLoader();
      loader.setMeshoptDecoder(MeshoptDecoder);

      loader.load(
        modelUrl,
        (glb) => {
          const model = glb.scene;
          modelRef.current = model;

          // Store original materials
          storeOriginalMaterials(model);

          // Create a clone of the model for the cut fill
          const modelClone = model.clone();
          modelCloneRef.current = modelClone;

          // Configure the fill material for the clone
          const fillMaterial = new THREE.MeshStandardMaterial({
            color: 0x000000, // Black for 2D view
            side: THREE.DoubleSide,
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

          // Apply fill material to clone
          modelClone.traverse((node) => {
            if (node.isMesh) {
              node.material = fillMaterial;
              node.renderOrder = 2;
            }
          });

          // Basic material setup for the main model
          model.traverse((node) => {
            if (node.isMesh) {
              node.material.metalness = 0.1;
              node.material.roughness = 0.2;
              node.frustumCulled = true;
              node.castShadow = true;
              node.receiveShadow = true;
              node.geometry.computeVertexNormals();
            }
          });

          // Add model to scene
          scene.add(model);

          // Set up 2D orthographic camera view
          setup2DCamera();

          // Apply any initial cut level if specified
          if (level && level !== "none") {
            setCutLevel(parseInt(level));
          }

          setIsLoading(false);
        },
        (progress) => {
          // You could add progress reporting here
        },
        (error) => {
          console.error("Error loading the model:", error);
          setError(`Failed to load model: ${error.message}`);
          setIsLoading(false);
        }
      );

      // Start animation loop
      animate();

      // Add window resize listener
      window.addEventListener("resize", handleResize);
    } catch (err) {
      console.error("Error loading 3D model:", err);
      setError(err.message);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadVisor();

    return () => {
      // Cleanup on unmount
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      if (controlsRef.current) {
        controlsRef.current.dispose();
      }

      if (rendererRef.current && rendererRef.current.domElement) {
        if (containerRef.current) {
          containerRef.current.removeChild(rendererRef.current.domElement);
        }
        rendererRef.current.dispose();
      }

      if (outlinePassRef.current) {
        outlinePassRef.current.dispose();
      }

      if (composerRef.current) {
        composerRef.current.dispose();
      }

      // Dispose of model materials and geometries
      if (modelRef.current) {
        modelRef.current.traverse((node) => {
          if (node.isMesh) {
            if (node.geometry) node.geometry.dispose();
            if (node.material) {
              if (Array.isArray(node.material)) {
                node.material.forEach((material) => material.dispose());
              } else {
                node.material.dispose();
              }
            }
          }
        });
      }

      // Dispose of cloned model
      if (modelCloneRef.current) {
        modelCloneRef.current.traverse((node) => {
          if (node.isMesh) {
            if (node.geometry) node.geometry.dispose();
            if (node.material) {
              if (Array.isArray(node.material)) {
                node.material.forEach((material) => material.dispose());
              } else {
                node.material.dispose();
              }
            }
          }
        });
      }

      window.removeEventListener("resize", handleResize);
    };
  }, [modelUrl, backgroundColor, handleResize, animate, setup2DCamera]);

  // Effect to handle level changes
  useEffect(() => {
    if (!modelRef.current) return;

    if (level === "none") {
      setCutLevel("none");
    } else if (level !== undefined) {
      setCutLevel(parseInt(level));
    }
  }, [level, setCutLevel]);

  // Set up click listener for line drawing after the scene is loaded
  useEffect(() => {
    // Only set up click listener when loading is complete
    if (!isLoading && modelRef.current) {
      // Set up the click event listener and get the cleanup function
      const cleanup = setupClickListener();

      // Return cleanup function to be called on unmount or when dependencies change
      return cleanup;
    }
  }, [isLoading, setupClickListener]);

  return (
    <div
      ref={containerRef}
      style={{
        backgroundColor: `${backgroundColor}`,
        position: "relative",
        width: width,
        height: height,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {isLoading && (
        <div style={{ position: "absolute", color: "#666" }}>
          Loading model...
        </div>
      )}

      {error && (
        <div style={{ position: "absolute", color: "red" }}>Error: {error}</div>
      )}
    </div>
  );
};

export default Visor2D;
