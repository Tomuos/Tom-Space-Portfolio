"use client";

import React, { useState, useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
// @ts-ignore
import * as random from "maath/random/dist/maath-random.esm";
import * as THREE from 'three';


const StarBackground = (props: any) => {
  const ref: any = useRef();
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(5000), { radius: 1.2 })
  );

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta/10;
    ref.current.rotation.y -= delta/15;
  })

   // Generate random colors
   const colors = useMemo(() => {
    const colors = new Float32Array(5000 * 3); // Multiply by 3 for r, g, b values
    for (let i = 0; i < colors.length; i += 3) {
      // Generate a random color for each vertex
      const color = new THREE.Color();
      color.setHSL(Math.random(), 0.7, 0.7); // You can change saturation and lightness to suit your needs
      colors[i] = color.r;
      colors[i + 1] = color.g;
      colors[i + 2] = color.b;
    }
    return colors;
  }, []);

  return (
    <group rotation={[0,0, Math.PI / 4]}>
        <Points
        ref={ref}
        positions={sphere}
        colors={colors}
        stride={3}
        frustumCulled
        {...props}
        >
            <PointMaterial
                transparent
                vertexColors
                size={0.003}
                sizeAttenuation={true}
                dethWrite={false}
            />
        </Points>
    </group>
  )
};

const StarsCanvas = () => (
    <div className="w-full h-auto fixed inset-0 z-[20]">
        <Canvas camera={{position: [0, 0, 1]}}>
        <Suspense fallback={null}>
            <StarBackground />
        </Suspense>
        </Canvas>
    </div>
)

export default StarsCanvas;