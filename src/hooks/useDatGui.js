import { useEffect, useState } from 'react'

const useDatGui = (settings) => {
  let gui

  const [options, set] = useState({
    wireframe: false,
  })

  useEffect(() => {
    const datGuiClass = document.getElementsByClassName('dg main')

    if (datGuiClass?.length === 0) {
      const dat = require('dat.gui')
      gui = new dat.GUI()

      const folder1 = gui.addFolder('Noise')
      const folder2 = gui.addFolder('Rotation')
      const folder3 = gui.addFolder('Color')
      const folder4 = gui.addFolder('Other')

      folder1.add(settings, 'speed', 0.1, 1, 0.01)
      folder1.add(settings, 'density', 0, 10, 0.01)
      folder1.add(settings, 'strength', 0, 2, 0.01)

      folder2.add(settings, 'frequency', 0, 10, 0.1)
      folder2.add(settings, 'amplitude', 0, 10, 0.1)

      folder3.add(settings, 'intensity', 0, 10, 0.1)

      const onClick = (value) => set({ ...options, wireframe: value })

      folder4.add(settings, 'wireframe').name('wireframe').onChange(onClick)
    }
  }, [])

  return options
}

export default useDatGui
