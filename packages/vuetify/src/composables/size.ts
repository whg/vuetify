// Utilities
import { computed } from 'vue'
import { convertToUnit } from '@/util'
import propsFactory from '@/util/propsFactory'

// Types
import type { PropType } from 'vue'

const allowedSizes = ['x-small', 'small', 'default', 'large', 'x-large']

type Sizes = typeof allowedSizes[number] | number

export interface SizeProps {
  size?: Sizes
}

// Composables
export const makeSizeProps = propsFactory({
  size: {
    type: [String, Number] as PropType<Sizes>,
    default: 'default',
    validator: (v: any) => allowedSizes.includes(v) || !isNaN(v),
  },
}, 'size')

export function useSize (props: SizeProps, name: string) {
  const sizeClasses = computed(() => {
    return allowedSizes.includes(props.size as string)
      ? `${name}--size-${props.size}`
      : null
  })

  const sizeStyles = computed(() => {
    return !allowedSizes.includes(props.size as string) && props.size
      ? ({
        width: convertToUnit(props.size),
        height: convertToUnit(props.size),
      }) : null
  })

  return { sizeClasses, sizeStyles }
}
