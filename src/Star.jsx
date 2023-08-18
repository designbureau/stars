import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo, useEffect } from "react";
import chroma from "chroma-js";
import { Noise, LayerMaterial, Depth, Fresnel, Displace } from "lamina";
import getTemperature from "./getTemperature";
const Star = ({ scale = 1, spectraltype = "M" }) => {
  const starRef = useRef();

  const layerMaterial = useRef();
  const noise1 = useRef();
  const noise2 = useRef();
  const noise3 = useRef();
  const noise4 = useRef();
  const displace = useRef();

  let temperature = getTemperature(spectraltype);

  let color = chroma.temperature(temperature).hex("rgb");
  let color_light = chroma
    .temperature(temperature + (temperature / 100) * 50)
    .hex("rgb");
  let color_dark = chroma
    .temperature(temperature - (temperature / 100) * 50)
    .hex("rgb");

  let transformScale = scale * 1000;

  // let start, end, delta;

  useFrame((state, delta) => {
    starRef.current.rotation.y += 0.00005;
    noise1.current.scale += Math.sin(delta * 0.25);
    noise2.current.scale += Math.sin(delta * 0.25);
    noise3.current.scale += Math.sin(delta * 0.5);
    noise4.current.scale += Math.sin(delta * 0.125);
    displace.current.scale += Math.sin(delta * 0.125);

    // displace.current.scale += Math.sin(delta * 0.05);
  });

  return (
    <mesh ref={starRef}>
      <sphereGeometry args={[scale, 128, 128]} />
      <LayerMaterial ref={layerMaterial} color={color}>
        <Fresnel
          mode="softlight"
          color={color_light}
          intensity={4}
          power={1.4}
          bias={0}
          alpha={1}
        />
        <Fresnel
          mode="add"
          color={color_light}
          intensity={2.5}
          power={1.6}
          bias={0}
          alpha={0.1}
        />
        <Noise
          ref={noise1}
          mapping={"local"}
          scale={transformScale * 0.1}
          type={"perlin"}
          mode={"overlay"}
          alpha={0.5}
        />
        <Noise
          ref={noise2}
          mapping={"local"}
          scale={transformScale * 0.01}
          type={"perlin"}
          mode={"overlay"}
          alpha={0.5}
        />
        <Noise
          ref={noise3}
          mapping={"local"}
          scale={transformScale * 0.04}
          type={"perlin"}
          mode={"divide"}
          alpha={1}
        />
         <Noise
          ref={noise4}
          mapping={"local"}
          scale={transformScale * 0.0001}
          type={"curl"}
          mode={"divide"}
          alpha={1}
        />
        <Displace ref={displace} strength={0.005} scale={800} intensity={0.1} mapping="world" />
      </LayerMaterial>
    </mesh>
  );
};

export default Star;
