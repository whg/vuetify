// Utilities
import { computed } from 'vue'
import propsFactory from '@/util/propsFactory'

// Types
import type { PropType } from 'vue'

const allowedRounded = [0, true, false, '', 'sm', 'lg', 'xl', 'pill', 'circle', 'shaped'] as const

type Rounded = typeof allowedRounded[number]

export interface RoundedProps {
  rounded?: Rounded
}

// Composables
export const makeRoundedProps = propsFactory({
  rounded: {
    type: [Boolean, Number, String] as PropType<Rounded>,
    default: undefined,
  },
}, 'rounded')

export function useRounded (props: RoundedProps, name: string) {
  const roundedClasses = computed(() => {
    const classes: string[] = []

    if (props.rounded === true || props.rounded === '') {
      classes.push(`${name}--rounded`)
    } else if (
      typeof props.rounded === 'string' ||
      props.rounded === 0
    ) {
      for (const value of String(props.rounded).split(' ')) {
        classes.push(`rounded-${value}`)
      }
    }

    return classes
  })

  return { roundedClasses }
}
