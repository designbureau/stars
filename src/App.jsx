import React, { useRef, useState, useMemo, useContext, useEffect } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
// import { ShaderMaterial } from "three";
import * as THREE from "three";
import chroma from "chroma-js";

import getTemperature from "./getTemperature";
import generateGradient from "./generateGradient";
import Star from "./Star";
import Binary from "./components/Binary";
import Menu from "./components/Menu";

import { RefContext, RefProvider } from "./components/RefContext";

import { LayerMaterial, Depth } from "lamina";
import { Sparkles, Billboard } from "@react-three/drei";

// class GradientSphereShaderMaterial extends ShaderMaterial {
//   constructor() {
//     super({
//       uniforms: {
//         // color1: { value: new Color('blue') }
//       },
//       vertexShader: `
//               varying vec3 vNormal;
//               void main() {
//                   vNormal = normalize(normalMatrix * normal);
//                   gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
//               }
//           `,
//       fragmentShader: `
//               varying vec3 vNormal;
//               void main() {
//                 vec3 yellowColor = vec3(1.0, 0.7, 0.0);
//                 vec3 redColor = vec3(1.0, 0.0, 0.0);

//                 // Determine the size of the yellow gradient
//                 float yellowSize = 0.1;
//                 float yellowThreshold = 1.0 - yellowSize;
//                 float yellowGradient = smoothstep(yellowThreshold, 1.0, abs(vNormal.z));

//                 vec3 combinedColor = mix(redColor, yellowColor, yellowGradient);

//                 // Adjust this for the transparency effect
//                 float combinedIntensity = abs(vNormal.z) - 0.75;

//                 gl_FragColor = vec4(combinedColor, combinedIntensity);

//               }
//           `,
//       transparent: true
//     })
//   }
// }

// extend({ GradientSphereShaderMaterial })

// function Sphere() {
//   return (
//     <mesh>
//       <sphereGeometry args={[3, 32, 32]} />
//       <gradientSphereShaderMaterial attach="material" />
//     </mesh>
//   )
// }

// function Star({ color = 'red' }) {
//   return (
//     <mesh>
//       <sphereGeometry args={[1, 128, 128]} />
//       <meshStandardMaterial color={color} emissive={color} />
//     </mesh>
//   )
// }

// const Glow = ({ color, scale = 1, near = -2, far = 1.4 }) => (
//   <Billboard>
//     <mesh>
//       <circleGeometry args={[2 * scale, 64]} />
//       <LayerMaterial
//         transparent
//         depthWrite={false}
//         blending={THREE.CustomBlending}
//         blendEquation={THREE.AddEquation}
//         blendSrc={THREE.SrcAlphaFactor}
//         blendDst={THREE.DstAlphaFactor}
//       >
//         <Depth
//           colorA={color}
//           colorB="black"
//           alpha={1}
//           mode="normal"
//           near={near * scale}
//           far={far * scale}
//           origin={[0, 0, 0]}
//         />
//         <Depth
//           colorA={color}
//           colorB="black"
//           alpha={0.5}
//           mode="add"
//           near={-40 * scale}
//           far={far * 1.2 * scale}
//           origin={[0, 0, 0]}
//         />
//         <Depth
//           colorA={color}
//           colorB="black"
//           alpha={1}
//           mode="add"
//           near={-15 * scale}
//           far={far * 0.8 * scale}
//           origin={[0, 0, 0]}
//         />
//         <Depth
//           colorA={color}
//           colorB="black"
//           alpha={1}
//           mode="add"
//           near={-10 * scale}
//           far={far * 0.7 * scale}
//           origin={[0, 0, 0]}
//         />
//       </LayerMaterial>
//     </mesh>
//   </Billboard>
// );

// let spectraltype = "M";

// let temperature = getTemperature(spectraltype);
// let color_light = chroma
//   .temperature(temperature + (temperature / 100) * 50)
//   .hex("rgb");
// let color_dark = chroma
//   .temperature(temperature - (temperature / 100) * 50)
//   .hex("rgb");

// const colors = generateGradient(color_dark, color_light, 5);

const Root = ({ data }) => {
  console.log({ data });

  return (
    <>
      <RefProvider>
        <App data={data} />
      </RefProvider>
    </>
  );
};

const App = ({ data }) => {
  const { resetRefs } = useContext(RefContext);

  useEffect(() => {
    resetRefs();
  }, [data, resetRefs]);

  return (
    <RefProvider>
      <Canvas style={{ background: "black" }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <pointLight position={[20, 10, 10]} intensity={1} color={"white"} />
        <Binary data={data} />
        <OrbitControls />
      </Canvas>
      <Menu data={data} />
    </RefProvider>
  );
};

export default Root;
