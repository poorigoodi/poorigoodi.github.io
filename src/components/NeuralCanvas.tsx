import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface NeuralCanvasProps {
  isLightMode: boolean;
  pulseCount: number;
}

export const NeuralCanvas: React.FC<NeuralCanvasProps> = ({ isLightMode, pulseCount }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pulseIntensityRef = useRef<number>(0);
  const wireRingRef = useRef<THREE.Mesh<THREE.TorusGeometry, THREE.MeshBasicMaterial> | null>(null);
  const coreMeshRef = useRef<THREE.Mesh<THREE.IcosahedronGeometry, THREE.MeshBasicMaterial> | null>(null);

  useEffect(() => {
    if (pulseCount > 0) {
      pulseIntensityRef.current = 1.0;
    }
  }, [pulseCount]);

  useEffect(() => {
    const ringColor = isLightMode ? 0x14213d : 0xf4ede0;
    if (wireRingRef.current) {
      wireRingRef.current.material.color.setHex(ringColor);
      wireRingRef.current.material.opacity = isLightMode ? 0.15 : 0.18;
    }
    if (coreMeshRef.current) {
      coreMeshRef.current.material.opacity = isLightMode ? 0.28 : 0.22;
    }
  }, [isLightMode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 26;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const neuralGroup = new THREE.Group();
    scene.add(neuralGroup);

    // 1. Central Floating Geometric AI Core (Icosahedron)
    const coreGeo = new THREE.IcosahedronGeometry(5.2, 1);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xff6b5b,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMeshRef.current = coreMesh;
    neuralGroup.add(coreMesh);

    // 2. Outer Orbital Torus Ring
    const ringGeo = new THREE.TorusGeometry(9.5, 0.04, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xf4ede0,
      transparent: true,
      opacity: 0.18,
    });
    const wireRing = new THREE.Mesh(ringGeo, ringMat);
    wireRing.rotation.x = Math.PI / 2.8;
    wireRingRef.current = wireRing;
    neuralGroup.add(wireRing);

    // 3. Neural Network Nodes & Synaptic Connections
    const nodeCount = 65;
    const nodePositions: THREE.Vector3[] = [];
    const nodeGeometry = new THREE.BufferGeometry();
    const positionsArray = new Float32Array(nodeCount * 3);
    const colorsArray = new Float32Array(nodeCount * 3);

    const colorCream = new THREE.Color(0xf4ede0);
    const colorCoral = new THREE.Color(0xff6b5b);

    for (let i = 0; i < nodeCount; i++) {
      const radius = 8 + Math.random() * 14;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      positionsArray[i * 3] = x;
      positionsArray[i * 3 + 1] = y;
      positionsArray[i * 3 + 2] = z;
      nodePositions.push(new THREE.Vector3(x, y, z));

      const isAccent = i % 3 === 0;
      const c = isAccent ? colorCoral : colorCream;
      colorsArray[i * 3] = c.r;
      colorsArray[i * 3 + 1] = c.g;
      colorsArray[i * 3 + 2] = c.b;
    }

    nodeGeometry.setAttribute('position', new THREE.BufferAttribute(positionsArray, 3));
    nodeGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));

    const nodeMaterial = new THREE.PointsMaterial({
      size: 0.34,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
    });

    const particleSystem = new THREE.Points(nodeGeometry, nodeMaterial);
    neuralGroup.add(particleSystem);

    const linePositions: number[] = [];
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dist = nodePositions[i].distanceTo(nodePositions[j]);
        if (dist < 6.8) {
          linePositions.push(
            nodePositions[i].x,
            nodePositions[i].y,
            nodePositions[i].z,
            nodePositions[j].x,
            nodePositions[j].y,
            nodePositions[j].z
          );
        }
      }
    }

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xff6b5b,
      transparent: true,
      opacity: 0.11,
    });
    const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    neuralGroup.add(linesMesh);

    let mouseX = 0;
    let mouseY = 0;
    let lastScrollTop = window.scrollY || 0;
    let animationFrameId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleScroll = () => {
      const scrollTop = window.scrollY || 0;
      const scrollDelta = scrollTop - lastScrollTop;
      lastScrollTop = scrollTop;
      neuralGroup.rotation.x += scrollDelta * 0.0006;
      neuralGroup.rotation.y += scrollDelta * 0.0008;
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const scrollY = window.scrollY || 0;
      const scrollFactor = scrollY * 0.0015;

      neuralGroup.rotation.y += 0.0018;
      neuralGroup.rotation.x += 0.0007;

      const targetRotationY = mouseX * 0.35 + scrollFactor;
      const targetRotationX = mouseY * 0.25 + scrollFactor * 0.4;

      neuralGroup.rotation.y += (targetRotationY - neuralGroup.rotation.y) * 0.03;
      neuralGroup.rotation.x += (targetRotationX - neuralGroup.rotation.x) * 0.03;

      neuralGroup.position.y = Math.sin(scrollY * 0.002) * 1.8;
      camera.position.z = 26 - Math.min(scrollY * 0.003, 5);

      coreMesh.rotation.y -= 0.0035;
      coreMesh.rotation.z += 0.0025;

      if (pulseIntensityRef.current > 0.01) {
        const scale = 1 + pulseIntensityRef.current * 0.35;
        coreMesh.scale.set(scale, scale, scale);
        pulseIntensityRef.current *= 0.94;
      } else {
        coreMesh.scale.set(1, 1, 1);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      coreGeo.dispose();
      coreMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} id="bg-canvas" aria-hidden="true" />;
};
