import { useRef } from 'react'

import useStore from '@/helpers/store'
import useSphere from '@/hooks/useSphere'

const Page = () => {
  useStore.setState({ title: 'Sphere' })

  const canvas = useRef()

  useSphere(canvas)

  return (
    <>
      <canvas ref={canvas}></canvas>
    </>
  )
}

export default Page
