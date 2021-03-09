// Components
import { VNavigationDrawer } from '..'

// Utilities
import { createTheme, VuetifyThemeSymbol } from '@/composables/theme'
import { mount } from '@vue/test-utils'
import { createVuetify, VuetifySymbol } from '@/framework'

describe('VNavigationDrawer', () => {
  const vuetify = createVuetify()

  function mountFunction (options = {}) {
    return mount(VNavigationDrawer, {
      global: {
        plugins: [vuetify],
      },
      ...options,
    })
  }

  it('should match a snapshot', () => {
    const wrapper = mountFunction()

    expect(wrapper.html()).toMatchSnapshot()
  })
})
