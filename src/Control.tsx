import { OrbitControls, TransformControls } from "drei";
import React, { Suspense, useEffect, useRef } from "react";
import { extend, ReactThreeFiber } from "react-three-fiber";
import { OrbitControls as OrbitControlsImpl } from "three/examples/jsm/controls/OrbitControls";
import { TransformControls as TransformControlsImpl } from "three/examples/jsm/controls/TransformControls";
import Model from "./Model";

extend({ OrbitControlsImpl, TransformControlsImpl });

type OrbitControls = ReactThreeFiber.Object3DNode<
  OrbitControlsImpl,
  typeof OrbitControlsImpl
>;

type TransformControls = ReactThreeFiber.Object3DNode<
  TransformControlsImpl,
  typeof TransformControlsImpl
>;

export default function Controls({ mode }) {
  const transformRef = useRef<TransformControlsImpl>();
  const orbitRef = useRef<OrbitControlsImpl>();

  useEffect(() => {
    if (transformRef.current) {
      const controls = transformRef.current;
      controls.setMode(mode);

      const callback = (event: THREE.Event) => {
        if (orbitRef.current) orbitRef.current.enabled = !event.value;
      };
      controls.addEventListener("dragging-changed", callback);
      return () => controls.removeEventListener("dragging-changed", callback);
    }
  });
  return (
    <>
      <TransformControls ref={transformRef}>
        <Suspense fallback={null}>
          <Model />
        </Suspense>
      </TransformControls>
      <OrbitControls ref={orbitRef} />
    </>
  );
}
