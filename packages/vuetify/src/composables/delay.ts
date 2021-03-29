// Utilities
import propsFactory from '@/util/propsFactory'

// Globals
import { IN_BROWSER } from '@/util/globals'

// Types
export interface DelayProps {
  closeDelay?: number | string
  openDelay?: number | string
}

// Composables
export const makeDelayProps = propsFactory({
  closeDelay: [Number, String],
  openDelay: [Number, String],
}, 'delay')

export function useDelay (props: DelayProps, cb?: (value: boolean) => void) {
  const delays: Partial<Record<keyof DelayProps, number>> = {}
  const runDelayFactory = (prop: keyof DelayProps) => (): Promise<boolean> => {
    return new Promise(resolve => {
      // istanbul ignore next
      if (!IN_BROWSER) return resolve(true)

      const active = prop === 'openDelay'

      window.clearTimeout(delays.closeDelay)
      window.clearTimeout(delays.openDelay)

      delete delays.closeDelay
      delete delays.openDelay

      delays[prop] = window.setTimeout(() => {
        cb?.(active)
        resolve(active)
      }, parseInt(props[prop] ?? 0, 10))
    })
  }

  return {
    runCloseDelay: runDelayFactory('closeDelay'),
    runOpenDelay: runDelayFactory('openDelay'),
  }
}
