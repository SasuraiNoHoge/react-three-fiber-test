import React from "react";
import { Canvas } from "react-three-fiber";
import { Controls as CtrlGUI, useControl } from "react-three-gui";
import { Vector3 } from "three";
import "./canvas.css";
import Control from "./Control";
type Props = {
  scale?: Vector3 | [number, number, number] | undefined;
  color?: string | number | undefined;
};

const Loading = () => {
  return (
    <mesh visible position={[0, 0, 0]} rotation={[0, 0, 0]}>
      <sphereGeometry attach="geometry" args={[1, 16, 16]} />
      <meshStandardMaterial
        attach="material"
        color="white"
        transparent
        opacity={0.6}
        roughness={1}
        metalness={0}
      />
    </mesh>
  );
};

export default function App() {
  const mode: string = useControl("操作", {
    type: "select",
    items: ["scale", "rotate", "translate"],
  });
  return (
    <>
      <Canvas style={{ background: "#171717" }}>
        <ambientLight />
        <Control mode={mode} />
      </Canvas>
      <CtrlGUI />
    </>
  );
}
