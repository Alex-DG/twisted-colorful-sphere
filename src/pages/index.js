import React, { useRef, useState } from 'react'
// import { a, useSpring } from 'react-spring/three'
import { Canvas, useFrame } from 'react-three-fiber'
import { OrbitControls } from '@react-three/drei'

import useDatGui from '@/hooks/useDatGui'

import useStore from '@/helpers/store'
import { vertexShader, fragmentShader } from '@/helpers/shaders'

const settings = {
  speed: 0.2,
  density: 1.5,
  strength: 0.5,
}

const Page = () => {
  useStore.setState({ title: 'Sphere' })

  /**
   * GUI controls
   */
  useDatGui(settings)

  const Icosahedron = (props) => {
    const mesh = useRef()
    // const [isBig, setIsBig] = useState(false)

    // const { size, x } = useSpring({
    //   size: isBig ? [2, 2, 2] : [1, 1, 1],
    //   x: isBig ? 2 : 0,
    // })

    const uniforms = {
      uTime: { value: 0 },
      uSpeed: { value: settings.speed },
      uNoiseDensity: { value: settings.density },
      uNoiseStrength: { value: settings.strength },
    }

    useFrame(({ clock }) => {
      const current = mesh.current.material.uniforms

      current.uTime.value = clock.getElapsedTime()
      current.uSpeed.value = settings.speed
      current.uNoiseDensity.value = settings.density
      current.uNoiseStrength.value = settings.strength
    })

    // a.mesh when using react-spring/three
    return (
      <mesh
        ref={mesh}
        {...props}
        // scale={size}
        // position-x={x}
        // onClick={() => setIsBig(!isBig)}
      >
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
