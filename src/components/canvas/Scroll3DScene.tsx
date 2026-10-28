"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Scroll3DScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animId: number;
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    // 1. FLOATING PARTICLE STARFIELD
    const starCount = 900;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    const color1 = new THREE.Color(0x38bdf8); // Cyan
    const color2 = new THREE.Color(0xa855f7); // Violet
    const color3 = new THREE.Color(0xf59e0b); // Amber

    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 60;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 60;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 40;

      const mixed = Math.random() < 0.4 ? color1 : Math.random() < 0.7 ? color2 : color3;
      starColors[i * 3] = mixed.r;
      starColors[i * 3 + 1] = mixed.g;
      starColors[i * 3 + 2] = mixed.b;
    }

    starGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute("color", new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // 2. SCROLL-REACTIVE 3D POLYHEDRON (Orbiting Geometric Core)
    const polyGeo = new THREE.IcosahedronGeometry(3.2, 1);
    const polyMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      wireframe: true,
      emissive: 0x1e1b4b,
      roughness: 0.3,
      metalness: 0.8,
      transparent: true,
      opacity: 0.35,
    });
    const polyhedron = new THREE.Mesh(polyGeo, polyMat);
    polyhedron.position.set(10, 0, -2);
    scene.add(polyhedron);

    // 3. SECONDARY GEOMETRIC RING
    const ringGeo = new THREE.TorusGeometry(5.2, 0.04, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      transparent: true,
      opacity: 0.25,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    polyhedron.add(ring);

    // 4. AMBIENT & LIGHTS
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const light1 = new THREE.PointLight(0x38bdf8, 3, 50);
    light1.position.set(15, 10, 10);
    scene.add(light1);

    const light2 = new THREE.PointLight(0xa855f7, 3, 50);
    light2.position.set(-15, -10, 10);
    scene.add(light2);

    // SCROLL & POINTER STATE
    let targetScroll = 0;
    let currentScroll = 0;
    let mouseX = 0;
    let mouseY = 0;

    const onScroll = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight || 1;
      targetScroll = (window.scrollY || window.pageYOffset) / maxScroll;
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("resize", onResize);

    const clock = new THREE.Clock();

    const render = () => {
      animId = requestAnimationFrame(render);

      const time = clock.getElapsedTime();
      currentScroll += (targetScroll - currentScroll) * 0.05;

      // Rotate star field gently
      starField.rotation.y = time * 0.02 + currentScroll * 0.8;
      starField.rotation.x = Math.sin(time * 0.02) * 0.1 + currentScroll * 0.3;

      // 3D SCROLL TRAVEL: Move polyhedron dynamically across space as user scrolls
      // At scroll 0%: Right side (10, 0, -2)
      // At scroll 50%: Center / Left (-8, -2, 2)
      // At scroll 100%: Right bottom (7, -6, 0)
      const scrollAngle = currentScroll * Math.PI * 2;
      polyhedron.position.x =
        Math.cos(scrollAngle) * 9 + mouseX * 1.5;
      polyhedron.position.y =
        -currentScroll * 12 + Math.sin(scrollAngle * 1.5) * 3 + mouseY * 1.5;
      polyhedron.position.z = Math.sin(scrollAngle) * 6 - 2;

      polyhedron.rotation.x = time * 0.2 + currentScroll * 4;
      polyhedron.rotation.y = time * 0.3 + currentScroll * 5;
      ring.rotation.z = time * 0.4 + currentScroll * 3;

      // Camera parallax
      camera.position.x += (mouseX * 2 - camera.position.x) * 0.03;
      camera.position.y += (mouseY * 2 - camera.position.y) * 0.03;
      camera.lookAt(0, -currentScroll * 4, 0);

      renderer.render(scene, camera);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);

      starGeo.dispose();
      starMat.dispose();
      polyGeo.dispose();
      polyMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-60 transition-opacity duration-1000"
      aria-hidden="true"
    />
  );
}
