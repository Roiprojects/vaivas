"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface Hero3DCanvasProps {
  className?: string;
  variant?: "hero" | "ambient" | "compact";
}

export default function Hero3DCanvas({
  className = "",
  variant = "hero",
}: Hero3DCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    let isVisible = true;

    // SCENE, CAMERA, RENDERER
    const scene = new THREE.Scene();
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, variant === "compact" ? 7 : 6.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // ROOT 3D GROUP FOR SCROLL & MOUSE INTERACTION
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. CENTRAL GEOMETRIC ENTITY (Torus Knot / Futuristic Core)
    const torusKnotGeo = new THREE.TorusKnotGeometry(1.4, 0.38, 120, 24, 2, 3);
    const wireframeMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      wireframe: true,
      emissive: 0x0284c7,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.9,
    });
    const knotMesh = new THREE.Mesh(torusKnotGeo, wireframeMat);
    mainGroup.add(knotMesh);

    // 2. INNER LUMINOUS CORE SPHERE
    const coreGeo = new THREE.SphereGeometry(0.85, 32, 32);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x818cf8,
      emissive: 0x6366f1,
      emissiveIntensity: 0.8,
      roughness: 0.1,
      metalness: 0.8,
      transparent: true,
      opacity: 0.85,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    mainGroup.add(coreMesh);

    // 3. ORBITING HOLOGRAPHIC GYRO RINGS
    const ringGeo1 = new THREE.TorusGeometry(2.35, 0.025, 16, 120);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.7,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    mainGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(2.65, 0.02, 16, 120);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xf43f5e,
      transparent: true,
      opacity: 0.6,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    mainGroup.add(ring2);

    const ringGeo3 = new THREE.TorusGeometry(3.0, 0.015, 16, 120);
    const ringMat3 = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0.5,
    });
    const ring3 = new THREE.Mesh(ringGeo3, ringMat3);
    ring3.rotation.z = Math.PI / 6;
    mainGroup.add(ring3);

    // 4. FLOATING PARTICLE CONSTELLATION NETWORK
    const particleCount = variant === "compact" ? 300 : 700;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.5 + Math.random() * 4.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);
      particleScales[i] = Math.random() * 0.06 + 0.02;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );

    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.05,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 5. LIGHTS
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const cyanPointLight = new THREE.PointLight(0x06b6d4, 4, 20);
    cyanPointLight.position.set(4, 3, 5);
    scene.add(cyanPointLight);

    const magentaPointLight = new THREE.PointLight(0xf43f5e, 4, 20);
    magentaPointLight.position.set(-4, -3, -4);
    scene.add(magentaPointLight);

    const violetPointLight = new THREE.PointLight(0x8b5cf6, 3, 15);
    violetPointLight.position.set(0, 5, 2);
    scene.add(violetPointLight);

    // INTERACTION STATE: MOUSE & SCROLL
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let scrollY = 0;
    let targetScrollY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetMouseX = x * 0.7;
      targetMouseY = y * 0.7;
    };

    const handleScroll = () => {
      targetScrollY = window.scrollY || window.pageYOffset;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    // RESIZE OBSERVER
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      if (newWidth === 0 || newHeight === 0) return;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // VISIBILITY OBSERVER (PAUSE WHEN OFFSCREEN)
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    // RENDER LOOP WITH SCROLL & 3D MOTION
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const elapsedTime = clock.getElapsedTime();

      // Smooth interpolation for mouse
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Smooth interpolation for scroll
      scrollY += (targetScrollY - scrollY) * 0.06;

      // Continuous autonomous rotations
      knotMesh.rotation.x = elapsedTime * 0.35 + scrollY * 0.0018;
      knotMesh.rotation.y = elapsedTime * 0.5 + scrollY * 0.0025;

      coreMesh.rotation.y = -elapsedTime * 0.4;
      const pulseScale = 1.0 + Math.sin(elapsedTime * 2.2) * 0.08;
      coreMesh.scale.set(pulseScale, pulseScale, pulseScale);

      ring1.rotation.z = elapsedTime * 0.45 + scrollY * 0.002;
      ring1.rotation.x = Math.PI / 3 + Math.sin(elapsedTime * 0.5) * 0.2;

      ring2.rotation.x = elapsedTime * 0.35 - scrollY * 0.002;
      ring2.rotation.y = Math.PI / 4 + Math.cos(elapsedTime * 0.6) * 0.25;

      ring3.rotation.y = -elapsedTime * 0.3 + scrollY * 0.0015;

      particles.rotation.y = elapsedTime * 0.06 + scrollY * 0.0008;
      particles.rotation.x = Math.sin(elapsedTime * 0.04) * 0.15;

      // 3D SCROLL EFFECT: Morph position & camera depth
      const scrollFactor = Math.min(scrollY / 1200, 2);
      mainGroup.position.x = mouseX * 0.8 + Math.sin(scrollFactor * Math.PI) * 0.4;
      mainGroup.position.y = mouseY * 0.8 - scrollFactor * 0.8;
      mainGroup.position.z = Math.sin(scrollFactor * 2) * 0.6;

      // Rotate entire group with cursor tilt
      mainGroup.rotation.y = mouseX * 0.6 + scrollFactor * 0.5;
      mainGroup.rotation.x = -mouseY * 0.6 + scrollFactor * 0.3;

      // Point lights orbit
      cyanPointLight.position.x = Math.sin(elapsedTime * 0.8) * 5;
      cyanPointLight.position.y = Math.cos(elapsedTime * 0.8) * 4;
      magentaPointLight.position.x = -Math.sin(elapsedTime * 0.7) * 5;
      magentaPointLight.position.z = Math.cos(elapsedTime * 0.7) * 5;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();

      // Dispose Three.js resources
      torusKnotGeo.dispose();
      wireframeMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      ringGeo3.dispose();
      ringMat3.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [variant]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full pointer-events-none ${className}`}
      style={{ minHeight: variant === "compact" ? "260px" : "420px" }}
      aria-hidden="true"
    />
  );
}
