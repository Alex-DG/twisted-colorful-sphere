import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'
import { OrbitControls } from '@react-three/drei'

import useDatGui from '@/hooks/useDatGui'

import useStore from '@/helpers/store'
import { vertexShader, fragmentShader } from '@/helpers/shaders'

// Default settings
const settings = {
  wireframe: false,
  speed: 0.2,
  density: 1.5,
  strength: 0.2,
  frequency: 3.0,
  amplitude: 6.0,
  intensity: 7.0,
}

const Page = () => {
  useStore.setState({ title: 'Sphere' })

  /**
   * GUI controls
   */
  useDatGui(settings)

  const Icosahedron = (props) => {
    const mesh = useRef()

    const {
      speed,
      density,
      strength,
      frequency,
      amplitude,
      intensity,
      wireframe,
    } = settings

    const uniforms = {
      uTime: { value: 0 },
      uSpeed: { value: speed },
      uNoiseDensity: { value: density },
      uNoiseStrength: { value: strength },
      uFrequency: { value: frequency },
      uAmplitude: { value: amplitude },
      uIntensity: { value: intensity },
    }

    useFrame(({ clock }) => {
      const current = mesh.current.material.uniforms

      current.uTime.value = clock.getElapsedTime()
      current.uSpeed.value = speed
      current.uNoiseDensity.value = density
      current.uNoiseStrength.value = strength
      current.uFrequency.value = frequency
      current.uAmplitude.value = amplitude
      current.uIntensity.value = intensity
    })

    return (
      <mesh ref={mesh} {...props}>
        <icosahedronBufferGeometry attach='geometry' args={[1, 64]} />
        <shaderMaterial
          attach='material'
          {...{ vertexShader, fragmentShader, uniforms, wireframe }}
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
