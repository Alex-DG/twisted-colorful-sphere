import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'
import { OrbitControls } from '@react-three/drei'

import useDatGui from '@/hooks/useDatGui'

import useStore from '@/helpers/store'
import { vertexShader, fragmentShader } from '@/helpers/shaders'

// Default settings
const settings = {
  speed: 0.2,
  density: 1.5,
  strength: 0.5,
  frequency: 3.0,
  amplitude: 6.0,
}

const Page = () => {
  useStore.setState({ title: 'Sphere' })

  /**
   * GUI controls
   */
  useDatGui(settings)

  const Icosahedron = (props) => {
    const mesh = useRef()

    const uniforms = {
      uTime: { value: 0 },
      uSpeed: { value: settings.speed },
      uNoiseDensity: { value: settings.density },
      uNoiseStrength: { value: settings.strength },
      uFrequency: { value: settings.frequency },
      uAmplitude: { value: settings.amplitude },
    }

    useFrame(({ clock }) => {
      const current = mesh.current.material.uniforms

      current.uTime.value = clock.getElapsedTime()
      current.uSpeed.value = settings.speed
      current.uNoiseDensity.value = settings.density
      current.uNoiseStrength.value = settings.strength
      current.uFrequency.value = settings.frequency
      current.uAmplitude.value = settings.amplitude
    })

    return (
      <mesh ref={mesh} {...props}>
        <icosahedronBufferGeometry attach='geometry' args={[1, 64]} />
        <shaderMaterial
          attach='material'
          {...{ vertexShader, fragmentShader, uniforms }}
          wireframe
        />
      </mesh>
    )
  }

  const Scene = () => {
    return (
      <Canvas
        camera={{
          position: [0, 0, 3],
        }}
      >
        <Icosahedron />
        <OrbitControls />
      </Canvas>
    )
  }

  return (
    <>
      <Scene />
    </>
  )
}

export default Page
