import { useEffect } from 'react'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import { vertexShader, fragmentShader } from '@/helpers/shaders'

const settings = {
  speed: 0.2,
  density: 1.5,
  strength: 0.2,
}

const useSphere = (canvas) => {
  const clock = new THREE.Clock()

  let gui
  let renderer
  let camera
  let scene
  let controls
  let mesh
  let frameId

  useEffect(() => {
    // bug in the library - I can't import dat.gui it's triggering an error
    const elemGUI = document.getElementsByClassName('dg main')
    if (elemGUI?.length === 0) {
      const dat = require('dat.gui')
      gui = new dat.GUI()

      gui.add(settings, 'speed', 0.1, 1, 0.01)
      gui.add(settings, 'density', 0, 10, 0.01)
      gui.add(settings, 'strength', 0, 2, 0.01)
    }

    const addElements = () => {
      const geometry = new THREE.IcosahedronBufferGeometry(1, 64)

      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uSpeed: { value: settings.speed },
          uNoiseDensity: { value: settings.density },
          uNoiseStrength: { value: settings.strength },
        },
        wireframe: true,
      })
      mesh = new THREE.Mesh(geometry, material)
      scene.add(mesh)
    }

    const resize = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      camera.aspect = width / height
      renderer.setSize(width, height)
      camera.updateProjectionMatrix()
    }

    const addEvents = () => window.addEventListener('resize', resize())

    const render = () => {
      controls.update()

      // Update uniforms
      mesh.material.uniforms.uTime.value = clock.getElapsedTime()
      mesh.material.uniforms.uSpeed.value = settings.speed
      mesh.material.uniforms.uNoiseDensity.value = settings.density
      mesh.material.uniforms.uNoiseStrength.value = settings.strength

      renderer.render(scene, camera)
    }

    const animate = () => {
      frameId = requestAnimationFrame(animate)
      render()
    }

    // Init
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: canvas.current,
    })

    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor('black', 1)

    camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.set(0, 0, 4)

    scene = new THREE.Scene()

    controls = new OrbitControls(camera, renderer.domElement)

    addElements()
    addEvents()
    animate()

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', resize)
    }
  }, [])
}

export default useSphere
