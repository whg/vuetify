// Utilities
import { computed, onMounted, ref } from 'vue'

// Globals
import { IN_BROWSER } from '@/util'

// Composables
export function useSsrBoot () {
  const isBooted = ref(false)

  onMounted(() => {
    if (!IN_BROWSER) return

    window.requestAnimationFrame(() => {
      isBooted.value = true
    })
  })

  const ssrBootStyles = computed(() => !isBooted.value ? ({
    transition: 'none !important',
  }) : undefined)

  return { ssrBootStyles }
}
