import React, { useCallback, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import { pointsInner, pointsOuter } from "../_utils/utils";
import { Group } from "three";
import "../_styles/styles.css";
import Link from "next/link";
import dynamic from "next/dynamic";
import Balancer from "react-wrap-balancer";
import spring from "@/assets/spring.svg";
import cursor from "@/assets/cursor.svg";
import heroAssest1 from "@/assets/HeroAssest1.json";
import Lottie from "react-lottie-player";
import Image from "next/image";
import { motion } from "framer-motion";

const Header = dynamic(
  () => import("../_components/Header").then((mod) => mod.default),
  { ssr: false }
);

function Hero() {
  const [controlsEnabled, setControlsEnabled] = useState(true);

  const handleControlEnd = useCallback((distance: number) => {
    setControlsEnabled(distance < 20 && distance > 10);
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.stopPropagation(); // Prevent wheel event propagation to the main div
  }, []);

  const imageVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };
  const textVariant = {
    hidden: { opacity: 0, y:-30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };
  return (
    <div className="relative" onWheel={handleWheel}>
      <Canvas
        camera={{
          position: [10, -7.5, -5],
        }}
        style={{ height: "100vh" }}
        className="bg-gradient-to-t from-[#670066] to-black"
        children={undefined}
      ></Canvas>
      <div className="absolute top-[0%] w-full left-[50%] -translate-x-[50%]   font-medium text-2xl px-2">
        <Header />
      </div>

      <h1
      className="absolute px-2 py-1 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] font-black text-3xl sm:text-5xl bg-gradient-to-br from-white to-gray-100 bg-clip-text  text-center  leading-snug sm:leading-snug md:leading-snug w-full md:max-w-7xl md:text-6xl capitalize pointer-events-none text-transparent">
        
            <motion.div
              variants={imageVariant}
              initial="hidden"
              animate="visible"
              className="absolute top-[-90%] sm:top-[-50%] left-[15%] -translate-x-[50%]  "
            >
              <Image src={spring} alt="spring" width={70} height={70} />
            </motion.div>
            <motion.div
              variants={imageVariant}
              initial="hidden"
              animate="visible"
              className="absolute top-[-90%] sm:top-[-50%] left-[80%] -translate-x-[50%]  "
            >
              <Image src={cursor} alt="pencil" width={40} height={40} />
            </motion.div>
            <motion.div
              variants={imageVariant}
              initial="hidden"
              animate="visible"
              className="absolute top-[150%] sm:top-[60%] left-[60%] sm:left-[80%] -translate-x-[50%] "
            >
              <Image src={'/pencil3d.png'} alt="pencil" width={200} height={200} />
            </motion.div>
            <motion.div
             variants={textVariant}
             initial="hidden"
             animate="visible"
            >
          <motion.span
          variants={textVariant}
          initial="hidden"
          animate="visible"
          className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-pink-500 ">
            Visualize
          </motion.span>{" "}
          <motion.span
               variants={textVariant}
               initial="hidden"
               animate="visible"
               className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-100 ">
         
         Your Concepts Using Simple Diagrams</motion.span> 
        </motion.div>
      </h1>
      <motion.div
        variants={imageVariant}
        initial="hidden"
        animate="visible"
        className="absolute top-[60%] left-[0%] lg:left-[15%] -translate-x-[50%] pointer-events-none"
      >
        <Lottie
          loop
          animationData={heroAssest1}
          play
          className="pointer-events-none w-48
           h-48 sm:block hidden"
        />
      </motion.div>
      <p className="absolute capitalize font-mono py-2 top-[62%] sm:top-[61%] md:top-[65%] left-[50%] -translate-x-[50%] -translate-y-[50%] font-semibold md:text-xl text-sm text-center text-gray-300 md:max-w-7xl px-1 w-full">
        Deliver accurate, and consistent designs faster.
      </p>

      <div className="absolute top-[66%]  md:top-[70%] left-[50%] -translate-x-[50%]   font-medium   ">
        <Link href={"/dashboard"}>
          <button className="text-sm getStartedButton">Try Rubber</button>
        </Link>
      </div>
    </div>
  );
}

const Scene = ({
  controlsEnabled,
  onControlEnd,
}: {
  controlsEnabled: boolean;
  onControlEnd: (distance: number) => void;
}) => {
  const { camera } = useThree();
  const orbitRef = useRef<any>(null);

  useFrame(() => {
    const distance = camera.position.length();
    if (orbitRef.current) {
      orbitRef.current.update();
    }
  });

  return (
    <>
      <OrbitControls
        ref={orbitRef}
        maxDistance={20}
        minDistance={10}
        enabled={controlsEnabled}
        onEnd={() => onControlEnd(camera.position.length())}
      />
      <directionalLight />
      <pointLight position={[-30, 0, -30]} power={10.0} />
      <PointCircle />
    </>
  );
};

const PointCircle = () => {
  const ref = useRef<Group | null>(null);

  useFrame(({ clock }) => {
    if (ref.current?.rotation) {
      ref.current.rotation.z = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group ref={ref}>
      {pointsInner.map((point) => (
        <Point key={point.idx} position={point.position} color={point.color} />
      ))}
      {pointsOuter.map((point) => (
        <Point key={point.idx} position={point.position} color={point.color} />
      ))}
    </group>
  );
};

const Point = ({ position, color }: { position: number[]; color: string }) => {
  return (
    // @ts-expect-error - Passing a num array as opposed to a Vector3 is acceptable
    // and the referenced method in the documentation
    <Sphere position={position} args={[0.1, 10, 10]}>
      <meshStandardMaterial
        emissive={color}
        emissiveIntensity={0.5}
        roughness={0.5}
        color={color}
      />
    </Sphere>
  );
};

export default Hero;
