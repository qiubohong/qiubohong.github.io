import { mount } from '@vue/test-utils'
import Home from '../src/components/Home.vue'

test('mount component', async () => {
    expect(Home).toBeTruthy()
    const wrapper = mount(Home, {
        props: {
            msg: 'Home',
        },
      })
    expect(wrapper.html()).toContain('Home')
})
