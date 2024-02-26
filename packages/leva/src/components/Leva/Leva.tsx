import React, { useEffect } from 'react'
import { levaStore } from '../../store'
import { LevaRoot, LevaRootProps } from './LevaRoot'
import { render } from '../../utils/react'

let rootInitialized = false
let rootEl: HTMLElement | null = null

type LevaProps = Omit<Partial<LevaRootProps>, 'store'> & { isRoot?: boolean; disableCache?: boolean }

// uses global store
export function Leva({ isRoot = false, disableCache, ...props }: LevaProps) {
  useEffect(() => {
    rootInitialized = true
    // if this panel was attached somewhere in the app and there is already
    // a floating panel, we remove it.
    if (!isRoot && rootEl) {
      rootEl.remove()
      rootEl = null
    }
    return () => {
      if (!isRoot) rootInitialized = false
    }
  }, [isRoot])

  useEffect(() => {
    levaStore.disableCache(!!disableCache)
  }, [disableCache])

  return <LevaRoot store={levaStore} {...props} />
}

/**
 * This hook is used by Leva useControls, and ensures that we spawn a Leva Panel
 * without the user having to put it into the component tree. This should only
 * happen when using the global store
 * @param isGlobalPanel
 */
export function useRenderRoot(isGlobalPanel: boolean) {
  useEffect(() => {
    if (isGlobalPanel && !rootInitialized) {
      if (!rootEl) {
        rootEl =
          document.getElementById('leva__root') || Object.assign(document.createElement('div'), { id: 'leva__root' })
        if (document.body) {
          document.body.appendChild(rootEl)
          render(<Leva isRoot />, rootEl)
        }
      }
      rootInitialized = true
    }
  }, [isGlobalPanel])
}
