import { useCallback, useState } from 'react'
// Disabled for now — the pinned WebGL fridge scene was lagging badly on real
// hardware. Re-enable by restoring the `<Three>` import and the block below.
// import Three from './components/Three'
import Header from './components/Header'
import Loader, { LOADER_ON } from './components/Loader'
import SmoothScroll from './components/SmoothScroll'
import Landing from './site/components/Landing'
import Site from './site/Site'

export default function Home() {
  const [entered, setEntered] = useState(!LOADER_ON)
  const onLoaderFinished = useCallback(() => setEntered(true), [])

  return (
    <SmoothScroll enabled={entered}>
      <Header />
      <div className={`home${entered ? ' home--entered' : ''}`} id="top">
        <Loader onFinished={onLoaderFinished} />
        <Landing />
        <Site />
      </div>
    </SmoothScroll>
  )
}
