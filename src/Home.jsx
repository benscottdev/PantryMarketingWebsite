import { useCallback, useState } from 'react'
import Three from './components/Three'
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
        {/* The ticker is a child of the 3D scene rather than the first band of
            the marketing site: the scene is pinned for several screens, so this
            keeps the tape running along the bottom of the viewport for as long
            as the fridge is on it. */}
        <Three>
          {/* <Ticker speed={40} /> */}
        </Three>
        <Site />
      </div>
    </SmoothScroll>
  )
}
