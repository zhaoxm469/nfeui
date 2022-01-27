import { mount } from '@vue/test-utils'
import TestButton from '../src/index.vue'


describe('TestButton.vue', () => {
    it('testButton type ', () => {
        const testButtonTypes = ['primary', 'success', 'info', 'default']

        const typeNoneEl = mount(TestButton).element.querySelector('button');
        expect(typeNoneEl?.classList).toContain('nfe-test-button-default')

        testButtonTypes.forEach(type => {
            const el = mount(TestButton, {
                props: {
                    type
                }
            }).element.querySelector('button');

            expect(el?.classList).toContain(`nfe-test-button-${type}`)
        })
    })
})
