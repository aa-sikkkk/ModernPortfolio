"use client"

import { Canvas } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import { Text, Float } from "@react-three/drei"
import type { Group } from "three"
import { motion } from "framer-motion"

function LoadingScene() {
  const group = useRef<Group>(null)

  useEffect(() => {
    if (group.current) {
      group.current.rotation.x = 0.2
    }
  }, [])

  return (
    <group ref={group}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Text font="/fonts/Geist-Bold.ttf" fontSize={0.5} color="#6E56CF" anchorX="center" anchorY="middle">
          Aashik Baruwal
        </Text>

        <Text
          position={[0, -0.6, 0]}
          font="/fonts/Inter-Regular.ttf"
          fontSize={0.2}
          color="#10B981"
          anchorX="center"
          anchorY="middle"
        >
          Python Developer & ML Enthusiast
        </Text>
      </Float>

      {/* Loading indicator */}
      <mesh position={[0, -1.5, 0]}>
        <ringGeometry args={[0.5, 0.6, 32]} />
        <meshStandardMaterial color="#6E56CF" />
      </mesh>
    </group>
  )
}

export default function LoadingAnimation() {
  return (
    <div className="fixed inset-0 bg-[#0A0A0B] flex items-center justify-center z-50">
      <div className="w-full h-full">
        <Canvas>
          <LoadingScene />
        </Canvas>
      </div>

      <motion.div
        className="absolute bottom-10 left-0 right-0 text-center text-white text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        Loading portfolio...
      </motion.div>
    </div>
  )
}
