import { useRef } from 'react'
import { Controls, useControl, withControls } from 'react-three-gui'
import { Canvas, useFrame } from 'react-three-fiber'
import { OrbitControls } from '@react-three/drei'
import useStore from '@/helpers/store'

import { vertexShader, fragmentShader } from '@/helpers/shaders'

const settings = {
  speed: 0.2,
  density: 1.5,
  strength: 0.2,
}

const PageCanvas = withControls(Canvas)

const Page = () => {
  useStore.setState({ title: 'Sphere' })

  const Icosahedron = () => {
    const data = useControl('Speed', {
      type: 'number',
      value: 0.2,
      max: 1,
      min: 0,
    })

    console.log({ data })

    const mesh = useRef()

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

    return (
      <mesh ref={mesh}>
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
      <>
        <Icosahedron />
        <OrbitControls />
      </>
    )
  }

  return (
    <>
      <Controls.Provider>
        <PageCanvas
          camera={{
            position: [0, 0, 5],
          }}
        >
          <Scene />
        </PageCanvas>
      </Controls.Provider>
    </>
  )
}

export default Page
