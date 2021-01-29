import { useEffect } from 'react'

const useDatGui = (settings) => {
  let gui

  useEffect(() => {
    const datGui = document.getElementsByClassName('dg main')
    if (datGui?.length === 0) {
      const dat = require('dat.gui')
      gui = new dat.GUI()

      gui.add(settings, 'speed', 0.1, 1, 0.01)
      gui.add(settings, 'density', 0, 10, 0.01)
      gui.add(settings, 'strength', 0, 2, 0.01)
    }
  }, [])
}

export default useDatGui
